import React from "react";
import { CircularText } from "@/src/components/Text/CircularText";
import logo from "@/public/logo.png";
import Image from "next/image";

interface AnimatedLogoProps {
    className?: string;
    classNameImage?: string;
}

const AnimatedLogo = ({ className = "", classNameImage = "" }: AnimatedLogoProps) => {
    const circularTextConfig = {
        word: "INVENTO ",
        repetitions: 4,
        radius: { mobile: 46, desktop: 46 },
        centerX: 50,
        centerY: 50,
        letterSpacing: 1.1,
        useTranslate: true,
        startAngleOffset: 0,
        textSize: { mobile: "text-[12px]", desktop: "md:text-[14px]" },
        lineHeight: { mobile: "leading-[14px]", desktop: "md:leading-[18px]" },
        className: "font-medium tracking-[0.15em]"
    };

    return (
        <div className={`relative w-[150px] h-[150px] lg:w-[150px] lg:h-[150px] grid place-items-center ${className}`}>
            {/* 1. The Animated Circular Text */}
            <div className="absolute inset-0 w-full h-full">
                <CircularText config={circularTextConfig} />
            </div>

            {/* 2. The Central Logo Image */}
            <div className="relative w-[35%] h-[35%]">
                <Image
                    src={logo}
                    alt="Invento Logo"
                    fill
                    className={`object-contain invert ${classNameImage}`}
                />
            </div>
        </div>
    );
};

export default AnimatedLogo;
