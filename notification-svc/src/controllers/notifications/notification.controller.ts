import { getEventByCode } from '../../services/event';
import {
  createAggregrateNotificationService,
  createNotificationService,
} from '../../services/notification';
import { CreateNotification } from '../../types';

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
