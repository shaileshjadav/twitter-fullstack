import { Router } from 'express';

import { validateRequest } from '../middleware/validateRequest';
import { validateGetUser } from '../validators/user';
import { getUserController } from '../controllers/users/user';

const router = Router();
router.get('/:userId', validateRequest(validateGetUser), getUserController);

export default router;
