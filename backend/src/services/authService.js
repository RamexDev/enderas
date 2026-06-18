/**
 * Authentication service — login, token refresh/rotation, logout, password change.
 * Refresh tokens are stored as SHA-256 hashes; expiry follows JWT_REFRESH_EXPIRES_IN.
 */

import bcrypt from 'bcrypt';
import { User, RefreshToken } from '../models/index.js';
import { signAccessToken, signRefreshToken, verifyRefreshToken } from '../utils/jwt.js';
import { hashRefreshToken } from '../utils/tokenHash.js';
import { validatePasswordStrength } from '../utils/password.js';
import { expiresAtFromDuration } from '../utils/duration.js';
import env from '../config/env.js';

const SALT_ROUNDS = 12;

/** Compute DB expiry date aligned with JWT refresh token TTL */
function refreshTokenExpiresAt() {
  return expiresAtFromDuration(env.jwt.refreshExpiresIn);
}

/**
 * Authenticate user and issue access + refresh token pair.
 * @param {string} email
 * @param {string} password
 */
export async function loginUser(email, password) {
  const user = await User.findOne({ where: { email } });

  if (!user) {
    throw Object.assign(new Error('Invalid email or password'), { statusCode: 401 });
  }

  if (!user.is_active) {
    throw Object.assign(new Error('Account is disabled'), { statusCode: 403 });
  }

  const isMatch = await bcrypt.compare(password, user.password);
  if (!isMatch) {
    throw Object.assign(new Error('Invalid email or password'), { statusCode: 401 });
  }

  await user.update({ last_login_at: new Date() });

  const accessToken = signAccessToken({ id: user.id, role: user.role });
  const refreshToken = signRefreshToken({ id: user.id });

  await RefreshToken.create({
    user_id: user.id,
    token_hash: hashRefreshToken(refreshToken),
    expires_at: refreshTokenExpiresAt(),
  });

  const userData = user.toJSON();
  delete userData.password;

  return { accessToken, refreshToken, user: userData };
}

/**
 * Rotate refresh token — invalidates old token and issues a new pair.
 * @param {string} refreshTokenStr
 */
export async function refreshAccessToken(refreshTokenStr) {
  let decoded;
  try {
    decoded = verifyRefreshToken(refreshTokenStr);
  } catch {
    throw Object.assign(new Error('Invalid refresh token'), { statusCode: 401 });
  }

  const storedToken = await RefreshToken.findOne({
    where: { token_hash: hashRefreshToken(refreshTokenStr) },
  });

  if (!storedToken) {
    throw Object.assign(new Error('Refresh token not found'), { statusCode: 401 });
  }

  if (new Date() > storedToken.expires_at) {
    await storedToken.destroy();
    throw Object.assign(new Error('Refresh token expired'), { statusCode: 401 });
  }

  const user = await User.findByPk(decoded.id);
  if (!user || !user.is_active) {
    await storedToken.destroy();
    throw Object.assign(new Error('User not found or disabled'), { statusCode: 401 });
  }

  // Token rotation: destroy old, create new
  await storedToken.destroy();

  const newAccessToken = signAccessToken({ id: user.id, role: user.role });
  const newRefreshToken = signRefreshToken({ id: user.id });

  await RefreshToken.create({
    user_id: user.id,
    token_hash: hashRefreshToken(newRefreshToken),
    expires_at: refreshTokenExpiresAt(),
  });

  return { accessToken: newAccessToken, refreshToken: newRefreshToken };
}

/** Invalidate a refresh token (idempotent if token not found) */
export async function logoutUser(refreshTokenStr) {
  if (!refreshTokenStr) {
    return { message: 'Logged out successfully' };
  }
  await RefreshToken.destroy({ where: { token_hash: hashRefreshToken(refreshTokenStr) } });
  return { message: 'Logged out successfully' };
}

/** Return current user profile without password hash */
export async function getCurrentUser(userId) {
  const user = await User.findByPk(userId, {
    attributes: { exclude: ['password'] },
  });

  if (!user) {
    throw Object.assign(new Error('User not found'), { statusCode: 404 });
  }

  return user;
}

/** Change password, clear must_change_password flag, and revoke all refresh tokens */
export async function changePassword(userId, oldPassword, newPassword) {
  const user = await User.findByPk(userId);

  if (!user) {
    throw Object.assign(new Error('User not found'), { statusCode: 404 });
  }

  const isMatch = await bcrypt.compare(oldPassword, user.password);
  if (!isMatch) {
    throw Object.assign(new Error('Current password is incorrect'), { statusCode: 400 });
  }

  const validation = validatePasswordStrength(newPassword);
  if (!validation.valid) {
    throw Object.assign(new Error(validation.message), { statusCode: 400 });
  }

  const hashedPassword = await bcrypt.hash(newPassword, SALT_ROUNDS);
  await user.update({ password: hashedPassword, must_change_password: false });
  await RefreshToken.destroy({ where: { user_id: userId } });

  return { message: 'Password changed successfully' };
}
