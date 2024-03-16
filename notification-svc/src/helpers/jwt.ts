import jwt from 'jsonwebtoken';

import { JWTSECRET } from '../config/constants';
import BaseError from './BaseError';

interface JwtPayload {
  userId: string;
}

export const generateJwtToken = (payload: JwtPayload) => {
  if (!JWTSECRET) {
    throw new BaseError(
      'jwt_secret_undefined',
      500,
      'jwt secret undefined or null',
    );
  }
  const accessToken = jwt.sign({ userId: payload.userId }, JWTSECRET, {
    expiresIn: '1m', //1 minutes
  });
  return accessToken;
};
