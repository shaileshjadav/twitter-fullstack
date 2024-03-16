import { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';

import { errorHandler } from '../helpers/ErrorHandler';
import BaseError from '../helpers/BaseError';
import { HttpStatusCode, JWTSECRET } from '../config/constants';

interface JwtPayload {
  iat: number;
  exp: number;
  userId: string;
}

const authMiddleware = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    const token = req.header('Authorization')?.replace('Bearer ', '');
    if (!JWTSECRET) {
      throw new BaseError(
        'jwt_secret_undefined',
        500,
        'jwt secret undefined or null',
      );
    }

    if (!token) {
      throw new BaseError(
        'unauthorized',
        HttpStatusCode.UNAUTHORIZED,
        'Invalid Token or unauthorized access',
      );
    }

    const decoded = jwt.verify(token, JWTSECRET) as JwtPayload;

    if (!decoded || !decoded.userId) {
      throw new BaseError(
        'unauthorized',
        HttpStatusCode.UNAUTHORIZED,
        'Invalid user id',
      );
    }
    // (req as AuthenticatedRequest).userId = decoded.userId;
    req.userId = decoded.userId;

    next();
  } catch (err: unknown) {
    if (err instanceof BaseError) {
      errorHandler.handleAPIError(err, res);
    } else {
      const customErr = new BaseError(
        'jwt_verify_failed',
        HttpStatusCode.UNAUTHORIZED,
        'unauthorized',
      );
      errorHandler.handleAPIError(customErr, res);
    }
  }
};
export default authMiddleware;
