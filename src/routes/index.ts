import { Router } from 'express';
import { HealthController } from '../controllers/health.controller.js';
import { v1Router } from './v1/index.js';

const router = Router();

// Infrastructure-level health and readiness endpoints
router.get('/health', HealthController.getHealth);
router.get('/ready', HealthController.getReadiness);
router.get('/health/db', HealthController.getDbHealth);

// Versioned API endpoints (/api/v1/*)
router.use('/api/v1', v1Router);

export const appRouter = router;
