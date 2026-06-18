/**
 * Slug generation utility tests.
 */

import { describe, it, expect } from 'vitest';
import { generateSlug } from '../../src/utils/slug.js';

describe('generateSlug', () => {
  it('lowercases and hyphenates titles', () => {
    expect(generateSlug('Asset Management')).toBe('asset-management');
  });

  it('strips special characters', () => {
    expect(generateSlug('Property Appraisal & Liquidation!')).toBe('property-appraisal-and-liquidation');
  });

  it('trims whitespace', () => {
    expect(generateSlug('  Business Consultancy  ')).toBe('business-consultancy');
  });

  it('handles unicode by removing or transliterating', () => {
    const slug = generateSlug('Café Services');
    expect(slug).toMatch(/^[a-z0-9-]+$/);
  });

  it('handles empty string', () => {
    expect(generateSlug('')).toBe('');
  });
});
