import { Router } from 'express';
import { getUsersByIdsController } from '../../controllers/users/user';

const router = Router();

router.post('/users', getUsersByIdsController);

export default router;
