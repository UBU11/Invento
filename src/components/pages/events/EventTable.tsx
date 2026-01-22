"use client"

import { useState } from "react"
import { useEvents } from "@/src/context/EventContext"
import { Event, EventCategory } from "@/src/types/event"
import EventModal from "./EventModal"

const categories: (EventCategory | "ALL")[] = [
  "ALL",
  "WORKSHOP",
  "SAPTHA",
  "NATYA",
  "TECH",
  "GENERAL",
]

const categoryColors: Record<string, string> = {
  WORKSHOP: "bg-red-600",
  SAPTHA: "bg-fuchsia-600",
  NATYA: "bg-pink-600",
  TECH: "bg-indigo-500",
  GENERAL: "bg-gray-500",
  ALL: "bg-red-600",
}

export default function EventTable({
  activeDay,
  onModalChange,
}: {
  activeDay: 1 | 2 | 3
  onModalChange: (open: boolean) => void
}) {
  const { events } = useEvents()
  const [open, setOpen] = useState(false)
  const [active, setActive] = useState<EventCategory | "ALL">("ALL")
  const [selectedEvent, setSelectedEvent] = useState<Event | null>(null)

  const filteredEvents =
    active === "ALL"
      ? events
      : events.filter(e => e.category === active)

  const dayFilteredEvents = filteredEvents.filter(
    e => e.day === activeDay
  )

  return (
    <div className="w-full relative">

      <div className="md:hidden relative">
        <button
          onClick={() => setOpen(!open)}
          className="absolute -top-8 left-9 flex items-center gap-2 border border-white/50 px-2 py-0.5 text-[10px] uppercase font-semibold tracking-wider z-20 bg-bg"
        >
          <img src="/event/filter.svg" className="w-4 h-4" />
          Filter
        </button>

        {open && (
          <div className="absolute top-12 left-4 backdrop-blur-md p-4 md:p-8 grid grid-cols-1 md:grid-cols-2 gap-2 md:gap-x-10 md:gap-y-6 z-30 w-48">
            {categories.map(cat => (
              <button
                key={cat}
                onClick={() => {
                  setActive(cat)
                  setOpen(false)
                }}
                className={`w-full md:w-48 py-2 md:py-3 text-xs md:text-sm font-extrabold uppercase tracking-widest text-white font-akira
                  ${categoryColors[cat]}
                `}
              >
                {cat}
              </button>
            ))}
          </div>
        )}
      </div>

      <div className="hidden md:flex items-center px-6 pb-4 border-b border-white/40 text-xs sticky top-0 z-10 bg-bg">
        <div className="flex-[7] flex items-center gap-8 pl-4 relative">
          <button
            onClick={() => setOpen(!open)}
            className="flex items-center gap-2 border border-white/50 px-3 py-1.5 uppercase font-semibold tracking-wider"
          >
            <img src="/event/filter.svg" className="w-8 h-4" />
            Filter
          </button>

          <span className="uppercase tracking-[0.25em] text-sm pl-35 ">
            Event
          </span>

          {open && (
            <div className="absolute top-12 left-4 backdrop-blur-md p-8 grid grid-cols-2 gap-x-10 gap-y-6 z-30">
              {categories.map(cat => (
                <button
                  key={cat}
                  onClick={() => {
                    setActive(cat)
                    setOpen(false)
                  }}
                  className={`w-48 py-3 text-sm font-extrabold uppercase tracking-widest text-white font-akira
                    ${categoryColors[cat]}
                  `}
                >
                  {cat}
                </button>
              ))}
            </div>
          )}
        </div>

        <div className="flex-[2] uppercase tracking-wide -ml-52">Time</div>
        <div className="flex-[2] uppercase tracking-wide -ml-15">Venue</div>
        <div className="flex-[1]" />
      </div>

      <div className="max-h-[65vh] overflow-y-auto pr-2">
        {dayFilteredEvents.map(event => (
          <div
            key={event.id}
            onClick={() => {
              setSelectedEvent(event)
              onModalChange(true)
            }}
            className="flex flex-col md:flex-row md:items-center px-6 py-8 md:py-10 border-b border-white/30 cursor-pointer hover:bg-white/5 transition"
          >
            <div className="flex-[7] flex gap-4 md:gap-8 pl-0 md:pl-4 mb-4 md:mb-0">
              <img
                src={event.poster}
                alt={event.title}
                className="w-24 md:w-32 h-32 md:h-44 object-cover border border-white/30 flex-shrink-0"
              />

              <div>
                <span
                  className={`inline-flex justify-center items-center mb-4 w-32 md:w-48 py-1 md:py-2 text-[10px] md:text-xs font-extrabold uppercase tracking-widest font-akira text-white
                    ${categoryColors[event.category]}
                  `}
                >
                  {event.category}
                </span>

                <h3 className="text-[11px] md:text-2xl font-extrabold uppercase font-akira" style={{ fontFamily: "var(--font-akira), sans-serif" }}>
                  {event.title}
                </h3>

                <p className="mt-3 max-w-[340px] text-[10px] md:text-sm text-gray-300 leading-snug" style={{ fontFamily: "'Urbanist', sans-serif" }}>
                  {event.description}
                </p>
              </div>
            </div>

            <div className="hidden md:flex md:flex-[2] text-sm font-semibold -ml-6">
              {event.time}
            </div>

            <div className="hidden md:flex md:flex-[2] text-sm font-semibold text-center">
              {event.venue}
            </div>

            <div className="flex flex-row-reverse md:flex-row md:flex-[1] md:text-right md:pl-6 gap-4 mt-1 md:mt-0 w-full md:w-auto items-start iphone-14-pro-max-button-adjust">
              <div className="md:hidden text-[9px] font-semibold flex-1">
                <div className="flex gap-1">
                  <span className="text-red-600">Time:</span>
                  <span className="text-white">{event.time}</span>
                </div>
                <div className="flex gap-1">
                  <span className="text-red-600">Venue:</span>
                  <span className="text-white">{event.venue}</span>
                </div>
              </div>
             
<a
  href={event.links?.registration ?? "#"}
  target="_blank"
  rel="noopener noreferrer"
  onClick={(e) => e.stopPropagation()}
  className="bg-red-600 px-4 md:px-7 py-1.5 md:py-2.5 text-[10px] md:text-xs font-bold uppercase hover:bg-red-700 md:flex-none whitespace-nowrap flex-shrink-0 inline-flex items-center justify-center"
>
  Register
</a>


            </div>
          </div>
        ))}
      </div>

      {selectedEvent && (
        <EventModal
          event={selectedEvent}
          onClose={() => {
            setSelectedEvent(null)
            onModalChange(false)
          }}
        />
      )}
    </div>
  )
}
