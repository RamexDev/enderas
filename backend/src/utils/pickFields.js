/**
 * Whitelist helper — returns only allowed keys from a request body.
 * Prevents mass-assignment and prototype pollution attacks.
 */

const DANGEROUS_KEYS = new Set(['__proto__', 'constructor', 'prototype']);

/**
 * @param {unknown} data - Source object (typically req.body)
 * @param {string[]} allowed - Field names permitted for create/update
 * @returns {Record<string, unknown>} Filtered object containing only safe, allowed keys
 */
export function pickFields(data, allowed) {
  if (data == null || typeof data !== 'object' || Array.isArray(data)) {
    return {};
  }

  if (!Array.isArray(allowed)) {
    return {};
  }

  const result = Object.create(null);

  for (const key of allowed) {
    if (typeof key !== 'string' || DANGEROUS_KEYS.has(key)) {
      continue;
    }

    if (Object.prototype.hasOwnProperty.call(data, key) && data[key] !== undefined) {
      result[key] = data[key];
    }
  }

  return result;
}
