import { useRef } from "react";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

export const useTechnicalAnimations = (done: boolean) => {
    const containerRef = useRef<HTMLDivElement>(null);
    const bgWrapperRef = useRef<HTMLDivElement>(null); 
    const mobileGradientRef = useRef<HTMLDivElement>(null); 
    const girlRef = useRef<HTMLDivElement>(null);
    const titleRef = useRef<HTMLHeadingElement>(null);
    const descriptionRef = useRef<HTMLParagraphElement>(null);
    const competitionsRef = useRef<HTMLDivElement>(null);
    const workshopsRef = useRef<HTMLDivElement>(null);

    useGSAP(() => {
        if (!done) return; 

        const mm = gsap.matchMedia();

        // SHARED ENTRY ANIMATIONS 
        // Desktop entry animations - account for CSS positioning (md:-translate-y-[150px] for girl, md:-translate-y-[120px] for title)
        mm.add("(min-width: 769px)", () => {
            // Set initial position to match CSS transform, then animate from a different position
            gsap.set(girlRef.current, { y: -150, scale: 1 });
            gsap.set(titleRef.current, { y: -120, scale: 1 });
            
            gsap.fromTo(girlRef.current, {
                y: -100,
                scale: 0.3,
                autoAlpha: 0,
            }, {
                y: -150,
                scale: 1,
                autoAlpha: 1,
                duration: 1.5,
                ease: "power3.out",
            });

            gsap.fromTo(titleRef.current, {
                y: -20,
                scale: 0.3,
                autoAlpha: 0,
            }, {
                y: -120,
                scale: 1,
                autoAlpha: 1,
                duration: 1.5,
                ease: "power3.out",
            });
        });

        // Mobile entry animations
        mm.add("(max-width: 768px)", () => {
            gsap.from(girlRef.current, {
                y: 100,
                scale: 0.3,
                autoAlpha: 0,
                duration: 1.5,
                ease: "power3.out",
            });

            gsap.from(titleRef.current, {
                y: 100,
                scale: 0.3,
                autoAlpha: 0,
                duration: 1.5,
                ease: "power3.out",
            });
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

            tl.fromTo(girlRef.current,
                { autoAlpha: 1, y: -150 },
                { autoAlpha: 0, y: -250, duration: 0.8 },
                0
            );

            tl.fromTo(titleRef.current,
                { y: -120, scale: 1 },
                { y: -650, scale: 0.8, duration: 1 },
                0
            );

            if (descriptionRef.current) {
                tl.to(descriptionRef.current, { autoAlpha: 1, duration: 0.5, delay: 0.5 }, 0);
            }

            tl.to(titleRef.current, { y: -2000, scale: 0.5, duration: 0.5, ease: "power2.in"}, ">");
            tl.to(descriptionRef.current, { y: -1000, autoAlpha: 0, duration: 0.5, ease: "power2.in" }, "<");

            if (competitionsRef.current && workshopsRef.current) {
                tl.fromTo(competitionsRef.current, { x: "-100vw", autoAlpha: 1 }, { x: "0vw", autoAlpha: 1, duration: 1.5, ease: "power2.out" }, "<");
                tl.to(competitionsRef.current, { y: "-80vh", duration: 1.5, ease: "power2.out" }, ">");
                tl.fromTo(workshopsRef.current, { x: "100vw", autoAlpha: 1 }, { x: "0vw", autoAlpha: 1, duration: 1.5, ease: "power2.out" }, "<");
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

            tl.fromTo(girlRef.current, 
                { y: 0 },
                { y: -320, duration: 1, ease: "none" }, 0
            );

            tl.fromTo(titleRef.current,
                { y: 0 }, 
                { y: -350, duration: 1, ease: "none" }, 0
            );

            if (descriptionRef.current) {
                tl.fromTo(descriptionRef.current, 
                    { y: -100, autoAlpha: 0 }, 
                    { y: -200, autoAlpha: 1, duration: 1, ease: "power2.inOut" }, "-=0.5"
                ); 
            }

            if (competitionsRef.current) {
                tl.fromTo(competitionsRef.current, 
                    { x: "-100vw", y: "0vh", autoAlpha: 1 }, 
                    { x: "0vw", y: "-3vh", duration: 1.5, ease: "power2.out" }, ">"
                );
            }

            if (workshopsRef.current) {
                tl.fromTo(workshopsRef.current, 
                    { x: "100vw", y: "3vh", autoAlpha: 1 }, 
                    { x: "0vw", y: "0vh", duration: 1.5, ease: "power2.out" }, ">"
                );
            }
        });
        
    }, { scope: containerRef, dependencies: [done] });

    return {
        containerRef,
        bgWrapperRef,
        mobileGradientRef,
        girlRef,
        titleRef,
        descriptionRef,
        competitionsRef,
        workshopsRef
    };
};

