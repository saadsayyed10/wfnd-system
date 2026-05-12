import {
  deleteAllNotificatonsAPI,
  fetchAllNotificatonsAPI,
} from "@/api/notification.api";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogTrigger } from "@/components/ui/dialog";
import { useAuth } from "@clerk/react";
import { Bell } from "lucide-react";
import { useEffect, useState } from "react";

interface NotificationsTypes {
  id: string;
  title: string;
  description: string;
  created_at: string;
}

const Notification = () => {
  const { getToken } = useAuth();
  const [notificationData, setNotificationData] = useState<
    NotificationsTypes[]
  >([]);

  const handleFetchNotifications = async () => {
    try {
      const token = await getToken();

      const res = await fetchAllNotificatonsAPI(token!);
      setNotificationData(res.data.notifications);
    } catch (error: any) {
      console.log(error.message);
    }
  };

  const handleDeleteAllNotifications = async () => {
    try {
      const token = await getToken();

      await deleteAllNotificatonsAPI(token!);
      alert("All notifications deleted");

      handleFetchNotifications();
    } catch (error: any) {
      console.log(error.message);
    }
  };

  useEffect(() => {
    handleFetchNotifications();
  }, []);

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button
          variant="ghost"
          size="icon-lg"
          className="rounded-full border shadow-lg bg-white"
        >
          <Bell width={4} height={4} />
        </Button>
      </DialogTrigger>
      <DialogContent className="flex justify-start items-start flex-col gap-y-4 w-full h-75 overflow-y-auto px-4 lg:py-10 py-10 bg-neutral-50">
        {notificationData.length !== 0 ? (
          notificationData.map((notification) => (
            <div
              key={notification.id}
              className="flex justify-start items-start flex-col gap-y-1 p-2 rounded-xl border w-full bg-white shadow-lg"
            >
              <h4 className="font-medium text-lg">{notification.title}</h4>
              <h6 className="text-xs text-neutral-500">
                {notification.description}
              </h6>
              <div className="flex justify-between items-center w-full mt-4">
                <p className="text-xs text-neutral-500">
                  {notification.created_at.split("T")[0]}
                </p>
                <p className="text-xs text-neutral-500">
                  {new Date(notification.created_at).toLocaleTimeString(
                    "en-IN",
                    {
                      timeZone: "Asia/Kolkata",
                      hour: "2-digit",
                      minute: "2-digit",
                      hour12: true,
                    },
                  )}
                </p>
              </div>
            </div>
          ))
        ) : (
          <div className="flex justify-center items-center w-full">
            <h6 className="text-neutral-600 mt-24">
              No notifications to view yet.
            </h6>
          </div>
        )}
        {notificationData.length !== 0 && (
          <div className="w-full">
            <Button
              onClick={handleDeleteAllNotifications}
              className="w-full"
              variant="destructive"
            >
              Delete All
            </Button>
          </div>
        )}
      </DialogContent>
    </Dialog>
  );
};

export default Notification;
