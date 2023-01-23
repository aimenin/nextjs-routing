import { GetStaticPaths, GetStaticProps } from 'next';
import Head from 'next/head';
import { FC } from 'react';
import { getEvent, getAllEvents, getFeaturedEvents } from '../../api/events';
import EventContent from '../../components/event-detail/event-content';
import EventLogistics from '../../components/event-detail/event-logistics';
import EventSummary from '../../components/event-detail/event-summary';
import Comments from '../../components/input/comments';
import ErrorAlert from '../../components/ui/error-alert/error-alert';
import { Event } from '../../types/mainTypes';

interface EventDetailProps {
  selectedEvent: Event;
}

const EventDetail: FC<EventDetailProps> = ({ selectedEvent }) => {
  if (!selectedEvent) {
    return (
      <div className="center">
        <p>Loading...</p>
      </div>
    );
  }

  return (
    <>
      <Head>
        <title>{selectedEvent.title}</title>
        <meta
          name="description"
          content="Find a lot of great events that allow you to evolve"
        />
      </Head>
      <EventSummary title={selectedEvent.title} />
      <EventLogistics
        address={selectedEvent.location}
        date={selectedEvent.date}
        image={selectedEvent.image}
        imageAlt={selectedEvent.title}
      />
      <EventContent>
        <p>{selectedEvent.description}</p>
      </EventContent>
      <Comments eventId={selectedEvent.id} />
    </>
  );
};

export const getStaticProps: GetStaticProps = async (context) => {
  let event = {};

  if (context.params) {
    const eventId = context.params.eventId;
    if (typeof eventId === 'string') {
      event = await getEvent(eventId);
    }
  }

  return {
    props: {
      selectedEvent: event,
    },
    revalidate: 30,
  };
};

export const getStaticPaths: GetStaticPaths = async () => {
  const events = await getAllEvents();
  const featuredEvents = getFeaturedEvents(events);

  const paths = featuredEvents.map((event) => ({
    params: {
      eventId: event.id,
    },
  }));

  return {
    paths,
    fallback: 'blocking',
  };
};

export default EventDetail;
