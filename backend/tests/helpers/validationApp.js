/**
 * Mini Express app for validation middleware contract tests.
 */

import express from 'express';
import { validate } from '../../src/middleware/validate.js';

/**
 * @param {import('express-validator').ValidationChain[]} rules
 * @returns {import('express').Express}
 */
export function createValidationApp(rules) {
  const app = express();
  app.use(express.json());
  app.post('/test', ...rules, validate, (req, res) => {
    res.status(200).json({ success: true, data: req.body });
  });
  return app;
}
