import { Event } from "../../types/event"
import EventScheduleItem from "./EventScheduleItem"

export default function EventScheduleList({
  events,
  activeDay,
}: {
  events: Event[]
  activeDay: 1 | 2 | 3
}) {
  return (
    <div
      key={activeDay}
      className="space-y-4 opacity-0 animate-fadeIn"
    >
      {events.length === 0 ? (
        <div className="py-10 text-center text-gray-500">
          No events scheduled for this day
        </div>
      ) : (
        events.map(event => (
          <EventScheduleItem key={event.id} event={event} />
        ))
      )}
    </div>
  )
}
