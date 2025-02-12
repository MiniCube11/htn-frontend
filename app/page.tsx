"use client";

import Cookies from "js-cookie";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";

import { getEvents, filterEventsByPermission } from "../lib/utils";
import Event from "../components/Event";
import { TEvent } from "@/lib/type";
import EventDetail from "@/components/EventDetail";

export default function Home() {
  const router = useRouter();
  const [loading, setLoading] = useState(true);
  const [events, setEvents] = useState<TEvent[]>([]);
  const [username, setUsername] = useState("");
  const [eventOpen, setEventOpen] = useState<number | null>(null);

  const openEvent = (id: number) => {
    setEventOpen(id);
  }

  const closeEvent = () => {
    setEventOpen(null);
  }

  useEffect(() => {
    if (Cookies.get("username")) {
      setUsername(Cookies.get("username"));
    }

    const fetchEvents = async () => {
      const events = await getEvents();
      setEvents(filterEventsByPermission(events, username));
    };

    fetchEvents();

    setLoading(false);
  }, [username]);

  const handleLogout = () => {
    Cookies.remove("username");
    setUsername("");
  }

  return (
    <div className="flex flex-col items-center w-full mt-24 mb-32">
      <div className="w-[90vw] lg:w-[600px] flex justify-between">
        <h2 className="text-2xl font-bold">Events</h2>
        <div> 
          {username ?
            <div className="flex">
              <p>{username}</p>
              <button
                onClick={handleLogout}
                className="ml-2 text-gray-600 underline">
                Logout
              </button>
            </div>
            :
            <Link href="/login" className="text-blue-500 underline">
              Login
            </Link>}
        </div>
      </div>
      
      {loading && <p>Loading...</p>}
      <div className="mt-10">  
        {events.map((event) => (
          <Event key={event.id} event={event} openEvent={openEvent} />
        ))}
      </div>

      {eventOpen !== null && 
        <EventDetail event={events[eventOpen]} closeEvent={closeEvent} />}
    </div>
  );
}
