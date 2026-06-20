/**
 * Express-validator result checker.
 * Attach after validation rule arrays on routes to return 400 on invalid input.
 */

import { validationResult } from 'express-validator';
import { errorResponse } from '../utils/response.js';

export function validate(req, res, next) {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    const firstMsg = errors.array()[0]?.msg || 'Validation failed';
    return errorResponse(res, firstMsg, 400, errors.array());
  }
  next();
}
