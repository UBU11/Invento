"use client";

import Image from "next/image";
import GeneralEventDetails from "./GeneralEventDetails";
import { usePreload } from "@/src/components/providers/LoadingProvider";
import { LoadingScreen } from "@/src/components/loading/LoadingScreen";
import { useGeneralAnimations } from "./useGeneralAnimations";

const ASSETS = [
  "/about-events/general/general-sam.webp",
  "/about-events/general/general-bg.webp",
  "/about-events/general/mudracing web.webp",
  "/about-events/general/roadies web.webp",
];

const GeneralEvent = () => {
  const { progress, done } = usePreload(ASSETS);
  
  // Custom hook handles all refs and animations
  const { 
    containerRef, 
    bgWrapperRef, 
    mobileGradientRef, 
    samRef, 
    titleRef, 
    descriptionRef,
    MudRef,
    RoadRef

  } = useGeneralAnimations(done);

  if (!done) {
    return <LoadingScreen progress={progress} />;
  }

  return (
    <div className="relative w-full" style={{ backgroundColor: "#E3CFAF" }}>
        {/* Intro Section - Pinned/Fixed */}
        <div ref={containerRef} className="h-screen w-full sticky top-0 overflow-hidden z-0" style={{ backgroundColor: "#E3CFAF" }}>
            
            {/* Background Images Wrapper */}
            <div ref={bgWrapperRef} className="absolute inset-0 -z-10 w-full h-full" style={{ backgroundColor: "#E3CFAF" }}>
                {/* Shared BG */}
                <Image
                    src="/about-events/general/general-bg.webp"
                    alt="General Background"
                    fill
                    className="object-cover"
                    style={{ objectPosition: "center 200%" }}
                    sizes="100vw"
                    priority
                />
            </div>

            {/* Mobile Bottom Gradient Overlay (Soft Blur Separation) */}
            <div 
                ref={mobileGradientRef}
                className="absolute bottom-[-5vh] left-0 w-full h-[65vh] z-0 md:hidden pointer-events-none"
                style={{ background: "linear-gradient(to top, #E3CFAF 85%, transparent)" }}
            />

            {/* Container for Sam Image and Title */}
            <div className="absolute inset-0 flex flex-col items-center justify-center h-full w-full">
                
                {/* SAM IMAGE COMPONENT */}
                <div ref={samRef} className="relative w-[300px] h-[360px] md:w-[500px] md:h-[600px] lg:w-[600px] lg:h-[700px] xl:w-[650px] xl:h-[750px] z-10 -mt-20 md:-mt-30"> 
                    <Image
                        src="/about-events/general/general-sam.webp"
                        alt="General Sam"
                        fill
                        className="object-contain"
                        priority
                    />
                </div>

                <h1 ref={titleRef} className="font-akira text-black text-5xl md:text-6xl lg:text-7xl xl:text-8xl 2xl:text-9xl tracking-wider leading-none mt-0 md:mt-0 z-20 text-center">
                GENERAL
                </h1>
            </div>

            {/* Second Section: Description Text */}
            <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
                <p 
                    ref={descriptionRef}
                    className="text-black font-urbanist text-left md:text-center text-sm md:text-lg lg:text-xl xl:text-2xl 2xl:text-3xl w-full max-w-[90vw] px-4 md:px-0 mt-[35vh] md:mt-[25vh] z-30 opacity-0 leading-relaxed"
                >
                    GENERAL events bring together diverse competitions and activities that test your
                    <br className="block my-2" />
                    knowledge, creativity, and skills beyond technical boundaries.
                    <br className="block my-2" />
                    From quizzes to photography, debates to creative writing, explore a wide range of engaging challenges
                </p>
            </div>
            
            {/* Third Section: Images */}
            <div className="absolute inset-0 flex items-center justify-center z-40 pointer-events-none flex-col md:block">
                {/* Mudracing Image */}
                <div ref={MudRef} className="absolute left-0 md:left-[5%] top-[55%] md:top-[10%] w-[85vw] h-[42vh] md:w-[75vw] md:h-[75vh]">
                    <Image 
                        src="/about-events/general/mudracing web.webp"
                        alt="Mudracing"
                        fill
                        className="object-contain" 
                    />
                </div>

                {/* Roadies Image */}
                <div ref={RoadRef} className="absolute right-0 md:right-[4%] top-[65%] md:top-[12%] w-[100vw] h-[50vh] md:w-[90vw] md:h-[90vh]">
                    <Image 
                        src="/about-events/general/roadies web.webp"
                        alt="Roadies"
                        fill
                        className="object-contain"
                    />
                </div>
            </div>

        </div>

        {/* Details Section - Scrolls over the fixed intro (Curtain Effect) */}
        <div className="relative z-10 md:min-h-screen" style={{ backgroundColor: "#E3CFAF" }}>
            <GeneralEventDetails />
        </div>

    </div>
  );
};

export default GeneralEvent;
