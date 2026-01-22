import { useEffect, useRef, useState, type FC } from "react";
import { akira } from "@/src/lib/fonts";

import "./home.css";

interface TypingTextProps {
  text: string;
  speed?: number;
}

interface RotatingCanvasTextProps {
  duration?: number;
}

interface LoadingScreenProps {
  loadingDelay?: number;
  onComplete: () => void;
}

export default function TypingText({ text, speed = 100 }: TypingTextProps) {
  const [displayedText, setDisplayedText] = useState("");

  useEffect(() => {
    let index = 0;
    const interval = setInterval(() => {
      setDisplayedText(text.slice(0, index));
      index++;
      if (index > text.length) clearInterval(interval);
    }, speed);

    return () => clearInterval(interval);
  }, [text, speed]);

  return (
    <h1
      className={`${akira.className} text-white font-bold text-5xl lg:text-9xl`}
    >
      {displayedText}
    </h1>
  );
}

export const RotatingCanvasText: FC<RotatingCanvasTextProps> = ({
  duration = 0,
}) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [percent, setPercent] = useState(0);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    canvas.width = 300;
    canvas.height = 300;

    const text = " INVENTO INVENTO INVENTO INVENTO INVENTO ";
    const radius = 100;

    ctx.font = "300 18.5px sans-serif";
    ctx.textBaseline = "bottom";
    ctx.textAlign = "center";
    ctx.fillStyle = "#000000";

    ctx.translate(canvas.width / 2, canvas.height / 2);
    const angleStep = (2 * Math.PI) / text.length;
    const spacing = 1.025;

    for (let i = 0; i < text.length; i++) {
      ctx.rotate(angleStep * spacing);
      ctx.save();
      ctx.translate(0, -radius);
      ctx.fillText(text[i], 0, 0);
      ctx.restore();
    }
  }, []);

  useEffect(() => {
    const start = performance.now();

    const tick = (now: number) => {
      const elapsed = now - start;
      const progress = Math.min(elapsed / duration, 1);

      const eased =
        progress < 0.5
          ? 4 * progress * progress * progress
          : 1 - Math.pow(-2 * progress + 2, 3) / 2;

      setPercent(Math.floor(eased * 100));

      if (progress < 1) requestAnimationFrame(tick);
    };

    requestAnimationFrame(tick);
  }, [duration]);

  return (
    <div className="relative flex flex-col items-center justify-center mt-20">
      {duration > 0 && (
        <h1 className={`font-akira text-black text-4xl font-bold`}>
          {percent}%
        </h1>
      )}

      <canvas ref={canvasRef} className="animate-spin-slow" />

      <img
        src="/logo-filled.svg"
        alt="logo"
        className="absolute w-28 h-28"
        style={{ top: "140px" }}
      />
    </div>
  );
};

export const LoadingScreen: React.FC<LoadingScreenProps> = ({
  loadingDelay = 2000,
}) => {
  const rotatingDuration = loadingDelay;

  return (
    <section className="flex bg-white min-h-screen justify-center items-center">
      <RotatingCanvasText duration={rotatingDuration} />
    </section>
  );
};
