"use client";

import Image from "next/image";
import { useRef } from "react";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const SapthaEvent = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const bgImageRef = useRef<HTMLImageElement>(null);
  const ladyRef = useRef<HTMLDivElement>(null);
  const titleRef = useRef<HTMLHeadingElement>(null);

  useGSAP(
    () => {
      // Entry Animation: Lady Image (Scale up + Fade up)
      gsap.from(ladyRef.current, {
        y: 100,
        scale: 0.5,
        autoAlpha: 0,
        duration: 1.2,
        ease: "power3.out",
      });

      // Entry Animation: Title (Fade up)
      gsap.from(titleRef.current, {
        y: 100,
        autoAlpha: 0,
        duration: 1,
        ease: "power2.out",
        delay: 0.3, // Slight delay after lady starts
      });

      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: containerRef.current,
          start: "top top",
          end: "+=150%", // Increased distance for smoother, slower transition
          scrub: 1, // Smooth interaction (1s catch-up)
          pin: true,
        },
      });

      // 1. Background blurs and fades to black
      tl.to(
        bgImageRef.current,
        {
          filter: "blur(20px)",
          opacity: 0,
          duration: 1,
        },
        0
      );

      // 2. Lady image fades out and moves up slightly
      // Using formTo ensures it always returns to opacity 1/y:0 when scrolling back
      tl.fromTo(
        ladyRef.current,
        { autoAlpha: 1, y: 0 },
        {
          autoAlpha: 0,
          y: -100,
          duration: 0.8,
        },
        0
      );

      // 3. Title moves upward significantly
      tl.fromTo(
        titleRef.current,
        { y: 0 }, // Start at natural position
        {
          y: -500, // Move up
          duration: 1,
        },
        0
      );
    },
    { scope: containerRef }
  );

  return (
    // Outer container with black background for the "fade to black" effect
    <div ref={containerRef} className="h-screen w-full relative bg-black overflow-hidden">
      
      {/* Background Image */}
      <Image
        ref={bgImageRef}
        src="/about-events/saptha/saptha-bg.webp"
        alt="Saptha Background"
        fill
        className="object-cover -z-10"
        priority
      />

      {/* Container for Lady Image and Title */}
      <div className="absolute inset-0 flex flex-col items-center justify-center h-full w-full">
        
        {/* LADY IMAGE COMPONENT */}
        <div ref={ladyRef} className="relative w-[400px] h-[480px] md:w-[600px] md:h-[700px] z-10 -mt-30"> 
             <Image
                src="/about-events/saptha/sapthalady.webp"
                alt="Saptha Lady"
                fill
                className="object-contain"
                priority
            />
        </div>

        {/* TITLE COMPONENT */}
        <h1 ref={titleRef} className="font-akira text-white text-6xl md:text-8xl lg:text-[11rem] tracking-wider leading-none -mt-20 z-20">
          SAPTHA
        </h1>
      </div>
      
      {/* Content Section (Next Component) - Visible after scroll */}
      {/* Currently hidden/off-screen or can be added below if we want continuous scroll */}
    </div>
  );
};

export default SapthaEvent;
