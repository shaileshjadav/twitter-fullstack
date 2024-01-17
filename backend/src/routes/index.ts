import { Router } from 'express';
import authRoutes from './auth';
import postRoutes from './post';
import postComment from './postComment';
import postLike from './postLike';
import authMiddleware from '../middleware/authMiddleware';

const router = Router();
router.use('/auth', authRoutes);

router.use(authMiddleware);
router.use('/posts', postRoutes);
router.use('/comments', postComment);
router.use('/likes', postLike);

export default router;
