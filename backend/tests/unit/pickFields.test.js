/**
 * pickFields — edge cases, failure modes, and prototype pollution resistance.
 */

import { describe, it, expect } from 'vitest';
import { pickFields } from '../../src/utils/pickFields.js';

describe('pickFields — happy path', () => {
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

  it('preserves nested objects without flattening', () => {
    const nested = { meta: { title: 'SEO' } };
    const result = pickFields({ title: 'A', meta: nested.meta }, ['title', 'meta']);
    expect(result.meta).toEqual({ title: 'SEO' });
  });

  it('preserves arrays', () => {
    const tags = ['a', 'b'];
    const result = pickFields({ title: 'Post', tags }, ['title', 'tags']);
    expect(result.tags).toEqual(['a', 'b']);
  });
});

describe('pickFields — failure modes', () => {
  it('returns empty object for null data', () => {
    expect(pickFields(null, ['title'])).toEqual({});
  });

  it('returns empty object for undefined data', () => {
    expect(pickFields(undefined, ['title'])).toEqual({});
  });

  it('returns empty object when data is an array', () => {
    expect(pickFields(['title'], ['title'])).toEqual({});
  });

  it('returns empty object when data is a primitive', () => {
    expect(pickFields('title', ['title'])).toEqual({});
    expect(pickFields(42, ['title'])).toEqual({});
  });

  it('returns empty object when allowed is not an array', () => {
    expect(pickFields({ title: 'x' }, null)).toEqual({});
    expect(pickFields({ title: 'x' }, undefined)).toEqual({});
  });

  it('returns empty object for empty allowed list', () => {
    expect(pickFields({ title: 'x' }, [])).toEqual({});
  });
});

describe('pickFields — security', () => {
  it('blocks __proto__ assignment even if listed in allowed', () => {
    const malicious = JSON.parse('{"title":"ok","__proto__":{"isAdmin":true}}');
    const result = pickFields(malicious, ['title', '__proto__']);
    expect(result).toEqual({ title: 'ok' });
    expect(result.__proto__).toBeUndefined();
    expect({}.isAdmin).toBeUndefined();
  });

  it('blocks constructor key', () => {
    const payload = { title: 'x', constructor: { name: 'evil' } };
    const result = pickFields(payload, ['title', 'constructor']);
    expect(result).toEqual({ title: 'x' });
  });

  it('result object has null prototype (no inherited pollution)', () => {
    const result = pickFields({ title: 'safe' }, ['title']);
    expect(Object.getPrototypeOf(result)).toBeNull();
  });

  it('does not pick inherited properties from Object.prototype', () => {
    const data = Object.create({ inherited: 'bad' });
    data.title = 'good';
    const result = pickFields(data, ['title', 'inherited']);
    expect(result).toEqual({ title: 'good' });
  });
});
