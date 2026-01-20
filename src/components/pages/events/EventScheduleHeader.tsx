"use client"

export default function EventScheduleHeader({
  activeDay,
  setActiveDay,
}: {
  activeDay: 1 | 2 | 3
  setActiveDay: React.Dispatch<React.SetStateAction<1 | 2 | 3>>
}) {
  return (
    <>
      <div className="absolute top-15 right-[4%] text-red-600 font-akira uppercase tracking-[0.1em]">

        <div className="flex items-end gap-10">

          <button
            onClick={() =>
              setActiveDay(prev =>
                prev > 1 ? ((prev - 1) as 1 | 2 | 3) : prev
              )
            }
            disabled={activeDay === 1}
            className={`text-white text-[96px] leading-none transition ${
              activeDay === 1
                ? "opacity-30 cursor-not-allowed"
                : "hover:text-red-500"
            }`}
          >
            ←
          </button>

          <div className="text-left leading-[0.6]">
            <h2 className="text-6xl font-extrabold">
              Day {activeDay}
            </h2>

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
            className={`text-white text-[96px] leading-none transition ${
              activeDay === 3
                ? "opacity-30 cursor-not-allowed"
                : "hover:text-red-500"
            }`}
          >
            →
          </button>

        </div>

        {/* PARTITIONED PROGRESS BAR */}
        <div className="mt-6 w-[520px] h-3 grid grid-cols-3 gap-1">
          {[1, 2, 3].map(day => (
            <div
              key={day}
              className={`h-full rounded-sm transition-all duration-500 ${
                activeDay >= day
                  ? "bg-red-600 shadow-[0_0_14px_rgba(220,38,38,0.9)]"
                  : "bg-white/20"
              }`}
            />
          ))}
        </div>

      </div>

      <div className="mb-20 pl-10">
        <h1 className="text-7xl font-extrabold uppercase text-white font-akira">
          Event
        </h1>
        <h1 className="text-7xl font-extrabold uppercase text-white font-akira">
          Schedule
        </h1>
      </div>
    </>
  )
}
