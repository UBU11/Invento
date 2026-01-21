"use client";

import { useState, useRef, useEffect } from "react"
import dynamic from "next/dynamic"
import EventTable from "@/src/components/pages/events/EventTable"
import EventScheduleHeader from "@/src/components/pages/events/EventScheduleHeader"
import ComingSoonPage from "@/src/components/pages/coming-soon/comingSoon"
import FallingLeaves from "@/src/components/pages/coming-soon/fallingleaves"

const FallingLeavesEvents = dynamic(
  () => import("@/src/components/pages/events/fallingleaves"),
  { ssr: false },
);

// Set to false to show the actual events page when development is complete
const SHOW_COMING_SOON = true

export default function EventsPage() {
  const [activeDay, setActiveDay] = useState<1 | 2 | 3>(1);
  const [showBackdrop, setShowBackdrop] = useState(false);
  const touchStartX = useRef<number | null>(null);
  const touchEndX = useRef<number | null>(null);

  useEffect(() => {
    const handleTouchStart = (e: Event) => {
      const touchEvent = e as TouchEvent
      touchStartX.current = touchEvent.changedTouches[0].screenX
    }

    const handleTouchEnd = (e: Event) => {
      const touchEvent = e as TouchEvent
      touchEndX.current = touchEvent.changedTouches[0].screenX
      handleSwipe()
    }

    const handleSwipe = () => {
      if (touchStartX.current === null || touchEndX.current === null) return;

      const diff = touchStartX.current - touchEndX.current;
      const isLeftSwipe = diff > 50;
      const isRightSwipe = diff < -50;

      if (isLeftSwipe && activeDay < 3) {
        setActiveDay((prev) => (prev + 1) as 1 | 2 | 3);
      } else if (isRightSwipe && activeDay > 1) {
        setActiveDay((prev) => (prev - 1) as 1 | 2 | 3);
      }

      touchStartX.current = null;
      touchEndX.current = null;
    };

    const element = document.querySelector(
      ".event-swipe-container",
    ) as HTMLElement | null;
    if (!element) return;

    element.addEventListener("touchstart", handleTouchStart, false);
    element.addEventListener("touchend", handleTouchEnd, false);

    return () => {
      element.removeEventListener("touchstart", handleTouchStart);
      element.removeEventListener("touchend", handleTouchEnd);
    };
  }, [activeDay]);

  // Show coming soon page for now
  if (SHOW_COMING_SOON) {
    return (
      <>
        <ComingSoonPage />
        <FallingLeaves />
      </>
    )
  }

  // Original events page code - kept for when development is complete
  return (
    <div
      className="
        min-h-screen w-screen relative text-white
        bg-cover bg-right md:bg-center
        bg-no-repeat bg-fixed md:bg-scroll
        overflow-x-hidden event-swipe-container
      "
      style={{
        backgroundImage: "url('/event/eventbg.svg')",
      }}
    >
      <FallingLeavesEvents />

      {showBackdrop && (
        <div className="fixed inset-0 z-[15] bg-black/50 transition-opacity duration-300 pointer-events-auto" />
      )}

      <div className="relative min-h-screen w-screen">
        <div className="flex flex-col md:flex-row w-screen min-h-screen">
          <div className="hidden md:block md:w-[15%]" />

          <div className="w-screen md:w-[85%] px-4 md:px-0 md:pr-10 py-8 md:py-16 relative">
            <EventScheduleHeader
              activeDay={activeDay}
              setActiveDay={setActiveDay}
            />

            <EventTable activeDay={activeDay} onModalChange={setShowBackdrop} />
          </div>
        </div>
      </div>
    </div>
  );
}
