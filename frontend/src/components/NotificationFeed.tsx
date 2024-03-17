import { ClipLoader } from "react-spinners";
import { ReactElement, useCallback } from "react";
import { useNavigate } from "react-router-dom";
import { AiFillHeart } from "react-icons/ai";

import useNotifications from "../hooks/useNotifications";
import { formatDistanceToNow } from "date-fns";

interface Notification {
  id: string;
  updatedAt: Date;
  readAt: Date | null;
  message: string;
  redirects?: string;
  notificationEventCode: string;
  avatar?: string | null;
}

const NotificationFeed = () => {
  const { data: fetchedNotifications = [], isLoading } = useNotifications();
  const navigate = useNavigate();

  const handleClick = useCallback(
    (event: React.MouseEvent<HTMLElement>, redirects: string) => {
      event.stopPropagation();
      navigate(redirects);
    },
    [navigate]
  );
  const notificationIconsMapping: Record<string, ReactElement> = {
    postLike: <AiFillHeart color="red" size="32" />,
  };

  if (isLoading) {
    return (
      <div className="flex justify-center items-center h-full">
        <ClipLoader size={80} color="#36d7b7" />
      </div>
    );
  }

  if (fetchedNotifications.length === 0) {
    return (
      <div className="text-neutral-600 text-center p-6 text-xl">
        No Notifications
      </div>
    );
  }

  return (
    <div className="flex flex-col">
      {fetchedNotifications.map((notification: Notification) => {
        const NotificationIcon =
          notificationIconsMapping[notification.notificationEventCode];
        return (
          <div
            key={notification.id}
            className="flex flex-row items-center p-6 gap-4 border-b-[1px] border-neutral-800 cursor-pointer"
            onClick={(e) =>
              notification.redirects && handleClick(e, notification.redirects)
            }
          >
            {NotificationIcon}
            <p className="text-white">{notification.message}</p>
            <div className="flex items-center ml-auto">
              <p className="text-white align-items-right">
                {formatDistanceToNow(new Date(notification.updatedAt), {
                  addSuffix: true,
                })}
              </p>
            </div>
          </div>
        );
      })}
    </div>
  );
};
export default NotificationFeed;
