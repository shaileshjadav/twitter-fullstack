import { Router } from 'express';
import authRoutes from './auth';
import postRoutes from './post';
import authMiddleware from '../middleware/authMiddleware';

const router = Router();
router.use('/auth', authRoutes);

router.use(authMiddleware);
router.use('/posts', postRoutes);

export default router;
