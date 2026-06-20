/**
 * Auth service ↔ controller contract tests.
 */

import { describe, it, expect, beforeAll } from 'vitest';
import bcrypt from 'bcrypt';
import * as authService from '../../src/services/authService.js';
import * as authController from '../../src/controllers/auth/authController.js';
import { User, RefreshToken } from '../../src/models/index.js';
import { setupTestDb } from '../helpers/db.js';
import {
  createMockReq,
  createMockRes,
  createMockNext,
  getCapturedResponse,
  expectServiceError,
} from '../helpers/http.js';

const PASSWORD = 'ContractAuth123!@#';

describe('auth layer ↔ controller contract', () => {
  beforeAll(async () => {
    await setupTestDb();
    const hash = await bcrypt.hash(PASSWORD, 12);
    await User.create({
      name: 'Auth Contract',
      email: 'auth-contract@test.com',
      password: hash,
      role: 'super_admin',
      is_active: true,
    });
    await User.create({
      name: 'Disabled',
      email: 'disabled@test.com',
      password: hash,
      role: 'editor',
      is_active: false,
    });
  });

  describe('authService error contract', () => {
    it('loginUser throws 401 for unknown email', async () => {
      await expectServiceError(
        () => authService.loginUser('missing@test.com', PASSWORD),
        { message: 'Invalid email or password', statusCode: 401 },
      );
    });

    it('loginUser throws 401 for wrong password', async () => {
      await expectServiceError(
        () => authService.loginUser('auth-contract@test.com', 'WrongPassword123!'),
        { message: 'Invalid email or password', statusCode: 401 },
      );
    });

    it('loginUser throws 403 for disabled account', async () => {
      await expectServiceError(
        () => authService.loginUser('disabled@test.com', PASSWORD),
        { message: 'Account is disabled', statusCode: 403 },
      );
    });

    it('getCurrentUser throws 404 for missing user', async () => {
      await expectServiceError(
        () => authService.getCurrentUser(99999),
        { message: /User with ID 99999 not found/, statusCode: 404 },
      );
    });

    it('changePassword throws 400 for wrong current password', async () => {
      const user = await User.findOne({ where: { email: 'auth-contract@test.com' } });
      await expectServiceError(
        () => authService.changePassword(user.id, 'WrongOld123!@#', 'NewSecure123!@#'),
        { message: 'Current password is incorrect', statusCode: 400 },
      );
    });

    it('changePassword throws 400 for weak new password', async () => {
      const user = await User.findOne({ where: { email: 'auth-contract@test.com' } });
      await expectServiceError(
        () => authService.changePassword(user.id, PASSWORD, 'weak'),
        { statusCode: 400, message: /Password must/ },
      );
    });

    it('refreshAccessToken throws 401 for garbage token', async () => {
      await expectServiceError(
        () => authService.refreshAccessToken('not-a-valid-token'),
        { statusCode: 401, message: 'Invalid refresh token' },
      );
    });
  });

  describe('authController HTTP mapping', () => {
    it('login → 401 for invalid credentials', async () => {
      const req = createMockReq({
        body: { email: 'auth-contract@test.com', password: 'wrong' },
      });
      const res = createMockRes();
      const next = createMockNext();

      await authController.login(req, res, next);

      const { statusCode, body } = getCapturedResponse(res);
      expect(statusCode).toBe(401);
      expect(body.success).toBe(false);
      expect(body.message).toBe('Invalid email or password');
      expect(next).not.toHaveBeenCalled();
    });

    it('login → 200 on valid credentials', async () => {
      const req = createMockReq({
        body: { email: 'auth-contract@test.com', password: PASSWORD },
      });
      const res = createMockRes();
      const next = createMockNext();

      await authController.login(req, res, next);

      const { statusCode, body } = getCapturedResponse(res);
      expect(statusCode).toBe(200);
      expect(body.data.accessToken).toBeDefined();
      expect(body.data.refreshToken).toBeDefined();
    });

    it('me → 404 when user no longer exists', async () => {
      const temp = await User.create({
        name: 'Temp',
        email: 'temp-delete@test.com',
        password: await bcrypt.hash(PASSWORD, 12),
        role: 'editor',
        is_active: true,
      });

      const req = createMockReq({ user: { id: temp.id } });
      const res = createMockRes();
      const next = createMockNext();

      await temp.destroy();
      await authController.me(req, res, next);

      expect(getCapturedResponse(res).statusCode).toBe(404);
    });
  });

  describe('cleanupExpiredTokens', () => {
    it('deletes only expired refresh tokens', async () => {
      const user = await User.findOne({ where: { email: 'auth-contract@test.com' } });

      const expired = await RefreshToken.create({
        user_id: user.id,
        token_hash: 'expired-hash',
        expires_at: new Date(Date.now() - 1000 * 60 * 60),
      });

      const valid = await RefreshToken.create({
        user_id: user.id,
        token_hash: 'valid-hash',
        expires_at: new Date(Date.now() + 1000 * 60 * 60),
      });

      const deleted = await authService.cleanupExpiredTokens();

      expect(deleted).toBe(1);

      const remaining = await RefreshToken.findAll();
      const remainingHashes = remaining.map((t) => t.token_hash);
      expect(remainingHashes).not.toContain(expired.token_hash);
      expect(remainingHashes).toContain(valid.token_hash);
    });
  });
});
