/**
 * Test database helper — syncs all models to in-memory SQLite before each test suite.
 */

import sequelize from '../../src/config/database.js';
import '../../src/models/index.js';

export async function setupTestDb() {
  await sequelize.sync({ force: true });
}

export async function teardownTestDb() {
  await sequelize.close();
}
