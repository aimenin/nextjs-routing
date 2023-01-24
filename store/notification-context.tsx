import { createContext, FC, useEffect, useState } from 'react';
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

  useEffect(() => {
    if (
      activeNotification &&
      (activeNotification.status === 'success' ||
        activeNotification.status === 'error')
    ) {
      const timeout = setTimeout(() => {
        hideNotificationHandler();
      }, 3000);

      return () => {
        clearTimeout(timeout);
      };
    }
  }, [activeNotification]);

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
