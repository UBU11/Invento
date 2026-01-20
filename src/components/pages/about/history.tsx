"use client";

import { useRef, useEffect } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

import HistoryDetails from "./HistoryComponents/HistoryDetails";
import HistoryStaticContent from "./HistoryComponents/HistoryStaticContent";

if (typeof window !== "undefined") gsap.registerPlugin(ScrollTrigger);

export default function History() {
  const containerRef = useRef<HTMLElement>(null);
  const spacerRef = useRef<HTMLDivElement>(null);
  const drillDownRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const container = containerRef.current;
    const spacer = spacerRef.current;
    const drillDown = drillDownRef.current;
    
    if (!container || !spacer || !drillDown) return;

    const ctx = gsap.context(() => {
      // Internal Selectors for Static Elements
      const track = container.querySelector(".history-track");
      const logo = container.querySelector(".history-logo");
      const topText = container.querySelector(".history-top-text");
      const bottomText = container.querySelector(".history-bottom-text");
      const title = container.querySelector(".history-title");

      // Verify essential elements exist to prevent errors
      if (!track || !logo || !topText || !bottomText || !title) return;

      // Setup initial states
      gsap.set(track, { opacity: 0, y: -50 });
      gsap.set(logo, { opacity: 0 });
      gsap.set([topText, bottomText], { opacity: 0, y: 50 });
      
      // Ensure drill-down container starts hidden
      gsap.set(drillDown, { opacity: 0, pointerEvents: "none" }); 
      
      // Select internal elements for animations (HistoryDetails)
      const page1 = drillDown.querySelector("#history-page-1");
      const page2 = drillDown.querySelector("#history-page-2");
      const contentWrapper = drillDown.querySelector("#history-content-wrapper"); 
      
      // Mobile Selectors
      const mobileP1 = drillDown.querySelector("#mobile-p1");
      const mobileStaticGroup = drillDown.querySelector("#mobile-static-group");
      const mobileP5 = drillDown.querySelector("#mobile-p5");

      const pagoda = drillDown.querySelector("#history-pagoda");
      const pattern = drillDown.querySelector("#history-pattern");

      if (page1) gsap.set(page1, { opacity: 0, y: 50 });
      if (page2) gsap.set(page2, { opacity: 0, y: 50 });
      
      // Mobile Init
      if (mobileP1) gsap.set(mobileP1, { opacity: 0, y: 50 });
      if (mobileStaticGroup) gsap.set(mobileStaticGroup, { opacity: 0, y: 50 });
      if (mobileP5) gsap.set(mobileP5, { opacity: 0, height: 0, marginTop: 0, marginBottom: 0, padding: 0, overflow: "hidden" });

      if (pagoda) gsap.set(pagoda, { opacity: 0, y: -100 });
      if (pattern) gsap.set(pattern, { opacity: 0, y: 100 });

      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: spacer,
          start: "top top",
          end: "bottom bottom", 
          scrub: 2,
          invalidateOnRefresh: true,
        },
      });

      // --- PHASE 1: ENTER ---
      tl.fromTo(
        container,
        { xPercent: 100 },
        { xPercent: 0, duration: 2, ease: "none" }
      )
      .to([track, logo, topText, bottomText], { 
        opacity: 1, 
        y: 0, 
        duration: 1, 
        stagger: 0.1,
        ease: "power2.out" 
      });

      // --- PHASE 2: CLEAR STAGE ---
      tl.to([track, logo, topText, bottomText], {
         opacity: 0,
         y: -50,
         duration: 1,
         stagger: 0.05
      }, "+=0.5");

      tl.to(title, {
         y: () => {
             // Dynamic calculation to hit top of window with padding
             const currentTop = title.getBoundingClientRect().top;
             if (window.innerWidth < 768) {
                 return `${-(currentTop - 85)}px`; // Mobile: 85px from top (nav height)
             }
             return `${-(currentTop - 25)}px`; // Desktop: 40px from top
         },
         x: 0,
         scale: 1,
         duration: 1.5,
         ease: "power2.inOut"
      }, "<");

      // --- PHASE 4: DRILL DOWN REVEAL ---
      tl.to(drillDown, { 
          opacity: 1, 
          pointerEvents: "auto", 
          duration: 0.1 
      }, "-=1");

      // Add synchronization label
      tl.addLabel("contentReveal", "-=0.5");

      if (page1) {
          tl.to(page1, {
              opacity: 1,
              y: 0,
              duration: 1.5,
              ease: "power2.out"
          }, "contentReveal");
      }
      
      if (mobileP1) {
          tl.to(mobileP1, {
              opacity: 1,
              y: 0,
              duration: 1.5,
              ease: "power2.out"
          }, "contentReveal");
      }
      
      if (mobileStaticGroup) {
          tl.to(mobileStaticGroup, {
              opacity: 1,
              y: 0,
              duration: 1.5,
              ease: "power2.out"
          }, "contentReveal");
      }
      
      if (pagoda) {
          tl.to(pagoda, { opacity: 1, y: 0, duration: 1.5, ease: "power2.out" }, "contentReveal");
      }
      if (pattern) {
          tl.to(pattern, { opacity: 1, y: 0, duration: 1.5, ease: "power2.out" }, "contentReveal");
      }

      tl.to({}, { duration: 1 });

      // SCROLL UP to reveal Page 2
      // Check if ANY content wrapper exists to drive the scroll logic
      if (contentWrapper || mobileP1) { 
         
         // Desktop Scroll Logic
         if (contentWrapper) {
            tl.to(contentWrapper, {
                y: "-45vh",
                duration: 2.5,
                ease: "power1.inOut"
            });
         }

         tl.to(title, { 
             opacity: 0, 
             duration: 1,
             ease: "power1.out"
         }, "<+=0.2");

         if (page1) {
            tl.to(page1, { 
                opacity: 0, 
                height: 0, 
                margin: 0,
                padding: 0,
                overflow: "hidden",
                duration: 1, 
                ease: "power1.out" 
            }, "<"); 
         }
         
         // Mobile Scroll Logic: Collapse P1
         if (mobileP1) {
            tl.to(mobileP1, { 
                opacity: 0, 
                height: 0, 
                margin: 0,
                padding: 0,
                overflow: "hidden",
                duration: 1, 
                ease: "power1.out" 
            }, "<"); 
         }

         if (pagoda) {
            tl.to(pagoda, { 
                y: "-7vh", 
                duration: 2.5, 
                ease: "power1.inOut" 
            }, "<"); 
         }
      }

      if (page2) {
          tl.to(page2, {
              opacity: 1,
              y: 0,
              duration: 1,
              ease: "power2.out"
          }, "<+=0.5");
          
          const imgs = page2.querySelectorAll("img");
          if (imgs.length > 0) {
             tl.fromTo(imgs, 
                { y: 50 }, 
                { y: -50, duration: 2, stagger: 0.2, ease: "none" }, 
                "<"
             );
          }
      }

      // Mobile P5 Reveal
      if (mobileP5) {
          tl.to(mobileP5, {
              height: "auto",
              opacity: 1,
              padding: "0.25rem", // Match p-1
              duration: 1,
              ease: "power2.out"
          }, "<+=0.5");
      }
      
      tl.to({}, { duration: 1 });

    });

    return () => ctx.revert();
  }, []);

  return (
    <>
      <div ref={spacerRef} className="relative w-full h-[600vh] pointer-events-none" />

      <section 
        ref={containerRef} 
        className="fixed top-0 left-0 h-screen w-screen overflow-hidden bg-white z-30 flex flex-col justify-between"
      >
        <HistoryStaticContent />

        <div ref={drillDownRef} className="absolute inset-0 w-full h-full z-10 flex flex-col justify-end pointer-events-none">
             <HistoryDetails />
        </div>
      </section>
    </>
  );
}
