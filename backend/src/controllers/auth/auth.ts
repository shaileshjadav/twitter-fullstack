import { Response, Request, NextFunction } from 'express';
import { success } from '../../helpers/response';
import {
  createUser,
  checkLogin,
  getCurrentUser,
  updateCurrentUser,
  refreshTokenService,
} from '../../services/auth';
import { generatePresignedUrl } from '../../helpers/awsHelper';

interface RegisterRequestBody {
  name: string;
  username: string;
  email: string;
  password: string;
}

interface LoginRequestBody {
  username: string;
  password: string;
}

export const register = async (
  req: Request,
  res: Response,
  next: NextFunction,
): Promise<Response | void> => {
  const { name, username, email, password }: RegisterRequestBody = req.body;

  try {
    const insertedUser = await createUser({
      name,
      username,
      email,
      password,
    });

    return res.status(200).json(success(insertedUser));
  } catch (e) {
    next(e);
  }
};

export const login = async (
  req: Request,
  res: Response,
  next: NextFunction,
): Promise<Response | void> => {
  const { username, password }: LoginRequestBody = req.body;

  try {
    const user = await checkLogin({
      username,
      password,
    });

    return res.status(200).json(success(user));
  } catch (e) {
    next(e);
  }
};

export const currentuser = async (
  req: Request,
  res: Response,
  next: NextFunction,
): Promise<Response | void> => {
  try {
    const userId = req.userId;

    const user = await getCurrentUser({
      id: userId,
    });

    return res.status(200).json(success(user));
  } catch (e) {
    next(e);
  }
};

export const updateProfile = async (
  req: Request,
  res: Response,
  next: NextFunction,
): Promise<Response | void> => {
  try {
    const userId = req.userId;
    const userData = req.body;

    const user = await updateCurrentUser({
      id: userId,
      userData,
    });

    return res.status(200).json(success(user));
  } catch (e) {
    next(e);
  }
};
export const getPresignedUrlForProfileImage = async (
  req: Request,
  res: Response,
  next: NextFunction,
): Promise<Response | void> => {
  try {
    const userId = req.userId;
    const filePath = `profile/${userId}.png`;
    const url = await generatePresignedUrl(userId, filePath);

    return res.status(200).json(
      success({
        url,
        filePath,
      }),
    );
  } catch (e) {
    next(e);
  }
};

export const getPresignedUrlForCoverImage = async (
  req: Request,
  res: Response,
  next: NextFunction,
): Promise<Response | void> => {
  try {
    const userId = req.userId;
    const filePath = `cover/${userId}.png`;
    const url = await generatePresignedUrl(userId, filePath);

    return res.status(200).json(
      success({
        url,
        filePath,
      }),
    );
  } catch (e) {
    next(e);
  }
};

export const refreshTokenController = async (
  req: Request,
  res: Response,
  next: NextFunction,
): Promise<Response | void> => {
  const { refreshToken: refreshTokenVal }: { refreshToken: string } = req.body;

  try {
    const { accessToken, refreshToken } = await refreshTokenService({
      refreshTokenVal,
    });

    return res.status(200).json(
      success({
        token: accessToken,
        refreshToken,
      }),
    );
  } catch (e) {
    next(e);
  }
};
