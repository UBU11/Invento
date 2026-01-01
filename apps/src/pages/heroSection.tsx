"use client";

import Image from "next/image";
import main from "@/public/main.jpg";
import AboutText from "@/src/components/Text/heroSection";
import Navbar from "@/src/components/Navbar/navbar";
import { useRef } from "react";
import gsap from "gsap";

export default function HeroSection() {
  return (
    <section className="relative w-full h-screen bg-white overflow-hidden">
      <div className="relative w-full h-full">
        <Image
          src={main}
          fill
          priority
          className="object-cover"
          alt="Background"
        />
        <Navbar />

        <AboutText text="ABOUT" />
      </div>
    </section>
  );
}
