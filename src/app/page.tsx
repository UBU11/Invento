import HeroSection from "../components/pages/home/HeroSection";
import Preview from "../components/pages/home/preview/Preview";
import ProShow from "../components/pages/home/preview/ProShow";



export default function HomePage() {
    return(
        <div className="flex flex-col">
            <HeroSection/>
            <ProShow/>
            <Preview/>
        </div>       
    );
}
