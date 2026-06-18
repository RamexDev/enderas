/**
 * Run express-validator rule chains against a synthetic request body.
 */

import { validationResult } from 'express-validator';

/**
 * @param {import('express-validator').ValidationChain[]} rules
 * @param {object} body
 * @returns {Promise<import('express-validator').Result>}
 */
export async function runValidationRules(rules, body) {
  const req = { body: { ...body } };

  await Promise.all(rules.map((rule) => rule.run(req)));

  return validationResult(req);
}

/**
 * @param {import('express-validator').ValidationChain[]} rules
 * @param {object} body
 * @returns {Promise<{ valid: boolean, errors: import('express-validator').ValidationError[] }>}
 */
export async function validateBody(rules, body) {
  const result = await runValidationRules(rules, body);
  return {
    valid: result.isEmpty(),
    errors: result.array(),
  };
}
