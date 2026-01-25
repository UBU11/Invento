"use client";

import { useLayoutEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Image from "next/image";
import Link from "next/link";

gsap.registerPlugin(ScrollTrigger);

const FejoCard: React.FC = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const cardRef = useRef<HTMLDivElement>(null);

  useLayoutEffect(() => {
    const ctx = gsap.context(() => {
      const mm = gsap.matchMedia();

      mm.add("(min-width: 800px)", () => {
        // Animation Logic
        gsap.fromTo(
          cardRef.current,
          {
            y: -700,
            delay: 50,
            scale: 1,
            autoAlpha: 1,
          },
          {
            y: 0,
            delay: 50,
            scale: 1,
            duration: 10,
            ease: "power3.out",
            scrollTrigger: {
              trigger: containerRef.current,
              start: "top 75%",
              end: "bottom center",
              toggleActions: "play none none reverse",
              invalidateOnRefresh: true,
            },
          },
        );
      });
    }, containerRef);

    return () => ctx.revert();
  }, []);

  return (
    <div
      ref={containerRef}
      className="relative  sm:scale-105 -mt-8 lg:-mt-24 w-full z-0"
    >
      <div ref={cardRef} className="w-full origin-center">
        <Image
          src={"/home/preview/fejo-card.webp"}
          alt="Proshow bg"
          width={1500}
          height={300}
          priority={true}
          className="w-full h-auto "
        />

        <div className="absolute inset-0 flex flex-col items-center justify-center px-8 text-center">
          <div className="absolute lg:top-40 top-10 bg-white text-black font-bold lg:text-2xl text-[10px] uppercase lg:px-5 px-3 py-1">
            JAN 30, 26
          </div>
          <h2 className="text-xl lg:text-7xl mt-10 lg:mt-8">FEJO X ADJ</h2>
          <h4 className="text-[7px] lg:text-xl font-medium -mt-4 lg:mt-4">
            The Blueprint of Malayali Hip-Hop.
            <br />
            Experience the raw, unfiltered energy that redefined a genre.
          </h4>
          <Link
            scroll={false}
            href={"/event"}
            className="absolute bottom-2 md:bottom-12 bg-white text-black text-[5px] lg:text-xl font-bold uppercase px-1 py-1 lg:px-8 lg:py-3"
          >
            REGISTER
          </Link>
        </div>
      </div>
    </div>
  );
};

export default FejoCard;
