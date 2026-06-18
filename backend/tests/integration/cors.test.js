/**
 * Integration tests for path-scoped CORS (ADMIN_URL / FRONTEND_URL).
 */

import { describe, it, expect, beforeAll } from 'vitest';
import request from 'supertest';
import app from '../../app.js';
import { setupTestDb } from '../helpers/db.js';

const ADMIN_ORIGIN = 'http://localhost:5173';
const FRONTEND_ORIGIN = 'http://localhost:5174';
const UNKNOWN_ORIGIN = 'http://evil.example.com';

beforeAll(async () => {
  await setupTestDb();
});

describe('CORS', () => {
  it('allows FRONTEND_URL origin on /api/v1/public routes', async () => {
    const res = await request(app)
      .get('/api/v1/public/settings')
      .set('Origin', FRONTEND_ORIGIN);

    expect(res.status).toBe(200);
    expect(res.headers['access-control-allow-origin']).toBe(FRONTEND_ORIGIN);
    expect(res.headers['access-control-allow-credentials']).toBe('true');
  });

  it('rejects FRONTEND_URL origin on admin routes', async () => {
    const res = await request(app)
      .get('/api/v1/dashboard')
      .set('Origin', FRONTEND_ORIGIN);

    expect(res.headers['access-control-allow-origin']).toBeUndefined();
  });

  it('allows ADMIN_URL origin on /api/v1/auth routes', async () => {
    const res = await request(app)
      .options('/api/v1/auth/login')
      .set('Origin', ADMIN_ORIGIN)
      .set('Access-Control-Request-Method', 'POST');

    expect(res.status).toBe(204);
    expect(res.headers['access-control-allow-origin']).toBe(ADMIN_ORIGIN);
  });

  it('rejects ADMIN_URL origin on public routes', async () => {
    const res = await request(app)
      .get('/api/v1/public/home')
      .set('Origin', ADMIN_ORIGIN);

    expect(res.status).toBe(200);
    expect(res.headers['access-control-allow-origin']).toBeUndefined();
  });

  it('rejects unknown origins on public routes', async () => {
    const res = await request(app)
      .get('/api/v1/public/home')
      .set('Origin', UNKNOWN_ORIGIN);

    expect(res.headers['access-control-allow-origin']).toBeUndefined();
  });

  it('allows both origins on /uploads', async () => {
    const adminRes = await request(app)
      .options('/uploads/')
      .set('Origin', ADMIN_ORIGIN)
      .set('Access-Control-Request-Method', 'GET');

    const frontendRes = await request(app)
      .options('/uploads/')
      .set('Origin', FRONTEND_ORIGIN)
      .set('Access-Control-Request-Method', 'GET');

    expect(adminRes.headers['access-control-allow-origin']).toBe(ADMIN_ORIGIN);
    expect(frontendRes.headers['access-control-allow-origin']).toBe(FRONTEND_ORIGIN);
  });
});
