import { TEvent } from "@/lib/type";

export async function getEvents() : Promise<TEvent[]> {
  const events = await fetch("https://api.hackthenorth.com/v3/events");
  const eventsData = await events.json();

  for (const event of eventsData) {
    event.start_time = formatTime(event.start_time);
    event.end_time = formatTime(event.end_time);
  }

  return eventsData;
}

function formatTime(time: number) {
  return new Date(time).toLocaleString();
}