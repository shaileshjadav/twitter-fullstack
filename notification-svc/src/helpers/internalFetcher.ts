import makeAxiosCall from '../libs/axios';
import { generateJwtToken } from './jwt';
import { User } from '../types';

interface internalApiRes {
  data: User[];
}

export const fetchUsersByIds = async (
  userIds: string[],
  currentUserId: string,
): Promise<User[]> => {
  const apiUrl = process.env.AUTH_SERVICE_URL + '/internal/users';
  const params = { userIds };

  const jwt = generateJwtToken({ userId: currentUserId });
  const headers = {
    Authorization: `Bearer ${jwt}`,
    'Content-Type': 'application/json',
  };
  const responseData = await makeAxiosCall<internalApiRes>(
    apiUrl,
    'post',
    params,
    headers,
  );

  return responseData.data;
};
