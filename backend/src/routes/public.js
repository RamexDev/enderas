/**
 * Public API routes — no authentication required.
 * Consumed by the public-facing website frontend.
 */

import { Router } from 'express';
import * as homeController from '../controllers/public/homeController.js';
import * as aboutController from '../controllers/public/aboutController.js';
import * as serviceController from '../controllers/public/serviceController.js';
import * as galleryController from '../controllers/public/galleryController.js';
import * as blogController from '../controllers/public/blogController.js';
import * as contactController from '../controllers/public/contactController.js';
import * as settingController from '../controllers/public/settingController.js';
import * as ctaController from '../controllers/public/ctaController.js';
import { contactFormValidation } from '../validations/contact.js';

const router = Router();

router.get('/cta', ctaController.index);
router.get('/home', homeController.index);
router.get('/about', aboutController.index);
router.get('/services', serviceController.index);
router.get('/services/:slug', serviceController.show);
router.get('/gallery', galleryController.index);
router.get('/posts', blogController.index);
router.get('/posts/:slug', blogController.show);
router.get('/contact', contactController.index);
router.post('/contact', contactFormValidation, contactController.submit);
router.get('/settings', settingController.index);

export default router;
