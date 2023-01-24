import { FC, useContext } from 'react';

import Notification from '../ui/notification';
import MainHeader from './main-header';
import NotificationContext from '../../store/notification-context';

interface LayoutProps {
  children: JSX.Element | JSX.Element[] | string;
}

const Layout: FC<LayoutProps> = ({ children }) => {
  const notificationContext = useContext(NotificationContext);

  const activeNotification = notificationContext.notification;

  return (
    <>
      <MainHeader />
      <main>{children}</main>
      {activeNotification ? (
        <Notification
          title={activeNotification.title}
          message={activeNotification.message}
          status={activeNotification.status}
        />
      ) : null}
    </>
  );
};

export default Layout;
