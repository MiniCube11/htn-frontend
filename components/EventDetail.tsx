import { TEvent } from "@/lib/type";
import { formatTime, formatEventType, formatDateLong } from "@/lib/utils";
import Link from "next/link";
import { Heart } from "lucide-react";

export default function EventDetail({ event, events, closeEvent, toggleLike, isLiked, setEventOpen }: { event: TEvent; events: TEvent[], closeEvent: () => void; toggleLike: (id: number) => void; isLiked: (id: number) => boolean; setEventOpen: (id: number | null) => void }) {
  const date = formatDateLong(event.start_time);
  const startTime = formatTime(event.start_time);
  const endTime = formatTime(event.end_time);
  const eventType = formatEventType(event.event_type);

  const bgColour = eventType === "Workshop" ? "bg-[#ABEDD7]" : eventType === "Activity" ? "bg-[#EBD2F0]" : "bg-[#BCCAF6]";
  const textColour = eventType === "Workshop" ? "text-[#125b41]" : eventType === "Activity" ? "text-[#78228c]" : "text-[#213789]";

  return (
    <div 
      className="fixed top-0 left-0 w-full h-full flex flex-col items-center justify-center">
      <div onClick={closeEvent} className="absolute top-0 left-0 w-full h-full bg-[#e1e1e152] z-[-10]" />
      <div className="bg-white border border-gray-300 rounded-lg px-8 py-6 w-[90vw] lg:w-[600px] shadow-lg">
        <div className="w-full flex justify-start">
          <button className="transition hover:text-gray-500" onClick={() => setEventOpen(null)}>
            <span className="mr-2">←</span>
            Back to events
          </button>
        </div>
        <div className="mt-4 flex justify-between items-center w-[calc(90vw-64px)] lg:w-[536px]">
          <h2 className="text-xl font-semibold">{event.name}</h2>
          <Heart
            size={18}
            onClick={() => toggleLike(event.id)}
            className={isLiked(event.id) ? "fill-[#FF3040] stroke-[#FF3040]" : "stroke-[#9fa8b9] hover:stroke-[#f05d6a]"}
          />
        </div>
        <div className="block mt-0.5 w-[90vw] lg:w-[600px]">
          <div className="flex">
            {event.speakers && event.speakers.length > 0 &&
              <p className="text-gray-600 text-sm">Hosted by {event.speakers[0].name}</p>
            }
          </div>

          <span
            className={`text-xs mt-2 ${textColour} inline-block px-1.5 py-0.5 rounded-md ${bgColour}`}>
            {eventType}
          </span>
          <span className="text-xs mt-2 ml-2 text-[#1f474c] bg-[#ceeff3] inline-block px-1.5 py-0.5 rounded-md">
            {event.permission === "public" ? "Public" : "Private"}
          </span>

          <div className="flex items-center mt-6 ml-[-5px] w-[calc(90vw-64px)] lg:w-[536px]">
            <p className="text-3xl">📆</p>
            <div className="ml-3">
              <p className="mr-5 font-medium">{date}</p>
              <p className="text-sm text-gray-700 mr-5">{startTime} - {endTime}</p>
            </div>
          </div>
        </div>

        <div className="mt-4">
          <Link
            href={event.private_url}
            target="_blank"
            rel="noopener noreferrer"
            className="text-blue-500 hover:underline hover:text-blue-700 inline-block">
            Private URL ↗
          </Link>
          <br />
          {event.public_url && (
            <Link
              href={event.public_url}
              target="_blank"
              rel="noopener noreferrer"
              className="text-blue-500 hover:underline hover:text-blue-700 inline-block">
              Public URL ↗
            </Link>
          )}
        </div>

        <div className="mt-5 text-base">
          <p>{event.description}</p>
        </div>

        {event.related_events && 
          <>
            <div className="h-[0.5px] bg-gray-300 mt-6 mb-4" />
            <div>
              <p>Related Events</p>
              <div className="">
                {event.related_events.map((relatedEvent) => (
                  <button
                    key={relatedEvent}
                    className="text-blue-500 hover:underline hover:text-blue-700 block"
                    onClick={() => setEventOpen(relatedEvent)}>
                    {events.find(event => event.id === relatedEvent)?.name ?? ""}
                  </button>
                ))}
              </div>
            </div>
          </>
        }

      </div>
    </div>
  );
}