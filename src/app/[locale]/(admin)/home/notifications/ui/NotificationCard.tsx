import { formatTimestampToDateString } from "@/utils/facades/serverFacades/strFacade";
import { BellAlertIcon } from "@heroicons/react/24/outline";
import { Notification } from "@prisma/client";

function NotificationCard({ notification }: { notification: Notification }) {
  return (
    <div className="flex items-center gap-x-4 py-5">
      <BellAlertIcon className="h-6 w-6 text-red-500" aria-hidden="true" />
      <div className="min-w-0">
        <p className="text-sm font-semibold leading-6 text-primary">
          {notification.content}
        </p>
        <p className="mt-1 truncate text-xs leading-5 text-gray-500">
          {formatTimestampToDateString(notification.createdAt)}
        </p>
      </div>
    </div>
  );
}

export default NotificationCard;
