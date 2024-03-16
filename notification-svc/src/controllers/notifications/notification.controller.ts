import { Response, Request, NextFunction } from 'express';

import { getEventByCode } from '../../services/event';
import { success } from '../../helpers/response';

import {
  createAggregrateNotificationService,
  createNotificationService,
  getUserNotifications,
} from '../../services/notification';
import { CreateNotification } from '../../types';
import { HttpStatusCode } from '../../config/constants';

export const createNotification = async (
  eventCode: string,
  createNotificationData: CreateNotification,
): Promise<void> => {
  const notificationEvent = await getEventByCode(eventCode);
  if (notificationEvent) {
    const notificationData = {
      eventId: notificationEvent.id,
      sourceId: createNotificationData.sourceId,
      receiverUserId: createNotificationData.receiverUserId,
      relatedEntities: createNotificationData.relatedEntities,
    };
    if (notificationEvent.aggregationWindow) {
      await createAggregrateNotificationService(
        notificationData,
        notificationEvent.aggregationWindow,
      );
    } else {
      await createNotificationService(notificationData);
    }
  }
};

export const getUserNotificationsController = async (
  req: Request,
  res: Response,
  next: NextFunction,
): Promise<Response | void> => {
  try {
    const userId = req.userId;
    const userNotications = await getUserNotifications(userId);
    return res.status(HttpStatusCode.OK).json(success(userNotications));
  } catch (e) {
    next(e);
  }
};
