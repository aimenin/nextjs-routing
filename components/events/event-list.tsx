import { FC } from 'react';
import { getAllEvents } from '../../dummy-data';
import { Event } from '../../types/mainTypes';
import EventItem from './event-item';

import classes from './event-list.module.css';

interface EventListProps {
  items: Event[];
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
