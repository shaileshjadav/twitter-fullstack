import { HttpStatusCode } from '../config/constants';
import BaseError from '../helpers/BaseError';
import { prisma } from '../libs/database';
import { User } from '../types';

export const getUserById = async (userId: string): Promise<User | null> => {
  const user = await prisma.user.findUnique({
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
      following: true,
      followers: true,
    },
    where: {
      id: userId,
    },
  });
  return user;
};

export const follow = async (
  followerId: string,
  followingId: string,
): Promise<boolean> => {
  // check already follow throw error
  const isAlredyExist = await prisma.follow.findFirst({
    select: {
      id: true,
    },
    where: {
      followerId,
      followingId,
    },
  });
  if (isAlredyExist) {
    throw new BaseError(
      'alredy_follow',
      HttpStatusCode.BAD_REQUEST,
      'alredy follow',
    );
  }
  // insert into follow table
  await prisma.follow.create({
    data: {
      followerId,
      followingId,
    },
  });
  return true;
};

export const removeFollow = async (
  followerId: string,
  followingId: string,
): Promise<boolean> => {
  // check already follow then delete
  await prisma.follow.deleteMany({
    where: {
      followerId,
      followingId,
    },
  });
  return true;
};
