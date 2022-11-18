import { FC } from 'react';
import classes from './event-content.module.css';

interface EventContentProps {
  children: JSX.Element[] | JSX.Element | string;
}

const EventContent: FC<EventContentProps> = ({ children }) => {
  return <section className={classes.content}>{children}</section>;
};

export default EventContent;
