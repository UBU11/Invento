"use client";

import Image, { StaticImageData } from "next/image";
import { useState } from "react";

interface TeamCardProps {
  image?: string | StaticImageData;
  name: string;
  role: string;
}

export default function TeamCard({ image, name, role }: TeamCardProps) {
  const [hasError, setHasError] = useState(false);
  const [prevImage, setPrevImage] = useState(image);

  if (image !== prevImage) {
    setPrevImage(image);
    setHasError(false);
  }

  return (
    <div className="relative w-full aspect-[3/4] rounded-lg overflow-hidden bg-gray-100 group shadow-lg">
      <div className="absolute inset-0 z-0">
        {!hasError && image ? (
            <Image
            src={image}
            alt={name}
            fill
            className="object-cover object-top filter grayscale group-hover:grayscale-0 transition-opacity duration-500"
            onError={() => {
                setHasError(true);
            }}
          />
        ) : (
            // Placeholder for missing or loading images
            <div className="w-full h-full bg-gray-300 flex items-center justify-center animate-pulse">
                <span className="sr-only">Image not available</span>
            </div>
        )}
      </div>

      <div className="absolute bottom-0 left-0 w-full h-[52%] z-10 pointer-events-none">
         <div className="absolute inset-0 w-full h-full text-[#FF0000]">
            <svg 
                className="w-full h-full" 
                viewBox="0 0 100 100" 
                preserveAspectRatio="none"
            >
                <path 
                    d="M0,100 L0,40 Q40,65 100,20 L100,100 Z" 
                    fill="currentColor"
                />
            </svg>
         </div>

         {/* Content inside the wave */}
         <div className="absolute bottom-0 left-0 w-full h-full flex flex-col justify-end p-3 md:p-4 pb-3 md:pb-4">
            <div className="flex justify-between items-end w-full">
                <div className="flex flex-col text-white pb-1 max-w-[80%]">
                    {/* Name: Smaller on mobile, break-words to prevent overflow */}
                    <h3 className="text-base md:text-xl font-bold uppercase leading-tight md:leading-tight break-words">
                        {name}
                    </h3>
                    {/* Role: Smaller text, wrapped */}
                    <p className="text-[10px] md:text-sm font-medium opacity-90 leading-tight mt-0.5">
                        {role}
                    </p>
                </div>
                
                {/* Invento Logo Icon */}
                <div className="w-6 h-6 md:w-8 md:h-8 opacity-90 mb-1 flex-shrink-0">
                    <Image 
                        src="/about/organizing-team/logo.png"
                        alt="Invento Logo" 
                        width={32} 
                        height={32} 
                        className="object-contain brightness-0 invert" 
                    />
                </div>
            </div>
         </div>
      </div>
    </div>
  );
}
