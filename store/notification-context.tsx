import { createContext, FC, useState } from 'react';
import { NotificationType } from '../types/notification';

interface NotificationContextProps {
  notification: NotificationType | null;
  showNotification: (notificationData: NotificationType) => void;
  hideNotification: VoidFunction;
}

const defaultState = {
  notification: null,
  showNotification: function (notificationData: NotificationType) {},
  hideNotification: function () {},
};

const NotificationContext =
  createContext<NotificationContextProps>(defaultState);

interface NotificationContextProviderProps {
  children: React.ReactNode;
}

export const NotificationContextProvider: FC<
  NotificationContextProviderProps
> = ({ children }) => {
  const [activeNotification, setActiveNotification] =
    useState<NotificationType | null>(null);

  const showNotificationHandler = (notificationData: NotificationType) => {
    setActiveNotification(notificationData);
  };

  const hideNotificationHandler = () => {
    setActiveNotification(null);
  };

  const context = {
    notification: activeNotification,
    showNotification: showNotificationHandler,
    hideNotification: hideNotificationHandler,
  };

  return (
    <NotificationContext.Provider value={context}>
      {children}
    </NotificationContext.Provider>
  );
};

export default NotificationContext;
