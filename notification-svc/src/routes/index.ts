import { Router } from 'express';
import authMiddleware from '../middleware/authMiddleware';
import notificationRoutes from './notifications';

const router = Router();
router.use(authMiddleware);

router.use('/notifications', notificationRoutes);

export default router;
