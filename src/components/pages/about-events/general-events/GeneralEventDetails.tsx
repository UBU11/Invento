import Link from "next/link";

const GeneralEventDetails = () => {
    return (
        <div className="w-full flex flex-col items-center justify-start pt-0 md:pt-20 pb-32 md:pb-60 relative" style={{ backgroundColor: "#E3CFAF" }}>
            {/* Register Button */}
            <div className="w-full flex justify-center mt-40 md:mt-40 z-50 relative">
                <Link href="/events">
                    <button className="bg-[#A41F22] text-white font-akira text-sm md:text-3xl px-8 py-3 md:px-20 md:py-6 hover:bg-white hover:text-black transition-colors duration-300">
                        REGISTER HERE
                    </button>
                </Link>
            </div>
        </div>
    );
};

export default GeneralEventDetails;

