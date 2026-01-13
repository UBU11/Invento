"use client";

import { useRef, useEffect } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import HistoryCards from "./HistoryComponents/HistoryCards";
import HistoryCircularLogo from "./HistoryComponents/HistoryCircularLogo";

if (typeof window !== "undefined") gsap.registerPlugin(ScrollTrigger);

export default function History() {
  const containerRef = useRef<HTMLElement>(null);
  const trackRef = useRef<HTMLDivElement>(null);
  const spacerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const container = containerRef.current;
    const track = trackRef.current;
    const spacer = spacerRef.current;
    
    if (!container || !track || !spacer) return;

    if (!container || !track || !spacer) return;

    const ctx = gsap.context(() => {
      // Create a master timeline linked to the spacer's scroll
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: spacer,
          start: "top top",
          end: "bottom bottom",
          scrub: 1,
          invalidateOnRefresh: true,
        },
      });

      // Step 1: Slide the SECTION in from the Right (Horizontal Wipe)
      tl.fromTo(
        container,
        { xPercent: 100 },
        { xPercent: 0, duration: 1, ease: "none" }
      );
      // Removed card scrolling: All cards visible at once

    });

    return () => ctx.revert();
  }, []);

  return (
    <>
      {/* Spacer to drive the scroll animation */}
      <div ref={spacerRef} className="relative w-full h-[200vh] pointer-events-none" />

      {/* Fixed Section that slides in */}
      <section 
        ref={containerRef} 
        className="fixed top-0 left-0 h-screen w-screen overflow-hidden bg-white z-30 flex flex-col justify-between"
      >
        {/* Top: Static Track (Cards) */}
        <div className="relative w-full h-[55%] flex items-start pt-6 px-[2vw]">
           <div ref={trackRef} className="w-full flex flex-row justify-between">
             <HistoryCards />
           </div>
        </div>

        {/* Bottom: Static Elements */}
        <div className="relative w-full h-[45%]">
           
           {/* Logo - Left */}
           <div className="absolute left-[5vw] -top-28 origin-left scale-[0.6]">
              <HistoryCircularLogo />
           </div>

           {/* Paragraph - Right/Center */}
           <div className="absolute right-[5vw] top-0 max-w-md text-right hidden md:block">
              <p className="text-sm md:text-base font-medium text-black leading-relaxed">
                Today, INVENTO stands as a symbol of creativity, innovation, and technical excellence, reflecting the spirit of GEC Palakkad.
              </p>
           </div>

           {/* Left Description */}
           <div className="absolute left-[3vw] bottom-40 max-w-md hidden md:block">
             <p className="text-xs md:text-sm font-medium text-black leading-relaxed text-left">
               INVENTO has consistently served as a space for learning, experimentation, and collaboration.
             </p>
           </div>

           {/* Main Title - Bottom Left */}
           <div className="absolute bottom-4 left-[3vw] text-left">
              <h1 className="text-[8vw] font-bold leading-none tracking-tighter opacity-100">
                OUR HISTORY
              </h1>
           </div>
        </div>
      </section>
    </>
  );
}
