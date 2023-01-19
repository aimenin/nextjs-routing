import { FC, FunctionComponent } from 'react';
import classes from './logistics-item.module.css';

interface LogisticsItemProps {
  icon: FunctionComponent<{}>;
  children: JSX.Element[] | JSX.Element | string;
}

const LogisticsItem: FC<LogisticsItemProps> = ({ icon: Icon, children }) => {
  return (
    <li className={classes.item}>
      <span className={classes.icon}>{<Icon />}</span>
      <span className={classes.content}>{children}</span>
    </li>
  );
};

export default LogisticsItem;
