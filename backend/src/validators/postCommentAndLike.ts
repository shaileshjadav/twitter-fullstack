import { body, query, param } from 'express-validator';

export const validateCreatePostComment = [
  body('body').notEmpty().withMessage('Name is required').trim(),
  query('postId').notEmpty().withMessage('Post Id is required').trim(),
];

export const validateCreatePostLike = [
  param('postId').notEmpty().withMessage('postId is required'),
];
