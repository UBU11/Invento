"use client";

import Image from "next/image";
import second from "@/public/second.png";

export default function SecondSection() {
  return (
    <section className="bg-white overflow-hidden">
      <div className=" relative min-w-screen min-h-screen">
        <Image
          src={second}
          className="min-w-screen min-h-screen absolute"
          alt="Picture of the author"
        />
      </div>
    </section>
  );
}
