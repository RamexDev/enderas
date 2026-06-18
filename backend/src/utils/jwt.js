/**
 * JWT token signing and verification utilities.
 * Access tokens use JWT_SECRET; refresh tokens use JWT_REFRESH_SECRET.
 */

import jwt from 'jsonwebtoken';
import env from '../config/env.js';

/** Sign a short-lived access token with user id and role */
export function signAccessToken(payload) {
  return jwt.sign(payload, env.jwt.secret, {
    expiresIn: env.jwt.accessExpiresIn,
  });
}

/** Sign a long-lived refresh token with user id only */
export function signRefreshToken(payload) {
  return jwt.sign(payload, env.jwt.refreshSecret, {
    expiresIn: env.jwt.refreshExpiresIn,
  });
}

/** Verify and decode an access token; throws on invalid/expired */
export function verifyAccessToken(token) {
  return jwt.verify(token, env.jwt.secret);
}

/** Verify and decode a refresh token; throws on invalid/expired */
export function verifyRefreshToken(token) {
  return jwt.verify(token, env.jwt.refreshSecret);
}
