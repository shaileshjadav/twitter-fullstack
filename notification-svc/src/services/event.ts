import { prisma } from '../libs/database';
import { notificationEvent } from '../types';

export const getEventByCode = async (
  eventCode: string,
): Promise<notificationEvent | null> => {
  return await prisma.event.findFirst({
    where: {
      eventCode,
    },
  });
};
