/**
 * Vitest global teardown — close the shared Sequelize connection once after all tests.
 */

import sequelize from '../src/config/database.js';

export default async function globalTeardown() {
  await sequelize.close();
}
