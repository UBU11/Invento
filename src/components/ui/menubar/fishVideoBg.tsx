"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";

export default function KoiVideoLayer() {
  return (
    <>
      {/* Mobile - Video Layer */}
      <video
        src="/ui/menubar/koi-fish-mobile.mp4"
        autoPlay
        muted
        loop
        playsInline
        preload="metadata"
        className="flex lg:hidden absolute inset-0 w-full h-full object-cover z-10"
      />

      {/* Laptop - Video Layer */}
      <video
        src="/ui/menubar/koi-fish-web.mp4"
        autoPlay
        muted
        loop
        playsInline
        preload="metadata"
        className="hidden lg:flex absolute inset-0 w-full h-full object-cover z-10"
      />
    </>
  );
}
