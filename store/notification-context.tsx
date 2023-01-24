import { createContext, FC } from 'react';

interface NotificationContextProps {
  notification: null;
  showNotification: VoidFunction;
  hideNotification: VoidFunction;
}

const defaultState = {
  notification: null,
  showNotification: function () {},
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
  return (
    <NotificationContext.Provider value={defaultState}>
      {children}
    </NotificationContext.Provider>
  );
};

export default NotificationContext;
