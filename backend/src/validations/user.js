import { body } from 'express-validator';
import { ROLES } from '../constants/roles.js';

export const createUserValidation = [
  body('name')
    .trim()
    .notEmpty()
    .withMessage('Name is required'),
  body('email')
    .isEmail()
    .withMessage('Valid email is required')
    .normalizeEmail(),
  body('password')
    .isLength({ min: 12 })
    .withMessage('Password must be at least 12 characters')
    .matches(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*()_\-+={}\[\]|:;"'<>,.?/~`])/)
    .withMessage('Password must contain uppercase, lowercase, number, and special character'),
  body('role')
    .isIn([ROLES.SUPER_ADMIN, ROLES.EDITOR])
    .withMessage(`Role must be ${ROLES.SUPER_ADMIN} or ${ROLES.EDITOR}`),
];

export const updateUserValidation = [
  body('name')
    .trim()
    .notEmpty()
    .withMessage('Name is required'),
  body('email')
    .isEmail()
    .withMessage('Valid email is required')
    .normalizeEmail(),
  body('role')
    .isIn([ROLES.SUPER_ADMIN, ROLES.EDITOR])
    .withMessage(`Role must be ${ROLES.SUPER_ADMIN} or ${ROLES.EDITOR}`),
];
