import { prisma } from '../libs/database';
type optionalField = string | null;

interface User {
  id: string;
  name?: optionalField;
  username?: optionalField;
  bio?: optionalField;
  email?: optionalField;
  emailVerified: Date | null;
  image?: optionalField;
  coverImage?: optionalField;
  profileImage?: optionalField;
}

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
    },
    where: {
      id: userId,
    },
  });
};
