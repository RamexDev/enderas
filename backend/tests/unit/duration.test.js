/**
 * Unit tests for JWT duration parsing utilities.
 */

import { describe, it, expect } from 'vitest';
import { parseDurationToMs, expiresAtFromDuration } from '../../src/utils/duration.js';

describe('parseDurationToMs', () => {
  it('parses seconds', () => {
    expect(parseDurationToMs('30s')).toBe(30_000);
  });

  it('parses minutes', () => {
    expect(parseDurationToMs('15m')).toBe(15 * 60 * 1000);
  });

  it('parses hours', () => {
    expect(parseDurationToMs('2h')).toBe(2 * 60 * 60 * 1000);
  });

  it('parses days', () => {
    expect(parseDurationToMs('7d')).toBe(7 * 24 * 60 * 60 * 1000);
  });

  it('defaults to 7 days for invalid format', () => {
    expect(parseDurationToMs('invalid')).toBe(7 * 24 * 60 * 60 * 1000);
  });
});

describe('expiresAtFromDuration', () => {
  it('returns a future date', () => {
    const before = Date.now();
    const expires = expiresAtFromDuration('1h');
    expect(expires.getTime()).toBeGreaterThan(before);
  });
});
