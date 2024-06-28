"use client";

import NotificationUI from "@/components/NotificationUI";
import { users } from "@/lib/api/user.api";
import React, { useEffect } from "react";

export type Notification = {
  sentBy: {
    name: string;
    id: number;
  };
  id: number;
  title: string;
  message: string;
  sentById: number;
  createdAt: string;
  updatedAt: string;
  sentToId: number;
};

const MyNotificationsPage = () => {
  const [notificationMessages, setNotificationMessages] = React.useState<
    Notification[]
  >([]);

  useEffect(() => {
    const fetchNotifications = async () => {
      const data = await users.getNotifications();
      setNotificationMessages(data);
    };

    fetchNotifications();
  }, []);

  return (
    <div className="w-screen">
      <NotificationUI data={notificationMessages} />
    </div>
  );
};

export default MyNotificationsPage;
