/**
 * Sequelize database connection.
 * Uses MySQL in development/staging/production; SQLite in-memory for tests.
 */

import { Sequelize } from 'sequelize';
import env from './env.js';

/** @type {import('sequelize').Options} */
const commonDefine = {
  timestamps: true,
  underscored: true,
  paranoid: false,
};

const sequelize = env.isTest
  ? new Sequelize({
      dialect: 'sqlite',
      storage: ':memory:',
      logging: false,
      define: commonDefine,
    })
  : new Sequelize(env.db.name, env.db.user, env.db.password, {
      host: env.db.host,
      port: env.db.port,
      dialect: 'mysql',
      logging: false,
      define: commonDefine,
      pool: {
        max: 10,
        min: 0,
        acquire: 30000,
        idle: 10000,
      },
    });

export default sequelize;
