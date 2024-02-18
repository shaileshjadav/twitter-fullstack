import { PrismaClient } from '@prisma/client';
const prisma = new PrismaClient();
const main = async () => {
  await prisma.event.createMany({
    data: [
      {
        eventCode: 'postLike',
        eventName: 'Post liked',
        relatedEntitiesType: 'user',
        aggregationWindow: 10,
      },
    ],
  });
};
main();
