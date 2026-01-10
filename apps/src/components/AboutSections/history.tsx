"use client";

import { useRef, useEffect } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import InventoLogo from "@/src/components/Text/InventoLogo";
import HistoryCard from "./HistoryCard";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

export default function History() {
  const containerRef = useRef<HTMLElement>(null);
  const spacerRef = useRef<HTMLDivElement>(null);
  const cardsRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!spacerRef.current || !containerRef.current) return;

    const ctx = gsap.context(() => {
      // 1. Enter Animation (Slide in from Right)
      gsap.fromTo(
        containerRef.current,
        {
          xPercent: 100,
        },
        {
          xPercent: 0,
          ease: "none",
          scrollTrigger: {
            trigger: spacerRef.current,
            start: "top center",
            end: "bottom bottom",
            scrub: 1,
            invalidateOnRefresh: true,
          },
        }
      );

      // 2. Infinite Carousel & Center Scaling (Only if cards exist)
      // We use a timeout or verify cards are in DOM. context() handles cleanup.
      const cards = gsap.utils.toArray<HTMLElement>(".history-card");

      if (cards.length > 0) {
        // Layout Config
        const totalCards = cards.length;
        // Base width: 22vh (Reduced from 28vh)
        // 22vh in pixels:
        const vh = window.innerHeight;
        const vw = window.innerWidth;
        const cardWidth = vh * 0.22;

        // Gap: 90px
        const gap = 90;
        const cycleWidth = (cardWidth + gap) * totalCards;

        // Initial setup - spread them out horizontally
        gsap.set(cards, {
          x: (i) => i * (cardWidth + gap),
          position: "absolute",
          left: 0,
          top: 0,
        });

        // 2a. Infinite Move RIGHT
        // "+=" means items move Right.
        gsap.to(cards, {
          x: `+=${cycleWidth}`,
          modifiers: {
            x: gsap.utils.unitize(gsap.utils.wrap(0, cycleWidth))
          },
          ease: "none",
          repeat: -1,
          duration: 25,
          overwrite: "auto",
        });

        // 2b. Center Scale Logic
        // Highlight "middle of the left part" -> 25% of viewport width
        const centerPoint = vw * 0.25;

        gsap.ticker.add(() => {
          cards.forEach((card) => {
            const x = gsap.getProperty(card, "x") as number;

            // Visual center (relative to screen left)
            const cardCenter = x + cardWidth / 2;

            // Calc distance to "centerPoint"
            const dist = Math.abs(centerPoint - cardCenter);

            // Scale Logic
            // Threshold 175px
            let scale = 1;
            let zIndex = 1;

            if (dist < 175) {
              const progress = 1 - (dist / 175);
              const eased = gsap.parseEase("power2.in")(progress);
              // Max Scale: 1.9x (Increased to compensate for smaller base)
              // Base 30vh * 1.9 = 57vh (Similar to previous 37.5 * 1.5 = 56.25)
              scale = 1 + (0.9 * eased);

              if (scale > 1.05) zIndex = 10;
            }

            // Apply
            // origin-top -> grows down
            card.style.transform = `translate3d(${x}px, 0, 0) scale(${scale})`;
            card.style.zIndex = zIndex.toString();
          });
        });
      }

    }, [containerRef]);

    return () => {
      ctx.revert();
      gsap.ticker.remove(() => { });
    };
  }, []);

  return (
    <>
      <div ref={spacerRef} className="h-[200vh] w-full relative -z-10 bg-transparent" />
      <section
        ref={containerRef}
        className="fixed top-0 left-0 h-screen w-screen z-50 bg-white flex flex-col justify-between px-10 py-6 overflow-hidden"
      >
        {/* TOP CONTENT AREA */}
        <div className="flex-1 w-full flex items-start justify-start pt-2 pl-4 pr-4 relative">

          {/* Left: Intro Text & Logo - Pointer events none so we can click through to cards if needed */}
          <div className="absolute left-6 top-[35vh] flex flex-col justify-start gap-12 z-40 pointer-events-none">
            <div className="w-[120px] h-[120px] flex justify-center pointer-events-auto">
              <InventoLogo className="text-black" />
            </div>
            <p className="w-[400px] text-[15px] leading-relaxed font-normal text-black text-left font-sans pointer-events-auto">
              INVENTO has consistently served as a space for learning, experimentation, and collaboration, encouraging students to explore emerging technologies beyond classrooms and textbooks.
            </p>
          </div>

          {/* Middle: Cards Container (Absolute Track) */}
          {/* Tripling density (18 cards) to ensure full horizontal fill for seamless looping */}
          <div ref={cardsRef} className="absolute top-0 left-0 w-full h-[60vh]">
            {[1, 2, 3, 4, 5, 6, 1, 2, 3, 4, 5, 6, 1, 2, 3, 4, 5, 6].map((num, i) => (
              <div
                key={i}
                className="history-card absolute top-0 left-0 h-[30vh] w-[22vh] p-0 origin-top will-change-transform"
              >
                <HistoryCard index={num} />
              </div>
            ))}
          </div>
        </div>

        {/* Right Outro Text */}
        <div className="absolute right-16 top-[48vh] flex justify-end items-start z-40 pointer-events-none">
          <p className="w-[420px] max-w-full text-[15px] leading-relaxed font-normal text-black text-right font-sans pointer-events-auto">
            Today, INVENTO stands as a symbol of creativity, innovation, and technical excellence, reflecting the spirit of GEC Palakkad and its commitment to nurturing the innovators of tomorrow.
          </p>
        </div>

        {/* BOTTOM TITLE */}
        <div className="w-full flex justify-start items-end pb-4 px-[64px] pointer-events-none">
          <h1 className="text-[9vw] lg:text-[150px] leading-[0.8] font-bold tracking-tighter text-black uppercase font-sans scale-y-110 origin-bottom-left pointer-events-auto">
            OUR HISTORY
          </h1>
        </div>
      </section>
    </>
  );
}
