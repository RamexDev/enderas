import { body } from 'express-validator';

export const loginValidation = [
  body('email')
    .isEmail()
    .withMessage('Valid email is required')
    .normalizeEmail(),
  body('password')
    .notEmpty()
    .withMessage('Password is required'),
];

export const changePasswordValidation = [
  body('old_password')
    .notEmpty()
    .withMessage('Current password is required'),
  body('new_password')
    .isLength({ min: 12 })
    .withMessage('Password must be at least 12 characters')
    .matches(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*()_\-+={}\[\]|:;"'<>,.?/~`])/)
    .withMessage('Password must contain uppercase, lowercase, number, and special character'),
];

export const refreshTokenValidation = [
  body('refresh_token')
    .notEmpty()
    .withMessage('Refresh token is required'),
];
