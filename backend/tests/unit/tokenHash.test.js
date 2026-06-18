/**
 * Refresh token hashing integrity tests.
 */

import { describe, it, expect } from 'vitest';
import crypto from 'crypto';
import { hashRefreshToken } from '../../src/utils/tokenHash.js';

describe('hashRefreshToken', () => {
  it('returns deterministic SHA-256 hex for the same input', () => {
    const token = 'eyJhbGciOiJIUzI1NiJ9.test.signature';
    const hash1 = hashRefreshToken(token);
    const hash2 = hashRefreshToken(token);
    expect(hash1).toBe(hash2);
  });

  it('matches Node crypto SHA-256 reference implementation', () => {
    const token = 'sample-refresh-token-value';
    const expected = crypto.createHash('sha256').update(token).digest('hex');
    expect(hashRefreshToken(token)).toBe(expected);
  });

  it('produces different hashes for different tokens', () => {
    const a = hashRefreshToken('token-a');
    const b = hashRefreshToken('token-b');
    expect(a).not.toBe(b);
  });

  it('never returns the raw token', () => {
    const token = 'super-secret-refresh-token';
    const hash = hashRefreshToken(token);
    expect(hash).not.toBe(token);
    expect(hash).toHaveLength(64);
  });

  it('handles empty string without throwing', () => {
    expect(() => hashRefreshToken('')).not.toThrow();
    expect(hashRefreshToken('')).toHaveLength(64);
  });
});
