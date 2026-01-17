"use client";

import { useRef, useEffect } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Image from "next/image";
import HistoryCards from "./HistoryComponents/HistoryCards";
import HistoryCircularLogo from "./HistoryComponents/HistoryCircularLogo";
import HistoryDetails from "./HistoryComponents/HistoryDetails";

if (typeof window !== "undefined") gsap.registerPlugin(ScrollTrigger);

export default function History() {
  const containerRef = useRef<HTMLElement>(null);
  const trackRef = useRef<HTMLDivElement>(null);
  const spacerRef = useRef<HTMLDivElement>(null);
  const logoRef = useRef<HTMLDivElement>(null);
  const topTextRef = useRef<HTMLDivElement>(null);
  const bottomTextRef = useRef<HTMLDivElement>(null);
  const titleRef = useRef<HTMLDivElement>(null);
  
  // Drill Down Refs
  const drillDownRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const container = containerRef.current;
    const track = trackRef.current;
    const spacer = spacerRef.current;
    const logo = logoRef.current;
    const topText = topTextRef.current;
    const bottomText = bottomTextRef.current;
    const title = titleRef.current;
    const drillDown = drillDownRef.current;
    
    if (!container || !track || !spacer || !logo || !topText || !bottomText || !title || !drillDown) return;

    const ctx = gsap.context(() => {
      // Setup initial states
      gsap.set(track, { opacity: 0, y: -50 });
      gsap.set(logo, { opacity: 0 });
      gsap.set([topText, bottomText], { opacity: 0, y: 50 });
      
      // Ensure drill-down container starts hidden
      gsap.set(drillDown, { opacity: 0, pointerEvents: "none" }); 
      
      // Select internal elements for animations
      const page1 = drillDown.querySelector("#history-page-1");
      const page2 = drillDown.querySelector("#history-page-2");
      const contentWrapper = drillDown.querySelector("#history-content-wrapper"); 
      const pagoda = drillDown.querySelector("#history-pagoda");
      const pattern = drillDown.querySelector("#history-pattern");

      if (page1) gsap.set(page1, { opacity: 0, y: 50 });
      if (page2) gsap.set(page2, { opacity: 0, y: 50 });
      if (pagoda) gsap.set(pagoda, { opacity: 0 });
      if (pattern) gsap.set(pattern, { opacity: 0 });

      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: spacer,
          start: "top top",
          end: "bottom bottom", 
          scrub: 2,
          invalidateOnRefresh: true,
        },
      });

      // --- PHASE 1: ENTER (Horizontal Slide) ---
      // Slide the entire white section in from the right
      tl.fromTo(
        container,
        { xPercent: 100 },
        { xPercent: 0, duration: 2, ease: "none" }
      )
      // Reveal the "Static" elements (Cards, Logo, etc.)
      .to([track, logo, topText, bottomText], { 
        opacity: 1, 
        y: 0, 
        duration: 1, 
        stagger: 0.1,
        ease: "power2.out" 
      });

      // --- PHASE 2: CLEAR STAGE ---
      // Fade out carousel and side text
      tl.to([track, logo, topText, bottomText], {
         opacity: 0,
         y: -50,
         duration: 1,
         stagger: 0.05
      }, "+=0.5");

      // Mimicking Hero Section: Translate Y upwards significantly
      tl.to(title, {
         y: "-75vh", // Move up near top with gap
         x: 0,      // Keep horizontal alignment
         scale: 0.9, // Kept larger based on user feedback
         duration: 1.5,
         ease: "power2.inOut"
      }, "<");

      // --- PHASE 4: DRILL DOWN REVEAL ---
      // Show the container
      tl.to(drillDown, { 
          opacity: 1, 
          pointerEvents: "auto", 
          duration: 0.1 
      }, "-=1");

      // Animate Page 1 text IN
      if (page1) {
          tl.to(page1, {
              opacity: 1,
              y: 0,
              duration: 1.5,
              ease: "power2.out"
          }, "-=0.5");
      }
      
      // Animate Images IN (Synced with Text)
      if (pagoda) {
          tl.to(pagoda, { opacity: 1, duration: 1.5, ease: "power2.out" }, "<");
      }
      if (pattern) {
          tl.to(pattern, { opacity: 1, duration: 1.5, ease: "power2.out" }, "<");
      }

      // Cushion for reading
      tl.to({}, { duration: 1 });

      // SCROLL UP to reveal Page 2
      if (contentWrapper) {
         tl.to(contentWrapper, {
            y: "-45vh", // Adjusted scroll height
            duration: 2.5,
            ease: "power1.inOut"
         });

         // Fade out title to allow full usage of top space
         tl.to(title, { 
             opacity: 0, 
             duration: 1,
             ease: "power1.out"
         }, "<+=0.2"); // Start fading slightly after scroll starts

         // Fade out Page 1 content so only Page 2 is visible
         if (page1) {
            tl.to(page1, { 
                opacity: 0, 
                height: 0, 
                margin: 0,
                padding: 0,
                overflow: "hidden", // Ensure content doesn't ghost
                duration: 1, 
                ease: "power1.out" 
            }, "<"); 
         }
      }

      // Animate Page 2 (Text + Images) IN
      if (page2) {
          // It fades in WHILE scrolling or just after
          tl.to(page2, {
              opacity: 1,
              y: 0,
              duration: 1,
              ease: "power2.out"
          }, "<+=0.5"); // Start fading in slightly after scroll starts
          
          // Slight parallax for images inside page 2?
          const imgs = page2.querySelectorAll("img");
          if (imgs.length > 0) {
             tl.fromTo(imgs, 
                { y: 50 }, 
                { y: -50, duration: 2, stagger: 0.2, ease: "none" }, 
                "<"
             );
          }
      }
      
      // Final buffer
      tl.to({}, { duration: 1 });

    });

    return () => ctx.revert();
  }, []);

  return (
    <>
      {/* Spacer to drive the scroll animation */}
      <div ref={spacerRef} className="relative w-full h-[600vh] pointer-events-none" />

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
        <div className="relative w-full h-[45%] flex flex-col items-center md:block">
           
           {/* Logo */}
           <div ref={logoRef} className="relative md:absolute md:left-[5vw] md:-top-40 md:origin-left scale-[0.6] z-20">
              <HistoryCircularLogo />
           </div>

           {/* Paragraphs */}
           <div ref={topTextRef} className="absolute right-[5vw] top-0 max-w-md text-right hidden md:block">
              <p className="text-sm md:text-base font-medium text-black leading-relaxed">
                Today, INVENTO stands as a symbol of creativity, innovation, and technical excellence, reflecting the spirit of GEC Palakkad.
              </p>
           </div>

           <div ref={bottomTextRef} className="absolute left-[3vw] bottom-40 max-w-md hidden md:block">
             <p className="text-xs md:text-sm font-medium text-black leading-relaxed text-left">
               INVENTO has consistently served as a space for learning, experimentation, and collaboration.
             </p>
           </div>

           {/* Main Title - Will animate UP */}
           <div ref={titleRef} className="relative md:absolute bottom-auto md:bottom-4 left-auto md:left-[3vw] mt-4 md:mt-0 text-center md:text-left z-40 transform-gpu origin-center md:origin-left">
              <h1 className="text-[8vw] font-bold leading-none tracking-tighter opacity-100 whitespace-nowrap">
                OUR HISTORY
              </h1>
           </div>
        </div>

        {/* --- DRILL DOWN CONTENT --- */}
        <div ref={drillDownRef} className="absolute inset-0 w-full h-full z-10 flex flex-col justify-end pointer-events-none">
             <HistoryDetails />
        </div>

      </section>
    </>
  );
}
