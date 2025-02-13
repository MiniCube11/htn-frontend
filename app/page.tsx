"use client";

import Cookies from "js-cookie";
import { useEffect, useState } from "react";
import Link from "next/link";
import Image from "next/image";

import { getEvents, filterEventsByPermission, searchByQuery, filterEventsByType, filterLikedEvents } from "../lib/utils";
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
  const [filterBy, setFilterBy] = useState("");
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
      const filteredEventsByType = (filterBy === "liked" ? filterLikedEvents(filteredEvents, liked)
        : filterEventsByType(filteredEvents, filterBy));
      const searchedEvents = searchByQuery(filteredEventsByType, searchQuery);
      setEvents(searchedEvents);
    };

    fetchEvents();

    setLoading(false);
  }, [username, searchQuery, filterBy]);

  const handleLogout = () => {
    Cookies.remove("username");
    setUsername("");
  }

  return (
    <div className="flex flex-col items-center w-full mt-8 mb-32">
      <div className="w-[90vw] lg:w-[600px] flex justify-between items-center">
        <Image src={require('../public/htn.png')} alt="Hack the North" width={50} height={50} />
        <div> 
            {username ?
            <div className="flex p-1 w-28 justify-between">
              <button
              onClick={handleLogout}
              className="ml-2 text-gray-600 underline">
              Logout
              </button>
              <span className="bg-[#d1e7f5] text-gray-700 rounded-full w-8 h-8 flex items-center justify-center">
              {username[0].toUpperCase()}
              </span>
            </div>
            :
            <Link href="/login" className="ml-2 text-gray-600 underline">
              Login
            </Link>}
        </div>
      </div>

      <div className="mt-10 w-[90vw] lg:w-[600px] flex justify-between items-center">
        <h2 className="text-3xl font-bold">Events</h2>
      </div>
      
      <div className="relative flex flex-col lg:flex-row w-[90vw] lg:w-[600px] mt-6">
        <Search className="absolute left-3 top-1/4 lg:top-1/2 transform -translate-y-1/2 text-gray-400" size={18} />
        <div className="flex flex-col lg:flex-row w-full">
          <input
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search events"
            className="border border-gray-300 rounded-md pl-10 pr-2 py-2 w-full lg:w-[450px] lg:pl-10"
          />
          <select
            value={filterBy}
            onChange={(e) => setFilterBy(e.target.value)}
            className="border border-gray-300 rounded-md pl-2 pr-2 py-2 w-full lg:w-[150px] lg:ml-4 mt-2 lg:mt-0 bg-white text-gray-700"
          >
            <option value="" className="text-gray-700">All</option>
            <option value="workshop" className="text-gray-700">Workshop</option>
            <option value="tech_talk" className="text-gray-700">Tech Talk</option>
            <option value="activity" className="text-gray-700">Activity</option>
            <option value="liked" className="text-gray-700">Liked</option>
          </select>
        </div>
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
        <EventDetail
          event={events.find(event => event.id === eventOpen) as TEvent}
          events={events}
          closeEvent={closeEvent}
          isLiked={isLiked}
          toggleLike={toggleLike}
          setEventOpen={setEventOpen}
        />}
    </div>
  );
}
