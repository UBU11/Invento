"use client";

import { useState } from "react";
import { useEvents } from "@/src/context/EventContext";
import { Event, EventCategory } from "@/src/types/event";
import EventModal from "./EventModal";

const categories: (EventCategory | "ALL")[] = [
  "ALL",
  "PROSHOW",
  "WORKSHOP",
  "SAPTHA",
  "NATYA",
  "TECH",
  "GENERAL",
  "TAKSATHI",
  "MERCH"
];

const categoryColors: Record<EventCategory | "ALL", string> = {
  WORKSHOP: "bg-blue-600",
  SAPTHA: "bg-fuchsia-600",
  NATYA: "bg-pink-600",
  TECH: "bg-indigo-500",
  GENERAL: "bg-gray-500",
  MERCH: "bg-violet-600",
  TAKSATHI: "bg-amber-700",
  PROSHOW: "bg-red-500",
  ALL: "bg-red-600",
};

export default function EventTable({
  activeDay,
  onModalChange,
}: {
  activeDay: 1 | 2 | 3;
  onModalChange: (open: boolean) => void;
}) {
  const { events } = useEvents();

  const [open, setOpen] = useState(false);
  const [active, setActive] = useState<EventCategory | "ALL">("ALL");
  const [selectedEvent, setSelectedEvent] = useState<Event | null>(null);
  const [search, setSearch] = useState("");

  // ================= FILTERING (category + day + search) =================
  const dayFilteredEvents = events
    .filter((e) => active === "ALL" || e.category === active)
    .filter((e) => e.day === activeDay)
    .filter((e) =>
      (e.title + " " + e.description + " " + e.venue)
        .toLowerCase()
        .includes(search.toLowerCase()),
    );

  return (
    <div className="w-full relative">
      {/* ================= MOBILE SEARCH + FILTER ================= */}
      <div className="md:hidden relative flex items-center gap-2 px-4 -top-8">
        <button
          onClick={() => setOpen(!open)}
          className="flex items-center gap-2 border border-white/50 px-3 py-1 text-[10px] uppercase tracking-widest font-akira bg-bg"
        >
          <img src="/event/filter.svg" className="w-4 h-4" />
          {active === "ALL" ? "Filter" : active}
        </button>

        <input
          type="text"
          placeholder="Search..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="flex-1 border border-white/40 bg-transparent px-3 py-1 text-xs font-sans outline-none"
        />

        {open && (
          <div className="absolute top-12 left-4 backdrop-blur-md p-4 grid gap-2 z-30 w-48">
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => {
                  setActive(cat);
                  setOpen(false);
                }}
                className={`py-2 text-xs uppercase tracking-widest text-white font-akira ${categoryColors[cat]}`}
              >
                {cat}
              </button>
            ))}
          </div>
        )}
      </div>

      {/* ================= DESKTOP HEADER ================= */}
      <div className="hidden md:flex items-center px-6 pb-4 border-b border-white/40 text-xs sticky top-0 z-10 bg-bg">
        <div className="flex-[7] flex items-center gap-6 pl-4 relative">
          {/* FILTER */}
          <button
            onClick={() => setOpen(!open)}
            className="flex items-center gap-2 border border-white/50 px-4 py-2 uppercase tracking-widest font-akira"
          >
            <img src="/event/filter.svg" className="w-4 h-4" />
            {active === "ALL" ? "Filter" : active}
          </button>
          <span className="ml-19 uppercase tracking-[0.25em] text-sm font-akira">
            Event
          </span>

          {/* SEARCH */}
          <input
            type="text"
            placeholder="Search events..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="ml-9 border border-white/40 bg-transparent px-4 py-2 text-xs font-sans w-64 outline-none placeholder-gray-400"
          />

          {open && (
            <div className="absolute top-12 left-4 backdrop-blur-md p-8 grid grid-cols-2 gap-x-10 gap-y-6 z-30">
              {categories.map((cat) => (
                <button
                  key={cat}
                  onClick={() => {
                    setActive(cat);
                    setOpen(false);
                  }}
                  className={`w-48 py-3 uppercase tracking-widest text-white font-akira ${categoryColors[cat]}`}
                >
                  {cat}
                </button>
              ))}
            </div>
          )}
        </div>

        <div className="flex-[2] uppercase tracking-wide font-semibold">
          Time
        </div>
        <div className="flex-[2] uppercase tracking-wide font-semibold">
          Venue
        </div>
        <div className="flex-[1]" />
      </div>

      {/* ================= EVENTS LIST ================= */}
      <div className="max-h-[45vh] overflow-y-auto pr-2">
        {dayFilteredEvents.map((event) => (
          <div
            key={event.id}
            onClick={() => {
              setSelectedEvent(event);
              onModalChange(true);
            }}
            className="flex flex-col md:flex-row md:items-center px-6 py-8 md:py-10 border-b border-white/30 cursor-pointer hover:bg-white/5 transition"
          >
            {/* LEFT */}
            <div className="flex-[7] flex gap-6">
              <img
                src={event.poster}
                alt={event.title}
                className="w-24 md:w-32 h-32 md:h-44 object-cover border border-white/30 flex-shrink-0"
              />

              <div>
                <span
                  className={`inline-flex justify-center items-center mb-4 w-32 md:w-48 py-1.5 text-[10px] md:text-xs uppercase tracking-widest font-akira text-white ${categoryColors[event.category]}`}
                >
                  {event.category}
                </span>

                <h3 className="text-sm md:text-2xl font-akira uppercase tracking-wide">
                  {event.title}
                </h3>

                <p className="mt-2 text-xs md:text-sm text-gray-300 font-sans max-w-[360px] line-clamp-3">
                  {event.description}
                </p>
              </div>
            </div>

            <div className="hidden md:flex md:flex-[2] text-sm font-semibold">
              {event.time}
            </div>

            <div className="hidden md:flex md:flex-[2] text-sm font-semibold">
              {event.venue}
            </div>

            <div className="flex md:flex-[1] md:justify-end mt-3 md:mt-0">
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  window.open(event.registration, "_blank");
                }}
                className="bg-red-600 px-5 py-2 text-xs uppercase tracking-widest font-akira hover:bg-red-700 transition"
              >
                Register
              </button>
            </div>
          </div>
        ))}
      </div>

      {/* ================= MODAL ================= */}
      {selectedEvent && (
        <EventModal
          event={selectedEvent}
          onClose={() => {
            setSelectedEvent(null);
            onModalChange(false);
          }}
        />
      )}
    </div>
  );
}
