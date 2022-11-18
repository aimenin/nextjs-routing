import { FC, useMemo } from 'react';
import Image from 'next/image';

import { getAllEvents } from '../../dummy-data';

import classes from './event-item.module.css';
import Button from '../ui/button';
import DateIcon from '../icons/date-icon';
import AddressIcon from '../icons/address-icon';
import ArrowRightIcon from '../icons/arrow-right-icon';

interface EventItemProps {
  event: ReturnType<typeof getAllEvents>[number];
}

const EventItem: FC<EventItemProps> = ({ event }) => {
  const formattedAddress = useMemo(
    () => event.location.replace(', ', '\n'),
    [event.location]
  );

  const exploreLink = `/events/${event.id}`;

  return (
    <li className={classes.item}>
      <Image
        src={'/' + event.image}
        alt={event.description}
        width={200}
        height={200}
      />
      <div className={classes.content}>
        <div className={classes.summary}>
          <h2>{event.title}</h2>
          <div className={classes.date}>
            <DateIcon />
            <time>
              {new Date(event.date).toLocaleDateString('en-US', {
                day: 'numeric',
                month: 'long',
                year: 'numeric',
              })}
            </time>
          </div>
          <div className={classes.address}>
            <AddressIcon />
            <address>{formattedAddress}</address>
          </div>
        </div>
        <div className={classes.actions}>
          <Button href={exploreLink}>
            <span>Explore Event</span>
            <span className={classes.icon}>
              <ArrowRightIcon />
            </span>
          </Button>
        </div>
      </div>
    </li>
  );
};

export default EventItem;
