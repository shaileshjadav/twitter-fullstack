import { RelatedEntitiesTypeEnum } from '../types';
import { Secret } from 'jsonwebtoken';

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

export const kafkaConfig: KafkaConfig = {
  clientId: process.env.APP_NAME,
  brokers: process.env.KAFKA_BROKER,
};

export const kafkaTopics = {
  post: 'post',
};

export const relatedEntitiesType: RelatedEntitiesTypeEnum = {
  post: 'post',
  user: 'user',
};

export const JWTSECRET: Secret | undefined = process.env.JWT_SECRET;

export const notificationTemplates: Record<string, string> = {
  postLike: '{username} liked your post!',
};
