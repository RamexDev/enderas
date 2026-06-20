/**
 * Validation middleware contract tests.
 * Ensures express-validator rules + validate middleware produce consistent 400 responses.
 */

import { describe, it, expect } from 'vitest';
import request from 'supertest';
import { createValidationApp } from '../helpers/validationApp.js';
import { validateBody } from '../helpers/validation.js';
import { createServiceValidation } from '../../src/validations/content.js';
import { createUserValidation } from '../../src/validations/user.js';
import { loginValidation } from '../../src/validations/auth.js';
import { contactFormValidation } from '../../src/validations/contact.js';

describe('validateBody helper — rule-level contract', () => {
  it('createServiceValidation rejects missing title', async () => {
    const { valid, errors } = await validateBody(createServiceValidation, {
      short_description: 'only desc',
    });
    expect(valid).toBe(false);
    expect(errors.some((e) => e.path === 'title')).toBe(true);
  });

  it('createUserValidation rejects weak password', async () => {
    const { valid, errors } = await validateBody(createUserValidation, {
      name: 'Editor',
      email: 'editor@test.com',
      password: 'weak',
      role: 'editor',
    });
    expect(valid).toBe(false);
    expect(errors.some((e) => e.path === 'password')).toBe(true);
  });

  it('loginValidation rejects invalid email format', async () => {
    const { valid, errors } = await validateBody(loginValidation, {
      email: 'not-an-email',
      password: 'secret',
    });
    expect(valid).toBe(false);
    expect(errors.some((e) => e.path === 'email')).toBe(true);
  });

  it('contactFormValidation requires subject and message', async () => {
    const { valid, errors } = await validateBody(contactFormValidation, {
      name: 'John',
      email: 'john@test.com',
    });
    expect(valid).toBe(false);
    expect(errors.map((e) => e.path)).toEqual(expect.arrayContaining(['subject', 'message']));
  });
});

describe('validate middleware — HTTP contract via mini-app', () => {
  const app = createValidationApp(createServiceValidation);

  it('returns 400 with success:false and errors array', async () => {
    const res = await request(app)
      .post('/test')
      .send({ short_description: 'no title' });

    expect(res.status).toBe(400);
    expect(res.body.success).toBe(false);
    expect(res.body.message).toBe('Title is required');
    expect(Array.isArray(res.body.errors)).toBe(true);
    expect(res.body.errors[0]).toHaveProperty('msg');
    expect(res.body.errors[0]).toHaveProperty('path');
  });

  it('passes valid body through to handler', async () => {
    const res = await request(app)
      .post('/test')
      .send({ title: 'Valid Service Title' });

    expect(res.status).toBe(200);
    expect(res.body.success).toBe(true);
    expect(res.body.data.title).toBe('Valid Service Title');
  });

  it('normalizes validation error shape consistently across failures', async () => {
    const empty = await request(app).post('/test').send({});
    const partial = await request(app).post('/test').send({ title: '' });

    for (const res of [empty, partial]) {
      expect(res.status).toBe(400);
      expect(res.body.success).toBe(false);
      expect(res.body.message).toBeTruthy();
      expect(res.body.errors.length).toBeGreaterThan(0);
    }
  });
});
