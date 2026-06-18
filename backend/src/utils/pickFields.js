/**
 * Whitelist helper — returns only allowed keys from a request body.
 * Prevents mass-assignment of unexpected Sequelize model fields.
 */

/**
 * @param {object} data - Source object (typically req.body)
 * @param {string[]} allowed - Field names permitted for create/update
 * @returns {object} Filtered object containing only allowed keys
 */
export function pickFields(data, allowed) {
  const result = {};
  for (const key of allowed) {
    if (data[key] !== undefined) {
      result[key] = data[key];
    }
  }
  return result;
}
