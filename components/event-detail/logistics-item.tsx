import { FC } from 'react';
import classes from './logistics-item.module.css';

interface LogisticsItemProps {
  icon: JSX.Element;
  children: JSX.Element[] | JSX.Element | string;
}

const LogisticsItem: FC<LogisticsItemProps> = ({ icon, children }) => {
  return (
    <li className={classes.item}>
      <span className={classes.icon}>{icon}</span>
      <span className={classes.content}>{children}</span>
    </li>
  );
};

export default LogisticsItem;
