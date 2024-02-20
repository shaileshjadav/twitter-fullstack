import { prisma } from '../libs/database';
import { User } from '../types';
interface CreatePostParams {
  body: string;
  userId: string;
  image?: string | null;
}
interface PostLike {
  id: string;
  userId: string;
  postId: string;
  createdAt: Date;
  updatedAt?: Date;
}

interface PostComment {
  id: string;
  body: string;
  userId: string;
  postId: string;
  createdAt: Date;
  updatedAt?: Date;
  user?: User;
}

interface Post {
  id: string;
  body: string;
  userId: string;
  createdAt: Date;
  updatedAt?: Date;
  image?: string | null;
  imageUrl?: string | null;
  likes?: PostLike[];
  user?: User;
  comments?: PostComment[];
}

export const createPost = async ({
  body,
  userId,
  image,
}: CreatePostParams): Promise<Post> => {
  const insertedPost = await prisma.post.create({
    data: {
      body,
      userId,
      image,
    },
  });

  return insertedPost;
};

export const getPost = async (
  limit: number,
  offset: number,
  currentuserId: string,
  userId?: string,
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
      userId: userId,
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
          userId: currentuserId,
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

export const getPostById = async (postId: string): Promise<Post | null> => {
  return await prisma.post.findUnique({
    where: {
      id: postId,
    },
  });
};
