import { Response, Request, NextFunction } from 'express';
import { success } from '../../helpers/response';
import { HttpStatusCode, eventCodes } from '../../config/constants';

import {
  savePostComment,
  insertPostLike,
  deletePostLike,
} from '../../services/postCommentAndLike';
import { sendMessage } from './queue/postQueue';
import { getPostById } from '../../services/post';
import BaseError from '../../helpers/BaseError';

interface RegisterRequestBody {
  body: string;
}

interface CreatePostCommentQueryParams {
  postId: string;
}

interface SavePostLikeParams {
  postId: string;
}
export const savePostCommentController = async (
  req: Request,
  res: Response,
  next: NextFunction,
): Promise<Response | void> => {
  const { body }: RegisterRequestBody = req.body;

  try {
    const userId = req.userId;
    const query = req.query as unknown;
    const queryParams = query as CreatePostCommentQueryParams;
    const { postId } = queryParams;

    const insertedPost = await savePostComment({ body, userId, postId });

    return res.status(HttpStatusCode.OK).json(success(insertedPost));
  } catch (e) {
    next(e);
  }
};

export const savePostLikeController = async (
  req: Request,
  res: Response,
  next: NextFunction,
): Promise<Response | void> => {
  const params = req.params as unknown;
  try {
    const { postId } = params as SavePostLikeParams;
    const post = await getPostById(postId);
    if (!post) {
      throw new BaseError(
        'invalid postId',
        HttpStatusCode.NOT_FOUND,
        'invalid post Id',
      );
    }

    const insertedPostLike = await insertPostLike({
      postId,
      userId: req.userId,
    });
    await sendMessage(
      JSON.stringify({
        sourceId: postId,
        receiverUserId: post.userId,
        eventCode: eventCodes.postLike,
        relatedEntities: [req.userId],
      }),
      postId,
    );
    return res.status(HttpStatusCode.OK).json(success(insertedPostLike));
  } catch (e) {
    next(e);
  }
};

export const deletePostLikeController = async (
  req: Request,
  res: Response,
  next: NextFunction,
): Promise<Response | void> => {
  const params = req.params as unknown;
  try {
    const { postId } = params as SavePostLikeParams;

    const insertedPostLike = await deletePostLike({
      postId,
      userId: req.userId,
    });

    return res.status(HttpStatusCode.OK).json(success(insertedPostLike));
  } catch (e) {
    next(e);
  }
};
