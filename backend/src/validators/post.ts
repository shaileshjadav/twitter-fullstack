import { body, query } from 'express-validator';

export const validateCreatePost = [
  body('body').notEmpty().withMessage('Name is required').trim(),
];

export const validateGetPost = [
  query('page')
    .notEmpty()
    .withMessage('page is required')
    .isNumeric()
    .withMessage('Page must be number'),
];
