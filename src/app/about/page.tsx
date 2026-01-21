"use client";

import HeroSection from "@/src/components/pages/about/heroSection";
import SecondSection from "@/src/components/pages/about/secondSection";
import History from "@/src/components/pages/about/history";
import OrganizingTeam from "@/src/components/pages/about/OrganizingTeam";
import { ReactLenis, useLenis } from "lenis/react";
import { useEffect, useLayoutEffect } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

// Set to true to show the organizing team section
const SHOW_ORGANIZING_TEAM = false;

export default function About() {
  useLenis((lenis) => {
    if (lenis) {
      ScrollTrigger.update();
    }
  });

  useLayoutEffect(() => {
    if (typeof window !== "undefined") {
      window.history.scrollRestoration = "manual";
      window.scrollTo(0, 0);
    }
  }, []);

  useEffect(() => {
    const updateScrollTrigger = () => {
      ScrollTrigger.refresh();
    };
    gsap.ticker.lagSmoothing(0);
    const timer = setTimeout(updateScrollTrigger, 100);

    return () => clearTimeout(timer);
  }, []);

  return (
    <ReactLenis
      root
      options={{
        lerp: 0.07,
        duration: 1.2,
        smoothWheel: true,
        wheelMultiplier: 1.2,
        touchMultiplier: 2,
        infinite: false,
      }}
    >
      <main>
        <HeroSection />
        <SecondSection />
        <History />
        {SHOW_ORGANIZING_TEAM && <OrganizingTeam />}
      </main>
    </ReactLenis>
  );
}
