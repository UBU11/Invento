"use client";

import Image from "next/image";
import main from "@/public/main.jpg";
import AboutText from "@/src/components/Text/heroSection";
import Navbar from "@/src/components/Navbar/navbar";
import { useRef, useEffect } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import HeroSectionCard from "@/src/components/Cards/heroSectionCard";

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
    if (!sectionRef.current || !textRef.current || !storyRef.current || !navbarRef.current || !cardsRef.current) return;

    const ctx = gsap.context(() => {
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top top",
          end: "+=500%",
          pin: true,
          scrub: 1,
          anticipatePin: 1,
          invalidateOnRefresh: true,
          markers: true,
        },
      });

      tl.to(navbarRef.current, {
        opacity: 0,
        duration: 0.3,
        ease: "power2.out",
      }, 0)
        .to(textRef.current, {
          y: "-60vh",
          duration: 1,
          ease: "power1.inOut",
        }, 0)
        .to(
          storyRef.current?.querySelectorAll("p") || [],
          {
            opacity: 1,
            y: 0,
            stagger: 0.3,
            duration: 0.5,
            ease: "power2.out",
          },
          0.8
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
          0.9
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
          src={main}
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
          className="absolute top-1/3 left-110 -translate-x-1/2 max-w-6xl px-8 z-10"
        >
          <p className="text-white text-2xl mb-6 opacity-0 translate-y-10 leading-relaxed font-bold">
            Born in the year 2012,INVENTO is the national level annual
            <br />
            techno-management festival of Government Engineering <br />
            College Palakkad.
          </p>
        </div>

        <div
          ref={cardsRef}
          className="absolute bottom-20 left-1/2 -translate-x-1/2 w-full max-w-6xl px-8 z-10"
        >
        <HeroSectionCard />
        </div>
      </div>
    </section>
  );
}
