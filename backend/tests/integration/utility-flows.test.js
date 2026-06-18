/**
 * Integration tests — utilities exercised inside real API flows.
 * Verifies slug generation, password validation, token hashing, and duration parsing end-to-end.
 */

import { describe, it, expect, beforeAll } from 'vitest';
import request from 'supertest';
import bcrypt from 'bcrypt';
import app from '../../app.js';
import { User, RefreshToken } from '../../src/models/index.js';
import { hashRefreshToken } from '../../src/utils/tokenHash.js';
import { parseDurationToMs } from '../../src/utils/duration.js';
import { setupTestDb } from '../helpers/db.js';

const ADMIN_PASSWORD = 'FlowTestAdmin123!@#';

describe('Utility flows inside real API requests', () => {
  let accessToken;

  beforeAll(async () => {
    await setupTestDb();

    const hash = await bcrypt.hash(ADMIN_PASSWORD, 12);
    await User.create({
      name: 'Flow Admin',
      email: 'flow-admin@test.com',
      password: hash,
      role: 'super_admin',
      is_active: true,
      must_change_password: false,
    });

    const login = await request(app)
      .post('/api/v1/auth/login')
      .send({ email: 'flow-admin@test.com', password: ADMIN_PASSWORD });

    accessToken = login.body.data.accessToken;
  });

  describe('generateSlug via service creation flow', () => {
    it('auto-generates slug from title when slug omitted', async () => {
      const res = await request(app)
        .post('/api/v1/services')
        .set('Authorization', `Bearer ${accessToken}`)
        .send({ title: 'Building Construction Consulting' });

      expect(res.status).toBe(201);
      expect(res.body.data.slug).toBe('building-construction-consulting');
    });

    it('generated slug is usable on public endpoint', async () => {
      const res = await request(app)
        .get('/api/v1/public/services/building-construction-consulting');

      expect(res.status).toBe(200);
      expect(res.body.data.title).toBe('Building Construction Consulting');
    });
  });

  describe('pickFields via service creation — blocks mass assignment', () => {
    it('strips disallowed fields from persisted service', async () => {
      const res = await request(app)
        .post('/api/v1/services')
        .set('Authorization', `Bearer ${accessToken}`)
        .send({
          title: 'Mass Assignment Test',
          role: 'super_admin',
          __proto__: { polluted: true },
          is_active: true,
        });

      expect(res.status).toBe(201);
      expect(res.body.data.slug).toBe('mass-assignment-test');
      expect(res.body.data.role).toBeUndefined();
    });
  });

  describe('password validation via user creation flow', () => {
    it('rejects weak password with 400', async () => {
      const res = await request(app)
        .post('/api/v1/users')
        .set('Authorization', `Bearer ${accessToken}`)
        .send({
          name: 'Weak User',
          email: 'weak-user@test.com',
          password: 'short',
          role: 'editor',
        });

      expect(res.status).toBe(400);
      expect(res.body.success).toBe(false);
    });

    it('accepts strong password and creates user', async () => {
      const res = await request(app)
        .post('/api/v1/users')
        .set('Authorization', `Bearer ${accessToken}`)
        .send({
          name: 'Strong User',
          email: 'strong-user@test.com',
          password: 'StrongEditor123!@#',
          role: 'editor',
        });

      expect(res.status).toBe(201);
      expect(res.body.data.email).toBe('strong-user@test.com');
      expect(res.body.data.password).toBeUndefined();
    });
  });

  describe('hashRefreshToken + expiresAtFromDuration via login flow', () => {
    it('stores hashed refresh token, never raw token', async () => {
      const login = await request(app)
        .post('/api/v1/auth/login')
        .send({ email: 'flow-admin@test.com', password: ADMIN_PASSWORD });

      const rawRefresh = login.body.data.refreshToken;
      const stored = await RefreshToken.findOne({
        where: { token_hash: hashRefreshToken(rawRefresh) },
      });

      expect(stored).not.toBeNull();
      expect(stored.token_hash).toBe(hashRefreshToken(rawRefresh));
      expect(stored.token_hash).not.toBe(rawRefresh);
    });

    it('refresh token DB expiry aligns with JWT_REFRESH_EXPIRES_IN (7d)', async () => {
      const login = await request(app)
        .post('/api/v1/auth/login')
        .send({ email: 'flow-admin@test.com', password: ADMIN_PASSWORD });

      const rawRefresh = login.body.data.refreshToken;
      const stored = await RefreshToken.findOne({
        where: { token_hash: hashRefreshToken(rawRefresh) },
      });

      const expectedMs = parseDurationToMs(process.env.JWT_REFRESH_EXPIRES_IN);
      const actualMs = stored.expires_at.getTime() - Date.now();

      expect(actualMs).toBeGreaterThan(expectedMs - 60_000);
      expect(actualMs).toBeLessThanOrEqual(expectedMs + 60_000);
    });
  });

  describe('password validation via change-password flow', () => {
    it('rejects weak new password with 400', async () => {
      const res = await request(app)
        .post('/api/v1/auth/change-password')
        .set('Authorization', `Bearer ${accessToken}`)
        .send({
          old_password: ADMIN_PASSWORD,
          new_password: 'weak',
        });

      expect(res.status).toBe(400);
      expect(res.body.success).toBe(false);
    });
  });
});
