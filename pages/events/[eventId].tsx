import { GetStaticPaths, GetStaticProps } from 'next';
import { FC } from 'react';
import { getEvent, getAllEvents } from '../../api/events';
import EventContent from '../../components/event-detail/event-content';
import EventLogistics from '../../components/event-detail/event-logistics';
import EventSummary from '../../components/event-detail/event-summary';
import ErrorAlert from '../../components/ui/error-alert/error-alert';
import { Event } from '../../types/mainTypes';

interface EventDetailProps {
  selectedEvent: Event;
}

const EventDetail: FC<EventDetailProps> = ({ selectedEvent }) => {
  if (!selectedEvent) {
    return (
      <ErrorAlert>
        <p>No event found!</p>
      </ErrorAlert>
    );
  }

  return (
    <>
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
  };
};

export const getStaticPaths: GetStaticPaths = async () => {
  const events = await getAllEvents();

  const paths = events.map((event) => ({
    params: {
      eventId: event.id,
    },
  }));

  return {
    paths,
    fallback: true,
  };
};

export default EventDetail;
