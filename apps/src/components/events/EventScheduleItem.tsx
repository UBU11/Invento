import { Event } from "@/src/types/event"

export default function EventScheduleItem({ event }: { event: Event }) {
  return (
    <div className="border rounded-xl p-4">
      <h3 className="font-semibold">{event.title}</h3>
      <p className="text-sm text-muted-foreground">
        {event.date} • {event.time}
      </p>
      <p className="mt-1">{event.description}</p>
    </div>
  )
}
