"use client";

import Image from "next/image";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useRef } from "react";
import Link from "next/link";
import { useGSAP } from "@gsap/react";

// ✅ image imports
import sapthaWeb from "@/public/home/preview/saptha.webp";
import technicalWeb from "@/public/home/preview/technical.webp";
import generalWeb from "@/public/home/preview/general.webp";

import sapthaMobile from "@/public/home/preview/saptha-mobile.webp";
import technicalMobile from "@/public/home/preview/technical-mobile.webp";
import generalMobile from "@/public/home/preview/general-mobile.webp";

gsap.registerPlugin(ScrollTrigger);

const Preview = () => {
  const mainRef = useRef<HTMLDivElement>(null);

  useGSAP(
    () => {
      const sections = gsap.utils.toArray(
        ".desktop-section",
        mainRef.current,
      ) as HTMLElement[];

      sections.forEach((section) => {
        const rightImg = section.querySelector(".right-image");
        const rightBtn = section.querySelector(".right-btn");
        const leftImg = section.querySelector(".left-image");
        const leftBtn = section.querySelector(".left-btn");

        if (rightImg) {
          gsap.fromTo(
            [rightImg, rightBtn],
            { xPercent: 100, autoAlpha: 1 },
            {
              xPercent: 0,
              autoAlpha: 1,
              ease: "power2.out",
              scrollTrigger: {
                trigger: section,
                start: "top center",
                end: "bottom center",
                scrub: 1,
                invalidateOnRefresh: true,
              },
            },
          );
        }

        if (leftImg) {
          gsap.fromTo(
            [leftImg, leftBtn],
            { xPercent: -100, autoAlpha: 0 },
            {
              xPercent: 0,
              autoAlpha: 1,
              ease: "power2.out",
              scrollTrigger: {
                trigger: section,
                start: "top center",
                end: "bottom center",
                scrub: 1,
                invalidateOnRefresh: true,
              },
            },
          );
        }
      });
    },
    { scope: mainRef },
  );

  return (
    <div ref={mainRef} className="w-full overflow-hidden">
      <div className="hidden lg:block md:block">
        <section className="min-h-screen relative desktop-section">
          <Link scroll={false} href="/about-events?category=saptha">
            <Image
              src={sapthaWeb}
              width={1200}
              height={300}
              alt="Saptha"
              className="absolute top-10 right-0 right-image z-10"
            />
          </Link>

          <div className="absolute flex -bottom-18 w-full px-24 justify-end z-30">
            <Link
              href="/about-events?category=saptha"
              className="bg-[#A41F22] p-3 font-akira text-white right-btn"
            >
              KNOW MORE
            </Link>
          </div>
        </section>

        <section className="min-h-screen relative desktop-section">
          <div className="absolute flex -bottom-18 w-full px-42 justify-end">
            <Link
              href="/about-events?category=technical"
              className="bg-[#A41F22] p-3 font-akira text-white left-btn"
            >
              KNOW MORE
            </Link>
          </div>

          <Link scroll={false} href="/coming-soon">
            <Image
              src={technicalWeb}
              width={1200}
              height={300}
              alt="Technical"
              className="absolute left-0 left-image"
            />
          </Link>
        </section>

        <section className="min-h-screen relative desktop-section">
          <Link scroll={false} href="/coming-soon">
            <Image
              src={generalWeb}
              width={1200}
              height={300}
              alt="General"
              className="absolute right-0 right-image"
            />
          </Link>

          <div className="absolute flex -bottom-18 w-full px-42 justify-end">
            <Link
              href="/about-events?category=general"
              className="bg-[#A41F22] p-3 font-akira text-white left-btn"
            >
              KNOW MORE
            </Link>
          </div>
        </section>
      </div>

      {/* MOBILE */}
      <div className="md:hidden lg:hidden min-h-screen flex justify-center flex-col gap-10 py-10">
        <div className="w-full flex justify-end">
          <Link href="/about-events?category=saptha">
            <Image
              src={sapthaMobile}
              width={330}
              height={100}
              alt=""
              className="right-image-mobile"
            />
          </Link>
        </div>

        <div className="w-full flex justify-start">
          <Link href="/about-events?category=technical">
            <Image
              src={technicalMobile}
              width={330}
              height={100}
              alt=""
              className="left-image-mobile"
            />
          </Link>
        </div>

        <div className="w-full flex justify-end">
          <Link href="/about-events?category=general">
            <Image
              src={generalMobile}
              width={330}
              height={100}
              alt=""
              className="right-image-mobile"
            />
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Preview;
