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


    useEffect(() => {
        const t1 = gsap.timeline();

        t1.fromTo(
            inventoRef.current,
            { y: -600, opacity: 0, scale: 0.8 },
            { y: 0, opacity: 1, scale: 1.1, duration: 1.5, ease: "power3.out" }
        );

        gsap.fromTo(
            [leftImage.current, rightImage.current],
            { y: 500, opacity: 0.2 },
            { y: 0, opacity: 1, duration: 2 }
        );

        gsap.fromTo(
            logoRef.current,
            { y: 200, rotateZ: 55, opacity: 0.3, scale: 1.5 },
            { y: 0, rotateZ: 10, opacity: 1, scale: 1, duration: 2 }
        );

        gsap.fromTo(
            heroRef.current,
            { y: -100 },
            { y: 340, duration: 2 }
        );


        const scrollTl = gsap.timeline({
            scrollTrigger: {
            trigger: sectionRef.current, 
            start: "top top",
            end: "+=120",
            scrub: 0.8,
            }
        });

        scrollTl
            .to(inventoRef.current, { scale: 1, ease: "none" })
            .to(logoRef.current, { rotateZ: 0, ease: "none" }, 0)
            .to(heroRef.current, { y: 800, ease: "none" }, 0);

        ScrollTrigger.refresh();

    }, []);



    return (
        <>
            <section
                ref={sectionRef}
                className="relative w-full min-h-screen flex items-center justify-center overflow-hidden"
            >

                {/* Hero Image */}
                <div
                    ref={heroRef}
                    className="absolute bottom-0 w-full h-full z-20"
                >
                    <Image
                        src="/home/home japanees fan.png"
                        alt="Fan Art"
                        priority
                        fill
                        className="object-cover"
                    />
                </div>
        
                {/* Left Image */}
                <div
                    ref={leftImage}
                    className="absolute left-0"
                >
                    <Image
                        src="/home/left-side.svg"
                        alt="Left Visual"
                        width={350}
                        height={460}
                        className="object-contain opacity-80"
                    />
                </div>

                {/* Right Image */}
                <div
                    ref={rightImage}
                    className="absolute right-0"
                >
                    <Image
                        src="/home/right-side.svg"
                        alt="Left Visual"
                        width={350}
                        height={460}
                        className="object-contain opacity-80"
                    />
                </div>

                <div  
                    className="relative z-10 flex flex-col items-center justify-center px-6 max-w-2xl"
                >
                    <div ref={logoRef}>
                        <Image
                            src="/home/LOGO.svg"
                            alt="Center Visual"
                            width={300}
                            height={220}
                            className="mt-3"
                        />
                    </div>

                    <div
                        className="absolute">
                        <h1 
                            ref={inventoRef}
                            className="m-0 p-0 leading-none tracking-tighter"
                        >
                            INVENTO
                        </h1>

                        <h3 className="text-[#FF0000] text-center">
                            JAN 29, 30, 31
                        </h3>
                    </div>
                </div>

            </section>
        </>
    );
}

export default HeroSection;