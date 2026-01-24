"use client"

import React, { useRef } from "react"
import Image from "next/image"

export default function EventScheduleHeader({
  activeDay,
  setActiveDay,
}: {
  activeDay: 1 | 2 | 3
  setActiveDay: React.Dispatch<React.SetStateAction<1 | 2 | 3>>
}) {
  const touchStartX = useRef<number | null>(null)
  const touchEndX = useRef<number | null>(null)

  const MIN_SWIPE_DISTANCE =
  typeof window !== "undefined"
    ? Math.min(120, window.innerWidth * 0.45)
    : 80

  const days: (1 | 2 | 3)[] = [1, 2, 3]

  const handleTouchStart = (e: React.TouchEvent) => {
    touchStartX.current = e.touches[0].clientX
  }

  const handleTouchMove = (e: React.TouchEvent) => {
    touchEndX.current = e.touches[0].clientX
  }

  const handleTouchEnd = () => {
    if (touchStartX.current === null || touchEndX.current === null) return

    const distance = touchStartX.current - touchEndX.current

    if (Math.abs(distance) > MIN_SWIPE_DISTANCE) {
      if (distance > 0 && activeDay < 3) {
        setActiveDay((activeDay + 1) as 1 | 2 | 3)
      } else if (distance < 0 && activeDay > 1) {
        setActiveDay((activeDay - 1) as 1 | 2 | 3)
      }
    }

    touchStartX.current = null
    touchEndX.current = null
  }

  return (
    <>
      {/* Mobile */}
      <div
        className="md:hidden relative w-full"
        onTouchStart={handleTouchStart}
        onTouchMove={handleTouchMove}
        onTouchEnd={handleTouchEnd}
      >
        <div className="absolute top-8 right-6 text-red-600 font-akira z-10">
          <h2 className="text-2xl font-extrabold">Day {activeDay}</h2>
          <span className="block text-3xl font-extrabold -mt-3">
            {activeDay === 1 && "29 Jan"}
            {activeDay === 2 && "30 Jan"}
            {activeDay === 3 && "31 Jan"}
          </span>
        </div>

        <div className="pt-28 pr-6 flex justify-end">
          <div className="flex items-center gap-3">
            {days.map(day => (
              <div
                key={day}
                className={
                  activeDay === day
                    ? "w-8 h-2 bg-red-600 rounded-full shadow-[0_0_12px_rgba(220,38,38,0.9)] transition-all"
                    : "w-2 h-2 rounded-full border border-red-600 transition-all"
                }
              />
            ))}
          </div>
        </div>
      </div>

      {/* Desktop */}
      <div className="hidden md:block absolute top-10 right-[4%] text-red-600 font-akira">
        <div className="flex items-start gap-10">
          <button
            onClick={() =>
              setActiveDay(prev =>
                prev > 1 ? ((prev - 1) as 1 | 2 | 3) : prev
              )
            }
            disabled={activeDay === 1}
            className={`transition mt-12 ${
              activeDay === 1
                ? "opacity-30 cursor-not-allowed"
                : "hover:scale-105"
            }`}
          >
            <Image
              src="/event/arrowl.svg"
              alt="Previous day"
              width={30}
              height={30}
              priority
            />
          </button>

          <div className="leading-[0.6]">
            <h2 className="text-6xl font-extrabold">Day {activeDay}</h2>
            <span className="block text-7xl font-extrabold">
              {activeDay === 1 && "29 Jan"}
              {activeDay === 2 && "30 Jan"}
              {activeDay === 3 && "31 Jan"}
            </span>
          </div>

          <button
            onClick={() =>
              setActiveDay(prev =>
                prev < 3 ? ((prev + 1) as 1 | 2 | 3) : prev
              )
            }
            disabled={activeDay === 3}
            className={`transition mt-12 ${
              activeDay === 3
                ? "opacity-30 cursor-not-allowed"
                : "hover:scale-105"
            }`}
          >
            <Image
              src="/event/arrowr.svg"
              alt="Next day"
              width={30}
              height={30}
              priority
            />
          </button>
        </div>

        <div className="mt-6 flex items-center gap-4 justify-center">
          {days.map(day => (
            <div
              key={day}
              className={
                activeDay === day
                  ? "w-12 h-3 bg-red-600 rounded-full shadow-[0_0_16px_rgba(220,38,38,0.9)] transition-all"
                  : "w-3 h-3 rounded-full border border-red-600 transition-all"
              }
            />
          ))}
        </div>
      </div>

      {/* Title */}
      <div className="mb-20 mt-9 md:mt-0 pl-6 md:pl-10">
        <h1 className="text-4xl md:text-7xl font-extrabold uppercase text-white font-akira">
          Event
        </h1>
        <h1 className="text-4xl md:text-7xl font-extrabold uppercase text-white font-akira">
          Schedule
        </h1>
      </div>
    </>
  )
}
