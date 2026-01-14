"use client";

import Image from "next/image";
import AboutText from "@/src/components/Text/heroSection";
import Navbar from "@/src/components/ui/navbar/navbar";
import { useRef, useEffect } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import HeroSectionCard from "./Cards/heroSectionCard";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

export default function HeroSection() {
  const sectionRef = useRef<HTMLElement>(null);
  const textRef = useRef<HTMLDivElement>(null);
  const storyRef = useRef<HTMLDivElement>(null);
  const navbarRef = useRef<HTMLDivElement>(null);
  const cardsRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (
      !sectionRef.current ||
      !textRef.current ||
      !storyRef.current ||
      !navbarRef.current ||
      !cardsRef.current
    )
      return;

    const ctx = gsap.context(() => {
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top top",
          end: "+=1200%",
          pin: true,
          scrub: 2,
          invalidateOnRefresh: true,
        },
      });

      tl.to(
        navbarRef.current,
        {
          opacity: 0,
          duration: 0.3,
          ease: "expo.out",
        },
        0,
      )
        .to(
          textRef.current,
          {
            y: "-60vh",
            duration: 0.7,
            ease: "power1.inOut",
          },
          0,
        )
        .to(
          storyRef.current?.querySelectorAll("p") || [],
          {
            opacity: 1,
            y: 0,
            stagger: 0.3,
            duration: 0.5,
            ease: "power2.out",
          },
          0.6,
        )
        .to(
          cardsRef.current?.querySelectorAll(".card") || [],
          {
            opacity: 1,
            y: 0,
            stagger: 0,
            duration: 0.6,
            ease: "power2.out",
          },
          0.5,
        )
        .to({}, { duration: 2 });
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      id="hero-section"
      ref={sectionRef}
      className="relative w-full h-screen bg-white overflow-hidden"
    >
      <div className="relative w-full h-full">
        <Image
          src={"/about/main.jpg"}
          fill
          priority
          className="object-cover"
          alt="Background"
        />
        <div ref={navbarRef}>
          <Navbar />
        </div>

        <div ref={textRef}>
          <AboutText text="ABOUT" />
        </div>

        <div
          ref={storyRef}
          className="absolute top-[22%] md:top-[28%] lg:top-[30%] left-[5vw] md:left-[10vw] max-w-[90vw] md:max-w-2xl lg:max-w-4xl xl:max-w-6xl z-10"
        >
          <p className="text-white text-sm sm:text-base md:text-lg lg:text-xl md:mt-[5vh] mb-6 opacity-0 translate-y-10 leading-relaxed font-bold">
            Born in the year 2012,INVENTO is the national level annual
            <br />
            techno-management festival of Government Engineering <br />
            College Palakkad.
          </p>
        </div>

        <div
          ref={cardsRef}
          className="absolute bottom-4 sm:bottom-8 md:bottom-12 lg:bottom-20 left-1/2 -translate-x-1/2 w-full max-w-6xl px-4 md:px-8 z-10"
        >
          <HeroSectionCard />
        </div>
      </div>
    </section>
  );
}
