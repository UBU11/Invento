"use client"

import { useEffect } from "react"
import { Event } from "@/src/types/event"

export default function EventModal({
  event,
  onClose,
}: {
  event: Event
  onClose: () => void
}) {
  useEffect(() => {
    const handler = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose()
    }
    window.addEventListener("keydown", handler)
    return () => window.removeEventListener("keydown", handler)
  }, [onClose])

  return (
    <div
      className="
        absolute z-30
        left-1/2 top-1/2
        translate-x-1 translate-y-1
        w-[90%] max-w-6xl
        rounded-3xl
        overflow-hidden
        bg-bg/50 backdrop-blur-xl
        shadow-[0_0_90px_rgba(255,0,0,0.35)]
        animate-event-expand
      "
    >
      <button
        onClick={onClose}
        className="absolute top-6 right-6 text-3xl font-bold text-white hover:text-red-600 z-50"
      >
        ✕
      </button>

      <div className="flex gap-20 px-10 py-10">

        <img
          src={event.poster}
          alt={event.title}
          className="w-72 h-[20rem] object-cover border-4 border-lime-400"
        />

        <div className="flex-1 text-white font-flood">

    
          <span className="inline-block mb-4 bg-red-600 px-4 py-1 text-xs font-extrabold uppercase">
            {event.category}
          </span>

      
          <h2 className="text-4xl font-extrabold uppercase font-akira mb-5">
            {event.title}
          </h2>

      
          <p className="text-sm leading-relaxed text-gray-200 mb-8 max-w-xl">
            {event.description}
          </p>

       
          <div className="grid grid-cols-2 gap-y-4 text-sm mb-8">
            <div><span className="text-red-500 font-bold">Prize Pool:</span> 20K</div>
            <div><span className="text-red-500 font-bold">Reg Fee:</span> 200</div>
            <div><span className="text-red-500 font-bold">Time:</span> {event.time}</div>
            <div><span className="text-red-500 font-bold">Venue:</span> {event.venue}</div>
            <div><span className="text-red-500 font-bold">Queries:</span> 98098 21355</div>
          </div>

        
          <button className="bg-red-600 px-14 py-3 text-sm font-bold uppercase hover:bg-red-700">
            Register
          </button>

        </div>
      </div>
    </div>
  )
}
