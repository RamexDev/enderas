/**
 * Integration tests for API endpoints using supertest + in-memory SQLite.
 */

import { describe, it, expect, beforeAll } from 'vitest';
import request from 'supertest';
import bcrypt from 'bcrypt';
import app from '../../app.js';
import { User, ContactMessage } from '../../src/models/index.js';
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

  it('GET /api/v1/users returns paginated list with meta', async () => {
    const res = await request(app)
      .get('/api/v1/users')
      .set('Authorization', `Bearer ${accessToken}`);
    expect(res.status).toBe(200);
    expect(res.body.success).toBe(true);
    expect(Array.isArray(res.body.data)).toBe(true);
    expect(res.body.meta).toHaveProperty('page');
    expect(res.body.meta).toHaveProperty('limit');
    expect(res.body.meta).toHaveProperty('total');
    expect(res.body.meta).toHaveProperty('totalPages');
    expect(res.body.meta.page).toBe(1);
    expect(res.body.meta.limit).toBe(10);
  });

  it('GET /api/v1/users respects page and limit params', async () => {
    const res = await request(app)
      .get('/api/v1/users?page=1&limit=1')
      .set('Authorization', `Bearer ${accessToken}`);
    expect(res.status).toBe(200);
    expect(res.body.data.length).toBeLessThanOrEqual(1);
    expect(res.body.meta.limit).toBe(1);
    expect(res.body.meta.total).toBeGreaterThanOrEqual(1);
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

describe('Admin Contact Messages', () => {
  let contactMessageId;

  it('GET /api/v1/contact-messages returns messages with pagination meta', async () => {
    const res = await request(app)
      .get('/api/v1/contact-messages')
      .set('Authorization', `Bearer ${accessToken}`);
    expect(res.status).toBe(200);
    expect(res.body.success).toBe(true);
    expect(res.body.meta).toHaveProperty('page');
    expect(res.body.meta).toHaveProperty('total');
    expect(Array.isArray(res.body.data)).toBe(true);
  });

  it('POST /api/v1/public/contact creates a message for admin to manage', async () => {
    const res = await request(app)
      .post('/api/v1/public/contact')
      .send({
        name: 'Jane Doe',
        email: 'jane@example.com',
        phone: '+1-555-6789',
        subject: 'Support Request',
        message: 'Need help with your services.',
      });
    expect(res.status).toBe(201);
    expect(res.body.success).toBe(true);
    expect(res.body.data.is_read).toBe(false);
    expect(res.body.data.is_archived).toBe(false);
    contactMessageId = res.body.data.id;
  });

  it('GET /api/v1/contact-messages lists all messages (existing + new)', async () => {
    const res = await request(app)
      .get('/api/v1/contact-messages')
      .set('Authorization', `Bearer ${accessToken}`);
    expect(res.status).toBe(200);
    expect(res.body.data.length).toBeGreaterThanOrEqual(2);
    const jane = res.body.data.find((m) => m.name === 'Jane Doe');
    expect(jane).toBeDefined();
    expect(jane.email).toBe('jane@example.com');
  });

  it('GET /api/v1/contact-messages?archived=true excludes non-archived messages', async () => {
    const res = await request(app)
      .get('/api/v1/contact-messages?archived=true')
      .set('Authorization', `Bearer ${accessToken}`);
    expect(res.status).toBe(200);
    expect(res.body.data.every((m) => m.is_archived === true)).toBe(true);
  });

  it('GET /api/v1/contact-messages/:id returns specific message', async () => {
    const res = await request(app)
      .get(`/api/v1/contact-messages/${contactMessageId}`)
      .set('Authorization', `Bearer ${accessToken}`);
    expect(res.status).toBe(200);
    expect(res.body.data.subject).toBe('Support Request');
    expect(res.body.data.message).toBe('Need help with your services.');
  });

  it('GET /api/v1/contact-messages/:id returns 404 for unknown message', async () => {
    const res = await request(app)
      .get('/api/v1/contact-messages/99999')
      .set('Authorization', `Bearer ${accessToken}`);
    expect(res.status).toBe(404);
    expect(res.body.success).toBe(false);
  });

  it('PATCH /api/v1/contact-messages/:id/read marks as read', async () => {
    const res = await request(app)
      .patch(`/api/v1/contact-messages/${contactMessageId}/read`)
      .set('Authorization', `Bearer ${accessToken}`);
    expect(res.status).toBe(200);
    expect(res.body.data.is_read).toBe(true);

    const msg = await ContactMessage.findByPk(contactMessageId);
    expect(msg.is_read).toBe(true);
  });

  it('PATCH /api/v1/contact-messages/:id/read returns 404 for unknown message', async () => {
    const res = await request(app)
      .patch('/api/v1/contact-messages/99999/read')
      .set('Authorization', `Bearer ${accessToken}`);
    expect(res.status).toBe(404);
    expect(res.body.success).toBe(false);
  });

  it('PATCH /api/v1/contact-messages/:id/archive archives the message', async () => {
    const res = await request(app)
      .patch(`/api/v1/contact-messages/${contactMessageId}/archive`)
      .set('Authorization', `Bearer ${accessToken}`);
    expect(res.status).toBe(200);
    expect(res.body.data.is_archived).toBe(true);

    const msg = await ContactMessage.findByPk(contactMessageId);
    expect(msg.is_archived).toBe(true);
  });

  it('PATCH /api/v1/contact-messages/:id/archive returns 404 for unknown message', async () => {
    const res = await request(app)
      .patch('/api/v1/contact-messages/99999/archive')
      .set('Authorization', `Bearer ${accessToken}`);
    expect(res.status).toBe(404);
    expect(res.body.success).toBe(false);
  });

  it('GET /api/v1/contact-messages?archived=true now includes archived message', async () => {
    const res = await request(app)
      .get('/api/v1/contact-messages?archived=true')
      .set('Authorization', `Bearer ${accessToken}`);
    expect(res.status).toBe(200);
    expect(res.body.data.length).toBe(1);
    expect(res.body.data[0].id).toBe(contactMessageId);
    expect(res.body.meta.total).toBe(1);
  });

  it('GET /api/v1/contact-messages (default archived=false) only shows non-archived messages', async () => {
    const res = await request(app)
      .get('/api/v1/contact-messages')
      .set('Authorization', `Bearer ${accessToken}`);
    expect(res.status).toBe(200);
    expect(res.body.data.every((m) => m.is_archived === false)).toBe(true);
    expect(res.body.data.some((m) => m.id === contactMessageId)).toBe(false);
  });

  it('PATCH /api/v1/contact-messages/:id/unread marks as unread', async () => {
    const res = await request(app)
      .patch(`/api/v1/contact-messages/${contactMessageId}/unread`)
      .set('Authorization', `Bearer ${accessToken}`);
    expect(res.status).toBe(200);
    expect(res.body.data.is_read).toBe(false);

    const msg = await ContactMessage.findByPk(contactMessageId);
    expect(msg.is_read).toBe(false);
  });

  it('PATCH /api/v1/contact-messages/:id/unread returns 404 for unknown message', async () => {
    const res = await request(app)
      .patch('/api/v1/contact-messages/99999/unread')
      .set('Authorization', `Bearer ${accessToken}`);
    expect(res.status).toBe(404);
    expect(res.body.success).toBe(false);
  });

  it('PATCH /api/v1/contact-messages/:id/unarchive unarchives the message', async () => {
    const res = await request(app)
      .patch(`/api/v1/contact-messages/${contactMessageId}/unarchive`)
      .set('Authorization', `Bearer ${accessToken}`);
    expect(res.status).toBe(200);
    expect(res.body.data.is_archived).toBe(false);

    const msg = await ContactMessage.findByPk(contactMessageId);
    expect(msg.is_archived).toBe(false);
  });

  it('PATCH /api/v1/contact-messages/:id/unarchive returns 404 for unknown message', async () => {
    const res = await request(app)
      .patch('/api/v1/contact-messages/99999/unarchive')
      .set('Authorization', `Bearer ${accessToken}`);
    expect(res.status).toBe(404);
    expect(res.body.success).toBe(false);
  });

  it('DELETE /api/v1/contact-messages/:id deletes the message', async () => {
    const res = await request(app)
      .delete(`/api/v1/contact-messages/${contactMessageId}`)
      .set('Authorization', `Bearer ${accessToken}`);
    expect(res.status).toBe(200);
    expect(res.body.success).toBe(true);

    const msg = await ContactMessage.findByPk(contactMessageId);
    expect(msg).toBeNull();
  });

  it('DELETE /api/v1/contact-messages/:id returns 404 for already deleted message', async () => {
    const res = await request(app)
      .delete(`/api/v1/contact-messages/${contactMessageId}`)
      .set('Authorization', `Bearer ${accessToken}`);
    expect(res.status).toBe(404);
    expect(res.body.success).toBe(false);
  });

  it('DELETE /api/v1/contact-messages/:id returns 404 for unknown message', async () => {
    const res = await request(app)
      .delete('/api/v1/contact-messages/99999')
      .set('Authorization', `Bearer ${accessToken}`);
    expect(res.status).toBe(404);
    expect(res.body.success).toBe(false);
  });
});

describe('404 Handler', () => {
  it('returns 404 for unknown routes', async () => {
    const res = await request(app).get('/not-a-real-route');
    expect(res.status).toBe(404);
    expect(res.body.success).toBe(false);
  });
});
