"use client";

import gsap from "gsap";
import { useRef } from "react";
import { useGSAP } from "@gsap/react";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(useGSAP, ScrollTrigger);

export default function HeroSectionText({ text }: { text?: string}) {
  const textRef = useRef<HTMLHeadingElement>(null);


  return (
    <div
      className="title absolute top-[70vh] md:top-[75vh] lg:top-[30vh] xl:top-[68vh] xl:left-[10vw] font-bold text-[15vw] sm:text-[18vw] md:text-[20vw] lg:text-[22vw] xl:text-[25vw] 2xl:text-[320px] left-[2vw] md:left-[5vw] opacity-25 text-amber-50"
    >
      <h1 ref={textRef} className="leading-none uppercase">
        {text}
      </h1>
    </div>
  );
}