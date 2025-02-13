import { TEvent } from "@/lib/type";
import { formatDate, formatTime, formatEventType } from "@/lib/utils";
import { Heart } from "lucide-react";

export default function Event({ event, openEvent, toggleLike, isLiked }: { event: TEvent; openEvent: (id: number) => void; toggleLike: (id: number) => void; isLiked: (id: number) => boolean }) {
  const { month, day } = formatDate(event.start_time);
  const startTime = formatTime(event.start_time);
  const endTime = formatTime(event.end_time);
  const eventType = formatEventType(event.event_type);
  const bgColour = eventType === "Workshop" ? "bg-[#ABEDD7]" : eventType === "Activity" ? "bg-[#EBD2F0]" : "bg-[#BCCAF6]";
  const textColour = eventType === "Workshop" ? "text-[#125b41]" : eventType === "Activity" ? "text-[#78228c]" : "text-[#213789]";

  return (
    <div key={event.id}
      onClick={() => openEvent(event.id)}
      className="relative w-[90vw] lg:w-[600px] border border-gray-200 rounded py-4 px-8 my-3 hover:bg-gray-50 transition">
      <div className={`absolute rounded-l left-0 top-0 w-[5px] h-full ${bgColour}`}></div>
      <div className="flex justify-between items-center">
        <h2 className="font-medium">{event.name}</h2>
        <Heart
          size={18}
          onClick={(e) => {
            e.stopPropagation();
            toggleLike(event.id);
          }}
          className={isLiked(event.id) ? "fill-[#FF3040] stroke-[#FF3040]" : "stroke-[#9fa8b9] hover:stroke-[#f05d6a]"}
        />
      </div>
      <div className="block lg:flex text-gray-700 text-sm mt-1">
        <p className="mr-5">📆 {month} {day} {startTime} - {endTime}</p>
        {event.speakers && event.speakers.length > 0 &&
          <p>🗣️ {event.speakers[0].name}</p>
        }
      </div>
      <span
        className={`text-xs mt-2 ${textColour} inline-block px-1.5 py-0.5 rounded-md ${bgColour}`}>
        {eventType}
      </span>
      <span className="text-xs mt-2 ml-2 text-[#1f474c] bg-[#ceeff3] inline-block px-1.5 py-0.5 rounded-md">
        {event.permission === "public" ? "Public" : "Private"}
      </span>
    </div>
  )
}
