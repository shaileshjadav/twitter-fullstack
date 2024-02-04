import { Response, Request, NextFunction } from 'express';
import { error, success } from '../../helpers/response';
import { HttpStatusCode } from '../../config/constants';

import { getUserById } from '../../services/user';
import { getAWSBaseURL } from '../../helpers/awsHelper';

interface getUserParams {
  userId: string;
}

export const getUserController = async (
  req: Request,
  res: Response,
  next: NextFunction,
): Promise<Response | void> => {
  const params = req.params as unknown;
  const { userId } = params as getUserParams;

  try {
    const user = await getUserById(userId);
    if (!user) {
      return res
        .status(HttpStatusCode.NOT_FOUND)
        .json(error('invalid user id', 404));
    }
    const userData = { ...user, profileImageUrl: '', coverImageUrl: '' };
    const awsBaseURL = getAWSBaseURL();
    if (userData.profileImage) {
      userData.profileImageUrl =
        awsBaseURL + user.profileImage + '?' + Date.now();
    }
    if (userData.coverImage) {
      userData.coverImageUrl = awsBaseURL + user.coverImage + '?' + Date.now();
    }
    return res.status(HttpStatusCode.OK).json(success(userData));
  } catch (e) {
    next(e);
  }
};
