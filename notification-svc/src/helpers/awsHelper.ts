import { PutObjectCommand } from '@aws-sdk/client-s3';
import { getSignedUrl } from '@aws-sdk/s3-request-presigner';

import awsClient from '../libs/aws';
import { AWSConfig } from '../config/constants';
import BaseError from './BaseError';

const createPresignedUrl = (key: string) => {
  const command = new PutObjectCommand({ Bucket: AWSConfig.bucket, Key: key });
  return getSignedUrl(awsClient, command, { expiresIn: 3600 });
};
export const getAWSBaseURL = () => {
  return `https://s3.${AWSConfig.region}.amazonaws.com/${AWSConfig.bucket}/`;
};
export const generatePresignedUrl = async (userId: string, key: string) => {
  try {
    const clientUrl = await createPresignedUrl(key);
    return clientUrl;
  } catch (error) {
    throw new BaseError(
      'generate_presigned_url_for_profile_failed',
      500,
      'Generate presigned url for profile image failed for user' + userId,
    );
  }
};
