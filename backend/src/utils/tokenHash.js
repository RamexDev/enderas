/**
 * SHA-256 hashing for refresh tokens before database storage.
 * Raw tokens are never persisted — only their hashes.
 */

import crypto from 'crypto';

/**
 * @param {string} token - Raw refresh token string
 * @returns {string} Hex-encoded SHA-256 hash
 */
export function hashRefreshToken(token) {
  return crypto.createHash('sha256').update(token).digest('hex');
}
