import { TEvent } from "@/lib/type";

export async function getEvents() : Promise<TEvent[]> {
  const events = await fetch("https://api.hackthenorth.com/v3/events");
  const eventsData = await events.json();

  return eventsData;
}

export function formatDate(time: number) {
  const date = new Date(time);

  return {
    month: date.toLocaleString("default", { month: "short" }),
    day: date.getDate(),
  }
}

export function formatTime(time: number) {
  return new Date(time).toLocaleTimeString("en-us", { hour: "numeric", minute: "2-digit", hour12: true });
}