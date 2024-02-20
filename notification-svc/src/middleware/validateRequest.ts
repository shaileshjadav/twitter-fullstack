import { Request, Response, NextFunction } from 'express';
import { validationResult, ValidationChain } from 'express-validator';
import { validation } from '../helpers/response';

type ValidationSchema = ValidationChain[];

export const validateRequest = (schemas: ValidationSchema) => {
  return async (req: Request, res: Response, next: NextFunction) => {
    await Promise.all(schemas.map(schema => schema.run(req)));
    const errors = validationResult(req);
    if (errors.array().length > 0) {
      // If there are validation errors, send a response with the errors
      return res.status(422).json(validation(errors.array()));
    } else {
      next();
    }
  };
};
