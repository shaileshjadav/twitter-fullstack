import { parsedNotification, parseMessageData } from '../types';

const formatPostLike = ({
  notification,
  users,
}: parseMessageData): parsedNotification => {
  let notificationMessage = ``;
  const usersLiked = notification.relatedEntities;
  // TODO: handle max then 3 users
  usersLiked.forEach((userId, index) => {
    if (users[userId]) {
      notificationMessage += users[userId].name;
    } else {
      notificationMessage += 'Deleted user';
    }

    if (usersLiked.length !== index + 1) {
      //|| index + 1 !== 3
      notificationMessage += ', ';
    }
  });

  notificationMessage += ' liked your post';
  const firstUserId = usersLiked[0];
  return {
    id: notification.id,
    readAt: notification.readAt,
    updatedAt: notification.updatedAt,
    message: notificationMessage,
    redirects: `/posts/${notification.sourceId}`,
    notificationEventCode: notification.event.eventCode,
    avatar: users[firstUserId]?.profileImageUrl || null,
  };
};

const parseMessage = (eventCode: string, data: parseMessageData) => {
  // Mapping object for event codes and corresponding functions
  const eventCodeFunctionMap: {
    [key: string]: (parseMessageData: parseMessageData) => parsedNotification;
  } = {
    postLike: formatPostLike,
  };
  const eventFunction = eventCodeFunctionMap[eventCode];
  return eventFunction(data);
};
export default parseMessage;
