import { prisma } from '../libs/database';

interface SavePostCommentParams {
  body: string;
  userId: string;
  postId: string;
}
interface PostComment {
  id: string;
  body: string;
  userId: string;
  postId: string;
  createdAt: Date;
  updatedAt?: Date;
}

interface SaveOrDeletePostLikesParams {
  postId: string;
  userId: string;
}

export const savePostComment = async ({
  body,
  userId,
  postId,
}: SavePostCommentParams): Promise<PostComment> => {
  const insertedPostComment = await prisma.comment.create({
    data: {
      body,
      userId,
      postId,
    },
  });

  return insertedPostComment;
};

export const insertPostLike = async ({
  userId,
  postId,
}: SaveOrDeletePostLikesParams) => {
  let postLike = null;
  postLike = await prisma.like.findFirst({
    where: {
      userId,
      postId,
    },
  });
  if (postLike) {
    await prisma.like.update({
      data: {
        userId,
        postId,
      },
      where: {
        id: postLike.id,
      },
    });
  } else {
    postLike = await prisma.like.create({
      data: {
        userId,
        postId,
      },
    });
  }

  return postLike;
};

export const deletePostLike = async ({
  userId,
  postId,
}: SaveOrDeletePostLikesParams) => {
  const deletedPostLike = await prisma.like.deleteMany({
    where: {
      userId: userId,
      postId: postId,
    },
  });
  return deletedPostLike;
};
