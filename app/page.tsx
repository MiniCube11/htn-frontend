"use client";

import Cookies from "js-cookie";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";

import { getEvents } from "../lib/utils";
import Event from "../components/Event";
import { TEvent } from "@/lib/type";

export default function Home() {
  const router = useRouter();
  const [loading, setLoading] = useState(true);
  const [events, setEvents] = useState<TEvent[]>([]);

  useEffect(() => {
    const fetchEvents = async () => {
      const events = await getEvents();
      setEvents(events);
    };

    fetchEvents();

    if (Cookies.get("username")) {
      router.push("/");
    }

    setLoading(false);
  }, []);

  return (
    <div className="flex flex-col items-center w-full mt-24 mb-32">
      <h2 className="text-2xl font-bold w-[90vw] lg:w-[600px]">Events</h2>
      {loading && <p>Loading...</p>}
      <div className="mt-10">  
        {events.map((event) => (
          <Event event={event} />
        ))}
      </div>
    </div>
  );
}
