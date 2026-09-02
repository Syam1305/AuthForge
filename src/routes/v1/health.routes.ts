import { Router } from 'express';
import { HealthController } from '../../controllers/health.controller.js';

const router = Router();

router.get('/', HealthController.getHealth);
router.get('/ready', HealthController.getReadiness);
router.get('/db', HealthController.getDbHealth);

export const healthRoutes = router;
