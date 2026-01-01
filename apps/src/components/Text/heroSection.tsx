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
      className="title absolute top-160 font-bold text-[320px] left-23 opacity-25 text-amber-50"
    >
      <h1 ref={textRef} className="leading-none uppercase">
        {text}
      </h1>
    </div>
  );
}