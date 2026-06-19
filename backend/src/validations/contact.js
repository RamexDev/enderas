import { body } from 'express-validator';

export const contactFormValidation = [
  body('name')
    .trim()
    .notEmpty()
    .withMessage('Name is required'),
  body('email')
    .isEmail()
    .withMessage('Valid email is required')
    .normalizeEmail(),
  body('phone')
    .optional({ values: 'falsy' })
    .trim()
    .matches(/^[+\d\s\-().]{7,20}$/)
    .withMessage('Valid phone number is required'),
  body('subject')
    .trim()
    .notEmpty()
    .withMessage('Subject is required'),
  body('message')
    .trim()
    .notEmpty()
    .withMessage('Message is required'),
];
