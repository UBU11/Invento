"use client";

import gsap from "gsap";
import { useRef } from "react";
import { useGSAP } from "@gsap/react";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(useGSAP, ScrollTrigger);

export default function HeroSectionText({ text }: { text?: string }) {
  const textRef = useRef<HTMLHeadingElement>(null);

  return (
    <div
      className="title absolute left-[2vw] md:left-[5vw] opacity-25 text-amber-50"
      style={{ top: "80vh", transform: "translateY(-50%)" }} // translateY to center the text to 80% line
    >
      <h1
        ref={textRef}
        className="font-urbanist font-bold text-[15vw] 2xl:text-[320px] leading-none uppercase"
      >
        {text}
      </h1>
    </div>
  );
}
