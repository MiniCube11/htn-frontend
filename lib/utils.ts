import { TEvent } from "@/lib/type";

export async function getEvents() : Promise<TEvent[]> {
  const events = await fetch("https://api.hackthenorth.com/v3/events");
  const eventsData = await events.json();

  eventsData.sort((a: TEvent, b: TEvent) => a.start_time - b.start_time);

  return eventsData;
}

export function filterEventsByPermission(events: TEvent[], username: string) {
  if (username === "") {
    console.log(events.filter((event) => event.permission === "public"));
    return events.filter((event) => event.permission === "public");
  }

  return events;
}

export function formatDate(time: number) {
  const date = new Date(time);

  return {
    month: date.toLocaleString("default", { month: "short" }),
    day: date.getDate(),
  }
}

export function formatDateLong(time: number) {
  const date = new Date(time);

  return date.toLocaleString("default", { weekday: "long" }) + ", " + date.toLocaleString("default", { month: "long" }) + " " + date.getDate();
}

export function formatTime(time: number) {
  return new Date(time).toLocaleTimeString("en-us", { hour: "numeric", minute: "2-digit", hour12: true });
}

export function formatEventType(eventType: string) {
  switch (eventType) {
    case "workshop":
      return "Workshop";
    case "tech_talk":
      return "Tech Talk";
    case "activity":
      return "Activity";
    default:
      return "";
  }
}

export function authenticateUser(username: string, password: string) {
  return username === "hacker" && password === "htn2025";
}