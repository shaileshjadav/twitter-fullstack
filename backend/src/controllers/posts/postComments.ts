import { Response, Request, NextFunction } from 'express';
import { success } from '../../helpers/response';
import { HttpStatusCode } from '../../config/constants';

import { savePostComment } from '../../services/postComment';

interface RegisterRequestBody {
  body: string;
}

interface CreatePostCommentQueryParams {
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
