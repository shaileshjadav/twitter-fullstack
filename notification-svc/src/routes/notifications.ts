import { Router } from 'express';
import { getUserNotificationsController } from '../controllers/notifications/notification.controller';

const router = Router();

router.get('/', getUserNotificationsController);

export default router;
