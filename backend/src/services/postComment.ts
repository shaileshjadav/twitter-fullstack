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
