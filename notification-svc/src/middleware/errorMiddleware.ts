import { Request, Response, NextFunction } from 'express';
import { errorHandler } from '../helpers/ErrorHandler';
import BaseError from '../helpers/BaseError';

const errorMiddleware = async (
  err: Error,
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  if (!errorHandler.isTrustedError(err)) {
    next(err);
  }
  await errorHandler.handleAPIError(err, res);
};

export const routeNotFound = (req: Request, res: Response) => {
  const err = new BaseError('Invalid route', 404, 'Requested route not found');
  errorHandler.handleAPIError(err, res);
};
export default errorMiddleware;
