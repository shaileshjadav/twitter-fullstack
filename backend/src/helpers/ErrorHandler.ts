import { Response } from 'express';
import BaseError from './BaseError';
import { error } from './response';

class ErrorHandler {
  public async handleError(err: Error): Promise<void> {
    console.log(
      'Error message from the centralized error-handling component',
      err,
    );
    // await logger.error(
    //   "Error message from the centralized error-handling component",
    //   err
    // );
    // await sendMailToAdminIfCritical();
    // await sendEventsToSentry();
  }

  public async handleAPIError(err: Error, res: Response): Promise<Response> {
    const statusCode = err instanceof BaseError ? err.httpCode : 500;
    return res.status(statusCode).json(error(err.message, statusCode));
  }

  public isTrustedError(error: Error) {
    if (error instanceof BaseError) {
      return error.isOperational;
    }
    return false;
  }
}
export const errorHandler = new ErrorHandler();
