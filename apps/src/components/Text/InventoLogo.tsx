import React from "react";
import { CircularText } from "@/src/components/Text/CircularText";
import logo from "@/public/invento logo-dark.webp";
import Image from "next/image";

interface InventoLogoProps {
    className?: string; // For the outer container
    classNameImage?: string; // For the inner logo image
}

const InventoLogo = ({ className = "", classNameImage = "" }: InventoLogoProps) => {
    const circularTextConfig = {
        word: "INVENTO ",
        repetitions: 5,
        radius: { mobile: 46, desktop: 46 }, // Radius Reduced to 46 for tighter spin
        centerX: 50,
        centerY: 50,
        letterSpacing: 0.85,
        useTranslate: true,
        startAngleOffset: 0,
        textSize: { mobile: "text-[9px]", desktop: "md:text-[11px]" },
        lineHeight: { mobile: "leading-[11px]", desktop: "md:leading-[13px]" },
        className: "font-medium tracking-tight text-current"
    };

    return (
        // Outer container: Relative + Flex Center.
        // Flex is often more predictable for absolute centering overlay
        <div className={`relative w-full h-full flex items-center justify-center ${className}`}>

            {/* 1. The Animated Circular Text */}
            <div className="absolute inset-0 w-full h-full">
                <CircularText config={circularTextConfig} />
            </div>

            {/* 2. The Central Logo Image */}
            <div className="relative w-[57%] h-[57%] z-10">
                <Image
                    src={logo}
                    alt="Invento Logo"
                    fill
                    className={`object-contain ${classNameImage}`}
                    priority
                />
            </div>
        </div>
    );
};

export default InventoLogo;
