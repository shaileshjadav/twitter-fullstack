import { prisma } from '../libs/database';
import { CreateNotification, Notification } from '../types';

export const createNotificationService = async (
  notificationData: CreateNotification,
): Promise<Notification> => {
  return await prisma.notification.create({
    data: notificationData,
  });
};

const differenceInMinutes = (date1: Date, date2: Date = new Date()): number => {
  const diffInMillis = Math.abs(date2.getTime() - date1.getTime());
  const minutes = Math.floor(diffInMillis / (1000 * 60));
  return minutes;
};

export const createAggregrateNotificationService = async (
  notificationData: CreateNotification,
  aggregationWindow: number,
): Promise<void> => {
  // check alredy exists
  const checkAggregrateNotification = await prisma.notification.findFirst({
    where: {
      eventId: notificationData.eventId,
      receiverUserId: notificationData.receiverUserId,
      sourceId: notificationData.sourceId,
    },
  });

  if (
    checkAggregrateNotification &&
    differenceInMinutes(checkAggregrateNotification.createdAt) <=
      aggregationWindow
  ) {
    // update
    checkAggregrateNotification.relatedEntities.push(
      ...notificationData.relatedEntities,
    );
    // insert unique values
    checkAggregrateNotification.relatedEntities = [
      ...new Set([...checkAggregrateNotification.relatedEntities]),
    ];

    await prisma.notification.update({
      where: {
        id: checkAggregrateNotification.id,
      },
      data: {
        relatedEntities: checkAggregrateNotification.relatedEntities,
      },
    });
  } else {
    createNotificationService(notificationData);
  }
};
