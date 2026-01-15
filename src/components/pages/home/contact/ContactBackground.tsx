"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

interface ContactBackgroundProps {
  sectionRef: React.RefObject<HTMLElement | null>;
}

export default function ContactBackground({ sectionRef }: ContactBackgroundProps) {
  const bottomImageRef = useRef<HTMLImageElement>(null);

  useEffect(() => {
    const bottomImg = bottomImageRef.current;
    const section = sectionRef.current;

    if (!bottomImg || !section) return;

    // Set initial state - image below and invisible
    gsap.set(bottomImg, {
      y: 200,
      opacity: 0,
    });

    let timeoutId: NodeJS.Timeout;

    // Create scroll trigger animation
    const scrollTrigger = ScrollTrigger.create({
      trigger: section,
      start: "top 80%",
      end: "bottom 20%",
      onEnter: () => {
        // Clear any existing timeout
        clearTimeout(timeoutId);
        // Wait 1 second then animate
        timeoutId = setTimeout(() => {
          gsap.to(bottomImg, {
            y: 0,
            opacity: 1,
            duration: 1,
            ease: "power2.out",
          });
        }, 1000);
      },
      onLeaveBack: () => {
        // Clear timeout if scrolling up before animation completes
        clearTimeout(timeoutId);
        // Immediately reverse animation
        gsap.to(bottomImg, {
          y: 200,
          opacity: 0,
          duration: 1,
          ease: "power2.out",
        });
      },
      onEnterBack: () => {
        // When scrolling back down, wait 1 second then animate
        clearTimeout(timeoutId);
        timeoutId = setTimeout(() => {
          gsap.to(bottomImg, {
            y: 0,
            opacity: 1,
            duration: 1,
            ease: "power2.out",
          });
        }, 1000);
      },
      onLeave: () => {
        // When scrolling past, keep it visible
        clearTimeout(timeoutId);
      },
    });

    return () => {
      clearTimeout(timeoutId);
      scrollTrigger.kill();
    };
  }, [sectionRef]);

  return (
    <>
      <div
        style={{
          position: "absolute",
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          width: "100%",
          height: "100%",
          zIndex: 0,
          pointerEvents: "none",
          backgroundImage: "url('/contact/contact-bg.webp')",
          backgroundSize: "cover",
          backgroundPosition: "center",
          backgroundRepeat: "no-repeat",
        }}
      />
      
      {/* Left Side Image */}
      <img
        src="/contact/contact-side.webp"
        alt=""
        style={{
          position: "absolute",
          top: 0,
          left: 0,
          zIndex: 5,
          pointerEvents: "none",
          height: "100%",
          width: "auto",
        }}
      />
      
      {/* Bottom Image */}
      <img
        ref={bottomImageRef}
        src="/contact/contact-bottom.webp"
        alt=""
        style={{
          position: "absolute",
          bottom: 0,
          left: 0,
          right: 0,
          zIndex: 5,
          pointerEvents: "none",
          width: "100%",
          height: "auto",
          maxHeight: "clamp(300px, 50vh, 600px)",
        }}
      />
    </>
  );
}

