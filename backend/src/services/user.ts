import { prisma } from '../libs/database';
import { User } from '../types';

export const getUserById = async (userId: string): Promise<User | null> => {
  return await prisma.user.findUnique({
    select: {
      id: true,
      name: true,
      username: true,
      bio: true,
      email: true,
      emailVerified: true,
      image: true,
      coverImage: true,
      profileImage: true,
      createAt: true,
      followingIds: true,
    },
    where: {
      id: userId,
    },
  });
};
