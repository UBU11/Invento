"use client";

import { useRef, useEffect } from "react";
import Image from "next/image";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import ProShow from "./preview/ProShow";
import { usePathname, useSearchParams } from "next/navigation";

gsap.registerPlugin(ScrollTrigger);

const HeroSection: React.FC = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const heroRef = useRef<HTMLDivElement>(null);
  const inventoRef = useRef<HTMLDivElement>(null);
  const logoRef = useRef<HTMLDivElement>(null);
  const leftImage = useRef<HTMLDivElement>(null);
  const middleImage = useRef<HTMLDivElement>(null);
  const rightImage = useRef<HTMLDivElement>(null);
  const dateRef = useRef<HTMLDivElement>(null);
  const heroContentRef = useRef<HTMLDivElement>(null);

  const pathname = usePathname();
  const searchParams = useSearchParams();

  const scrollToHash = () => {
    const hash = window.location.hash;
    if (!hash) return;

    const el = document.querySelector(hash);
    if (!el) return;

    const extraScroll = 150;
    const y = el.getBoundingClientRect().top + window.scrollY + extraScroll;

    window.heroScrollTrigger?.disable();

    gsap.to(window, {
      scrollTo: y,
      duration: 0.6,
      ease: "power2.out",
      onComplete: () => {
        ScrollTrigger.refresh();
      },
    });
  };

  useEffect(() => {
    scrollToHash();

    const cameFromHash =
      typeof window !== "undefined" &&
      (window.location.hash === "#faq" || window.location.hash === "#contact");

    const lockScroll = () => {
      document.body.style.overflow = "hidden";
      document.documentElement.style.overflow = "hidden";
    };
    const unlockScroll = () => {
      document.body.style.overflow = "";
      document.documentElement.style.overflow = "";
    };

    lockScroll();

    const ctx = gsap.context(() => {
      const scrollTl = gsap.timeline({
        scrollTrigger: {
          trigger: containerRef.current,
          start: "top top",
          end: "+=200%",
          scrub: 1,
          pin: true,
          pinSpacing: true,
          invalidateOnRefresh: true,
        },
      });
      scrollTl.scrollTrigger?.disable();

      scrollTl
        .fromTo(
          inventoRef.current,
          { scale: 1.1, ease: "none" },
          { scale: 0.75, ease: "none" },
          0,
        )
        .fromTo(
          logoRef.current,
          { rotateZ: 10, ease: "none" },
          { rotateZ: 0, ease: "none" },
          0,
        )
        .fromTo(
          dateRef.current,
          { opacity: 0, y: 100 },
          { opacity: 1, y: 0, duration: 1 },
          0,
        )
        .fromTo(
          heroRef.current,
          { y: () => (window.innerWidth < 768 ? 150 : 345) },
          { y: 800, duration: 1 },
          "<",
        )

        .to(inventoRef.current, {
          y: -600,
          opacity: 0,
          scale: 0.2,
          duration: 1,
          ease: "sine.in",
        })
        .to(
          logoRef.current,
          {
            y: -400,
            opacity: 0,
            rotationZ: 0,
            duration: 1,
            ease: "sine.in",
          },
          "<",
        )
        .to(
          dateRef.current,
          { opacity: 0, y: 500, duration: 1, ease: "sine.in" },
          "<",
        )
        .to(
          heroRef.current,
          { y: 1200, opacity: 0, duration: 1, ease: "sine.in" },
          "<",
        )
        .to(
          [leftImage.current, middleImage.current, rightImage.current],
          {
            y: 1000,
            opacity: 0,
            duration: 1,
            ease: "sine.in",
          },
          "<",
        )
        .to(
          heroContentRef.current,
          {
            opacity: 0,
            pointerEvents: "none",
            duration: 0.5,
          },
          ">",
        )
        .fromTo(
          ".pro-show-wrapper",
          { opacity: 0 },
          { opacity: 1, duration: 1, ease: "power3.inOut" },
          "-=1",
        );

      window.heroScrollTrigger = scrollTl.scrollTrigger;

      if (!cameFromHash) {
        const t1 = gsap.timeline({
          onComplete: () => {
            unlockScroll();
            scrollTl.scrollTrigger?.enable();
            ScrollTrigger.refresh();
          },
        });

        t1.fromTo(
          inventoRef.current,
          { y: -600, opacity: 0, scale: 0.8 },
          { y: 0, opacity: 1, scale: 1.1, duration: 1.5, ease: "power3.out" },
          0,
        )
          .fromTo(
            [leftImage.current, middleImage.current, rightImage.current],
            { y: 500, opacity: 0.2 },
            { y: 0, opacity: 1, duration: 2 },
            "<",
          )
          .fromTo(
            logoRef.current,
            { y: 200, rotateZ: 55, opacity: 0.3, scale: 0.5 },
            { y: 0, rotateZ: 10, opacity: 1, scale: 1, duration: 2 },
            "<",
          )
          .fromTo(
            heroRef.current,
            { y: -100, scale: 1.5 },
            {
              y: () => (window.innerWidth < 768 ? 150 : 345),
              scale: 1,
              duration: 1,
            },
            "<",
          );
      } else {
        unlockScroll();
      }
    }, containerRef);

    return () => {
      ctx.revert();
    };
  }, []);

  useEffect(() => {
    if (window.location.hash) {
      scrollToHash();
    }
  }, [pathname, searchParams]);

  return (
    <div
      ref={containerRef}
      className="relative w-full lg:h-736 h-screen overflow-hidden"
    >
      <div
        ref={heroContentRef}
        className="absolute inset-0 w-full h-screen flex items-center justify-center bg-white z-20"
      >
        <div ref={heroRef} className="absolute bottom-0 z-40">
          <Image
            src="/home/home-hero-fan.webp"
            alt="Fan"
            width={3500}
            height={2500}
            className="object-cover h-[400px] lg:h-[700px] w-auto"
          />
        </div>
        <div ref={leftImage} className="absolute -left-12 lg:left-0">
          <Image
            src="/home/left-side.webp"
            alt="Visual"
            width={350}
            height={460}
            className="w-[200px] lg:w-[460px]"
          />
        </div>
        <div ref={rightImage} className="absolute -right-12 lg:right-0">
          <Image
            src="/home/right-side.webp"
            alt="Visual"
            width={350}
            height={460}
            className="w-[200px] lg:w-[460px]"
          />
        </div>
        <div className="relative z-10 flex flex-col items-center justify-center px-6">
          <div ref={logoRef}>
            <Image
              src="/home/LOGO.svg"
              alt="Logo"
              width={300}
              height={220}
              className="h-52 lg:h-80 w-auto"
            />
          </div>
          <div className="absolute text-center">
            <h1
              ref={inventoRef}
              className="text-[56px] md:text-[200px] leading-none tracking-tighter"
            >
              INVENTO
            </h1>
            <h4
              ref={dateRef}
              className=" text-[#FF0000] font-flood opacity-0 text-2xl md:text-3xl lg:text-4xl"
            >
              JAN 29, 30, 31
            </h4>
          </div>
        </div>
      </div>

      <div className="pro-show-wrapper absolute top-0 left-0 w-full z-10 opacity-0">
        <ProShow />
      </div>
    </div>
  );
};

export default HeroSection;
