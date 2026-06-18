/**
 * Password validation — edge cases, failure modes, and deterministic generation.
 */

import { describe, it, expect, vi, afterEach } from 'vitest';
import crypto from 'crypto';
import { validatePasswordStrength, generateStrongPassword } from '../../src/utils/password.js';

describe('validatePasswordStrength — valid inputs', () => {
  it('accepts strong passwords', () => {
    expect(validatePasswordStrength('StrongPass123!@#')).toEqual({
      valid: true,
      message: 'Password is strong',
    });
  });

  it('accepts 32+ character passwords', () => {
    const long = `Aa1!${'x'.repeat(40)}`;
    expect(validatePasswordStrength(long).valid).toBe(true);
  });

  it('accepts all-symbol special character passwords with required classes', () => {
    expect(validatePasswordStrength('!@#$%^&*()A1a').valid).toBe(true);
  });
});

describe('validatePasswordStrength — rejection cases', () => {
  it('rejects short passwords', () => {
    const result = validatePasswordStrength('Short1!');
    expect(result.valid).toBe(false);
    expect(result.message).toContain('12');
  });

  it('rejects passwords missing character classes', () => {
    expect(validatePasswordStrength('alllowercaseonly').valid).toBe(false);
  });

  it('rejects unicode-only passwords without required classes', () => {
    expect(validatePasswordStrength('парольбезклассов').valid).toBe(false);
  });

  it('rejects passwords with unicode but missing a class', () => {
    expect(validatePasswordStrength('ÜnicodeOnly!!!!').valid).toBe(false);
  });
});

describe('validatePasswordStrength — failure modes', () => {
  it('rejects null', () => {
    expect(validatePasswordStrength(null).valid).toBe(false);
  });

  it('rejects undefined', () => {
    expect(validatePasswordStrength(undefined).valid).toBe(false);
  });

  it('rejects empty string', () => {
    expect(validatePasswordStrength('').valid).toBe(false);
  });

  it('rejects non-string types without throwing', () => {
    expect(() => validatePasswordStrength(123456789012)).not.toThrow();
    expect(validatePasswordStrength(123456789012).valid).toBe(false);
  });

  it('rejects extremely long passwords missing a class', () => {
    const extreme = 'a'.repeat(10_000);
    expect(validatePasswordStrength(extreme).valid).toBe(false);
  });
});

describe('generateStrongPassword', () => {
  afterEach(() => {
    vi.restoreAllMocks();
  });

  it('generates password of requested length', () => {
    expect(generateStrongPassword(24)).toHaveLength(24);
  });

  it('generates unique values across calls (non-deterministic by default)', () => {
    const a = generateStrongPassword(32);
    const b = generateStrongPassword(32);
    expect(a).not.toBe(b);
  });

  it('uses base64 charset from random bytes', () => {
    const fixedBytes = Buffer.alloc(32, 0x41);
    vi.spyOn(crypto, 'randomBytes').mockReturnValue(fixedBytes);

    const password = generateStrongPassword(16);
    expect(password).toBe(fixedBytes.toString('base64').slice(0, 16));
    expect(password).toHaveLength(16);
  });

  it('supports reproducible output when randomBytes is mocked', () => {
    vi.spyOn(crypto, 'randomBytes').mockReturnValue(Buffer.from('deterministic-seed-value'));

    const first = generateStrongPassword(20);
    const second = generateStrongPassword(20);
    expect(first).toBe(second);
  });
});
