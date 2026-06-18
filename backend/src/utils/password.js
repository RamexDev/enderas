/**
 * Password strength validation and secure random password generation.
 * Used by auth service and super-admin seeder.
 */

import crypto from 'crypto';

const MIN_LENGTH = 12;
const PASSWORD_REGEX = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*()_\-+={}\[\]|:;"'<>,.?/~`]).{12,}$/;

/** Generate a cryptographically random password string */
export function generateStrongPassword(length = 32) {
  return crypto.randomBytes(length).toString('base64').slice(0, length);
}

/**
 * Validate password meets minimum security requirements.
 * @returns {{ valid: boolean, message: string }}
 */
export function validatePasswordStrength(password) {
  if (!password || password.length < MIN_LENGTH) {
    return {
      valid: false,
      message: `Password must be at least ${MIN_LENGTH} characters long`,
    };
  }

  if (!PASSWORD_REGEX.test(password)) {
    return {
      valid: false,
      message:
        'Password must contain at least one uppercase letter, one lowercase letter, one number, and one special character',
    };
  }

  return { valid: true, message: 'Password is strong' };
}
