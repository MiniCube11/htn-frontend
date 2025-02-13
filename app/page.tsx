"use client";

import Cookies from "js-cookie";
import { useEffect, useState } from "react";
import Link from "next/link";

import { getEvents, filterEventsByPermission, searchByQuery } from "../lib/utils";
import Event from "../components/Event";
import { TEvent } from "@/lib/type";
import EventDetail from "@/components/EventDetail";

import { Search } from "lucide-react";

export default function Home() {
  const [loading, setLoading] = useState(true);
  const [events, setEvents] = useState<TEvent[]>([]);
  const [username, setUsername] = useState("");
  const [eventOpen, setEventOpen] = useState<number | null>(null);
  const [searchQuery, setSearchQuery] = useState("");
  const [liked, setLiked] = useState<Record<number, boolean>>({});

  const openEvent = (id: number) => {
    setEventOpen(id);
  }

  const closeEvent = () => {
    setEventOpen(null);
  }

  const isLiked = (id: number) => {
    return liked[id] || false;
  }

  const toggleLike = (id: number) => {
    setLiked((prev) => ({ ...prev, [id]: !prev[id] }));
  }

  useEffect(() => {
    if (Cookies.get("username")) {
      setUsername(Cookies.get("username"));
    }

    const fetchEvents = async () => {
      const events = await getEvents();
      const filteredEvents = filterEventsByPermission(events, username);
      const searchedEvents = searchByQuery(filteredEvents, searchQuery);
      setEvents(searchedEvents);
    };

    fetchEvents();

    setLoading(false);
  }, [username, searchQuery]);

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
      
      <div className="relative w-[90vw] lg:w-[600px] mt-6">
        <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={18} />
        <input
          onChange={(e) => setSearchQuery(e.target.value)}
          placeholder="Search events"
          className="border border-gray-300 rounded-md pl-10 pr-2 py-1 w-full lg:w-80"
        />
      </div>

      {loading && <p>Loading...</p>}
      <div className="mt-10">  
        {events.map((event) => (
          <Event
            key={event.id}
            event={event}
            openEvent={openEvent}
            isLiked={isLiked}
            toggleLike={toggleLike}
          />
        ))}
      </div>

      {eventOpen !== null && 
        <EventDetail event={events[eventOpen]} closeEvent={closeEvent} />}
    </div>
  );
}
