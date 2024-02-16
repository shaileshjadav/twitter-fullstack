import { Response, Request, NextFunction } from 'express';
import { success } from '../../helpers/response';
import { HttpStatusCode, kafkaTopics } from '../../config/constants';

import {
  savePostComment,
  insertPostLike,
  deletePostLike,
} from '../../services/postCommentAndLike';
import { sendMessage } from './producer/postProducer';

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

    const insertedPostLike = await insertPostLike({
      postId,
      userId: req.userId,
    });
    await sendMessage(
      kafkaTopics.postLike,
      kafkaTopics.postLike,
      JSON.stringify({
        text: 'Hello KafkaJS user!',
      }),
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
