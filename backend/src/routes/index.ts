import { Router } from 'express';
import authRoutes from './auth';
import postRoutes from './post';
import postComment from './postComment';
import authMiddleware from '../middleware/authMiddleware';

const router = Router();
router.use('/auth', authRoutes);

router.use(authMiddleware);
router.use('/posts', postRoutes);
router.use('/comments', postComment);

export default router;
