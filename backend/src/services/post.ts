import { prisma } from '../libs/database';

interface CreatePostParams {
  body: string;
  userId: string;
}
interface Post {
  id: string;
  body: string;
  userId: string;
  createdAt: Date;
  updatedAt?: Date;
  likedIds: string[];
}

export const createPost = async ({
  body,
  userId,
}: CreatePostParams): Promise<Post> => {
  const insertedPost = await prisma.post.create({
    data: {
      body,
      userId,
    },
  });

  return insertedPost;
};

export const getPost = async (
  userId: string,
  limit: number,
  offset: number,
): Promise<Post[]> => {
  return prisma.post.findMany({
    // select: {
    //   id: true,
    //   body: true,
    //   userId: true,
    //   createdAt: true,
    //   updatedAt: true,
    //   likedIds: true,
    //   user: true,
    // },
    where: {
      userId,
    },
    include: {
      user: true,
      comments: true,
    },
    orderBy: {
      createdAt: 'desc',
    },
    take: limit,
    skip: offset,
  });
};
