import Image from "next/image";

const HaricharanCard: React.FC = () => (
    <div className="relative -mt-9 lg:-mt-25 w-full scale-105 origin-center">
        <Image
            src={"/home/preview/haricharan-card.png"}
            alt="Haricharan Proshow bg"
            width={1500}
            height={300}
            className="w-full h-auto"
        />

        <div className="absolute inset-0 flex flex-col items-center justify-center text-center">
            <div className="absolute top-[6%] lg:top-[7%] left-[3%] lg:left-[5%] text-[#A41F22] font-bold uppercase flex items-center gap-1 text-[5px] lg:text-xl">
                NIGHT 2
                <span className="text-[5px] lg:text-[10px]">
                    <div className="flex items-center">
                        <Image
                            src={"/home/preview/fan.png"}
                            width={15}
                            height={15}
                            alt="fan"
                            className="lg:w-[15px] lg:h-[15px] w-[6px] h-[6px]"
                        />
                        <Image
                            src={"/home/preview/fan.png"}
                            width={15}
                            height={15}
                            alt="fan"
                            className="lg:w-[15px] lg:h-[15px] w-[6px] h-[6px]"
                        />
                        <Image
                            src={"/home/preview/fan.png"}
                            width={15}
                            height={15}
                            alt="fan"
                            className="lg:w-[15px] lg:h-[15px] w-[6px] h-[6px]"
                        />
                    </div>
                </span>
            </div>
            <div className="absolute top-[6%] lg:top-[7%] right-[3%] md:right-[5%] text-[#A41F22] font-bold uppercase flex items-center gap-1 text-[5px] md:text-xl">
                <span className="text-[10px]">
                    <div className="flex">
                        <Image
                            src={"/home/preview/fan.png"}
                            width={15}
                            height={15}
                            alt="fan"
                            className="lg:w-[15px] lg:h-[15px] w-[6px] h-[6px]"
                        />
                        <Image
                            src={"/home/preview/fan.png"}
                            width={15}
                            height={15}
                            alt="fan"
                            className="lg:w-[15px] lg:h-[15px] w-[6px] h-[6px]"
                        />
                        <Image
                            src={"/home/preview/fan.png"}
                            width={15}
                            height={15}
                            alt="fan"
                            className="lg:w-[15px] lg:h-[15px] w-[6px] h-[6px]"
                        />
                    </div>
                </span>
                NIGHT 2
            </div>

            <div className="bg-[#A41F22] text-white font-bold text-[7px] lg:text-2xl uppercase px-3 lg:px-6 py-1 mt-5 lg:mt-0 mb-2 lg:mb-4 mt-0 lg:mt-12">
                JAN 31, 26
            </div>

            <h2 className="text-xl lg:text-7xl lg:text-8xl text-[#A41F22] uppercase font-akira drop-shadow-sm">
                HARICHARAN
            </h2>

            <p className="text-[#A41F22] text-[6px] lg:text-lg font-medium lg:mt-4 max-w-[340px] lg:max-w-3xl px-4 leading-relaxed">
                The Sound of Legends. Witness the vocal powerhouse behind{" "}
                <br className="hidden md:block" />
                South India’s biggest cinematic hits.
            </p>
            <button className="absolute bottom-3 md:bottom-15 bg-[#A41F22] text-white text-[5px] lg:text-xl font-bold uppercase px-1 py-1 lg:px-8 lg:py-3">
                REGISTER
            </button>

            <div className="absolute left-3 lg:left-10 top-1/2 -translate-y-1/2 flex flex-col gap-2 lg:gap-4 text-[#A41F22] text-xl md:text-3xl">
                <span>
                    <Image
                        src={"/home/preview/star.png"}
                        width={30}
                        height={30}
                        alt="star1"
                        className="w-[12px] h-[12px] lg:w-[30px] lg:h-[30px]"
                    />
                </span>
                <span>
                    <Image
                        src={"/home/preview/star.png"}
                        width={30}
                        height={30}
                        alt="star1"
                        className="w-[12px] h-[12px] lg:w-[30px] lg:h-[30px]"
                    />
                </span>
                <span>
                    <Image
                        src={"/home/preview/star.png"}
                        width={30}
                        height={30}
                        alt="star1"
                        className="w-[12px] h-[12px] lg:w-[30px] lg:h-[30px]"
                    />
                </span>
            </div>
            <div className="absolute right-3 lg:right-10 top-1/2 -translate-y-1/2 flex flex-col gap-2 lg:gap-4 text-[#A41F22] text-xl md:text-3xl">
                <span>
                    <Image
                        src={"/home/preview/star.png"}
                        width={30}
                        height={30}
                        alt="star1"
                        className="w-[12px] h-[12px] lg:w-[30px] lg:h-[30px]"
                    />
                </span>
                <span>
                    <Image
                        src={"/home/preview/star.png"}
                        width={30}
                        height={30}
                        alt="star1"
                        className="w-[12px] h-[12px] lg:w-[30px] lg:h-[30px]"
                    />
                </span>
                <span>
                    <Image
                        src={"/home/preview/star.png"}
                        width={30}
                        height={30}
                        alt="star1"
                        className="w-[12px] h-[12px] lg:w-[30px] lg:h-[30px]"
                    />
                </span>
            </div>

            <div className="absolute bottom-[7%] left-3 lg:left-[4%] text-[#A41F22] font-akira text-[3px] lg:text-[10px] uppercase ">
                HARICHARAN
            </div>
            <div className="absolute bottom-[7%] right-4 lg:right-[4%]  text-[#A41F22] font-akira text-[3px] lg:text-[10px]  uppercase text-right ">
                DRUMS <br /> KUMARAN
            </div>
        </div>
    </div>
);

export default HaricharanCard;