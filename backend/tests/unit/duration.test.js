/**
 * Duration parsing — edge cases and failure modes.
 */

import { describe, it, expect } from 'vitest';
import { parseDurationToMs, expiresAtFromDuration } from '../../src/utils/duration.js';

describe('parseDurationToMs — valid inputs', () => {
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

  it('parses large day values', () => {
    expect(parseDurationToMs('365d')).toBe(365 * 24 * 60 * 60 * 1000);
  });
});

describe('parseDurationToMs — failure modes', () => {
  it('defaults to 7 days for invalid format', () => {
    expect(parseDurationToMs('invalid')).toBe(7 * 24 * 60 * 60 * 1000);
  });

  it('defaults for null', () => {
    expect(parseDurationToMs(null)).toBe(7 * 24 * 60 * 60 * 1000);
  });

  it('defaults for undefined', () => {
    expect(parseDurationToMs(undefined)).toBe(7 * 24 * 60 * 60 * 1000);
  });

  it('defaults for empty string', () => {
    expect(parseDurationToMs('')).toBe(7 * 24 * 60 * 60 * 1000);
  });

  it('defaults for numeric input (no unit)', () => {
    expect(parseDurationToMs('3600')).toBe(7 * 24 * 60 * 60 * 1000);
  });

  it('defaults for zero without unit', () => {
    expect(parseDurationToMs('0')).toBe(7 * 24 * 60 * 60 * 1000);
  });
});

describe('expiresAtFromDuration', () => {
  it('returns a future date', () => {
    const before = Date.now();
    const expires = expiresAtFromDuration('1h');
    expect(expires.getTime()).toBeGreaterThan(before);
  });

  it('offset matches parsed duration within tolerance', () => {
    const before = Date.now();
    const expires = expiresAtFromDuration('2h');
    const delta = expires.getTime() - before;
    expect(delta).toBeGreaterThanOrEqual(2 * 60 * 60 * 1000 - 50);
    expect(delta).toBeLessThanOrEqual(2 * 60 * 60 * 1000 + 50);
  });
});
