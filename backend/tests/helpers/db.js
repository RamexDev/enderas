/**
 * Unified database lifecycle for all test suites.
 * Connection stays open across files; data reset via sync({ force: true }).
 * Connection is closed once in tests/globalTeardown.js.
 */

import sequelize from '../../src/config/database.js';
import '../../src/models/index.js';

/** Create / reset all tables (destructive) */
export async function setupTestDb() {
  await sequelize.authenticate();
  await sequelize.sync({ force: true });
}

/** Reset data without closing the connection */
export async function resetTestDb() {
  await sequelize.sync({ force: true });
}

export { sequelize };
