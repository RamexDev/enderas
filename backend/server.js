/**
 * Server entry point.
 * Connects to the database, starts the HTTP server, and handles graceful shutdown.
 */

import './src/config/env.js';
import app from './app.js';
import sequelize from './src/config/database.js';
import env from './src/config/env.js';
import logger from './src/utils/logger.js';
import { cleanupExpiredTokens } from './src/services/authService.js';

let server;
let tokenCleanupInterval;

async function start() {
  try {
    const dbInfo = `${env.db.host}:${env.db.port}/${env.db.name}`;
    await sequelize.authenticate();
    logger.info(`Database connected: ${dbInfo}`);

    await cleanupExpiredTokens();

    let running = false;
    tokenCleanupInterval = setInterval(async () => {
      if (running) return;
      running = true;
      try {
        await cleanupExpiredTokens();
      } finally {
        running = false;
      }
    }, 60 * 60 * 1000);

    logger.debug('Expired refresh token cleanup scheduled (every 60 min)');

    if (env.isDev) {
      logger.info('Development mode detected. Run `npm run migrate` to apply pending migrations.', { db: dbInfo });
    }

    server = app.listen(env.port, () => {
      logger.info(`Server started`, {
        port: env.port,
        env: env.nodeEnv,
        apiBaseUrl: env.apiBaseUrl,
      });
    });
  } catch (error) {
    logger.error('Failed to start server', {
      error,
      db: `${env.db.host}:${env.db.port}/${env.db.name}`,
      dialect: 'mysql',
      hint: 'Ensure MySQL is running and the database credentials in .env are correct. Try: sudo systemctl start mysql',
    });
    process.exit(1);
  }
}

/** Graceful shutdown — close HTTP server and database pool on SIGTERM/SIGINT */
let shuttingDown = false;

async function shutdown(signal) {
  if (shuttingDown) return;
  shuttingDown = true;

  logger.info(`${signal} received, shutting down gracefully`);

  if (tokenCleanupInterval) {
    clearInterval(tokenCleanupInterval);
  }

  if (!server) {
    await sequelize.close();
    process.exit(0);
    return;
  }

  // Stop accepting new connections
  server.close(async () => {
    await sequelize.close();
    process.exit(0);
  });

  // Fallback: force-close idle connections and shutdown after 10s
  const timer = setTimeout(() => {
    if (typeof server.closeAllConnections === 'function') {
      server.closeAllConnections();
    }
    sequelize.close().catch(() => {});
    process.exit(0);
  }, 10000);

  timer.unref();
}

process.on('SIGTERM', () => shutdown('SIGTERM'));
process.on('SIGINT', () => shutdown('SIGINT'));

process.on('uncaughtException', (error) => {
  logger.error('Uncaught exception — server will exit', { error });
  process.exit(1);
});

process.on('unhandledRejection', (reason) => {
  logger.error('Unhandled promise rejection — shutting down', { error: reason instanceof Error ? reason : new Error(String(reason)) });
  shutdown('UNHANDLED_REJECTION');
});

start();
