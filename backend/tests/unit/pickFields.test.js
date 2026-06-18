/**
 * Unit tests for mass-assignment protection helper.
 */

import { describe, it, expect } from 'vitest';
import { pickFields } from '../../src/utils/pickFields.js';

describe('pickFields', () => {
  it('returns only allowed keys', () => {
    const data = { title: 'Test', slug: 'test', role: 'super_admin' };
    const result = pickFields(data, ['title', 'slug']);
    expect(result).toEqual({ title: 'Test', slug: 'test' });
    expect(result.role).toBeUndefined();
  });

  it('skips undefined keys', () => {
    const result = pickFields({ title: 'Test' }, ['title', 'slug']);
    expect(result).toEqual({ title: 'Test' });
    expect('slug' in result).toBe(false);
  });
});
