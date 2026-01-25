"use client";

import { useEffect } from "react";
import { Event } from "@/src/types/event";

export default function EventModal({
  event,
  onClose,
}: {
  event: Event;
  onClose: () => void;
}) {
  useEffect(() => {
    const handler = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    window.addEventListener("keydown", handler);
    return () => window.removeEventListener("keydown", handler);
  }, [onClose]);

  return (
    <div
      className="
        absolute z-[10000]
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

      <div className="flex flex-col md:flex-row gap-8 md:gap-20 px-6 md:px-10 py-8 md:py-10">
        <img
          src={event.poster}
          alt={event.title}
          className="w-full md:w-72 h-full md:h-full object-cover border-4 border-lime-400"
        />

        <div className="flex-1 text-white font-flood">
          <h2 className="text-base md:text-4xl font-extrabold uppercase font-akira mb-5">
            {event.title}
          </h2>

          <p
            className="text-sm leading-relaxed text-gray-200 mb-10 max-w-xl"
            style={{ fontFamily: "'Urbanist', sans-serif" }}
          >
            {event.description}
          </p>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-10 mb-10">
            <div className="space-y-5">
              <div className="text-lg md:text-xl font-bold">
                <div className="text-red-500 uppercase tracking-wide font-urbanist">
                  Prize Pool
                </div>
                <div className="text-white font-urbanist">
                  {event.prizePool}
                </div>
              </div>

              <div className="text-lg md:text-xl font-bold">
                <div className="text-red-500 font-urbanist uppercase tracking-wide">
                  Reg Fee
                </div>
                <div className="text-white font-urbanist">{event.regFee}</div>
              </div>
            </div>

            <div className="space-y-3 md:space-y-6 text-sm md:text-base font-urbanist">
              <div>
                <span className="text-red-500 font-bold font-urbanist uppercase">
                  Time:
                </span>{" "}
                {event.time}
              </div>
              <div>
                <span className="text-red-500 font-bold font-urbanist uppercase">
                  Venue:
                </span>{" "}
                {event.venue}
              </div>
              <div>
                <span className="text-red-500 font-bold font-urbanist uppercase">
                  Queries:
                </span>{" "}
                {event.contact}
              </div>
            </div>
          </div>

          <div className="flex justify-center md:justify-start font-urbanist">
            <button
              onClick={(e) => {
                window.open(event.links.registration, "_blank");
              }}
              className="bg-red-600 px-10 md:px-16 py-3 text-xs md:text-sm font-bold uppercase hover:bg-red-700"
            >
              Register
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
