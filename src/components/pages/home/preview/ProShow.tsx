"use client";

import React from "react";
import Image from "next/image";
import Title from "./Title";
import Fejo from "./Fejo";
import Haricharan from "./Haricharan";

const ProShow: React.FC = () => {
    return (
        <section className="relative w-full min-h-screen flex flex-col items-center justify-start text-white pb-20">
            <div className="absolute inset-0 -z-20">
                <Image
                    src={"/home/preview/red-blur.png"}
                    alt="Background"
                    fill
                    className="object-cover"
                    priority
                />
            </div>
            <div className="relative z-10 pt-12 lg:pt-32 flex flex-col items-center w-full">
                <Title />
                <Fejo />
                <Haricharan />
            </div>
        </section>
    );
};

export default ProShow;