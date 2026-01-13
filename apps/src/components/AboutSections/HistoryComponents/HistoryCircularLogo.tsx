"use client";
import Image from "next/image";
import { useEffect, useRef } from "react";
import gsap from "gsap";

export default function HistoryCircularLogo() {
  const textRef = useRef<SVGSVGElement>(null);

  useEffect(() => {
    if (!textRef.current) return;
    const anim = gsap.to(textRef.current, { rotation:360, duration:20, repeat:-1, ease:"none" });
    return () => { anim.kill(); };
  }, []);

  return (
    <div className="relative w-64 h-64 flex items-center justify-center">
      <div className="absolute inset-0 flex items-center justify-center z-10">
        <div className="relative w-32 h-32">
          <Image src="/about/history/invento logo-dark.webp" fill className="object-contain" alt="Invento"/>
        </div>
      </div>

      <svg ref={textRef} viewBox="0 0 300 300" className="absolute inset-0 w-full h-full">
        <defs>
          <path id="circlePath" d="M 150,150 m -120,0 a120,120 0 1,1 240,0 a120,120 0 1,1 -240,0"/>
        </defs>
        <text fill="currentColor" fontSize="22" fontWeight="bold" letterSpacing="0.2em">
          <textPath href="#circlePath" startOffset="0%" textLength="750">
            INVENTO • INVENTO • INVENTO • INVENTO •
          </textPath>
        </text>
      </svg>
    </div>
  );
}
