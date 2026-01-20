import Image from "next/image";

const Title: React.FC = () => (
    <div className="relative w-full scale-105 origin-center">
        <Image
            src={"/home/preview/proshows-card.png"}
            alt="Proshow bg"
            width={1500}
            height={300}
            className="w-full h-auto"
        />
        <div className="absolute inset-0 flex flex-col items-center justify-center text-center">
            <h2 className="text-xl mt-3 lg:mt-0 md:text-7xl text-[#A41F22] uppercase font-akira">
                PROSHOWS
            </h2>
        </div>
    </div>
);

export default Title;