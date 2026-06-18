/**
 * Express application setup.
 * Configures security middleware, rate limiting, static uploads, health check, and API routes.
 */

import express from 'express';
import helmet from 'helmet';
import morgan from 'morgan';
import rateLimit from 'express-rate-limit';
import path from 'path';
import { fileURLToPath } from 'url';
import env from './src/config/env.js';
import routes from './src/routes/index.js';
import { scopedCors } from './src/middleware/cors.js';
import { errorHandler } from './src/middleware/errorHandler.js';
import { notFound } from './src/middleware/notFound.js';

const __dirname = path.dirname(fileURLToPath(import.meta.url));

const app = express();

// Security headers (XSS, clickjacking, etc.)
app.use(helmet());

// Path-scoped CORS — each client origin may only access its designated endpoints
app.use(scopedCors);

// Request logging in development only
if (env.isDev) {
  app.use(morgan('dev'));
}

app.use(express.json({ limit: '10mb' }));
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
  windowMs: 60 * 60 * 1000,
  max: 3,
  message: { success: false, message: 'Too many contact submissions, please try again later' },
  standardHeaders: true,
  legacyHeaders: false,
});

app.use('/api/v1/auth/login', authLimiter);
app.use('/api/v1/public/contact', contactLimiter);

// Serve uploaded media files
app.use('/uploads', express.static(path.resolve(__dirname, 'src/uploads')));

/** Health check — returns 503 when database is unreachable */
app.get('/api/v1/health', async (req, res) => {
  const { default: sequelize } = await import('./src/config/database.js');
  let dbStatus = 'disconnected';
  try {
    await sequelize.authenticate();
    dbStatus = 'connected';
  } catch {
    dbStatus = 'disconnected';
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
