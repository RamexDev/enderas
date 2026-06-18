/**
 * Integration tests for API endpoints using supertest + in-memory SQLite.
 */

import { describe, it, expect, beforeAll } from 'vitest';
import request from 'supertest';
import bcrypt from 'bcrypt';
import app from '../../app.js';
import { User } from '../../src/models/index.js';
import { setupTestDb } from '../helpers/db.js';

const TEST_PASSWORD = 'TestAdmin123!@#';

let accessToken;
let refreshToken;

beforeAll(async () => {
  await setupTestDb();

  const hashedPassword = await bcrypt.hash(TEST_PASSWORD, 12);
  await User.create({
    name: 'Test Admin',
    email: 'admin@test.com',
    password: hashedPassword,
    role: 'super_admin',
    is_active: true,
    must_change_password: false,
  });
});

describe('Health Check', () => {
  it('GET /api/v1/health returns ok with connected database', async () => {
    const res = await request(app).get('/api/v1/health');
    expect(res.status).toBe(200);
    expect(res.body.status).toBe('ok');
    expect(res.body.database).toBe('connected');
  });
});

describe('Authentication', () => {
  it('POST /api/v1/auth/login rejects invalid credentials', async () => {
    const res = await request(app)
      .post('/api/v1/auth/login')
      .send({ email: 'admin@test.com', password: 'wrongpassword' });
    expect(res.status).toBe(401);
    expect(res.body.success).toBe(false);
  });

  it('POST /api/v1/auth/login returns tokens on success', async () => {
    const res = await request(app)
      .post('/api/v1/auth/login')
      .send({ email: 'admin@test.com', password: TEST_PASSWORD });
    expect(res.status).toBe(200);
    expect(res.body.success).toBe(true);
    expect(res.body.data.accessToken).toBeDefined();
    expect(res.body.data.refreshToken).toBeDefined();
    accessToken = res.body.data.accessToken;
    refreshToken = res.body.data.refreshToken;
  });

  it('GET /api/v1/auth/me returns current user', async () => {
    const res = await request(app)
      .get('/api/v1/auth/me')
      .set('Authorization', `Bearer ${accessToken}`);
    expect(res.status).toBe(200);
    expect(res.body.data.email).toBe('admin@test.com');
  });

  it('POST /api/v1/auth/refresh rotates tokens', async () => {
    const res = await request(app)
      .post('/api/v1/auth/refresh')
      .send({ refresh_token: refreshToken });
    expect(res.status).toBe(200);
    expect(res.body.data.accessToken).toBeDefined();
    accessToken = res.body.data.accessToken;
    refreshToken = res.body.data.refreshToken;
  });

  it('POST /api/v1/auth/logout succeeds', async () => {
    const res = await request(app)
      .post('/api/v1/auth/logout')
      .send({ refresh_token: refreshToken });
    expect(res.status).toBe(200);
    expect(res.body.success).toBe(true);
  });
});

describe('Public Endpoints', () => {
  it('GET /api/v1/public/home returns homepage structure', async () => {
    const res = await request(app).get('/api/v1/public/home');
    expect(res.status).toBe(200);
    expect(res.body.success).toBe(true);
    expect(res.body.data).toHaveProperty('homePage');
  });

  it('GET /api/v1/public/services returns paginated list', async () => {
    const res = await request(app).get('/api/v1/public/services');
    expect(res.status).toBe(200);
    expect(res.body.success).toBe(true);
    expect(Array.isArray(res.body.data)).toBe(true);
    expect(res.body.meta).toHaveProperty('page');
  });

  it('GET /api/v1/public/settings returns site settings', async () => {
    const res = await request(app).get('/api/v1/public/settings');
    expect(res.status).toBe(200);
    expect(res.body.success).toBe(true);
  });

  it('POST /api/v1/public/contact validates required fields', async () => {
    const res = await request(app)
      .post('/api/v1/public/contact')
      .send({ name: 'Test' });
    expect(res.status).toBe(400);
    expect(res.body.success).toBe(false);
  });

  it('POST /api/v1/public/contact accepts valid submission', async () => {
    const res = await request(app)
      .post('/api/v1/public/contact')
      .send({
        name: 'John Doe',
        email: 'john@example.com',
        subject: 'Inquiry',
        message: 'Hello, I would like more information.',
      });
    expect(res.status).toBe(201);
    expect(res.body.success).toBe(true);
  });
});

describe('Admin Endpoints', () => {
  let serviceId;

  beforeAll(async () => {
    const login = await request(app)
      .post('/api/v1/auth/login')
      .send({ email: 'admin@test.com', password: TEST_PASSWORD });
    accessToken = login.body.data.accessToken;
  });

  it('GET /api/v1/dashboard requires authentication', async () => {
    const res = await request(app).get('/api/v1/dashboard');
    expect(res.status).toBe(401);
  });

  it('GET /api/v1/dashboard returns stats when authenticated', async () => {
    const res = await request(app)
      .get('/api/v1/dashboard')
      .set('Authorization', `Bearer ${accessToken}`);
    expect(res.status).toBe(200);
    expect(res.body.success).toBe(true);
  });

  it('POST /api/v1/services creates a service', async () => {
    const res = await request(app)
      .post('/api/v1/services')
      .set('Authorization', `Bearer ${accessToken}`)
      .send({
        title: 'Test Service',
        short_description: 'A test service',
        is_active: true,
      });
    expect(res.status).toBe(201);
    expect(res.body.data.title).toBe('Test Service');
    serviceId = res.body.data.id;
  });

  it('POST /api/v1/services rejects missing title', async () => {
    const res = await request(app)
      .post('/api/v1/services')
      .set('Authorization', `Bearer ${accessToken}`)
      .send({ short_description: 'No title' });
    expect(res.status).toBe(400);
  });

  it('PATCH /api/v1/services/:id/status toggles active state', async () => {
    const res = await request(app)
      .patch(`/api/v1/services/${serviceId}/status`)
      .set('Authorization', `Bearer ${accessToken}`);
    expect(res.status).toBe(200);
    expect(res.body.data.is_active).toBe(false);
  });

  it('GET /api/v1/public/services excludes inactive services', async () => {
    const res = await request(app).get('/api/v1/public/services');
    const titles = res.body.data.map((s) => s.title);
    expect(titles).not.toContain('Test Service');
  });

  it('DELETE /api/v1/services/:id removes service', async () => {
    const res = await request(app)
      .delete(`/api/v1/services/${serviceId}`)
      .set('Authorization', `Bearer ${accessToken}`);
    expect(res.status).toBe(200);
  });
});

describe('404 Handler', () => {
  it('returns 404 for unknown routes', async () => {
    const res = await request(app).get('/not-a-real-route');
    expect(res.status).toBe(404);
    expect(res.body.success).toBe(false);
  });
});
