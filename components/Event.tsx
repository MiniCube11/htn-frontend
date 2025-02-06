import { TEvent } from "@/lib/type";
import { formatDate, formatTime } from "@/lib/utils";

export default function Event({ event }: { event: TEvent }) {
  const { month, day } = formatDate(event.start_time);
  const startTime = formatTime(event.start_time);
  const endTime = formatTime(event.end_time);

  return (
    <div className="border p-4 my-4 hover:bg-gray-50 transition">
        <h2>{event.name}</h2>
        <p>{month}</p>
        <p>{day}</p>
        <p>{startTime}</p>
        <p>{endTime}</p>
    </div>
  )
}