import { Router } from 'express';
import { HealthController } from '../../controllers/health.controller.js';
import { healthRoutes } from './health.routes.js';
import { authRoutes } from './auth.routes.js';

const router = Router();

// Versioned health & readiness endpoints
router.get('/health', HealthController.getHealth);
router.get('/ready', HealthController.getReadiness);
router.use('/health', healthRoutes);

// Mount v1 authentication endpoints at /api/v1/auth
router.use('/auth', authRoutes);

export const v1Router = router;
