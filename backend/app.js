/**
 * Express application setup.
 * Configures security middleware, rate limiting, static uploads, health check, and API routes.
 */

import path from 'path';
import { fileURLToPath } from 'url';
import express from 'express';
import helmet from 'helmet';
import morgan from 'morgan';
import rateLimit from 'express-rate-limit';
import env from './src/config/env.js';
import routes from './src/routes/index.js';
import { scopedCors } from './src/middleware/cors.js';
import { requestId } from './src/middleware/requestId.js';
import { errorHandler } from './src/middleware/errorHandler.js';
import { notFound } from './src/middleware/notFound.js';
import sequelize from './src/config/database.js';
import logger from './src/utils/logger.js';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const app = express();

if (!env.isTest) {
  app.set('trust proxy', 1);
}

// Request ID for traceability across logs
app.use(requestId);

// Security headers (XSS, clickjacking, etc.)
app.use(helmet({ crossOriginResourcePolicy: false }));

// Path-scoped CORS — each client origin may only access its designated endpoints
app.use(scopedCors);

// Request logging — combined format in prod, dev format in dev (skipped in test)
if (!env.isTest) {
  const morganStream = { write: (msg) => logger.info(msg.trim()) };
  app.use(morgan(env.isDev ? 'dev' : 'combined', { stream: morganStream }));
}

app.use(express.json({ limit: '2mb' }));
app.use(express.urlencoded({ extended: true }));

// Brute-force protection on sensitive public endpoints
const authLimiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  max: 5,
  message: { success: false, message: 'Too many login attempts, please try again later' },
  standardHeaders: true,
  legacyHeaders: false,
});

const contactLimiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  max: 5,
  skip: (req) => req.method !== 'POST',
  message: { success: false, message: 'Too many contact submissions, please try again later' },
  standardHeaders: true,
  legacyHeaders: false,
});

const refreshLimiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  max: 10,
  message: { success: false, message: 'Too many refresh attempts, please try again later' },
  standardHeaders: true,
  legacyHeaders: false,
});

app.use('/api/v1/auth/login', authLimiter);
app.use('/api/v1/auth/refresh', refreshLimiter);
app.use('/api/v1/public/contact', contactLimiter);

// Serve uploaded media files
app.use('/uploads', express.static(env.upload.resolvedPath));

// Serve seed asset images (downloaded from the legacy WordPress site)
app.use('/seed-assets', express.static(path.join(__dirname, 'src/seed-assets')));

/** Health check — returns 503 when database is unreachable */
app.get('/api/v1/health', async (req, res) => {
  let dbStatus = 'disconnected';
  try {
    await sequelize.query('SELECT 1');
    dbStatus = 'connected';
  } catch (error) {
    logger.warn('Health check — database unreachable', { req, error });
  }

  const statusCode = dbStatus === 'connected' ? 200 : 503;
  return res.status(statusCode).json({
    status: dbStatus === 'connected' ? 'ok' : 'error',
    database: dbStatus,
    uptime: process.uptime(),
    timestamp: new Date().toISOString(),
  });
});

app.use('/api/v1', routes);

app.use(notFound);
app.use(errorHandler);

export default app;
