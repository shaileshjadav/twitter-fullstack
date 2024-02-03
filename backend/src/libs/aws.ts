import { S3Client } from '@aws-sdk/client-s3';
import { AWSConfig } from '../config/constants';

if (
  !AWSConfig.region ||
  !AWSConfig.accessKeyId ||
  !AWSConfig.secretAccessKey ||
  !AWSConfig.bucket
) {
  throw new Error('Invalid aws config');
}
const client = new S3Client({
  region: AWSConfig.region,
  credentials: {
    accessKeyId: AWSConfig.accessKeyId,
    secretAccessKey: AWSConfig.secretAccessKey,
  },
});

export default client;
