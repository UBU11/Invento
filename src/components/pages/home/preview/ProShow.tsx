"use client"; 

import React, { useEffect, useRef } from "react";
import Image from "next/image";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Title from "./Title";
import Fejo from "./Fejo";
import Haricharan from "./Haricharan";

gsap.registerPlugin(ScrollTrigger);

const ProShow: React.FC = () => {
    const containerRef = useRef<HTMLElement>(null);

    useEffect(() => {
        const ctx = gsap.context(() => {
            const element = containerRef.current;

            gsap.fromTo(
                element,
                {
                    opacity: 0,
                    y: 100, 
                },
                {
                    opacity: 1,
                    y: 0, 
                    duration: 1,
                    ease: "power3.out",
                    scrollTrigger: {
                        trigger: element,
                        start: "top 65%",
                        toggleActions: "play none none none",
                    },
                }
            );
        }, containerRef); 

        return () => ctx.revert();
    }, []);

    return (
        <section 
            ref={containerRef} 
            className="relative h-full w-full overflow-hidden opacity-0"
        >
            <div className="absolute inset-0 -z-20">
                <Image
                    src={"/home/preview/red-blur.png"}
                    alt="Hero background"
                    fill
                    className="object-cover"
                    priority
                    //quality={80}
                />
            </div>

            <div className="relative z-10 pt-12 lg:pt-32 flex h-full lg:h-full flex-col items-center justify-start text-white">
                <Title/>

                <Fejo/>
                <Haricharan/>
            </div>
        </section>
    );
};

export default ProShow;