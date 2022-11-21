import { FC } from 'react';

import MainHeader from './main-header';

interface LayoutProps {
  children: JSX.Element | JSX.Element[] | string;
}

const Layout: FC<LayoutProps> = ({ children }) => {
  return (
    <>
      <MainHeader />
      <main>{children}</main>
    </>
  );
};

export default Layout;
