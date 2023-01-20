import { GetServerSideProps } from 'next';
import { useRouter } from 'next/router';
import { FC } from 'react';
import EventList from '../../components/events/event-list';
import ResultsTitle from '../../components/results-title/results-title';
import Button from '../../components/ui/button';
import ErrorAlert from '../../components/ui/error-alert/error-alert';
import { getFilteredEvents } from '../../api/events';
import { Event } from '../../types/mainTypes';
import Head from 'next/head';

interface FilteredEventsPageProps {
  hasError: boolean;
  events: Event[];
  filteredYear: number;
  filteredMonth: number;
}

const FilteredEventsPage: FC<FilteredEventsPageProps> = ({
  hasError,
  events,
  filteredYear,
  filteredMonth,
}) => {
  if (hasError) {
    return <p>Invalid filter. Please adjust ypur values</p>;
  }

  const pageHeadData = (
    <Head>
      <title>Filtered events</title>
      <meta
        name="description"
        content={`All events for ${filteredMonth}/${filteredYear}`}
      />
    </Head>
  );

  if (!events || events.length === 0) {
    return (
      <>
        {pageHeadData}
        <ErrorAlert>
          <p>No events found for chosen filter</p>
        </ErrorAlert>
        <div className="center">
          <Button href="/events" link>
            Show All Events
          </Button>
        </div>
      </>
    );
  }

  const date = new Date(filteredYear, filteredMonth - 1);

  return (
    <>
      {pageHeadData}
      <ResultsTitle date={date} />
      <EventList items={events} />
    </>
  );
};

export const getServerSideProps: GetServerSideProps = async (context) => {
  const { params } = context;

  let filteredEvents: Event[] = [];
  let filteredYear = 0;
  let filteredMonth = 0;

  if (params) {
    const filterData = params.slug;

    if (filterData) {
      filteredYear = Number(filterData[0]);
      filteredMonth = Number(filterData[1]);

      if (
        isNaN(filteredYear) ||
        isNaN(filteredMonth) ||
        filteredYear > 2030 ||
        filteredYear < 2021 ||
        filteredMonth < 1 ||
        filteredMonth > 12
      ) {
        return {
          props: {
            hasError: true,
          },
        };
      }

      filteredEvents = await getFilteredEvents({
        year: filteredYear,
        month: filteredMonth,
      });
    }
  }

  return {
    props: {
      events: filteredEvents,
      filteredYear,
      filteredMonth,
    },
  };
};

export default FilteredEventsPage;
