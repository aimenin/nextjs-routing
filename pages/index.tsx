import { FC } from 'react';
import { GetStaticProps } from 'next';
import Head from 'next/head';

import { getAllEvents, getFeaturedEvents } from '../api/events';
import { Event } from '../types/mainTypes';
import EventList from '../components/events/event-list';
import NewsletterRegistration from '../components/input/newsletter-registration';

interface HomePageProps {
  events: Event[];
}

const HomePage: FC<HomePageProps> = ({ events }) => {
  return (
    <div>
      <Head>
        <title>NextJS Events</title>
        <meta
          name="description"
          content="Find a lot of great events that allow you to evolve"
        />
      </Head>
      <NewsletterRegistration />
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
    revalidate: 1800,
  };
};

export default HomePage;
