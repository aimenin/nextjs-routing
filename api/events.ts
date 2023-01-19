import { Event } from '../types/mainTypes';

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

export function getFeaturedEvents(events: Event[]) {
  return events.filter((event) => event.isFeatured);
}
