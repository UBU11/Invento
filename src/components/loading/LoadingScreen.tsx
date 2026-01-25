"use client";

import { useEffect, useRef, useState, type FC } from "react";
import { akira } from "@/src/lib/fonts";
import Image from "next/image";
import "./home.css";

/* ------------------ Typing Text ------------------ */

interface TypingTextProps {
  text: string;
  speed?: number;
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
    <h1 className={`${akira.className} text-white font-bold text-5xl lg:text-9xl`}>
      {displayedText}
    </h1>
  );
}

/* ------------------ Rotating Canvas Loader ------------------ */

interface RotatingCanvasTextProps {
  progress: number; // REAL progress (0–100)
}

export const RotatingCanvasText: FC<RotatingCanvasTextProps> = ({
  progress,
}) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    canvas.width = 300;
    canvas.height = 300;

    const text = " INVENTO INVENTO INVENTO INVENTO INVENTO ";
    const radius = 100;

    ctx.clearRect(0, 0, canvas.width, canvas.height);
    ctx.save();

    ctx.font = "300 18.5px sans-serif";
    ctx.textBaseline = "bottom";
    ctx.textAlign = "center";
    ctx.fillStyle = "#000000";

    ctx.translate(canvas.width / 2, canvas.height / 2);

    const angleStep = (2 * Math.PI) / text.length;
    const spacing = 1.025;
    const rotation = (progress / 100) * Math.PI * 2;

    ctx.rotate(rotation);

    for (let i = 0; i < text.length; i++) {
      ctx.rotate(angleStep * spacing);
      ctx.save();
      ctx.translate(0, -radius);
      ctx.fillText(text[i], 0, 0);
      ctx.restore();
    }

    ctx.restore();
  }, [progress]);

  return (
    <div className="relative flex flex-col items-center justify-center mt-20">
      <h1 className="font-akira text-black text-4xl font-bold">
        {progress}%
      </h1>

      <canvas ref={canvasRef} className="animate-spin-slow" />

      <Image
        src="/logo-filled.svg"
        alt="logo"
        width={112}
        height={112}
        className="absolute w-28 h-28"
        style={{ top: "140px" }}
      />
    </div>
  );
};

/* ------------------ Loading Screen ------------------ */

interface LoadingScreenProps {
  progress: number;
}

export const LoadingScreen: FC<LoadingScreenProps> = ({ progress }) => {
  return (
    <section className="fixed inset-0 bg-white z-50 flex items-center justify-center">
      <RotatingCanvasText progress={progress} />
    </section>
  );
};
