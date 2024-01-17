import { Response, Request, NextFunction } from 'express';
import { success } from '../../helpers/response';
import { createPost, getPost, getSinglePost } from '../../services/post';
import { HttpStatusCode, POSTS_PER_PAGE } from '../../config/constants';
import BaseError from '../../helpers/BaseError';

interface RegisterRequestBody {
  body: string;
}
type queryParams = {
  page: number;
};
interface SinglePostParams {
  postId: string;
}

export const createPostController = async (
  req: Request,
  res: Response,
  next: NextFunction,
): Promise<Response | void> => {
  const { body }: RegisterRequestBody = req.body;

  try {
    const userId = req.userId;
    const insertedPost = await createPost({ body, userId });

    return res.status(HttpStatusCode.OK).json(success(insertedPost));
  } catch (e) {
    next(e);
  }
};

//RequestHandler<
// unknown,
// unknown,
// unknown,
// GetPostQueryParams
// >
export const getPostController = async (
  req: Request,
  res: Response,
  next: NextFunction,
): Promise<Response | void> => {
  try {
    const query = req.query as unknown;
    const queryParams = query as queryParams;
    const { page } = queryParams;

    const userId = req.userId;

    const offset = (page - 1) * POSTS_PER_PAGE;

    const posts = await getPost(userId, POSTS_PER_PAGE, offset);

    return res.status(HttpStatusCode.OK).json(success(posts));
  } catch (e) {
    next(e);
  }
};

export const getSinglePostController = async (
  req: Request,
  res: Response,
  next: NextFunction,
): Promise<Response | void> => {
  try {
    const params = req.params as unknown;
    const { postId } = params as SinglePostParams;
    const userId = req.userId;
    const post = await getSinglePost(postId, userId);
    if (!post) {
      throw new BaseError(
        'invalid_post_id',
        HttpStatusCode.BAD_REQUEST,
        'Invalid post id while get details',
      );
    }

    return res.status(HttpStatusCode.OK).json(success(post));
  } catch (e) {
    next(e);
  }
};
