import { Router } from 'express';
import {
  createPostController,
  getPostController,
} from '../controllers/posts/post';

import { validateCreatePost, validateGetPost } from '../validators/post';
import { validateRequest } from '../middleware/validateRequest';

const router = Router();
router.post('/', validateRequest(validateCreatePost), createPostController);
router.get('/', validateRequest(validateGetPost), getPostController);

export default router;
