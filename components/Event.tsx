import { TEvent } from "@/lib/type";

export default function Event({ event }: { event: TEvent }) {
  return (
    <div className="border p-4 my-4 hover:bg-gray-50 transition">
        <h2>{event.name}</h2>
        <p>{event.start_time}</p>
    </div>
  )
}