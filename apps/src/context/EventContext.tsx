"use client"

import { createContext, useContext } from "react"
import { eventsData } from "@/src/data/events"
import { Event } from "@/src/types/event"

interface EventContextType {
  events: Event[]
}

const EventContext = createContext<EventContextType | null>(null)

export function EventProvider({ children }: { children: React.ReactNode }) {
  return (
    <EventContext.Provider value={{ events: eventsData }}>
      {children}
    </EventContext.Provider>
  )
}

export function useEvents() {
  const context = useContext(EventContext)
  if (!context) {
    throw new Error("useEvents must be used inside EventProvider")
  }
  return context
}
