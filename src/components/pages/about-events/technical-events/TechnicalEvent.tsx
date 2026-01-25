"use client";

import Image from "next/image";
import TechnicalEventDetails from "./TechnicalEventDetails";
import { usePreload } from "@/src/components/providers/LoadingProvider";
import { LoadingScreen } from "@/src/components/loading/LoadingScreen";
import { useTechnicalAnimations } from "./useTechnicalAnimations";

const ASSETS = [
  "/about-events/technical/technical-girl.webp",
  "/about-events/technical/technical-bg.webp",
];

const TechnicalEvent = () => {
  const { progress, done } = usePreload(ASSETS);
  
  // Custom hook handles all refs and animations
  const { 
    containerRef, 
    bgWrapperRef, 
    mobileGradientRef, 
    girlRef, 
    titleRef, 
    descriptionRef
  } = useTechnicalAnimations(done);

  if (!done) {
    return <LoadingScreen progress={progress} />;
  }

  return (
    <div className="relative w-full bg-black">
        {/* Intro Section - Pinned/Fixed */}
        <div ref={containerRef} className="h-screen w-full sticky top-0 bg-black overflow-hidden z-0">
            
            {/* Background Images Wrapper */}
            <div ref={bgWrapperRef} className="absolute inset-0 -z-10 w-full h-full">
                {/* Shared BG */}
                <Image
                    src="/about-events/technical/technical-bg.webp"
                    alt="Technical Background"
                    fill
                    className="object-cover"
                    priority
                />
            </div>

            {/* Mobile Bottom Gradient Overlay (Soft Blur Separation) */}
            <div 
                ref={mobileGradientRef}
                className="absolute bottom-0 left-0 w-full h-[50vh] z-0 md:hidden pointer-events-none"
                style={{ background: "linear-gradient(to top, black 85%, transparent)" }}
            />

            {/* Container for Girl Image and Title */}
            <div className="absolute inset-0 flex flex-col items-center justify-center h-full w-full">
                
                {/* GIRL IMAGE COMPONENT */}
                <div ref={girlRef} className="relative w-[450px] h-[540px] md:w-[500px] md:h-[580px] z-10 md:-translate-y-[150px]" style={{ marginTop: '100px' }}> 
                    <Image
                        src="/about-events/technical/technical-girl.webp"
                        alt="Technical Girl"
                        fill
                        className="object-contain"
                        priority
                    />
                </div>

                <h1 ref={titleRef} className="font-akira text-white text-5xl md:text-7xl lg:text-9xl tracking-wider leading-none md:-translate-y-[120px] z-20 text-center" style={{ marginTop: '0px' }}>
                TECHNICAL
                </h1>
            </div>

            {/* Second Section: Description Text */}
            <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
                <p 
                    ref={descriptionRef}
                    className="text-white font-urbanist text-left md:text-center text-sm md:text-xl lg:text-3xl w-full max-w-[90vw] px-4 md:px-0 mt-[60vh] md:mt-[25vh] z-30 opacity-0 leading-relaxed"
                >
                    TECHNICAL events challenge your programming skills, problem-solving abilities, and
                    <br className="block my-2" />
                    innovation in the world of technology.
                    <br className="block my-2" />
                    From hackathons to coding contests, robotics to AI challenges, push your technical boundaries
                </p>
            </div>

        </div>

        {/* Details Section - Scrolls over the fixed intro (Curtain Effect) */}
        <div className="relative z-10 bg-black min-h-screen">
            <TechnicalEventDetails />
        </div>

    </div>
  );
};

export default TechnicalEvent;
