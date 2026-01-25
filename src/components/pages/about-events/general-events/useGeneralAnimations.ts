import { useRef } from "react";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

export const useGeneralAnimations = (done: boolean) => {
    const containerRef = useRef<HTMLDivElement>(null);
    const bgWrapperRef = useRef<HTMLDivElement>(null); 
    const mobileGradientRef = useRef<HTMLDivElement>(null); 
    const samRef = useRef<HTMLDivElement>(null);
    const titleRef = useRef<HTMLHeadingElement>(null);
    const descriptionRef = useRef<HTMLParagraphElement>(null);

    useGSAP(() => {
        if (!done) return; 

        const mm = gsap.matchMedia();

        // SHARED ENTRY ANIMATIONS 
        // Background zoom out animation (starts larger, zooms to normal size)
        gsap.from(bgWrapperRef.current, {
            scale: 1.5,
            duration: 1.5,
            ease: "power2.out",
        });

        // Sam image zoom in animation (starts smaller, zooms to normal size)
        gsap.from(samRef.current, {
            scale: 0.3,
            autoAlpha: 0,
            duration: 1.5,
            ease: "power3.out",
        });

        // Title zoom in animation (starts smaller, zooms to normal size)
        gsap.from(titleRef.current, {
            scale: 0.3,
            autoAlpha: 0,
            duration: 1.5,
            ease: "power3.out",
        });

        // MASTER TIMELINE
        const tl = gsap.timeline({
            scrollTrigger: {
                trigger: containerRef.current,
                start: "top top",
                end: "+=800%", 
                scrub: 1, 
                pin: true,
            },
        });

        // 1. DESKTOP ANIMATIONS (> 768px)
        mm.add("(min-width: 769px)", () => {
            tl.to(bgWrapperRef.current, {
                filter: "blur(20px)",
                opacity: 0,
                duration: 1,
            }, 0);

            tl.fromTo(samRef.current,
                { autoAlpha: 1, y: 0 },
                { autoAlpha: 0, y: -100, duration: 0.8 },
                0
            );

            tl.fromTo(titleRef.current,
                { y: 0, scale: 1 },
                { y: -530, scale: 0.8, duration: 1 },
                0
            );

            if (descriptionRef.current) {
                tl.to(descriptionRef.current, { autoAlpha: 1, duration: 0.5, delay: 0.5 }, 0);
            }

            tl.to(titleRef.current, { y: -2000, scale: 0.5, duration: 0.5, ease: "power2.in"}, ">");
            tl.to(descriptionRef.current, { y: -1000, autoAlpha: 0, duration: 0.5, ease: "power2.in" }, "<");
        });

        // 2. MOBILE ANIMATIONS (<= 768px)
        mm.add("(max-width: 768px)", () => {
            gsap.set(bgWrapperRef.current, { transformOrigin: "top center" });

            tl.fromTo(mobileGradientRef.current, 
                { y: "100%" },
                { y: "0%", duration: 1, ease: "power2.out" }, 0
            );
            

            tl.fromTo(samRef.current, 
                { y: 0 },
                { y: -250, duration: 1, ease: "none" }, 0
            );

            tl.fromTo(titleRef.current,
                { y: 0 }, 
                { y: -250, duration: 1, ease: "none" }, 0
            );

            if (descriptionRef.current) {
                tl.fromTo(descriptionRef.current, 
                    { y: -100, autoAlpha: 0 }, 
                    { y: -100, autoAlpha: 1, duration: 1, ease: "power2.inOut" }, "-=0.5"
                ); 
            }
        });
        
    }, { scope: containerRef, dependencies: [done] });

    return {
        containerRef,
        bgWrapperRef,
        mobileGradientRef,
        samRef,
        titleRef,
        descriptionRef
    };
};

