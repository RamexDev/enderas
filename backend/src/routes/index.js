/**
 * Route mounting — public routes at /public, admin routes at /.
 * All routes are prefixed with /api/v1 in app.js.
 */

import { Router } from 'express';
import publicRoutes from './public.js';
import adminRoutes from './admin.js';

const router = Router();

router.use('/public', publicRoutes);
router.use('/', adminRoutes);

export default router;
