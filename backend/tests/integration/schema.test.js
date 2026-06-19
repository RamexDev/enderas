/**
 * Schema parity tests — verify Sequelize models align with synced tables.
 */

import { describe, it, expect, beforeAll } from 'vitest';
import { readdirSync } from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import { setupTestDb, sequelize } from '../helpers/db.js';
import * as models from '../../src/models/index.js';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const migrationsDir = path.resolve(__dirname, '../../src/migrations');

beforeAll(async () => {
  await setupTestDb();
});

describe('Schema parity', () => {
  it('has at least 21 migration files', () => {
    const migrations = readdirSync(migrationsDir).filter((file) => file.endsWith('.cjs'));
    expect(migrations.length).toBeGreaterThanOrEqual(21);
  });

  it('all exported models have a tableName', () => {
    for (const Model of Object.values(models)) {
      expect(Model.tableName, `${Model.name} missing tableName`).toBeTruthy();
    }
  });

  it('synced tables contain all model attribute columns', async () => {
    const queryInterface = sequelize.getQueryInterface();

    for (const Model of Object.values(models)) {
      if (!Model.tableName || !Model.rawAttributes) continue;

      const tableDescription = await queryInterface.describeTable(Model.tableName);

      for (const [attrName, definition] of Object.entries(Model.rawAttributes)) {
        if (definition.type?.key === 'VIRTUAL') continue;

        const columnName = definition.field || attrName;
        expect(
          tableDescription[columnName],
          `${Model.tableName}.${columnName} missing after sync`,
        ).toBeDefined();
      }
    }
  });
});
