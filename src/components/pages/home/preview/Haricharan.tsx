import Image from "next/image";
import HaricharanCard from "./HaricharanCard";

const Haricharan: React.FC = () => (
    <>
        <div className="-mt-8 lg:-mt-24 relative -z-20 w-full">
            <Image
                src={"/home/preview/haricharan.png"}
                width={1200}
                height={600}
                alt="fejo 1"
                className="w-full h-auto object-cover"
            />
        </div>
        <HaricharanCard/>
    </>
);

export default Haricharan;