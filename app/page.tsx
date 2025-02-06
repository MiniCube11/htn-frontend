import { getEvents } from "../lib/utils";
import Event from "../components/Event";

export default async function Home() {
  const events = await getEvents();

  return (
    <div>
      <h2>Events</h2>
      {events.map((event) => (
        <Event event={event} />
      ))}
    </div>
  );
}
