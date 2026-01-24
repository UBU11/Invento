"use client";

import Image from "next/image";
import { useRef } from "react";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import SapthaEventDetails from "./SapthaEventDetails";
import { usePreload } from "@/src/components/providers/LoadingProvider";
import { LoadingScreen } from "@/src/components/loading/LoadingScreen";

gsap.registerPlugin(ScrollTrigger);

const ASSETS = [
  "/about-events/saptha/sapthalady.webp",
  "/about-events/saptha/saptha-bg.webp",
  "/about-events/saptha/natya-poster.webp",
  "/about-events/saptha/taksati-poster.webp",
  // "/about-events/saptha/saptha-mobile-bg.webp", // Currently unused as we reverted to shared BG
];

const SapthaEvent = () => {
    
  const { progress, done } = usePreload(ASSETS);
  
  const containerRef = useRef<HTMLDivElement>(null);
  const bgWrapperRef = useRef<HTMLDivElement>(null); 
  const mobileGradientRef = useRef<HTMLDivElement>(null); 
  const ladyRef = useRef<HTMLDivElement>(null);
  const titleRef = useRef<HTMLHeadingElement>(null);
  const descriptionRef = useRef<HTMLParagraphElement>(null);
  const natyaRef = useRef<HTMLDivElement>(null);
  const taksatiRef = useRef<HTMLDivElement>(null);

  useGSAP(
    () => {
      if (!done) return; // Wait for loading to finish before animating

      const mm = gsap.matchMedia();

      // SHARED ENTRY ANIMATIONS 
      gsap.from(bgWrapperRef.current, {
        scale: 1.3,
        duration: 1.5,
        ease: "power2.out",
      });

      gsap.from(ladyRef.current, {
        y: 100,
        scale: 0.5,
        autoAlpha: 0,
        duration: 1.5,
        ease: "power3.out",
      });

      gsap.from(titleRef.current, {
        y: 100,
        scale: 0.5,
        autoAlpha: 0,
        duration: 1.5,
        ease: "power3.out",
      });


      // MASTER TIMELINE
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: containerRef.current,
          start: "top top",
          end: "+=800%", 
          scrub: 1, 
          pin: true,
        },
      });

      // 1. DESKTOP ANIMATIONS (> 768px)
      mm.add("(min-width: 769px)", () => {
         // Background blurs and fades to black (Original Desktop effect)
         tl.to(
            bgWrapperRef.current,
            {
               filter: "blur(20px)",
               opacity: 0,
               duration: 1,
            },
            0
         );

         // Lady moves up
          tl.fromTo(ladyRef.current,
            { autoAlpha: 1, y: 0 },
            { autoAlpha: 0, y: -100, duration: 0.8 },
            0
          );

          // Title moves up
          tl.fromTo(titleRef.current,
            { y: 0, scale: 1 },
            { y: -530, scale: 0.8, duration: 1 },
            0
          );

           // Description Fades In
          if (descriptionRef.current) {
               tl.to(descriptionRef.current, { autoAlpha: 1, duration: 0.5, delay: 0.5 }, 0);
          }

          // CLEANUP desktop
          tl.to(titleRef.current, { y: -2000, scale: 0.5, duration: 0.5, ease: "power2.in"}, ">");
          tl.to(descriptionRef.current, { y: -1000, autoAlpha: 0, duration: 0.5, ease: "power2.in" }, "<");

          // Posters
          if (natyaRef.current && taksatiRef.current) {
             tl.fromTo(natyaRef.current, { x: "-100vw", autoAlpha: 1 }, { x: "0vw", autoAlpha: 1, duration: 1.5, ease: "power2.out" }, "<");
             
             tl.to(natyaRef.current, { y: "-80vh", duration: 1.5, ease: "power2.out" }, ">");
             tl.fromTo(taksatiRef.current, { x: "100vw", autoAlpha: 1 }, { x: "0vw", autoAlpha: 1, duration: 1.5, ease: "power2.out" }, "<");
          }
      });

      // 2. MOBILE ANIMATIONS (<= 768px)
      mm.add("(max-width: 768px)", () => {
          // Background Gradient Overlay Slide Up (Creates soft separation)
          // Moves from bottom off-screen to covering bottom 60-70%
          tl.fromTo(mobileGradientRef.current, 
            { y: "100%" },
            {
               y: "0%", 
               duration: 1,
               ease: "power2.out"
            }, 0);

          // 1. Move Lady & Title UP to make room, but KEEP VISIBLE
          // Lady moves up significantly to sit at top
          tl.fromTo(ladyRef.current, 
            { y: 0 },
            {
              y: -250, // Moved up to clear center stage
              duration: 1, 
              ease: "none" // Linear movement to match scroll exactly
            }, 0);

          // Title moves up with Lady
          tl.fromTo(titleRef.current,
            { y: 0 }, 
            {
              y: -250, // Syncing movement with Lady
              duration: 1,
              ease: "none"
            }, 0);

           // 2. Description Fades In - AFTER Lady/Title move
          if (descriptionRef.current) {
               tl.to(descriptionRef.current, { 
                   autoAlpha: 1, 
                   duration: 1, 
                   ease: "power2.inOut" 
               }, ">"); // Starts after previous animations end
          }

          // NO CLEANUP / FADE OUT for Mobile as requested.

           // 3. Natya Poster slides in - AFTER Description
          if (natyaRef.current) {
             tl.fromTo(natyaRef.current, 
                { x: "-100vw", autoAlpha: 1 }, 
                { x: "0vw", autoAlpha: 1, duration: 1.5, ease: "power2.out" }, 
                ">" // Starts after Description
             );
             
             // Vertical adjustment for Natya (synced with slide in)
             tl.to(natyaRef.current, { y: "20vh", duration: 1.5, ease: "power2.out" }, "<");
          }

          // 4. Taksati Poster slides in - AFTER Natya
          if (taksatiRef.current) {
             tl.fromTo(taksatiRef.current, 
                { x: "100vw", autoAlpha: 1 }, 
                { x: "0vw", autoAlpha: 1, duration: 1.5, ease: "power2.out" }, 
                ">" // Starts after Natya
             );
             // Vertical adjustment for Taksati (synced with slide in)
             tl.to(taksatiRef.current, { y: "20vh", duration: 1.5, ease: "power2.out" }, "<");
          }
      });
      
    },
    { scope: containerRef, dependencies: [done] }
  );

  if (!done) {
    return <LoadingScreen progress={progress} />;
  }

  return (
    <div className="relative w-full bg-black">
        {/* Intro Section - Pinned/Fixed */}
        <div ref={containerRef} className="h-screen w-full sticky top-0 bg-black overflow-hidden z-0">
            
            {/* Background Images Wrapper */}
            <div ref={bgWrapperRef} className="absolute inset-0 -z-10 w-full h-full">
                {/* Shared BG */}
                <Image
                    src="/about-events/saptha/saptha-bg.webp"
                    alt="Saptha Background"
                    fill
                    className="object-cover"
                    priority
                />
            </div>

            {/* Mobile Bottom Gradient Overlay (Soft Blur Separation) */}
            <div 
                ref={mobileGradientRef}
                className="absolute bottom-0 left-0 w-full h-[70vh] z-0 md:hidden pointer-events-none"
                style={{ background: "linear-gradient(to top, black 85%, transparent)" }}
            />

            {/* Container for Lady Image and Title */}
            <div className="absolute inset-0 flex flex-col items-center justify-center h-full w-full">
                
                {/* LADY IMAGE COMPONENT */}
                <div ref={ladyRef} className="relative w-[300px] h-[360px] md:w-[600px] md:h-[700px] z-10 -mt-20 md:-mt-30"> 
                    <Image
                        src="/about-events/saptha/sapthalady.webp"
                        alt="Saptha Lady"
                        fill
                        className="object-contain"
                        priority
                    />
                </div>

                <h1 ref={titleRef} className="font-akira text-white text-5xl md:text-8xl lg:text-[11rem] tracking-wider leading-none -mt-10 md:-mt-20 z-20 text-center">
                SAPTHA
                </h1>
            </div>

            {/* Second Section: Description Text */}
            <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
                <p 
                    ref={descriptionRef}
                    className="text-white font-urbanist text-center text-sm md:text-xl lg:text-3xl w-full max-w-[90vw] px-4 md:px-0 mt-[15vh] md:mt-[25vh] z-30 opacity-0 leading-relaxed"
                >
                    SAPTHA Art Show brings together seven powerful expressions of creativity, blending art, culture, and
                    <br className="block my-2" />
                    imagination into one immersive experience.
                    <br className="block my-2" />
                    Explore stories, emotions, and ideas crafted through colors, forms, and unique perspectives
                </p>
            </div>
            
            {/* Third Section: Posters */}
            <div className="absolute inset-0 flex items-center justify-center z-40 pointer-events-none flex-col md:block">
                {/* Natya Poster */}
                <div ref={natyaRef} className="absolute left-0 md:left-[5%] top-[15%] md:top-[10%] w-[100vw] h-[50vh] md:w-[90vw] md:h-[90vh]">
                    <Image 
                        src="/about-events/saptha/natya-poster.webp"
                        alt="Natya Poster"
                        fill
                        className="object-contain" 
                    />
                </div>

                {/* Taksati Poster */}
                <div ref={taksatiRef} className="absolute right-0 md:right-[4%] top-[15%] md:top-[12%] w-[100vw] h-[50vh] md:w-[90vw] md:h-[90vh]">
                    <Image 
                        src="/about-events/saptha/taksati-poster.webp"
                        alt="Taksati Poster"
                        fill
                        className="object-contain"
                    />
                </div>
            </div>

        </div>

        {/* Details Section - Scrolls over the fixed intro (Curtain Effect) */}
        <div className="relative z-10 bg-black min-h-screen">
            <SapthaEventDetails />
        </div>

    </div>
  );
};

export default SapthaEvent;
