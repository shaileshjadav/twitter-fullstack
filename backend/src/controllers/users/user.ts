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
    if (user.profileImage) {
      const awsBaseURL = getAWSBaseURL();
      user.profileImage = awsBaseURL + user.profileImage + '?' + Date.now();
      user.image = user.profileImage;
    }
    return res.status(HttpStatusCode.OK).json(success(user));
  } catch (e) {
    next(e);
  }
};
