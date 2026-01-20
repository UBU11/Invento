"use client"

import { useEffect, useState } from "react"

const LEAF_IMAGES = [
  "/event/maple-red.svg",
  "/event/maple-dark.svg",
  "/event/maple-brown.svg",
  "/event/maple-torn.svg",

  "/event/momiji-1.svg",
  "/event/momiji-2.svg",
  "/event/momiji-3.svg",
]

type Leaf = {
  left: number
  size: number
  delay: number
  duration: number
  drift: number
  rotate: number
  tilt: number
  img: string
}

export default function FallingLeaves() {
  const [leaves, setLeaves] = useState<Leaf[]>([])

  useEffect(() => {
    const generated: Leaf[] = Array.from({ length: 42 }).map(() => {
      const img =
        LEAF_IMAGES[Math.floor(Math.random() * LEAF_IMAGES.length)]

      const isPetal = img.includes("momiji")

      return {
        img,
        left: Math.random() * 60,
        size: isPetal
          ? 10 + Math.random() * 14
          : 18 + Math.random() * 20,
        delay: Math.random() * 8,
        duration: isPetal
          ? 18 + Math.random() * 14
          : 14 + Math.random() * 10,
        drift: isPetal
          ? 40 + Math.random() * 80
          : 80 + Math.random() * 140,
        rotate: isPetal
          ? 200 + Math.random() * 260
          : 120 + Math.random() * 180,
        tilt: isPetal
          ? 40 + Math.random() * 40
          : 10 + Math.random() * 20,
      }
    })

    setLeaves(generated)
  }, [])

  if (!leaves.length) return null

  return (
    <div className="pointer-events-none absolute left-0 top-0 h-full w-[90%] overflow-hidden z-[15]">
      {leaves.map((leaf, i) => (
        <span
          key={i}
          className={`leaf absolute ${
            leaf.img.includes("momiji")
              ? "leaf-petal"
              : "leaf-maple"
          }`}
          style={{
            left: `${leaf.left}%`,
            width: `${leaf.size}px`,
            animationDelay: `${leaf.delay}s`,
            animationDuration: `${leaf.duration}s`,
            ["--drift" as any]: `${leaf.drift}px`,
            ["--rotate" as any]: `${leaf.rotate}deg`,
            ["--tilt" as any]: `${leaf.tilt}deg`,
          }}
        >
          <img src={leaf.img} alt="" className="w-full h-auto opacity-90" />
        </span>
      ))}
    </div>
  )
}
