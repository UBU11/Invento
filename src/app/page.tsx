"use client";

import ContactSection from "../components/pages/home/ContactSection";
import FAQSection from "../components/pages/home/FAQSection";
import HeroSection from "../components/pages/home/HeroSection";
import Preview from "../components/pages/home/preview/Preview";

import { HERO_ASSETS } from "@/src/lib/preload";
import { usePreload } from "@/src/hooks/usePreload";
import { LoadingScreen } from "@/src/components/loading/LoadingScreen";

export default function HomePage() {
  const { progress, done } = usePreload(HERO_ASSETS);

  return (
    <main className="bg-white">
      {!done && <LoadingScreen progress={progress} />}

      {done && (
        <>
          <HeroSection />
          <Preview />
          <FAQSection />
          <ContactSection />
        </>
      )}
    </main>
  );
}
