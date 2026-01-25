import { useRef } from "react";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

export const useSapthaAnimations = (done: boolean) => {
    const containerRef = useRef<HTMLDivElement>(null);
    const bgWrapperRef = useRef<HTMLDivElement>(null); 
    const mobileGradientRef = useRef<HTMLDivElement>(null); 
    const ladyRef = useRef<HTMLDivElement>(null);
    const titleRef = useRef<HTMLHeadingElement>(null);
    const descriptionRef = useRef<HTMLParagraphElement>(null);
    const natyaRef = useRef<HTMLDivElement>(null);
    const taksatiRef = useRef<HTMLDivElement>(null);

    useGSAP(() => {
        if (!done) return; 

        const mm = gsap.matchMedia();

        // SHARED ENTRY ANIMATIONS 
        gsap.from(ladyRef.current, {
            y: 100,
            scale: 0.5,
            autoAlpha: 0,
            duration: 1.5,
            ease: "power3.out",
        });

        gsap.from(titleRef.current, {
            y: 100,
            scale: 0.5,
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
            gsap.from(bgWrapperRef.current, {
                scale: 1.3,
                duration: 1.5,
                ease: "power2.out",
            });

            tl.to(bgWrapperRef.current, {
                filter: "blur(20px)",
                opacity: 0,
                duration: 1,
            }, 0);

            tl.fromTo(ladyRef.current,
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

            if (natyaRef.current && taksatiRef.current) {
                tl.fromTo(natyaRef.current, { x: "-100vw", autoAlpha: 1 }, { x: "0vw", autoAlpha: 1, duration: 1.5, ease: "power2.out" }, "<");
                tl.to(natyaRef.current, { y: "-80vh", duration: 1.5, ease: "power2.out" }, ">");
                tl.fromTo(taksatiRef.current, { x: "100vw", autoAlpha: 1 }, { x: "0vw", autoAlpha: 1, duration: 1.5, ease: "power2.out" }, "<");
            }
        });

        // 2. MOBILE ANIMATIONS (<= 768px)
        mm.add("(max-width: 768px)", () => {
            gsap.fromTo(bgWrapperRef.current, 
                { scale: 1.6 }, 
                { scale: 1.2, duration: 1.5, ease: "power2.out" }
            );

            gsap.set(bgWrapperRef.current, { transformOrigin: "top center" });

            tl.fromTo(mobileGradientRef.current, 
                { y: "100%" },
                { y: "0%", duration: 1, ease: "power2.out" }, 0
            );
            
            tl.fromTo(bgWrapperRef.current,
                { scale: 1.2 },
                { scale: 1, duration: 1, ease: "power2.out" }, 0
            );

            tl.fromTo(ladyRef.current, 
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

            if (natyaRef.current) {
                tl.fromTo(natyaRef.current, 
                    { x: "-100vw", y: "22vh", autoAlpha: 1 }, 
                    { x: "0vw", y: "22vh", duration: 1.5, ease: "power2.out" }, ">"
                );
            }

            if (taksatiRef.current) {
                tl.fromTo(taksatiRef.current, 
                    { x: "100vw", y: "40vh", autoAlpha: 1 }, 
                    { x: "0vw", y: "40vh", duration: 1.5, ease: "power2.out" }, ">"
                );
            }
        });
        
    }, { scope: containerRef, dependencies: [done] });

    return {
        containerRef,
        bgWrapperRef,
        mobileGradientRef,
        ladyRef,
        titleRef,
        descriptionRef,
        natyaRef,
        taksatiRef
    };
};
