/**
 * Converts JWT-style duration strings (e.g. "15m", "7d") to milliseconds.
 * Used to keep database refresh-token expiry aligned with JWT configuration.
 */

const UNIT_MS = {
  s: 1000,
  m: 60 * 1000,
  h: 60 * 60 * 1000,
  d: 24 * 60 * 60 * 1000,
};

/**
 * @param {string} duration - Duration string like "7d", "15m", "1h"
 * @returns {number} Duration in milliseconds
 */
export function parseDurationToMs(duration) {
  const match = /^(\d+)([smhd])$/.exec(duration);
  if (!match) {
    return 7 * UNIT_MS.d;
  }
  return parseInt(match[1], 10) * UNIT_MS[match[2]];
}

/**
 * @param {string} duration - Duration string like "7d"
 * @returns {Date} Expiry date from now
 */
export function expiresAtFromDuration(duration) {
  return new Date(Date.now() + parseDurationToMs(duration));
}
