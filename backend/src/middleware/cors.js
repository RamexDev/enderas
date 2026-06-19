/**
 * Path-scoped CORS — each client origin may only access its designated API surface.
 *
 * - FRONTEND_URL → /api/v1/public/*
 * - ADMIN_URL    → /api/v1/auth/* and other authenticated admin routes
 * - Both origins → /uploads/* (static media)
 */

import cors from 'cors';
import env from '../config/env.js';

function createCors(origins) {
  return cors({
    origin: origins,
    credentials: true,
    exposedHeaders: ['X-Request-Id'],
  });
}

const publicCors = createCors(env.frontendUrls);
const adminCors = createCors(env.adminUrls);
const mediaCors = createCors(env.mediaUrls);

function resolveCors(req) {
  const path = req.path;

  if (path.startsWith('/api/v1/public')) {
    return publicCors;
  }

  if (path.startsWith('/uploads')) {
    return mediaCors;
  }

  if (path.startsWith('/api/v1')) {
    return adminCors;
  }

  return null;
}

/** Applies the correct CORS policy for the request path. */
export function scopedCors(req, res, next) {
  const handler = resolveCors(req);
  if (!handler) {
    return next();
  }
  return handler(req, res, next);
}

export { publicCors, adminCors, mediaCors };
