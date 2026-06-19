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

export const updateFaqValidation = [
  body('question').optional().trim().notEmpty().withMessage('Question cannot be empty'),
  body('answer').optional().trim().notEmpty().withMessage('Answer cannot be empty'),
  body('is_active').optional().isBoolean().withMessage('is_active must be a boolean'),
];

export const createTestimonialValidation = [
  body('client_name').trim().notEmpty().withMessage('Client name is required'),
  body('content').trim().notEmpty().withMessage('Content is required'),
];

export const updateTestimonialValidation = [
  body('client_name').optional().trim().notEmpty().withMessage('Client name cannot be empty'),
  body('content').optional().trim().notEmpty().withMessage('Content cannot be empty'),
  body('is_active').optional().isBoolean().withMessage('is_active must be a boolean'),
];

export const createTeamMemberValidation = [
  body('full_name').trim().notEmpty().withMessage('Full name is required'),
  body('position').optional().trim(),
];

export const updateTeamMemberValidation = [
  body('full_name').optional().trim().notEmpty().withMessage('Full name cannot be empty'),
  body('position').optional().trim(),
  body('is_active').optional().isBoolean().withMessage('is_active must be a boolean'),
];

export const createStatisticValidation = [
  body('label').trim().notEmpty().withMessage('Label is required'),
  body('value').trim().notEmpty().withMessage('Value is required'),
];

export const updateStatisticValidation = [
  body('label').optional().trim().notEmpty().withMessage('Label cannot be empty'),
  body('value').optional().trim().notEmpty().withMessage('Value cannot be empty'),
];

export const createHeroSlideValidation = [
  body('image').trim().notEmpty().withMessage('Image is required'),
];

export const updateHeroSlideValidation = [
  body('image').optional().trim().notEmpty().withMessage('Image cannot be empty'),
  body('is_active').optional().isBoolean().withMessage('is_active must be a boolean'),
];

export const createCategoryValidation = [
  body('name').trim().notEmpty().withMessage('Name is required'),
];

export const updateCategoryValidation = [
  body('name').optional().trim().notEmpty().withMessage('Name cannot be empty'),
];

export const createGalleryCategoryValidation = [
  body('name').trim().notEmpty().withMessage('Name is required'),
];

export const updateGalleryCategoryValidation = [
  body('name').optional().trim().notEmpty().withMessage('Name cannot be empty'),
];

export const createGalleryItemValidation = [
  body('image').trim().notEmpty().withMessage('Image is required'),
];

export const updateGalleryItemValidation = [
  body('image').optional().trim().notEmpty().withMessage('Image cannot be empty'),
];

export const updateHomePageValidation = [
  body('show_team').optional().isBoolean().withMessage('show_team must be a boolean'),
  body('show_testimonials').optional().isBoolean().withMessage('show_testimonials must be a boolean'),
  body('show_faq').optional().isBoolean().withMessage('show_faq must be a boolean'),
];

export const updateAboutPageValidation = [
  body('history').optional().trim(),
  body('mission').optional().trim(),
  body('vision').optional().trim(),
];

export const createCoreValueValidation = [
  body('title').trim().notEmpty().withMessage('Title is required'),
];

export const updateCoreValueValidation = [
  body('title').optional().trim().notEmpty().withMessage('Title cannot be empty'),
];

export const createPartnerValidation = [
  body('name').trim().notEmpty().withMessage('Name is required'),
];

export const updatePartnerValidation = [
  body('name').optional().trim().notEmpty().withMessage('Name cannot be empty'),
  body('is_active').optional().isBoolean().withMessage('is_active must be a boolean'),
];

export const updateContactPageValidation = [
  body('email').optional({ values: 'falsy' }).isEmail().withMessage('Valid email is required'),
  body('phone').optional().trim(),
];

export const updateSettingsValidation = [
  body('site_name').optional().trim().notEmpty().withMessage('Site name cannot be empty'),
];
