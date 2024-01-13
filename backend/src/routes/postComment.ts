import { Router } from 'express';

import { validateRequest } from '../middleware/validateRequest';

import { validateCreatePostComment } from '../validators/postComment';
import { savePostCommentController } from '../controllers/posts/postComments';

const router = Router();
router.post(
  '/',
  validateRequest(validateCreatePostComment),
  savePostCommentController,
);

export default router;
