
"use client";

import { useRef, useEffect } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

export default function History() {
  const containerRef = useRef<HTMLElement>(null);
  const spacerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!spacerRef.current || !containerRef.current) return;

    const ctx = gsap.context(() => { 
 
      gsap.fromTo(
        containerRef.current,
        {
          xPercent: 50, 
        },
        {
          xPercent: -50,
          ease: "none",
          scrollTrigger: {
            trigger: spacerRef.current,
            start: "top center",
            end: "bottom -=40%",
            scrub: 1,
            invalidateOnRefresh: true,
            markers: { startColor: "blue", endColor: "orange", fontSize: "18px", indent: 200 },
          },
        }
      );
    }, spacerRef);

    return () => ctx.revert();
  }, []);


  return (
    <>
      <div ref={spacerRef} className="h-[200vh] w-full relative -z-10 bg-transparent" />
      <section
        ref={containerRef}
        className=" fixed top-0 left-0 h-screen w-[200vw] z-50 bg-white flex"
      >
        <div className=" w-screen h-screen shrink-0 flex justify-start items-end relative p-20">
           <h1 className=" text-8xl font-bold">OUR HISTORY</h1>
        </div>
      </section>
    </>
  );
}
