import HeroSection from "../components/pages/home/HeroSection";
import FAQSection from "../components/pages/home/FAQSection";
import ContactSection from "../components/pages/home/ContactSection";



export default function HomePage() {
    return(
        <div>
            <HeroSection/>
            <FAQSection/>
            <ContactSection/>
        </div>       
    );
}
