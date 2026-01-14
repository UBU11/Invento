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
  const svgRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!sectionRef.current) return;

    const ctx = gsap.context(() => {
      gsap.set(sectionRef.current, { yPercent: 100 });
      gsap.set([topLeftRef.current, bottomRightRef.current], { opacity: 0, y: 20 });
      gsap.set(svgRef.current, { opacity: 0 });

      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: "#hero-section",
          start: "top top",
          end: "+=1200%",
          scrub: true,  
          invalidateOnRefresh: true,
        },
      });

      
      tl.to({}, { duration: 3 })
        .to(sectionRef.current, {
          yPercent: 0,
          duration: 2,
          ease: "none",
          stagger:0.1
        })
        .to(svgRef.current, {
          opacity: 0.5,
          duration: 2,
          delay:1.2,
          ease: "circ.inOut"
        }, "<")
        .to(topLeftRef.current, {
          opacity: 1,
          y: 0,
          delay:2,
          duration: 2,
          ease: "expo.out"
        }, "-=1.5")
        .to(bottomRightRef.current, {
          opacity: 1,
          y: 0,
          duration: 2,
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
        <div ref={svgRef} className="absolute inset-0 z-0 pointer-events-none">
          <svg className="w-full h-full opacity-40" viewBox="0 0 100 100" preserveAspectRatio="none">
          
             <circle cx="50" cy="50" r="50" fill="none" stroke="white" strokeWidth="0.09" />
             
            
             <path d="M0,0 Q50,50 100,0" fill="none" stroke="white" strokeWidth="0.15" />
             
            
             <path d="M0,100 Q50,50 100,100" fill="none" stroke="white" strokeWidth="0.15" />
          </svg>
        </div>
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
