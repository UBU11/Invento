import ContactSection from "../components/pages/home/ContactSection";
import FAQSection from "../components/pages/home/FAQSection";
import HeroSection from "../components/pages/home/HeroSection";
import Preview from "../components/pages/home/preview/Preview";

export default function HomePage() {
  return (
    <main className="bg-white">
      <HeroSection />
      <Preview/>
      <FAQSection/>
      <ContactSection/>
    </main>
  );
}