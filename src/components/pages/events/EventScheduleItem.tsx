import { Event } from "../../types/event"

export default function EventScheduleItem({
  event,
}: {
  event: Event
}) {
  return (
    <div className="flex gap-6 p-5 border rounded-xl hover:bg-gray-50 transition">

      <img
        src={event.poster}
        alt={event.title}
        className="w-28 h-28 object-cover rounded-lg"
      />

      <div className="flex-1">
        <h3 className="text-xl font-bold uppercase">
          {event.title}
        </h3>

        <p className="text-sm text-gray-600 mt-1 line-clamp-2">
          {event.description}
        </p>

        <div className="flex flex-wrap gap-4 mt-4 text-sm">
          <span className="font-medium">{event.category}</span>
          <span>{event.time}</span>
          <span>{event.venue}</span>
        </div>
      </div>
    </div>
  )
}
