"use client";

import { useRef, useState, useEffect } from "react";
import Image from "next/image";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const HeroSection: React.FC = () => {
  const heroRef = useRef<HTMLDivElement>(null);
  const inventoRef = useRef<HTMLDivElement>(null);
  const logoRef = useRef<HTMLDivElement>(null);
  const leftImage = useRef<HTMLDivElement>(null);
  const rightImage = useRef<HTMLDivElement>(null);
  const sectionRef = useRef<HTMLDivElement>(null);
  const dateRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const lockScroll = () => {
      document.body.style.overflow = "hidden";
      document.documentElement.style.overflow = "hidden";
    };

    const unlockScroll = () => {
      document.body.style.overflow = "";
      document.documentElement.style.overflow = "";
    };

    lockScroll();

    const t1 = gsap.timeline({
      onComplete: () => {
        unlockScroll();

        const scrollTl = gsap.timeline({
          scrollTrigger: {
            trigger: sectionRef.current,
            start: "top top",
            end: "+=1200",
            scrub: 0.8,
            pin: true,
            pinSpacing: true,
          },
        });

        scrollTl
          .to(inventoRef.current, { scale: 0.75, ease: "none" })
          .fromTo(
            dateRef.current,
            { opacity: 0, y: 100 },
            { opacity: 1, y: 0, duration: 1 },
            0,
          )
          .to(logoRef.current, { rotateZ: 0, ease: "none" }, 0)
          .fromTo(heroRef.current, { y: 345 }, { y: 800, duration: 1 }, 0);

        ScrollTrigger.refresh();
      },
    });
    t1.fromTo(
      inventoRef.current,
      { y: -600, opacity: 0, scale: 0.8 },
      { y: 0, opacity: 1, scale: 1.1, duration: 1.5, ease: "power3.out" },
    );

    gsap.fromTo(
      [leftImage.current, rightImage.current],
      { y: 500, opacity: 0.2 },
      { y: 0, opacity: 1, duration: 2 },
    );

    gsap.fromTo(
      logoRef.current,
      { y: 200, rotateZ: 55, opacity: 0.3, scale: 0.5 },
      { y: 0, rotateZ: 10, opacity: 1, scale: 1, duration: 2 },
    );

    gsap.fromTo(
      heroRef.current,
      { y: -100, scale: 1.5 },
      { y: 345, scale: 1, duration: 1 },
    );

    ScrollTrigger.refresh();
  }, []);

  return (
    <>
      <section
        ref={sectionRef}
        className="relative w-full min-h-screen flex items-center justify-center overflow-hidden"
      >
        {/* Hero Image */}
        <div ref={heroRef} className="absolute bottom-0 z-20">
          <Image
            src="/home/home-hero-fan.webp"
            alt="Fan Art"
            width={3500}
            height={2500}
            className="object-cover h-[400px] w-auto aspect-auto lg:h-[700px]"
          />
        </div>

        {/* Left Image */}
        <div ref={leftImage} className="absolute -left-12 lg:left-0">
          <Image
            src="/home/left-side.svg"
            alt="Left Visual"
            width={350}
            height={460}
            className="object-contain opacity-80 w-[200px] aspect-auto lg:w-[460px]"
          />
        </div>

        {/* Right Image */}
        <div ref={rightImage} className="absolute -right-12 lg:right-0">
          <Image
            src="/home/right-side.svg"
            alt="Left Visual"
            width={350}
            height={460}
            className="object-contain opacity-80 w-[200px] aspect-auto lg:w-[460px]"
          />
        </div>

        <div className="relative z-10 flex flex-col items-center justify-center px-6 max-w-2xl">
          <div ref={logoRef}>
            <Image
              src="/home/LOGO.svg"
              alt="Center Visual"
              width={300}
              height={220}
              className="mt-3 h-52 w-auto lg:h-80"
            />
          </div>

          <div className="absolute">
            <h1
              ref={inventoRef}
              className="m-0 p-0 leading-none tracking-tighter text-[56px] md:text-[200px]"
            >
              INVENTO
            </h1>

            <h3 ref={dateRef} className="text-[#FF0000] text-center opacity-0">
              JAN 29, 30, 31
            </h3>
          </div>
        </div>
      </section>
    </>
  );
};

export default HeroSection;
