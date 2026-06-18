import { Router } from 'express';
import { loginValidation, refreshTokenValidation, changePasswordValidation } from '../validations/auth.js';
import * as authController from '../controllers/auth/authController.js';
import { authenticate } from '../middleware/authenticate.js';
import { auditMiddleware } from '../middleware/audit.js';

const router = Router();

router.post('/login', loginValidation, authController.login);
router.post('/refresh', refreshTokenValidation, authController.refresh);
router.post('/logout', authController.logout);
router.get('/me', authenticate, authController.me);
router.post('/change-password', authenticate, changePasswordValidation, authController.changePassword);

export default router;
