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

async function start() {
  try {
    const dbInfo = `${env.db.host}:${env.db.port}/${env.db.name}`;
    await sequelize.authenticate();
    logger.info(`Database connected: ${dbInfo}`);

    await cleanupExpiredTokens();
    setInterval(cleanupExpiredTokens, 60 * 60 * 1000);
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
async function shutdown(signal) {
  logger.info(`${signal} received, shutting down gracefully`);
  if (server) {
    server.close(async () => {
      await sequelize.close();
      logger.info('Server closed');
      process.exit(0);
    });
  } else {
    await sequelize.close();
    process.exit(0);
  }
}

process.on('SIGTERM', () => shutdown('SIGTERM'));
process.on('SIGINT', () => shutdown('SIGINT'));

process.on('uncaughtException', (error) => {
  logger.error('Uncaught exception — server will exit', { error });
  process.exit(1);
});

process.on('unhandledRejection', (reason) => {
  logger.warn('Unhandled promise rejection', { error: reason instanceof Error ? reason : new Error(String(reason)) });
});

start();
