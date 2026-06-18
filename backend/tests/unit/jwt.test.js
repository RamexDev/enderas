/**
 * JWT signing, verification, expiry, and secret isolation tests.
 */

import { describe, it, expect } from 'vitest';
import jwt from 'jsonwebtoken';
import {
  signAccessToken,
  signRefreshToken,
  verifyAccessToken,
  verifyRefreshToken,
} from '../../src/utils/jwt.js';

describe('signAccessToken / verifyAccessToken', () => {
  it('signs and verifies a valid access token payload', () => {
    const payload = { id: 42, role: 'super_admin' };
    const token = signAccessToken(payload);
    const decoded = verifyAccessToken(token);

    expect(typeof token).toBe('string');
    expect(decoded.id).toBe(42);
    expect(decoded.role).toBe('super_admin');
    expect(decoded.exp).toBeDefined();
    expect(decoded.iat).toBeDefined();
  });

  it('rejects tampered access tokens', () => {
    const token = signAccessToken({ id: 1, role: 'editor' });
    const parts = token.split('.');
    const tampered = `${parts[0]}.${parts[1]}.invalidsignature`;
    expect(() => verifyAccessToken(tampered)).toThrow();
  });

  it('rejects access token signed with refresh secret', () => {
    const wrongSecretToken = jwt.sign(
      { id: 1, role: 'super_admin' },
      process.env.JWT_REFRESH_SECRET,
      { expiresIn: '15m' },
    );
    expect(() => verifyAccessToken(wrongSecretToken)).toThrow();
  });

  it('rejects expired access tokens', () => {
    const expired = jwt.sign(
      { id: 1, role: 'super_admin' },
      process.env.JWT_SECRET,
      { expiresIn: '-10s' },
    );
    expect(() => verifyAccessToken(expired)).toThrow(/expired/i);
  });

  it('rejects malformed token strings', () => {
    expect(() => verifyAccessToken('not.a.jwt')).toThrow();
    expect(() => verifyAccessToken('')).toThrow();
  });
});

describe('signRefreshToken / verifyRefreshToken', () => {
  it('signs and verifies refresh token with id only', () => {
    const token = signRefreshToken({ id: 7 });
    const decoded = verifyRefreshToken(token);
    expect(decoded.id).toBe(7);
    expect(decoded.role).toBeUndefined();
  });

  it('isolates refresh secret from access secret', () => {
    const refreshToken = signRefreshToken({ id: 1 });
    expect(() => verifyAccessToken(refreshToken)).toThrow();
  });

  it('rejects expired refresh tokens', () => {
    const expired = jwt.sign(
      { id: 1 },
      process.env.JWT_REFRESH_SECRET,
      { expiresIn: '-1s' },
    );
    expect(() => verifyRefreshToken(expired)).toThrow(/expired/i);
  });
});

describe('token expiry enforcement', () => {
  it('access token exp is sooner than refresh token exp for same user', () => {
    const access = signAccessToken({ id: 1, role: 'editor' });
    const refresh = signRefreshToken({ id: 1 });

    const accessExp = verifyAccessToken(access).exp;
    const refreshExp = verifyRefreshToken(refresh).exp;

    expect(accessExp).toBeLessThan(refreshExp);
  });
});
