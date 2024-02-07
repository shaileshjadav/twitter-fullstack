import { body } from 'express-validator';

export const validateRegisterRequestBody = [
  body('name')
    .notEmpty()
    .withMessage('Name is required')
    .isString()
    .withMessage('Name must be a string')
    .isLength({ min: 3 })
    .withMessage('Name must be at least 3 characters')
    .isLength({ max: 100 })
    .withMessage('Name must not exceed 100 characters')
    .trim(),
  body('email')
    .notEmpty()
    .withMessage('Email is required')
    .isString()
    .withMessage('Email must be a string')
    .isEmail()
    .withMessage('Invalid email format')
    .trim(),

  body('username')
    .notEmpty()
    .withMessage('Username is required')
    .isString()
    .withMessage('Username must be a string')
    .isLength({ min: 3 })
    .withMessage('Username must be at least 3 characters')
    .trim(),

  body('password')
    .notEmpty()
    .withMessage('Password is required')
    .isString()
    .withMessage('Password must be a string')
    .isLength({ min: 6 })
    .withMessage('Password must be at least 6 characters')

    .trim(),
];

export const validateLoginRequestBody = [
  body('username')
    .notEmpty()
    .withMessage('Username is required')
    .isString()
    .withMessage('Name must be a string')
    .trim(),
  body('password')
    .notEmpty()
    .withMessage('Password is required')
    .isString()
    .withMessage('Password must be a string')
    .isLength({ min: 6 })
    .withMessage('Password must be at least 6 characters')
    .trim(),
];

export const validateRefreshTokenequestBody = [
  body('refreshToken')
    .notEmpty()
    .withMessage('RefreshToken is required')
    .isString()
    .withMessage('Name must be a string')
    .trim(),
];
