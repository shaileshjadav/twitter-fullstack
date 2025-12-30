import { param } from 'express-validator';

export const validateGetUser = [
  param('userId').notEmpty().withMessage('userId is required').trim(),
];

export const validateToggleFollow = [
  param('followingId').notEmpty().withMessage('following id is required'),
];
