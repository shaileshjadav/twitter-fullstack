import { Secret } from 'jsonwebtoken';

export enum HttpStatusCode {
  OK = 200,
  BAD_REQUEST = 400,
  UNAUTHORIZED = 401,
  NOT_FOUND = 404,
  INTERNAL_SERVER = 500,
}

export const JWTSECRET: Secret | undefined = process.env.JWT_SECRET;

export const POSTS_PER_PAGE: number = 2;
