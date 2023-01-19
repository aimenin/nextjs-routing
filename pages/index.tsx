import EventList from '../components/events/event-list';
import { getAllEvents, getFeaturedEvents } from '../api/events';
import { GetStaticProps } from 'next';
import { FC } from 'react';
import { Event } from '../types/mainTypes';

interface HomePageProps {
  events: Event[];
}

const HomePage: FC<HomePageProps> = ({ events }) => {
  return (
    <div>
      <EventList items={events} />
    </div>
  );
};

export const getStaticProps: GetStaticProps = async () => {
  const events = await getAllEvents();
  const featuredEvents = getFeaturedEvents(events);

  return {
    props: {
      events: featuredEvents,
    },
  };
};

export default HomePage;
