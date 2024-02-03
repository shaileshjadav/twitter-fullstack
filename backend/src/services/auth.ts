import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';

import { prisma } from '../libs/database';
import BaseError from '../helpers/BaseError';
import { HttpStatusCode, JWTSECRET } from '../config/constants';

interface RegisterParams {
  name: string;
  email: string;
  username: string;
  password: string;
}

interface LoginParams {
  username: string;
  password: string;
}

interface GetUserParams {
  id: string;
}
interface userData {
  profileImage?: string;
  coverImage?: string;
  bio: string;
  username: string;
  name: string;
}

interface updateUserParams {
  id: string;
  userData: userData;
}

interface User {
  id: string;
  name: string | null;
  email: string | null;
  username: string | null;
  token?: string;
}

interface JwtPayload {
  userId: string;
}

const generateJwtToken = (payload: JwtPayload) => {
  if (!JWTSECRET) {
    throw new BaseError(
      'jwt_secret_undefined',
      500,
      'jwt secret undefined or null',
    );
  }

  return jwt.sign({ userId: payload.userId }, JWTSECRET, {
    expiresIn: '7d',
  });
};

export const createUser = async ({
  name,
  email,
  username,
  password,
}: RegisterParams): Promise<User> => {
  const userAlreadyExists = await prisma.user.findFirst({
    where: {
      OR: [{ email }, { username }],
    },
  });

  if (userAlreadyExists) {
    throw new BaseError(
      'user_already_exits',
      HttpStatusCode.BAD_REQUEST,
      'User already exits!',
    );
  }

  const hashedPassword = await bcrypt.hash(password, 8);

  const insertedUser = await prisma.user.create({
    data: {
      name,
      email,
      username,
      hashedPassword: hashedPassword,
    },
  });
  // generate jwt token
  const token = generateJwtToken({ userId: insertedUser.id });
  return {
    id: insertedUser.id,
    name: insertedUser.name,
    username: insertedUser.username,
    email: insertedUser.email,
    token: token,
  };
};

export const checkLogin = async ({
  username,
  password,
}: LoginParams): Promise<User> => {
  const checkUsername = await prisma.user.findFirst({
    where: {
      OR: [{ email: username }, { username }],
    },
  });

  if (!checkUsername || !checkUsername.hashedPassword) {
    throw new BaseError(
      'invalid_user_name_or_email',
      HttpStatusCode.BAD_REQUEST,
      'Invalid Username or email!',
    );
  }

  // check password
  const isValidPassword = await bcrypt.compare(
    password,
    checkUsername.hashedPassword,
  );

  if (!isValidPassword) {
    throw new BaseError(
      'invalid_password',
      HttpStatusCode.BAD_REQUEST,
      'Invalid Password!',
    );
  }
  // generate jwt token
  const token = generateJwtToken({ userId: checkUsername.id });
  return {
    id: checkUsername.id,
    name: checkUsername.name,
    username: checkUsername.username,
    email: checkUsername.email,
    token: token,
  };
};

export const getCurrentUser = async ({ id }: GetUserParams): Promise<User> => {
  const user = await prisma.user.findUnique({
    where: {
      id,
    },
  });
  if (!user) {
    throw new BaseError(
      'invalid_userId',
      HttpStatusCode.BAD_REQUEST,
      'Invalid user Id!',
    );
  }

  return {
    id: user.id,
    name: user.name,
    username: user.username,
    email: user.email,
  };
};

export const updateCurrentUser = async ({
  id,
  userData,
}: updateUserParams): Promise<User> => {
  const user = await prisma.user.update({
    where: {
      id,
    },
    data: userData,
  });
  return user;
};
