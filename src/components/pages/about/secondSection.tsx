"use client";

import Image from "next/image";
import { useRef, useLayoutEffect } from "react";
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

  useLayoutEffect(() => {
    if (!sectionRef.current) return;

    const ctx = gsap.context(() => {
      gsap.set(sectionRef.current, { yPercent: 100 });
      gsap.set([topLeftRef.current, bottomRightRef.current], {
        opacity: 0,
        y: 20,
      });
      gsap.set(svgRef.current, { opacity: 0 });

      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top top",
          end: "+=400%",
          pin: true,
          scrub: 0.4,
          invalidateOnRefresh: true,
        },
      });

      tl.to(sectionRef.current, {
        yPercent: 0,
        duration: 0.6,
        ease: "power1.out",
      })
        .to(
          svgRef.current,
          {
            opacity: 0.5,
            duration: 0.2,
            ease: "circ.inOut",
          },
          "<",
        )
        .to(
          topLeftRef.current,
          {
            opacity: 1,
            y: 0,
            duration: 0.5,
            ease: "expo.out",
          },
          ">",
        )
        .to(
          bottomRightRef.current,
          {
            opacity: 1,
            y: 0,
            duration: 0.5,
            ease: "expo.out",
          },
          ">",
        );
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={sectionRef}
      className="relative w-full h-screen bg-white overflow-hidden z-20"
    >
      <div className="relative w-full h-full">
        <Image
          src={"/about/second.webp"}
          fill
          className="hidden lg:block object-cover"
          alt="Second section"
        />
        <Image
          src={"/about/about-mission-vision-mobile.png"}
          fill
          className="block lg:hidden object-cover"
          alt="Second section"
        />
        <div
          ref={svgRef}
          className="block absolute inset-0 z-0 pointer-events-none"
        >
          <svg
            className="w-full h-full opacity-40"
            viewBox="0 0 100 100"
            preserveAspectRatio="none"
          >
            <circle
              cx="50"
              cy="50"
              r="50"
              fill="none"
              stroke="white"
              strokeWidth="0.15"
            />

            <path
              d="M0,0 Q50,50 100,0"
              fill="none"
              stroke="white"
              strokeWidth="0.15"
            />

            <path
              d="M0,100 Q50,50 100,100"
              fill="none"
              stroke="white"
              strokeWidth="0.15"
            />
          </svg>
        </div>
        <div className="w-full h-full flex flex-col items-center justify-center lg:text-">
          <div
            ref={topLeftRef}
            className="lg:absolute lg:top-24 lg:left-24 text-center lg:text-left max-w-md z-10 text-white p-8 "
          >
            <h2 className="font-urbanist text-5xl font-semibold mb-4">
              VISION
            </h2>
            <p className="font-poppins text-lg leading-relaxed">
              To be the premier national platform where technical innovation and
              cultural heritage converge to shape the leaders of tomorrow.
            </p>
          </div>

          <div
            ref={bottomRightRef}
            className="lg:absolute lg:bottom-24 lg:right-24 max-w-md z-10 text-white text-center lg:text-right p-8"
          >
            <h2 className="font-urbanist text-5xl font-semibold mb-4">
              MISSION
            </h2>
            <p className="font-poppins text-lg leading-relaxed">
              Empowering students through high-impact technical exhibitions,
              creative artistic expression, and community-driven innovation
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
