import { Router } from 'express';

import { validateRequest } from '../middleware/validateRequest';
import { validateGetUser, validateToggleFollow } from '../validators/user';
import {
  getUserController,
  followController,
  removeFollowController,
} from '../controllers/users/user';

const router = Router();
router.get('/:userId', validateRequest(validateGetUser), getUserController);
router.put(
  '/follows/:followingId',
  validateRequest(validateToggleFollow),
  followController,
);

router.delete(
  '/follows/:followingId',
  validateRequest(validateToggleFollow),
  removeFollowController,
);
export default router;
