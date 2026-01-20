"use client";

import Image from "next/image";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useEffect, useRef } from "react";

gsap.registerPlugin(ScrollTrigger);

const Preview = () => {
  const mainRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      
      const sections = gsap.utils.toArray<HTMLElement>(".desktop-section");

      sections.forEach((section) => {
        const rightImg = section.querySelector(".right-image");
        const rightBtn = section.querySelector(".right-btn");
        const leftImg = section.querySelector(".left-image");
        const leftBtn = section.querySelector(".left-btn");

        if (rightImg) {
          gsap.fromTo(
            [rightImg, rightBtn],
            { xPercent: 50, opacity: 0 },
            {
              xPercent: 0,
              opacity: 1,
              ease: "power2.out",
              scrollTrigger: {
                trigger: section, 
                start: "top center", 
                end: "bottom center", 
                scrub: 1, 
              },
            }
          );
        }

        if (leftImg) {
          gsap.fromTo(
            [leftImg, leftBtn],
            { xPercent: -50, opacity: 0 }, 
            {
              xPercent: 0,
              opacity: 1,
              ease: "power2.out",
              scrollTrigger: {
                trigger: section,
                start: "top center",
                end: "bottom center",
                scrub: 1,
              },
            }
          );
        }
      });

      gsap.utils.toArray(".right-image-mobile").forEach((img: any) => {
        gsap.fromTo(
          img,
          { x: 50, opacity: 0 },
          {
            x: 0,
            opacity: 1,
            duration: 1,
            ease: "power3.out",
            scrollTrigger: {
              trigger: img,
              start: "top 85%",
              end: "bottom 20%",
              toggleActions: "play none none reverse",
            },
          }
        );
      });

      gsap.utils.toArray(".left-image-mobile").forEach((img: any) => {
        gsap.fromTo(
          img,
          { x: -50, opacity: 0 },
          {
            x: 0,
            opacity: 1,
            duration: 1,
            ease: "power3.out",
            scrollTrigger: {
              trigger: img,
              start: "top 85%",
              end: "bottom 20%",
              toggleActions: "play none none reverse",
            },
          }
        );
      });
      
    }, mainRef);

    return () => ctx.revert();
  }, []);

  return (
    <div ref={mainRef} className="w-full overflow-hidden">
      
      <div className="hidden lg:block md:block">
        
        <section className="min-h-screen relative desktop-section">
          
          <Image
            src="/home/preview/saptha.png"
            width={1200}
            height={300}
            alt="Saptha"
            className="absolute top-10 right-0 right-image z-10"
          />
          
          <div className="absolute flex -bottom-18 w-full px-24 justify-end z-30">
             <button className="bg-[#A41F22] p-3 font-akira text-white right-btn">
                KNOW MORE
              </button> 
          </div>
        </section>

        <section className="min-h-screen relative desktop-section">
          <div className="absolute flex -bottom-18 w-full px-42 justify-end">
            <button className="bg-[#A41F22] p-3 font-akira text-white left-btn">
              KNOW MORE
            </button>
          </div>
          <Image
            src="/home/preview/technical.png"
            width={1200}
            height={300}
            alt="Technical"
            className="absolute left-0 left-image"
          />
        </section>

        <section className="min-h-screen relative desktop-section">
          <Image
            src="/home/preview/general.png"
            width={1200}
            height={300}
            alt="General"
            className="absolute right-0 right-image"
          />
           {/* Added a button here just in case, or logic handles if missing */}
        </section>
      </div>

      {/* MOBILE LAYOUT */}
      <div className="md:hidden lg:hidden min-h-screen flex justify-center flex-col gap-10 py-10">
        <div className="w-full flex justify-end ">
          <Image
            src={"/home/preview/saptha-mobile.svg"}
            width={330}
            height={100}
            alt=""
            className="right-image-mobile"
          />
        </div>
        
        <div className="w-full flex justify-start ">
            <Image
            src={"/home/preview/technical-mobile.svg"}
            width={330}
            height={100}
            alt="gh"
            className="left-image-mobile"
            />
        </div>
        
        <div className="w-full flex justify-end">
          <Image
            src={"/home/preview/general-mobile.svg"}
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