"use client";

import HeroSection from "@/src/components/pages/about/heroSection";
import SecondSection from "@/src/components/pages/about/secondSection";
import History from "@/src/components/pages/about/history";
import { ReactLenis, useLenis } from "lenis/react";
import { useEffect, useLayoutEffect } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

export default function About() {
  const lenis = useLenis((lenis) => {
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
      </main>
    </ReactLenis>
  );
}
