import { Router } from 'express';

import { validateRequest } from '../middleware/validateRequest';

import { validateCreatePostComment } from '../validators/postCommentAndLike';
import { savePostCommentController } from '../controllers/posts/postCommentsAndLikes';

const router = Router();
router.post(
  '/',
  validateRequest(validateCreatePostComment),
  savePostCommentController,
);

export default router;
