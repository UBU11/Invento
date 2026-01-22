"use client";

import { useRef, useEffect } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import TeamCard from "./Cards/TeamCard";

const TEAM_MEMBERS = [
  { name: "Niranjan", role: "Chief Coordinator" },
  { name: "Anjana", role: "Secretary" },
  { name: "Abhiram", role: "Tech Events" },
  { name: "Habil", role: "Saptha Events" },
  { name: "Vishnu", role: "General Events" },
  { name: "Naveen", role: "Design Head" },
  { name: "Niranjana", role: "Documentation" },
  { name: "Praseen", role: "Media Head" },
  { name: "Kesav", role: "Media Head" },
  { name: "Ajmal", role: "Volunteer Head" },
  { name: "Athul", role: "Finance Head" },
  { name: "Sajad", role: "Finance Head" },
  { name: "Smisha", role: "PR Head" },
  { name: "Adithyan", role: "PR Head" },
  { name: "Salahudeen", role: "Hospitality" },
  { name: "Aadhi", role: "Decoration Head" },
  { name: "Arjun", role: "Sponsorship" },
  { name: "Devika", role: "Sponsorship" },
];

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

export default function OrganizingTeam() {
  const containerRef = useRef<HTMLElement>(null);
  const spacerRef = useRef<HTMLDivElement>(null);
  const contentWrapperRef = useRef<HTMLDivElement>(null);
  const gridRef = useRef<HTMLDivElement>(null);
  const titleRef = useRef<HTMLHeadingElement>(null);

  useEffect(() => {
    const container = containerRef.current;
    const spacer = spacerRef.current;
    const contentWrapper = contentWrapperRef.current;
    const grid = gridRef.current;
    
    if (!container || !spacer || !contentWrapper || !grid) return;

    const ctx = gsap.context(() => {
      gsap.set(container, { 
          yPercent: 100,
          zIndex: 40 
      });

      // Reset transforms
      gsap.set(contentWrapper, { y: 0 });
      
      // Calculate Heights
      const gridHeight = grid.scrollHeight;
      const windowHeight = window.innerHeight;
      const contentScrollDistance = Math.max(0, gridHeight - (windowHeight - 200)); 
      
      const pauseDistance = windowHeight * 0.5;
      const totalSpacerHeight = windowHeight + pauseDistance + contentScrollDistance;
      
      gsap.set(spacer, { height: totalSpacerHeight });

      // Refresh ScrollTrigger to recognize new spacer height
      ScrollTrigger.refresh();

      // Master Timeline
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: spacer,
          start: "top bottom",
          end: "bottom bottom",
          scrub: 0.1,
          invalidateOnRefresh: true,
        }
      });

      const curtainRatio = windowHeight / totalSpacerHeight;
      const pauseRatio = pauseDistance / totalSpacerHeight;
      const scrollRatio = contentScrollDistance / totalSpacerHeight;

      // Phase 1: Curtain Slide Up
      tl.to(container, {
        yPercent: 0,
        ease: "none",
        duration: curtainRatio
      });

      // Phase 2: Pause (Pinning effect)
      // We animate nothing for the duration of the pause
      tl.to({}, { duration: pauseRatio });
      
      // Phase 3: Content Scroll
      if (contentScrollDistance > 0) {
          tl.to(contentWrapper, {
            y: -contentScrollDistance,
            ease: "none",
            duration: scrollRatio
          });
      }

      // Visual Cards Reveal
      const cards = grid.querySelectorAll('.team-card');
      gsap.set(cards, { opacity: 0, y: 50 });
      
      const revealTl = gsap.timeline({
          scrollTrigger: {
              trigger: spacer,
              start: "top bottom", 
              toggleActions: "play none none reverse"
          }
      });

      revealTl.to(cards, {
          opacity: 1,
          y: 0,
          stagger: 0.05,
          duration: 0.8,
          ease: "power2.out",
          delay: 0.2
      });

    });

    return () => ctx.revert();
  }, []);

  return (
    <>
      <div ref={spacerRef} className="relative w-full pointer-events-none" />

      <section 
        ref={containerRef} 
        className="fixed top-0 left-0 w-full h-screen bg-white text-black overflow-hidden flex flex-col items-center"
      >
        <div ref={contentWrapperRef} className="w-full relative flex flex-col min-h-screen">
            
            <div className="w-full pt-14 px-[5vw] flex items-center justify-between z-10 flex-shrink-0 mb-10">
                <h1 ref={titleRef} className="text-[6vw] md:text-[4vw] font-bold font-akira leading-none tracking-tighter text-black uppercase">
                    Organizing Team
                </h1>
            </div>

            <div ref={gridRef} className="w-full px-[5vw] pb-20">
                <div className="grid grid-cols-2 lg:grid-cols-5 gap-4 w-full max-w-[1920px] mx-auto">
                    {TEAM_MEMBERS.map((member, index) => (
                        <div key={index} className="team-card">
                            <TeamCard 
                                name={member.name}
                                role={member.role}
                                image={`/about/organizing-team/cards/pic${index + 1}.webp`} 
                            />
                        </div>
                    ))}
                </div>
            </div>
        </div>
      </section>
    </>
  );
}
