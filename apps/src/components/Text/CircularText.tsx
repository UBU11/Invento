import React from "react";

// ========== TYPES ==========
export type LetterDef = {
    char: string;
    left: string;
    top: string;
    rotate: number;
};

export type CircularTextConfig = {
    word: string;
    repetitions: number;
    radius: number | { mobile: number; desktop: number };
    centerX?: number;
    centerY?: number;
    letterSpacing?: number | { mobile: number; desktop: number };
    useTranslate?: boolean;
    startAngleOffset?: number; // Offset in degrees to adjust starting position
    textSize?: {
        mobile: string;
        desktop: string;
    };
    lineHeight?: {
        mobile: string;
        desktop: string;
    };
    className?: string;
};

// ========== UTILITY FUNCTIONS ==========
/**
 * Generates circular text letters programmatically using trigonometry
 */
export const generateCircularLetters = (
    word: string,
    repetitions: number,
    radius: number,
    centerX: number = 50,
    centerY: number = 50,
    letterSpacing: number = 0.85,
    startAngleOffset: number = 0
): LetterDef[] => {
    const letters: LetterDef[] = [];
    const offsetRadians = (startAngleOffset * Math.PI) / 180;

    for (let j = 0; j < repetitions; j++) {
        for (let i = 0; i < word.length; i++) {
            // Calculate the base angle for the start of this repetition
            const baseAngle = (j / repetitions) * 2 * Math.PI + offsetRadians;

            // Calculate the angle for this specific character
            // We center the word around the base angle hence the (i - word.length / 2)
            const charAngle =
                baseAngle +
                ((i - word.length / 2) *
                    ((2 * Math.PI) / (word.length * repetitions)) *
                    letterSpacing);

            const x = centerX + radius * Math.cos(charAngle);
            const y = centerY + radius * Math.sin(charAngle);
            const rotation = (charAngle * 180) / Math.PI + 90;

            letters.push({
                char: word[i],
                left: `${x}%`,
                top: `${y}%`,
                rotate: rotation,
            });
        }
    }
    return letters;
};

// ========== COMPONENT ==========
interface CircularTextProps {
    config: CircularTextConfig;
}

export const CircularText = ({ config }: CircularTextProps) => {
    const {
        word,
        repetitions,
        radius,
        centerX = 50,
        centerY = 50,
        letterSpacing = 0.85,
        useTranslate = false,
        startAngleOffset = 0,
        textSize = {
            mobile: "text-[11px]",
            desktop: "md:text-[15px]",
        },
        lineHeight = {
            mobile: "leading-[14px]",
            desktop: "md:leading-[18px]",
        },
        className = "",
    } = config;

    // Handle responsive radius
    const [currentRadius, setCurrentRadius] = React.useState(() => {
        return typeof radius === 'number' ? radius : radius.mobile;
    });

    // Handle responsive letter spacing
    const [currentLetterSpacing, setCurrentLetterSpacing] = React.useState(() => {
        return typeof letterSpacing === 'number' ? letterSpacing : letterSpacing.mobile;
    });

    React.useEffect(() => {
        if (typeof radius === 'number') return;
        const mediaQuery = window.matchMedia('(min-width: 768px)');
        const updateRadius = () => {
            setCurrentRadius(mediaQuery.matches ? radius.desktop : radius.mobile);
        };
        updateRadius();
        mediaQuery.addEventListener('change', updateRadius);
        return () => mediaQuery.removeEventListener('change', updateRadius);
    }, [radius]);

    React.useEffect(() => {
        if (typeof letterSpacing === 'number') return;
        const mediaQuery = window.matchMedia('(min-width: 768px)');
        const updateLetterSpacing = () => {
            setCurrentLetterSpacing(mediaQuery.matches ? letterSpacing.desktop : letterSpacing.mobile);
        };
        updateLetterSpacing();
        mediaQuery.addEventListener('change', updateLetterSpacing);
        return () => mediaQuery.removeEventListener('change', updateLetterSpacing);
    }, [letterSpacing]);

    const letters = generateCircularLetters(
        word,
        repetitions,
        currentRadius,
        centerX,
        centerY,
        currentLetterSpacing,
        startAngleOffset
    );

    const baseClasses = `absolute font-inter ${textSize.mobile} ${textSize.desktop} ${lineHeight.mobile} ${lineHeight.desktop} pointer-events-none whitespace-nowrap ${className}`;
    const transformClasses = useTranslate
        ? "transform -translate-x-1/2 -translate-y-1/2"
        : "";

    return (
        <div
            className="absolute inset-0 animate-spin-slow origin-center will-change-transform"
            style={{ backfaceVisibility: 'hidden', transform: 'translateZ(0)' }}
        >
            <div className="relative w-full h-full">
                {letters.map((letter, index) => (
                    <span
                        key={index}
                        className={`${baseClasses} ${transformClasses}`}
                        style={{
                            left: letter.left,
                            top: letter.top,
                            transform: useTranslate
                                ? `translate(-50%, -50%) rotate(${letter.rotate}deg)`
                                : `rotate(${letter.rotate}deg)`,
                        }}
                        suppressHydrationWarning
                    >
                        {letter.char}
                    </span>
                ))}
            </div>
        </div>
    );
};
