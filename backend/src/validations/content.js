/**
 * Content validation rules for admin CMS endpoints.
 * Applied via validate middleware after rule arrays on routes.
 */

import { body } from 'express-validator';

export const createServiceValidation = [
  body('title').trim().notEmpty().withMessage('Title is required'),
  body('short_description').optional().trim(),
  body('description').optional().trim(),
  body('is_active').optional().isBoolean().withMessage('is_active must be a boolean'),
];

export const updateServiceValidation = [
  body('title').optional().trim().notEmpty().withMessage('Title cannot be empty'),
  body('is_active').optional().isBoolean().withMessage('is_active must be a boolean'),
];

export const createPostValidation = [
  body('title').trim().notEmpty().withMessage('Title is required'),
  body('content').optional().trim(),
  body('status').optional().isIn(['draft', 'published']).withMessage('Status must be draft or published'),
];

export const updatePostValidation = [
  body('title').optional().trim().notEmpty().withMessage('Title cannot be empty'),
  body('status').optional().isIn(['draft', 'published']).withMessage('Status must be draft or published'),
];

export const createFaqValidation = [
  body('question').trim().notEmpty().withMessage('Question is required'),
  body('answer').trim().notEmpty().withMessage('Answer is required'),
];

export const createTestimonialValidation = [
  body('client_name').trim().notEmpty().withMessage('Client name is required'),
  body('content').trim().notEmpty().withMessage('Content is required'),
];

export const createTeamMemberValidation = [
  body('full_name').trim().notEmpty().withMessage('Full name is required'),
  body('position').optional().trim(),
];

export const createStatisticValidation = [
  body('label').trim().notEmpty().withMessage('Label is required'),
  body('value').trim().notEmpty().withMessage('Value is required'),
];

export const createHeroSlideValidation = [
  body('image').trim().notEmpty().withMessage('Image is required'),
];

export const createCategoryValidation = [
  body('name').trim().notEmpty().withMessage('Name is required'),
];
