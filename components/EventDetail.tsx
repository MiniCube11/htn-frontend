import { TEvent } from "@/lib/type";
import { formatDate, formatTime, formatEventType, formatDateLong } from "@/lib/utils";
import Link from "next/link";

export default function EventDetail({ event, closeEvent }: { event: TEvent; closeEvent: () => void }) {
  const date = formatDateLong(event.start_time);
  const startTime = formatTime(event.start_time);
  const endTime = formatTime(event.end_time);
  const eventType = formatEventType(event.event_type);

  return (
    <div 
      className="fixed top-0 left-0 w-full h-full flex flex-col items-center justify-center">
      <div onClick={closeEvent} className="absolute top-0 left-0 w-full h-full bg-[#e1e1e152] z-[-10]" />
      <div className="bg-white rounded-lg px-8 py-6 w-[90vw] lg:w-[600px]">
        <div className="flex justify-between items-center w-[calc(90vw-64px)] lg:w-[536px]">
          <h2 className="text-xl font-medium">{event.name}</h2>
          <a href="#">Save</a>
        </div>
        <div className="block mt-1 w-[90vw] lg:w-[600px]">
          <div className="flex">
            {event.speakers && event.speakers.length > 0 &&
              <p className="text-gray-700">Hosted by {event.speakers[0].name}
                <span className="inline-block mx-2">|</span>
              </p>
            }
            <p>{event.event_type}</p>
          </div>
          <p className="mr-5 mt-3">{date}</p>
          <p className="text-sm text-gray-700 mr-5">{startTime} - {endTime}</p>
        </div>
        <div className="flex flex-col mt-3">
          <p>Links</p>
          <Link
            href={event.private_url}
            target="_blank"
            rel="noopener noreferrer"
            className="text-blue-500 underline hover:text-blue-700">
            Private URL -
          </Link>
          {event.public_url && (
            <Link
              href={event.public_url}
              target="_blank"
              rel="noopener noreferrer"
              className="text-blue-500 underline hover:text-blue-700">
              Public URL -
            </Link>
          )}
        </div>
        <div className="mt-5 text-base">
          <p>{event.description}</p>
        </div>
        
        <div>
          <p>Related Events</p>
          <div className="flex flex-wrap">
            {event.related_events.map((relatedEvent) => (
              <p
                key={relatedEvent}
                className="text-blue-500 underline hover:text-blue-700">
                {relatedEvent}
              </p>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}