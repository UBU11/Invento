"use client";

import Image from "next/image";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useRef } from "react";
import Link from "next/link";
import { useGSAP } from "@gsap/react";

gsap.registerPlugin(ScrollTrigger);

const Preview = () => {
  const mainRef = useRef<HTMLDivElement>(null);

  useGSAP(
    () => {
      // Desktop Animations
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
            { xPercent: 100, autoAlpha: 1},
            {
              xPercent: 0,
              autoAlpha: 1,
              ease: "power2.out",
              scrollTrigger: {
                trigger: section,
                start: "top center", // Adjusted to ensure it triggers earlier
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
                start: "top center", // Adjusted
                end: "bottom center",
                scrub: 1,
                invalidateOnRefresh: true,
              },
            },
          );
        }
      });

      // Mobile Animations
      const mobileImagesRight = gsap.utils.toArray<Element>(
        ".right-image-mobile",
        mainRef.current,
      );
      mobileImagesRight.forEach((img: Element) => {
        gsap.fromTo(
          img,
          { x: 50, autoAlpha: 0 },
          {
            x: 0,
            autoAlpha: 1,
            duration: 1,
            ease: "power3.out",
            scrollTrigger: {
              invalidateOnRefresh: true,
              trigger: img,
              start: "top 85%",
              toggleActions: "play none none reverse",
            },
          },
        );
      });

      const mobileImagesLeft = gsap.utils.toArray<Element>(
        ".left-image-mobile",
        mainRef.current,
      );
      mobileImagesLeft.forEach((img: Element) => {
        gsap.fromTo(
          img,
          { x: -50, autoAlpha: 0 },
          {
            x: 0,
            autoAlpha: 1,
            duration: 1,
            ease: "power3.out",
            scrollTrigger: {
              trigger: img,
              start: "top 85%",
              toggleActions: "play none none reverse",
            },
          },
        );
      });
    },
    { scope: mainRef },
  );

  return (
    <div ref={mainRef} className="w-full overflow-hidden">
      <div className="hidden lg:block md:block">
        <section className="min-h-screen relative desktop-section">
          <Link href={"/coming-soon"}>
            <Image
              src="/home/preview/saptha.webp"
              width={1200}
              height={300}
              alt="Saptha"
              className="absolute top-10 right-0 right-image z-10"
            />
          </Link>

          <div className="absolute flex -bottom-18 w-full px-24 justify-end z-30">
            <Link
              href={"/coming-soon"}
              className="bg-[#A41F22] p-3 font-akira text-white right-btn"
            >
              KNOW MORE
            </Link>
          </div>
        </section>

        <section className="min-h-screen relative desktop-section">
          <div className="absolute flex -bottom-18 w-full px-42 justify-end">
            <Link
              href={"/coming-soon"}
              className="bg-[#A41F22] p-3 font-akira text-white left-btn"
            >
              KNOW MORE
            </Link>
          </div>
          <Link href={"/coming-soon"}>
            <Image
              src="/home/preview/technical.webp"
              width={1200}
              height={300}
              alt="Technical"
              className="absolute left-0 left-image"
            />
          </Link>
        </section>

        <section className="min-h-screen relative desktop-section">
          <Link href={"/coming-soon"}>
            <Image
              src="/home/preview/general.webp"
              width={1200}
              height={300}
              alt="General"
              className="absolute right-0 right-image"
            />
          </Link>

          <div className="absolute flex -bottom-18 w-full px-42 justify-end">
            <Link
              href={"/coming-soon"}
              className="bg-[#A41F22] p-3 font-akira text-white left-btn"
            >
              KNOW MORE
            </Link>
          </div>
        </section>
      </div>

      {/* MOBILE LAYOUT */}
      <div className="md:hidden lg:hidden min-h-screen flex justify-center flex-col gap-10 py-10">
        <div className="w-full flex justify-end ">
          <Image
            src={"/home/preview/saptha-mobile.webp"}
            width={330}
            height={100}
            alt=""
            className="right-image-mobile"
          />
        </div>

        <div className="w-full flex justify-start ">
          <Image
            src={"/home/preview/technical-mobile.webp"}
            width={330}
            height={100}
            alt="gh"
            className="left-image-mobile"
          />
        </div>

        <div className="w-full flex justify-end">
          <Image
            src={"/home/preview/general-mobile.webp"}
            width={330}
            height={100}
            alt=""
            className="right-image-mobile"
          />
        </div>
      </div>
    </div>
  );
};

export default Preview;
