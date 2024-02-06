import { Router } from 'express';
import {
  createPostController,
  getPostController,
  getSinglePostController,
  generatePresignedUrlController,
} from '../controllers/posts/post';

import {
  validateCreatePost,
  validateGetPost,
  validateGetPostDetails,
} from '../validators/post';
import { validateRequest } from '../middleware/validateRequest';

const router = Router();
router.post('/', validateRequest(validateCreatePost), createPostController);
router.get('/', validateRequest(validateGetPost), getPostController);
router.get('/presignedurl', generatePresignedUrlController);

router.get(
  '/:postId',
  validateRequest(validateGetPostDetails),
  getSinglePostController,
);

export default router;
