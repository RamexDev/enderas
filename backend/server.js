/**
 * Server entry point.
 * Connects to the database, starts the HTTP server, and handles graceful shutdown.
 */

import './src/config/env.js';
import app from './app.js';
import sequelize from './src/config/database.js';
import env from './src/config/env.js';

let server;

async function start() {
  try {
    await sequelize.authenticate();
    console.log(`Database connected: ${env.db.host}:${env.db.port}/${env.db.name}`);

    if (env.isDev) {
      console.log('Development mode: run `npm run migrate` to apply pending migrations');
    }

    server = app.listen(env.port, () => {
      console.log(`Server running on port ${env.port} [${env.nodeEnv}]`);
      console.log(`API Base URL: ${env.apiBaseUrl}`);
    });
  } catch (error) {
    console.error('Failed to start server:', error.message);
    process.exit(1);
  }
}

/** Graceful shutdown — close HTTP server and database pool on SIGTERM/SIGINT */
async function shutdown(signal) {
  console.log(`\n${signal} received. Shutting down gracefully...`);
  if (server) {
    server.close(async () => {
      await sequelize.close();
      console.log('Server closed');
      process.exit(0);
    });
  } else {
    await sequelize.close();
    process.exit(0);
  }
}

process.on('SIGTERM', () => shutdown('SIGTERM'));
process.on('SIGINT', () => shutdown('SIGINT'));

start();
