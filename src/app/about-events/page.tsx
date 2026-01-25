"use client";

import { useSearchParams } from "next/navigation";
import SapthaEvent from "@/src/components/pages/about-events/saptha-events/SapthaEvent";
// Import other components when they are ready
import TechnicalEvent from "@/src/components/pages/about-events/technical-events/TechnicalEvent";
import GeneralEvent from "@/src/components/pages/about-events/general-events/GeneralEvent";
import { Suspense } from "react";

const EventsContent = () => {
  const searchParams = useSearchParams();
  const category = searchParams.get("category");

  if (category === "saptha") {
    return <SapthaEvent />;
  }
  if (category === "technical") {
    return <TechnicalEvent />;
  }

  if (category === "general") {
    return <GeneralEvent />;
  }

  return (
    <div className="min-h-screen flex items-center justify-center text-white font-akira text-2xl">
      SELECT AN EVENT
    </div>
  );
};

const AboutEventsPage = () => {
  return (
    <Suspense fallback={<div className="min-h-screen bg-black" />}>
      <EventsContent />
    </Suspense>
  );
};

export default AboutEventsPage;
