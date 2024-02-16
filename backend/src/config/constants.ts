import { Secret } from 'jsonwebtoken';
type AWSConfig = {
  region: string | undefined;
  accessKeyId: string | undefined;
  secretAccessKey: string | undefined;
  bucket: string | undefined;
};

type KafkaConfig = {
  clientId: string | undefined;
  brokers: string | undefined;
};

export enum HttpStatusCode {
  OK = 200,
  BAD_REQUEST = 400,
  UNAUTHORIZED = 401,
  NOT_FOUND = 404,
  INTERNAL_SERVER = 500,
}

export const JWTSECRET: Secret | undefined = process.env.JWT_SECRET;

export const POSTS_PER_PAGE: number = 5;

export const AWSConfig: AWSConfig = {
  region: process.env.AWS_REGION,
  accessKeyId: process.env.AWS_ACCESSKEY,
  secretAccessKey: process.env.AWS_SECREATKEY,
  bucket: process.env.AWS_BUCKET,
};

export const kafkaConfig: KafkaConfig = {
  clientId: process.env.APP_NAME,
  brokers: process.env.KAFKA_BROKER,
};

export const kafkaTopics = {
  postLike: 'postLike',
};
