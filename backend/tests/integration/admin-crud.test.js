/**
 * Integration tests for admin CRUD endpoints, mass-assignment protection, and auth hardening.
 */

import { describe, it, expect, beforeAll } from 'vitest';
import request from 'supertest';
import bcrypt from 'bcrypt';
import app from '../../app.js';
import { User, Post } from '../../src/models/index.js';
import { setupTestDb } from '../helpers/db.js';

const TEST_PASSWORD = 'TestAdmin123!@#';

let accessToken;
let adminUserId;

beforeAll(async () => {
  await setupTestDb();

  const hashedPassword = await bcrypt.hash(TEST_PASSWORD, 12);
  const admin = await User.create({
    name: 'Test Admin',
    email: 'admin@test.com',
    password: hashedPassword,
    role: 'super_admin',
    is_active: true,
    must_change_password: false,
  });
  adminUserId = admin.id;

  const login = await request(app)
    .post('/api/v1/auth/login')
    .send({ email: 'admin@test.com', password: TEST_PASSWORD });
  accessToken = login.body.data.accessToken;
});

describe('Admin CRUD — team members', () => {
  let teamMemberId;

  it('POST /api/v1/team-members creates a member', async () => {
    const res = await request(app)
      .post('/api/v1/team-members')
      .set('Authorization', `Bearer ${accessToken}`)
      .send({ full_name: 'Jane Smith', position: 'Engineer' });
    expect(res.status).toBe(201);
    expect(res.body.data.full_name).toBe('Jane Smith');
    teamMemberId = res.body.data.id;
  });

  it('PUT /api/v1/team-members/:id updates a member', async () => {
    const res = await request(app)
      .put(`/api/v1/team-members/${teamMemberId}`)
      .set('Authorization', `Bearer ${accessToken}`)
      .send({ position: 'Senior Engineer' });
    expect(res.status).toBe(200);
    expect(res.body.data.position).toBe('Senior Engineer');
  });

  it('DELETE /api/v1/team-members/:id removes a member', async () => {
    const res = await request(app)
      .delete(`/api/v1/team-members/${teamMemberId}`)
      .set('Authorization', `Bearer ${accessToken}`);
    expect(res.status).toBe(200);
  });
});

describe('Admin CRUD — FAQs', () => {
  let faqId;

  it('POST /api/v1/faqs creates an FAQ', async () => {
    const res = await request(app)
      .post('/api/v1/faqs')
      .set('Authorization', `Bearer ${accessToken}`)
      .send({ question: 'What is Enderas?', answer: 'An asset management company.' });
    expect(res.status).toBe(201);
    faqId = res.body.data.id;
  });

  it('PUT /api/v1/faqs/:id updates an FAQ', async () => {
    const res = await request(app)
      .put(`/api/v1/faqs/${faqId}`)
      .set('Authorization', `Bearer ${accessToken}`)
      .send({ answer: 'Updated answer.' });
    expect(res.status).toBe(200);
    expect(res.body.data.answer).toBe('Updated answer.');
  });

  it('DELETE /api/v1/faqs/:id removes an FAQ', async () => {
    const res = await request(app)
      .delete(`/api/v1/faqs/${faqId}`)
      .set('Authorization', `Bearer ${accessToken}`);
    expect(res.status).toBe(200);
  });
});

describe('Admin CRUD — settings and homepage', () => {
  it('PUT /api/v1/settings updates site settings', async () => {
    const res = await request(app)
      .put('/api/v1/settings')
      .set('Authorization', `Bearer ${accessToken}`)
      .send({ site_name: 'Enderas CMS', sell_link: '/sell', request_valuation_link: '/valuation' });
    expect(res.status).toBe(200);
    expect(res.body.data.site_name).toBe('Enderas CMS');
    expect(res.body.data.sell_link).toBe('/sell');
    expect(res.body.data.request_valuation_link).toBe('/valuation');
  });

  it('PUT /api/v1/home-page updates homepage flags', async () => {
    const res = await request(app)
      .put('/api/v1/home-page')
      .set('Authorization', `Bearer ${accessToken}`)
      .send({ show_team: false });
    expect(res.status).toBe(200);
    expect(res.body.data.show_team).toBe(false);
  });
});

describe('Admin CRUD — blog posts', () => {
  let postId;

  it('POST /api/v1/posts creates a draft post', async () => {
    const res = await request(app)
      .post('/api/v1/posts')
      .set('Authorization', `Bearer ${accessToken}`)
      .send({ title: 'First Post', content: 'Hello world', status: 'draft' });
    expect(res.status).toBe(201);
    expect(res.body.data.title).toBe('First Post');
    postId = res.body.data.id;
  });

  it('PUT /api/v1/posts/:id ignores mass-assigned author_id', async () => {
    const otherUser = await User.create({
      name: 'Other User',
      email: 'other@test.com',
      password: await bcrypt.hash(TEST_PASSWORD, 12),
      role: 'editor',
      is_active: true,
    });

    const res = await request(app)
      .put(`/api/v1/posts/${postId}`)
      .set('Authorization', `Bearer ${accessToken}`)
      .send({ title: 'Updated Post', author_id: otherUser.id, published_at: '2020-01-01' });

    expect(res.status).toBe(200);

    const post = await Post.findByPk(postId);
    expect(post.author_id).toBe(adminUserId);
    expect(post.title).toBe('Updated Post');
    expect(post.status).toBe('draft');
  });

  it('PATCH /api/v1/posts/:id/publish sets published status', async () => {
    const res = await request(app)
      .patch(`/api/v1/posts/${postId}/publish`)
      .set('Authorization', `Bearer ${accessToken}`);
    expect(res.status).toBe(200);
    expect(res.body.data.status).toBe('published');
    expect(res.body.data.published_at).toBeTruthy();
  });

  it('DELETE /api/v1/posts/:id removes a post', async () => {
    const res = await request(app)
      .delete(`/api/v1/posts/${postId}`)
      .set('Authorization', `Bearer ${accessToken}`);
    expect(res.status).toBe(200);
  });
});

describe('Admin CRUD — gallery', () => {
  let categoryId;
  let itemId;

  it('POST /api/v1/gallery-categories creates a category', async () => {
    const res = await request(app)
      .post('/api/v1/gallery-categories')
      .set('Authorization', `Bearer ${accessToken}`)
      .send({ name: 'Events' });
    expect(res.status).toBe(201);
    categoryId = res.body.data.id;
  });

  it('POST /api/v1/gallery creates a gallery item', async () => {
    const res = await request(app)
      .post('/api/v1/gallery')
      .set('Authorization', `Bearer ${accessToken}`)
      .send({ title: 'Event Photo', image: '/uploads/test.jpg', category_id: categoryId });
    expect(res.status).toBe(201);
    itemId = res.body.data.id;
  });

  it('PUT /api/v1/gallery/:id updates a gallery item', async () => {
    const res = await request(app)
      .put(`/api/v1/gallery/${itemId}`)
      .set('Authorization', `Bearer ${accessToken}`)
      .send({ title: 'Updated Photo' });
    expect(res.status).toBe(200);
    expect(res.body.data.title).toBe('Updated Photo');
  });

  it('DELETE /api/v1/gallery/:id removes a gallery item', async () => {
    const res = await request(app)
      .delete(`/api/v1/gallery/${itemId}`)
      .set('Authorization', `Bearer ${accessToken}`);
    expect(res.status).toBe(200);
  });
});

describe('Auth hardening — must_change_password', () => {
  let restrictedToken;

  beforeAll(async () => {
    await User.create({
      name: 'New Admin',
      email: 'newadmin@test.com',
      password: await bcrypt.hash(TEST_PASSWORD, 12),
      role: 'super_admin',
      is_active: true,
      must_change_password: true,
    });

    const login = await request(app)
      .post('/api/v1/auth/login')
      .send({ email: 'newadmin@test.com', password: TEST_PASSWORD });
    restrictedToken = login.body.data.accessToken;
  });

  it('blocks admin routes when password change is required', async () => {
    const res = await request(app)
      .get('/api/v1/dashboard')
      .set('Authorization', `Bearer ${restrictedToken}`);
    expect(res.status).toBe(403);
    expect(res.body.message).toMatch(/Password change required/i);
  });

  it('allows /auth/me when password change is required', async () => {
    const res = await request(app)
      .get('/api/v1/auth/me')
      .set('Authorization', `Bearer ${restrictedToken}`);
    expect(res.status).toBe(200);
    expect(res.body.data.email).toBe('newadmin@test.com');
  });
});

describe('Upload security', () => {
  it('POST /api/v1/media/upload rejects invalid entity_type', async () => {
    const res = await request(app)
      .post('/api/v1/media/upload')
      .set('Authorization', `Bearer ${accessToken}`)
      .field('entity_type', '../../outside')
      .attach('file', Buffer.from('fake'), { filename: 'test.jpg', contentType: 'image/jpeg' });

    expect(res.status).toBe(400);
    expect(res.body.success).toBe(false);
  });
});
