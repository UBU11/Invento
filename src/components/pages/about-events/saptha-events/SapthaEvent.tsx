"use client";

import Image from "next/image";
import SapthaEventDetails from "./SapthaEventDetails";
import { usePreload } from "@/src/components/providers/LoadingProvider";
import { LoadingScreen } from "@/src/components/loading/LoadingScreen";
import { useSapthaAnimations } from "./useSapthaAnimations";

const ASSETS = [
  "/about-events/saptha/sapthalady.webp",
  "/about-events/saptha/saptha-bg.webp",
  "/about-events/saptha/natya-poster.webp",
  "/about-events/saptha/taksati-poster.webp",
  "/about-events/saptha/taksati-poster.webp",
];

const SapthaEvent = () => {
  const { progress, done } = usePreload(ASSETS);
  
  // Custom hook handles all refs and animations
  const { 
    containerRef, 
    bgWrapperRef, 
    mobileGradientRef, 
    ladyRef, 
    titleRef, 
    descriptionRef, 
    natyaRef, 
    taksatiRef 
  } = useSapthaAnimations(done);

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
                    src="/about-events/saptha/saptha-bg.webp"
                    alt="Saptha Background"
                    fill
                    className="object-cover"
                    priority
                />
            </div>

            {/* Mobile Bottom Gradient Overlay (Soft Blur Separation) */}
            <div 
                ref={mobileGradientRef}
                className="absolute bottom-0 left-0 w-full h-[70vh] z-0 md:hidden pointer-events-none"
                style={{ background: "linear-gradient(to top, black 85%, transparent)" }}
            />

            {/* Container for Lady Image and Title */}
            <div className="absolute inset-0 flex flex-col items-center justify-center h-full w-full">
                
                {/* LADY IMAGE COMPONENT */}
                <div ref={ladyRef} className="relative w-[300px] h-[360px] md:w-[600px] md:h-[700px] z-10 -mt-20 md:-mt-30"> 
                    <Image
                        src="/about-events/saptha/sapthalady.webp"
                        alt="Saptha Lady"
                        fill
                        className="object-contain"
                        priority
                    />
                </div>

                <h1 ref={titleRef} className="font-akira text-white text-5xl md:text-8xl lg:text-[11rem] tracking-wider leading-none -mt-10 md:-mt-20 z-20 text-center">
                SAPTHA
                </h1>
            </div>

            {/* Second Section: Description Text */}
            <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
                <p 
                    ref={descriptionRef}
                    className="text-white font-urbanist text-left md:text-center text-sm md:text-xl lg:text-3xl w-full max-w-[90vw] px-4 md:px-0 mt-[15vh] md:mt-[25vh] z-30 opacity-0 leading-relaxed"
                >
                    SAPTHA Art Show brings together seven powerful expressions of creativity, blending art, culture, and
                    <br className="block my-2" />
                    imagination into one immersive experience.
                    <br className="block my-2" />
                    Explore stories, emotions, and ideas crafted through colors, forms, and unique perspectives
                </p>
            </div>
            
            {/* Third Section: Posters */}
            <div className="absolute inset-0 flex items-center justify-center z-40 pointer-events-none flex-col md:block">
                {/* Natya Poster */}
                <div ref={natyaRef} className="absolute left-0 md:left-[5%] top-[15%] md:top-[10%] w-[100vw] h-[50vh] md:w-[90vw] md:h-[90vh]">
                    <Image 
                        src="/about-events/saptha/natya-poster.webp"
                        alt="Natya Poster"
                        fill
                        className="object-contain" 
                    />
                </div>

                {/* Taksati Poster */}
                <div ref={taksatiRef} className="absolute right-0 md:right-[4%] top-[15%] md:top-[12%] w-[100vw] h-[50vh] md:w-[90vw] md:h-[90vh]">
                    <Image 
                        src="/about-events/saptha/taksati-poster.webp"
                        alt="Taksati Poster"
                        fill
                        className="object-contain"
                    />
                </div>
            </div>

        </div>

        {/* Details Section - Scrolls over the fixed intro (Curtain Effect) */}
        <div className="relative z-10 bg-black min-h-screen">
            <SapthaEventDetails />
        </div>

    </div>
  );
};

export default SapthaEvent;
