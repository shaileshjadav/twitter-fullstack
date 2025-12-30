import { Router } from 'express';

import { validateRequest } from '../middleware/validateRequest';

import { validateCreatePostLike } from '../validators/postCommentAndLike';
import {
  savePostLikeController,
  deletePostLikeController,
} from '../controllers/posts/postCommentsAndLikes';

const router = Router();
router.put(
  '/:postId',
  validateRequest(validateCreatePostLike),
  savePostLikeController,
);

router.delete(
  '/:postId',
  validateRequest(validateCreatePostLike),
  deletePostLikeController,
);

export default router;
