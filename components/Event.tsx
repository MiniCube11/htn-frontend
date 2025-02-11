import { TEvent } from "@/lib/type";
import { formatDate, formatTime, formatEventType } from "@/lib/utils";

export default function Event({ event }: { event: TEvent }) {
  const { month, day } = formatDate(event.start_time);
  const startTime = formatTime(event.start_time);
  const endTime = formatTime(event.end_time);
  const eventType = formatEventType(event.event_type);

  return (
    <div key={event.id} className="w-[90vw] lg:w-[600px] border border-gray-200 rounded py-4 px-6 my-2 hover:bg-gray-50 transition">
      <h2 className="font-medium">{event.name}</h2>
      <div className="block lg:flex text-gray-700 text-sm mt-1">
        <p className="mr-5">{month} {day} {startTime} - {endTime}</p>
        {event.speakers && event.speakers.length > 0 &&
          <p>{event.speakers[0].name}</p>
        }
      </div>
      <span className="text-xs mt-2 text-gray-700 border border-gray-300 inline-block px-1 py-0.5 rounded-md">
        {eventType}
      </span>
      <span className="text-xs mt-2 ml-2 text-gray-700 border border-gray-300 inline-block px-1 py-0.5 rounded-md">
        {event.permission === "public" ? "Public" : "Private"}
      </span>
    </div>
  )
}