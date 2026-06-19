/**
 * Unit tests for upload path resolution and entity_type whitelist.
 */

import { describe, it, expect } from 'vitest';
import path from 'path';
import { resolveUploadDir, ALLOWED_ENTITY_TYPES } from '../../src/middleware/upload.js';
import env from '../../src/config/env.js';

describe('resolveUploadDir', () => {
  it('creates and returns a path for allowed entity types', () => {
    const dir = resolveUploadDir('services');
    expect(dir).toBe(path.resolve(env.upload.resolvedPath, 'services'));
  });

  it('defaults to general when entity type is omitted', () => {
    const dir = resolveUploadDir();
    expect(dir).toBe(path.resolve(env.upload.resolvedPath, 'general'));
  });

  it('rejects unknown entity types', () => {
    expect(() => resolveUploadDir('../../etc')).toThrow(/Invalid entity_type/);
    expect(() => resolveUploadDir('..')).toThrow(/Invalid entity_type/);
  });

  it('whitelist contains expected CMS entity types', () => {
    expect(ALLOWED_ENTITY_TYPES.has('general')).toBe(true);
    expect(ALLOWED_ENTITY_TYPES.has('services')).toBe(true);
    expect(ALLOWED_ENTITY_TYPES.has('gallery')).toBe(true);
    expect(ALLOWED_ENTITY_TYPES.has('blog')).toBe(true);
  });
});
