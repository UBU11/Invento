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
      // Wait for DOM to be ready and images to load
      const initAnimations = () => {
        if (!mainRef.current) return;

        const sections = gsap.utils.toArray(
          ".desktop-section",
          mainRef.current,
        ) as HTMLElement[];

        if (sections.length === 0) {
          // Retry if sections aren't ready yet
          setTimeout(initAnimations, 100);
          return;
        }

        sections.forEach((section) => {
          const rightImg = section.querySelector(".right-image");
          const rightBtn = section.querySelector(".right-btn");
          const leftImg = section.querySelector(".left-image");
          const leftBtn = section.querySelector(".left-btn");

          // Animate right images (can have right-btn or left-btn)
          if (rightImg) {
            // Animate only the image
            gsap.fromTo(
              rightImg,
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
                  refreshPriority: -1,
                },
              },
            );
            // Keep button visible and in place (don't animate it)
            if (rightBtn) {
              gsap.set(rightBtn, { xPercent: 0, autoAlpha: 1 });
            }
          }

          // Animate left images (must have left-btn)
          if (leftImg && leftBtn) {
            // Set button to be always clickable
            gsap.set(leftBtn, { pointerEvents: 'auto', zIndex: 50 });
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
                  refreshPriority: -1,
                },
              },
            );
          }
        });

        // Mobile animations
        const mobileRightImages = mainRef.current?.querySelectorAll(".right-image-mobile");
        const mobileLeftImages = mainRef.current?.querySelectorAll(".left-image-mobile");

        if (mobileRightImages && mobileRightImages.length > 0) {
          mobileRightImages.forEach((img) => {
            gsap.fromTo(
              img,
              { xPercent: 100, autoAlpha: 0 },
              {
                xPercent: 0,
                autoAlpha: 1,
                ease: "power2.out",
                scrollTrigger: {
                  trigger: img,
                  start: "top 80%",
                  end: "top 20%",
                  scrub: 1,
                  invalidateOnRefresh: true,
                  refreshPriority: -1,
                },
              },
            );
          });
        }

        if (mobileLeftImages && mobileLeftImages.length > 0) {
          mobileLeftImages.forEach((img) => {
            gsap.fromTo(
              img,
              { xPercent: -100, autoAlpha: 0 },
              {
                xPercent: 0,
                autoAlpha: 1,
                ease: "power2.out",
                scrollTrigger: {
                  trigger: img,
                  start: "top 80%",
                  end: "top 20%",
                  scrub: 1,
                  invalidateOnRefresh: true,
                  refreshPriority: -1,
                },
              },
            );
          });
        }

        // Refresh ScrollTrigger after animations are set up
        ScrollTrigger.refresh();
      };

      // Initialize after a small delay to ensure DOM is ready
      if (typeof window !== "undefined") {
        if (document.readyState === "complete") {
          setTimeout(initAnimations, 100);
        } else {
          window.addEventListener("load", () => {
            setTimeout(initAnimations, 100);
          });
        }
      }
    },
    { scope: mainRef, dependencies: [] },
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
              className="bg-[#A41F22] px-3 py-2 text-sm lg:p-3 lg:text-base font-akira text-white right-btn"
            >
              KNOW MORE
            </Link>
          </div>
        </section>

        <section className="min-h-screen relative desktop-section">
          <div className="absolute flex -bottom-18 w-full px-42 justify-end z-30">
            <Link
              href="/about-events?category=technical"
              className="bg-[#A41F22] px-3 py-2 text-sm lg:p-3 lg:text-base font-akira text-white left-btn relative z-50"
              style={{ pointerEvents: 'auto' }}
            >
              KNOW MORE
            </Link>
          </div>

          <Link scroll={false} href="/about-events?category=technical">
            <Image
              src={technicalWeb}
              width={1200}
              height={300}
              alt="Technical"
              className="absolute left-0 left-image"
            />
          </Link>
        </section>

        <section className="min-h-screen relative desktop-section" style={{ zIndex: 10, minHeight: 'calc(100vh + 120px)', paddingBottom: '120px' }}>
          <Link scroll={false} href="/about-events?category=general">
            <Image
              src={generalWeb}
              width={1200}
              height={300}
              alt="General"
              className="absolute top-10 right-0 right-image z-10"
            />
          </Link>

          <div className="absolute flex bottom-0 w-full px-24 justify-end" style={{ zIndex: 100 }}>
            <Link
              href="/about-events?category=general"
              className="bg-[#A41F22] px-3 py-2 text-sm lg:p-3 lg:text-base font-akira text-white left-btn"
            >
              KNOW MORE
            </Link>
          </div>
        </section>
      </div>

      {/* MOBILE */}
      <div className="md:hidden lg:hidden min-h-screen flex justify-center flex-col gap-10 py-10">
        <div className="w-full flex flex-col items-end gap-4 px-4">
          <Link scroll={false} href="/about-events?category=saptha">
            <Image
              src={sapthaMobile}
              width={330}
              height={100}
              alt=""
              className="right-image-mobile"
            />
          </Link>
          <Link
            href="/about-events?category=saptha"
            className="bg-[#A41F22] px-3 py-2 text-sm font-akira text-white"
          >
            KNOW MORE
          </Link>
        </div>

        <div className="w-full flex flex-col items-start gap-4 px-4">
          <Link scroll={false} href="/about-events?category=technical">
            <Image
              src={technicalMobile}
              width={330}
              height={100}
              alt=""
              className="left-image-mobile"
            />
          </Link>
          <Link
            href="/about-events?category=technical"
            className="bg-[#A41F22] px-3 py-2 text-sm font-akira text-white"
          >
            KNOW MORE
          </Link>
        </div>

        <div className="w-full flex flex-col items-end gap-4 px-4">
          <Link scroll={false} href="/about-events?category=general">
            <Image
              src={generalMobile}
              width={330}
              height={100}
              alt=""
              className="right-image-mobile"
            />
          </Link>
          <Link
            href="/about-events?category=general"
            className="bg-[#A41F22] px-3 py-2 text-sm font-akira text-white"
          >
            KNOW MORE
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Preview;
