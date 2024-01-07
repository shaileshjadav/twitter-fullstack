import { Router } from 'express';
import { register, login, currentuser } from '../controllers/auth/auth';
import {
  validateRegisterRequestBody,
  validateLoginRequestBody,
} from '../validators/auth';
import { validateRequest } from '../middleware/validateRequest';
import authMiddleware from '../middleware/authMiddleware';
const router = Router();

router.post(
  '/register',
  validateRequest(validateRegisterRequestBody),
  register,
);
router.post('/login', validateRequest(validateLoginRequestBody), login);
router.get('/currentuser', authMiddleware, currentuser);

export default router;
