/**
 * Unit tests for password strength validation.
 */

import { describe, it, expect } from 'vitest';
import { validatePasswordStrength, generateStrongPassword } from '../../src/utils/password.js';

describe('validatePasswordStrength', () => {
  it('rejects short passwords', () => {
    const result = validatePasswordStrength('Short1!');
    expect(result.valid).toBe(false);
  });

  it('rejects passwords missing character classes', () => {
    const result = validatePasswordStrength('alllowercaseonly');
    expect(result.valid).toBe(false);
  });

  it('accepts strong passwords', () => {
    const result = validatePasswordStrength('StrongPass123!@#');
    expect(result.valid).toBe(true);
  });
});

describe('generateStrongPassword', () => {
  it('generates password of requested length', () => {
    const password = generateStrongPassword(24);
    expect(password).toHaveLength(24);
  });
});
