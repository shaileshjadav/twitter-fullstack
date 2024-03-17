import { User } from './user';

export type RelatedEntitiesTypeEnum = {
  post: string;
  user: string;
};

export type RelatedEntitiesType = 'post' | 'user';

export interface notificationEvent {
  id: string;
  eventCode: string;
  eventName: string;
  aggregationWindow?: number | null;
  relatedEntitiesType: RelatedEntitiesType | null;
}

export interface Notification {
  id: string;
  receiverUserId: string;
  eventId: string;
  sourceId: string;
  relatedEntities: string[];
  createdAt: Date;
  updatedAt: Date;
  readAt?: Date | null;
}

export interface CreateNotification {
  receiverUserId: string;
  eventId: string;
  sourceId: string;
  relatedEntities: string[];
}

export interface parseMessageData {
  notification: {
    id: string;
    sourceId: string;
    relatedEntities: string[];
    updatedAt: Date;
    readAt: Date | null;
    event: {
      eventCode: string;
      relatedEntitiesType: RelatedEntitiesType;
    };
  };
  users: Record<string, User>;
}
export interface parsedNotification {
  id: string;
  updatedAt: Date;
  readAt: Date | null;
  message: string;
  redirects?: string;
  notificationEventCode: string;
  avatar?: string | null;
}
