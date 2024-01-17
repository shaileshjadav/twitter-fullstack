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
  userLikes?: unknown;
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
  return await prisma.post.findMany({
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
      _count: {
        select: {
          likes: true,
        },
      },
      likes: {
        where: {
          userId,
        },
      },
    },
    orderBy: {
      createdAt: 'desc',
    },
    take: limit,
    skip: offset,
  });
};

export const getSinglePost = async (
  postId: string,
  userId: string,
): Promise<Post | null> => {
  return await prisma.post.findUnique({
    include: {
      user: true,
      comments: {
        include: {
          user: true,
        },
        orderBy: {
          createdAt: 'desc',
        },
      },
      _count: {
        select: {
          likes: true,
        },
      },
      likes: {
        where: {
          userId,
        },
      },
    },
    where: {
      id: postId,
    },
  });
};
