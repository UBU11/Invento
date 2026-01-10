"use client"

import { useEvents } from "@/src/context/EventContext"
import EventScheduleItem from "./EventScheduleItem"

export default function EventScheduleList() {
  const { events } = useEvents()

  return (
    <div className="w-full">
      {events.map((event) => (
        <EventScheduleItem key={event.id} event={event} />
      ))}
    </div>
  )
}
