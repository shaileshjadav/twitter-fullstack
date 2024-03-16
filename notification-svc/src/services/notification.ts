import { prisma } from '../libs/database';
import {
  CreateNotification,
  Notification,
  User,
  parsedNotification,
} from '../types';
import { relatedEntitiesType } from '../config/constants';
import { fetchUsersByIds } from '../helpers/internalFetcher';
import parseMessage from '../helpers/notificationHelper';

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

export const getUserNotifications = async (
  userId: string,
): Promise<parsedNotification[]> => {
  const formatedNotifications: parsedNotification[] = [];
  const userNotifications = await prisma.notification.findMany({
    select: {
      sourceId: true,
      relatedEntities: true,
      readAt: true,
      updatedAt: true,
      event: {
        select: {
          eventCode: true,
          relatedEntitiesType: true,
        },
      },
    },
    where: {
      receiverUserId: userId,
    },
  });
  const userIds: string[] = [];
  userNotifications.forEach(notification => {
    if (notification.event.relatedEntitiesType == relatedEntitiesType.user) {
      // userIds.push(notification.relatedEntities);
      notification.relatedEntities.forEach(relatedEntity => {
        console.log(relatedEntity);
        if (userIds.indexOf(relatedEntity) === -1) {
          userIds.push(relatedEntity);
        }
      });
    }
  });

  const users: User[] = await fetchUsersByIds(userIds, userId);

  const usersObject = users.reduce(
    (acc, user) => {
      acc[user.id] = user;
      return acc;
    },
    {} as { [key: string]: User },
  );

  userNotifications.forEach(notification => {
    const parseNotification = parseMessage(notification.event.eventCode, {
      notification,
      users: usersObject,
    });

    formatedNotifications.push(parseNotification);
  });

  return formatedNotifications;
};
