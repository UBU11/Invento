"use client";

import Image from "next/image";
import second from "@/public/second.png";
import { useRef, useEffect } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

export default function SecondSection() {
  const sectionRef = useRef<HTMLElement>(null);
  const topLeftRef = useRef<HTMLDivElement>(null);
  const bottomRightRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!sectionRef.current) return;

    const ctx = gsap.context(() => {
      gsap.set(sectionRef.current, { yPercent: 100 });
      gsap.set([topLeftRef.current, bottomRightRef.current], { opacity: 0, y: 20 });

      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: "#hero-section",
          start: "top top",
          end: "+=500%",
          scrub: true,
          invalidateOnRefresh: true,
          markers: true,
        },
      });

      
      tl.to({}, { duration: 3 })
        .to(sectionRef.current, {
          yPercent: 0,
          duration: 2,
          ease: "none",
        })
        .to(topLeftRef.current, {
          opacity: 1,
          y: 0,
          delay:1.8,
          duration: 1,
          ease: "expo.out"
        }, "-=1.5")
        .to(bottomRightRef.current, {
          opacity: 1,
          y: 0,
          duration: 1,
          ease: "expo.out"
        }, "-=1.0");
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={sectionRef}
      className="fixed top-0 left-0 w-full h-screen bg-white overflow-hidden z-20"
    >
      <div className="relative w-full h-full">
        <Image
          src={second}
          fill
          className="object-cover"
          alt="Second section"
        />
        
        <div 
          ref={topLeftRef}
          className="absolute top-24 left-24 max-w-md z-10 text-white p-8 "
        >
          <h2 className="text-5xl font-bold mb-4">VISION</h2>
          <p className="text-lg leading-relaxed">
          To establish INVENTO as a national platform that ignites innovation, inspires young minds, and shapes the next generation of technologists and creators across India.
          </p>
        </div>

        <div 
          ref={bottomRightRef}
          className="absolute bottom-24 right-24 max-w-md z-10 text-white text-right p-8"
        >
          <h2 className="text-5xl font-bold mb-4">MISSION</h2>
          <p className="text-lg leading-relaxed">
            To create a dynamic space for innovation, technology, and creativity through competitions, workshops, talks, and hands-on experiences.
          </p>
        </div>
      </div>
    </section>
  );
}
