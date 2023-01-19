import { DateFilter, Event } from '../types/mainTypes';

export async function getAllEvents(): Promise<Event[]> {
  const response = await fetch(
    'https://events-app-6689b-default-rtdb.europe-west1.firebasedatabase.app/events.json'
  );
  const data: Record<string, Omit<Event, 'id'>> = await response.json();
  const events: Event[] = [];
  for (const key in data) {
    events.push({
      id: key,
      ...data[key],
    });
  }
  return events;
}

export async function getEvent(id: string): Promise<Event> {
  const response = await fetch(
    `https://events-app-6689b-default-rtdb.europe-west1.firebasedatabase.app/events/${id}.json`
  );
  const data: Omit<Event, 'id'> = await response.json();
  const event = {
    id,
    ...data,
  };
  return event;
}

export function getFeaturedEvents(events: Event[]) {
  return events.filter((event) => event.isFeatured);
}

export async function getFilteredEvents(dateFilter: DateFilter) {
  const { year, month } = dateFilter;

  const events = await getAllEvents();

  let filteredEvents = events.filter((event) => {
    const eventDate = new Date(event.date);
    return (
      eventDate.getFullYear() === year && eventDate.getMonth() === month - 1
    );
  });

  return filteredEvents;
}
