import { Response, Request, NextFunction } from 'express';
import { success } from '../../helpers/response';
import { createPost, getPost } from '../../services/post';
import { HttpStatusCode, POSTS_PER_PAGE } from '../../config/constants';

interface RegisterRequestBody {
  body: string;
}
type queryParams = {
  page: number;
};

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
