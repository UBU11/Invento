import {
  EventScheduleHeader,
  EventScheduleFilters,
  EventScheduleList,
} from "../../components/events"

import { EventProvider } from "@/src/context/EventContext"

export default function EventPage() {
  return (
    <EventProvider>
      <main>
        <EventScheduleHeader />
        <EventScheduleFilters />
        <EventScheduleList />
      </main>
    </EventProvider>
  )
}
