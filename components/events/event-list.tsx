import { FC } from 'react';
import { getAllEvents } from '../../dummy-data';
import EventItem from './event-item';

import classes from './event-list.module.css';

interface EventListProps {
  items: ReturnType<typeof getAllEvents>;
}

const EventList: FC<EventListProps> = ({ items }) => {
  return (
    <ul className={classes.list}>
      {items.map((item) => (
        <EventItem key={item.id} event={item} />
      ))}
    </ul>
  );
};

export default EventList;
