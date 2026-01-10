import Image from "next/image";
import React from "react";

interface HistoryCardProps {
    index: number;
}

const HistoryCard: React.FC<HistoryCardProps> = ({ index }) => {
    // Map index (1-6) to image path
    // Assumes images are in /public/history/img1.png ... img6.png
    const imagePath = `/history/img${index}.png`;

    return (
        <div className="relative w-full h-full bg-[#171717] rounded-[24px] p-[6px] flex items-center justify-center overflow-hidden shadow-2xl border border-[#171717]">

            {/* Top Left Rune/Symbol Area */}
            <div className="absolute top-3 left-3 z-20 flex flex-col items-center gap-1 opacity-80">
                {/* "K" Rune approximation */}
                <svg width="12" height="24" viewBox="0 0 12 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M2 0V24M2 12L10 4M2 12L10 20" stroke="#888" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
                {/* Triangle Pointer */}
                <svg width="10" height="8" viewBox="0 0 10 8" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M0 0H10L5 8L0 0Z" fill="none" stroke="#888" strokeWidth="1.5" />
                </svg>
            </div>

            {/* Main Image Container */}
            {/* Design Note: The frame "cuts" into the image at corners. 
          We can simulate this by having the image rounded but purely contained within the padding.
      */}
            <div className="relative w-full h-full rounded-[20px] overflow-hidden bg-[#171717]">
                <Image
                    src={imagePath}
                    alt={`History Card ${index}`}
                    fill
                    className="object-cover"
                />
            </div>

            {/* Bottom Right Rune/Symbol Area */}
            <div className="absolute bottom-3 right-3 z-20 flex flex-col-reverse items-center gap-1 opacity-80">
                {/* "K" Rune approximation (Inverted/Styled) */}
                <svg width="12" height="24" viewBox="0 0 12 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M10 0V24M10 12L2 4M10 12L2 20" stroke="#888" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
                {/* Triangle Pointer (Up) */}
                <svg width="10" height="8" viewBox="0 0 10 8" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M0 8H10L5 0L0 8Z" fill="none" stroke="#888" strokeWidth="1.5" />
                </svg>
            </div>

            {/* Corner Cutout Simulation (Optional: Adds that "App" feel if desired) */}
            {/* Top Left Cutout mask could be added here if we wanted the image to be clipped exactly around the rune, 
          but generally simple padding works for this aesthetic. 
      */}
        </div>
    );
};

export default HistoryCard;
