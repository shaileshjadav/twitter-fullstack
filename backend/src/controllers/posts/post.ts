import { Response, Request, NextFunction } from 'express';
import { success } from '../../helpers/response';
import { createPost, getPost, getSinglePost } from '../../services/post';
import { HttpStatusCode, POSTS_PER_PAGE } from '../../config/constants';
import BaseError from '../../helpers/BaseError';
import { getAWSBaseURL } from '../../helpers/awsHelper';

interface RegisterRequestBody {
  body: string;
}
type queryParams = {
  page: number;
  userId?: string;
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
    const { page, userId } = queryParams;
    const awsBaseURL = getAWSBaseURL();
    const offset = (page - 1) * POSTS_PER_PAGE;

    const posts = await getPost(POSTS_PER_PAGE, offset, userId);
    const response = posts.map(post => {
      const hasLiked = post.likes && post.likes.length > 0;
      // user profile imageURL
      if (post?.user?.profileImage) {
        post.user.profileImageUrl =
          awsBaseURL + post.user.profileImage + '?' + Date.now();
      }
      return {
        ...post,
        hasLiked,
        likes: undefined, // Remove the 'likes' array
      };
    });

    return res.status(HttpStatusCode.OK).json(success(response));
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
    const awsBaseURL = getAWSBaseURL();
    // user profile imageURL
    if (post?.user?.profileImage) {
      post.user.profileImageUrl =
        awsBaseURL + post.user.profileImage + '?' + Date.now();
    }
    if (post.comments && post.comments.length) {
      post.comments?.forEach(comment => {
        // user profile imageURL
        if (comment.user) {
          comment.user.profileImageUrl = comment.user?.profileImage
            ? awsBaseURL + comment.user?.profileImage + '?' + Date.now()
            : '';
        }
      });
    }

    const response = {
      ...post,
      hasLiked: post.likes && post.likes.length > 0,
      likes: undefined,
    };
    return res.status(HttpStatusCode.OK).json(success(response));
  } catch (e) {
    next(e);
  }
};
