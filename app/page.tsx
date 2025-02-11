import { getEvents } from "../lib/utils";
import Event from "../components/Event";

export default async function Home() {
  const events = await getEvents();

  return (
    <div className="flex flex-col items-center w-full mb-32">
      <h2>Events</h2>
      {events.map((event) => (
        <Event event={event} />
      ))}
    </div>
  );
}
