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
