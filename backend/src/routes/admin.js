import { Router } from 'express';
import authRoutes from './auth.js';
import { authenticate } from '../middleware/authenticate.js';
import { authorize } from '../middleware/authorize.js';
import { auditMiddleware } from '../middleware/audit.js';
import { upload } from '../middleware/upload.js';
import { validate } from '../middleware/validate.js';
import { ROLES } from '../constants/roles.js';
import { createUserValidation, updateUserValidation } from '../validations/user.js';
import {
  createServiceValidation,
  updateServiceValidation,
  createPostValidation,
  updatePostValidation,
  createFaqValidation,
  createTestimonialValidation,
  createTeamMemberValidation,
  createStatisticValidation,
  createHeroSlideValidation,
  createCategoryValidation,
} from '../validations/content.js';

import * as userController from '../controllers/admin/userController.js';
import * as homepageController from '../controllers/admin/homepageController.js';
import * as serviceController from '../controllers/admin/serviceController.js';
import * as galleryController from '../controllers/admin/galleryController.js';
import * as blogController from '../controllers/admin/blogController.js';
import * as teamController from '../controllers/admin/teamController.js';
import * as testimonialController from '../controllers/admin/testimonialController.js';
import * as faqController from '../controllers/admin/faqController.js';
import * as aboutController from '../controllers/admin/aboutController.js';
import * as contactController from '../controllers/admin/contactController.js';
import * as mediaController from '../controllers/admin/mediaController.js';
import * as settingController from '../controllers/admin/settingController.js';
import * as dashboardController from '../controllers/admin/dashboardController.js';

const router = Router();

router.use('/auth', authRoutes);

router.use(authenticate);
router.use(auditMiddleware);

router.get('/dashboard', dashboardController.index);

router.get('/users', authorize(ROLES.SUPER_ADMIN), userController.index);
router.get('/users/:id', authorize(ROLES.SUPER_ADMIN), userController.show);
router.post('/users', authorize(ROLES.SUPER_ADMIN), createUserValidation, userController.create);
router.put('/users/:id', authorize(ROLES.SUPER_ADMIN), updateUserValidation, userController.update);
router.patch('/users/:id/status', authorize(ROLES.SUPER_ADMIN), userController.toggleStatus);
router.delete('/users/:id', authorize(ROLES.SUPER_ADMIN), userController.destroy);

router.get('/home-page', homepageController.getHomePage);
router.put('/home-page', homepageController.updateHomePage);

router.get('/statistics', homepageController.listStatistics);
router.post('/statistics', createStatisticValidation, validate, homepageController.createStatistic);
router.put('/statistics/:id', homepageController.updateStatistic);
router.delete('/statistics/:id', homepageController.deleteStatistic);

router.get('/hero-slides', homepageController.listHeroSlides);
router.post('/hero-slides', createHeroSlideValidation, validate, homepageController.createHeroSlide);
router.put('/hero-slides/:id', homepageController.updateHeroSlide);
router.delete('/hero-slides/:id', homepageController.deleteHeroSlide);
router.patch('/hero-slides/:id/status', homepageController.toggleHeroSlideStatus);

router.get('/services', serviceController.index);
router.get('/services/:id', serviceController.show);
router.post('/services', createServiceValidation, validate, serviceController.create);
router.put('/services/:id', updateServiceValidation, validate, serviceController.update);
router.delete('/services/:id', serviceController.destroy);
router.patch('/services/:id/status', serviceController.toggleStatus);

router.get('/gallery-categories', galleryController.listCategories);
router.post('/gallery-categories', galleryController.createCategory);
router.put('/gallery-categories/:id', galleryController.updateCategory);
router.delete('/gallery-categories/:id', galleryController.deleteCategory);

router.get('/gallery', galleryController.index);
router.post('/gallery', galleryController.create);
router.put('/gallery/:id', galleryController.update);
router.delete('/gallery/:id', galleryController.destroy);

router.get('/team-members', teamController.index);
router.post('/team-members', createTeamMemberValidation, validate, teamController.create);
router.put('/team-members/:id', teamController.update);
router.delete('/team-members/:id', teamController.destroy);
router.patch('/team-members/:id/status', teamController.toggleStatus);

router.get('/testimonials', testimonialController.index);
router.post('/testimonials', createTestimonialValidation, validate, testimonialController.create);
router.put('/testimonials/:id', testimonialController.update);
router.delete('/testimonials/:id', testimonialController.destroy);
router.patch('/testimonials/:id/status', testimonialController.toggleStatus);

router.get('/faqs', faqController.index);
router.post('/faqs', createFaqValidation, validate, faqController.create);
router.put('/faqs/:id', faqController.update);
router.delete('/faqs/:id', faqController.destroy);
router.patch('/faqs/:id/status', faqController.toggleStatus);

router.get('/about-page', aboutController.getAboutPage);
router.put('/about-page', aboutController.updateAboutPage);

router.get('/core-values', aboutController.listCoreValues);
router.post('/core-values', aboutController.createCoreValue);
router.put('/core-values/:id', aboutController.updateCoreValue);
router.delete('/core-values/:id', aboutController.deleteCoreValue);

router.get('/partners', aboutController.listPartners);
router.post('/partners', aboutController.createPartner);
router.put('/partners/:id', aboutController.updatePartner);
router.delete('/partners/:id', aboutController.deletePartner);
router.patch('/partners/:id/status', aboutController.togglePartnerStatus);

router.get('/contact-page', contactController.getContactPage);
router.put('/contact-page', contactController.updateContactPage);

router.get('/categories', authorize(ROLES.SUPER_ADMIN, ROLES.EDITOR), blogController.listCategories);
router.post('/categories', authorize(ROLES.SUPER_ADMIN, ROLES.EDITOR), createCategoryValidation, validate, blogController.createCategory);
router.put('/categories/:id', authorize(ROLES.SUPER_ADMIN, ROLES.EDITOR), blogController.updateCategory);
router.delete('/categories/:id', authorize(ROLES.SUPER_ADMIN, ROLES.EDITOR), blogController.deleteCategory);

router.get('/posts', authorize(ROLES.SUPER_ADMIN, ROLES.EDITOR), blogController.index);
router.get('/posts/:id', authorize(ROLES.SUPER_ADMIN, ROLES.EDITOR), blogController.show);
router.post('/posts', authorize(ROLES.SUPER_ADMIN, ROLES.EDITOR), createPostValidation, validate, blogController.create);
router.put('/posts/:id', authorize(ROLES.SUPER_ADMIN, ROLES.EDITOR), updatePostValidation, validate, blogController.update);
router.delete('/posts/:id', authorize(ROLES.SUPER_ADMIN, ROLES.EDITOR), blogController.destroy);
router.patch('/posts/:id/publish', authorize(ROLES.SUPER_ADMIN, ROLES.EDITOR), blogController.publish);
router.patch('/posts/:id/unpublish', authorize(ROLES.SUPER_ADMIN, ROLES.EDITOR), blogController.unpublish);

router.get('/contact-messages', contactController.listMessages);
router.get('/contact-messages/:id', contactController.showMessage);
router.patch('/contact-messages/:id/read', contactController.markRead);
router.patch('/contact-messages/:id/archive', contactController.archive);

router.get('/media', mediaController.index);
router.post('/media/upload', upload.single('file'), mediaController.upload);
router.delete('/media/:id', mediaController.destroy);

router.get('/settings', settingController.index);
router.put('/settings', settingController.update);

export default router;
