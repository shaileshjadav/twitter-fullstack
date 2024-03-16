import { Response, Request, NextFunction } from 'express';
import { error, success } from '../../helpers/response';
import { HttpStatusCode } from '../../config/constants';

import {
  getUserById,
  follow,
  removeFollow,
  getUsersByIds,
} from '../../services/user';
import { getAWSBaseURL } from '../../helpers/awsHelper';
import BaseError from '../../helpers/BaseError';

interface getUserParams {
  userId: string;
}
interface FollowParams {
  followerId: string;
  followingId: string;
}

export const getUserController = async (
  req: Request,
  res: Response,
  next: NextFunction,
): Promise<Response | void> => {
  const params = req.params as unknown;
  const { userId } = params as getUserParams;
  const currentUserId = req.userId;

  try {
    const user = await getUserById(userId);
    if (!user) {
      return res
        .status(HttpStatusCode.NOT_FOUND)
        .json(error('invalid user id', 404));
    }
    const userData = {
      ...user,
      profileImageUrl: '',
      coverImageUrl: '',
    };
    const awsBaseURL = getAWSBaseURL();
    if (userData.profileImage) {
      userData.profileImageUrl =
        awsBaseURL + user.profileImage + '?' + Date.now();
    }
    if (userData.coverImage) {
      userData.coverImageUrl = awsBaseURL + user.coverImage + '?' + Date.now();
    }

    // check is current user is following given user
    if (userData.followers) {
      const findCurrentUser = userData.followers.findIndex(
        follower => follower.followerId === currentUserId,
      );
      userData.isFollowing = findCurrentUser > -1;
    }
    userData.followersCount = userData?.followers?.length || 0;
    userData.followingCount = userData?.following?.length || 0;
    delete userData.followers;
    delete userData.following;
    return res.status(HttpStatusCode.OK).json(success(userData));
  } catch (e) {
    next(e);
  }
};

export const followController = async (
  req: Request,
  res: Response,
  next: NextFunction,
): Promise<Response | void> => {
  const params = req.params as unknown;
  const followerId = req.userId;
  const { followingId } = params as FollowParams;

  try {
    await follow(followerId, followingId);
    return res.status(HttpStatusCode.OK).json(success());
  } catch (e) {
    next(e);
  }
};

export const removeFollowController = async (
  req: Request,
  res: Response,
  next: NextFunction,
): Promise<Response | void> => {
  const params = req.params as unknown;
  const followerId = req.userId;
  const { followingId } = params as FollowParams;

  try {
    await removeFollow(followerId, followingId);
    return res.status(HttpStatusCode.OK).json(success());
  } catch (e) {
    next(e);
  }
};

export const getUsersByIdsController = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    const { userIds } = req.body as { userIds: string[] };
    console.log(userIds);
    const users = await getUsersByIds(userIds);
    console.log(users);
    if (!users?.length) {
      throw new BaseError(
        'invalid_userIds',
        HttpStatusCode.BAD_REQUEST,
        'invalid user ids for get info',
      );
    }
    return res.status(HttpStatusCode.OK).json(success(users));
  } catch (e) {
    next(e);
  }
};
