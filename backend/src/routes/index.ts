import { Router } from 'express';
import authRoutes from './auth';
import postRoutes from './post';
import postComment from './postComment';
import postLike from './postLike';
import authMiddleware from '../middleware/authMiddleware';
import user from './user';
import internalRoutes from './internal';

const router = Router();
router.use('/auth', authRoutes);

router.use(authMiddleware);

router.use('/internal', internalRoutes);
router.use('/posts', postRoutes);
router.use('/comments', postComment);
router.use('/likes', postLike);
router.use('/users', user);

export default router;
