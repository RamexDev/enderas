/**
 * Centralized Express error handler.
 * Maps Sequelize, Multer, and application errors to consistent JSON responses.
 */

import env from '../config/env.js';

export function errorHandler(err, req, res, _next) {
  if (env.isDev) {
    console.error('Error:', err);
  }

  // express-validator errors passed via next(err) with statusCode 400
  if (err.statusCode === 400 && err.errors) {
    return res.status(400).json({
      success: false,
      message: err.message || 'Validation error',
      errors: err.errors,
    });
  }

  // Multer file upload errors (size limit, unexpected field, etc.)
  if (err.name === 'MulterError') {
    const message = err.code === 'LIMIT_FILE_SIZE'
      ? 'File too large'
      : `Upload error: ${err.message}`;
    return res.status(400).json({ success: false, message });
  }

  // Custom file type rejection from upload middleware fileFilter
  if (err.message?.includes('Unsupported file type')) {
    return res.status(400).json({ success: false, message: err.message });
  }

  if (err.name === 'SequelizeValidationError') {
    const errors = err.errors.map((e) => ({
      field: e.path,
      message: e.message,
    }));
    return res.status(400).json({ success: false, message: 'Validation error', errors });
  }

  if (err.name === 'SequelizeUniqueConstraintError') {
    const errors = err.errors.map((e) => ({
      field: e.path,
      message: `${e.path} already exists`,
    }));
    return res.status(409).json({ success: false, message: 'Resource already exists', errors });
  }

  if (err.name === 'SequelizeForeignKeyConstraintError') {
    return res.status(400).json({ success: false, message: 'Referenced resource not found' });
  }

  const statusCode = err.statusCode || 500;
  const message = err.statusCode ? err.message : 'Internal Server Error';

  return res.status(statusCode).json({ success: false, message });
}
