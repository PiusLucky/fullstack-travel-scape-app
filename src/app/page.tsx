import NavBar from "@/components/common/NavBar";
import Footer from "@/components/sections/landing/Footer";
import HeroSection from "@/components/sections/landing/HeroSection";
import NewsLetter from "@/components/sections/landing/NewsLetter";
import Testimonials from "@/components/sections/landing/Testimonials";
import WhyChooseUs from "@/components/sections/landing/WhyChooseUs";

export default function Home() {
  return (
    <main>
      <NavBar />
      <div className="flex flex-col gap-32  my-16 px-4 md:px-16">
        <HeroSection />
        <WhyChooseUs />
        <Testimonials />
        <NewsLetter />
      </div>
      <div className="pt-4 md:pt-48">
        <Footer />
      </div>
    </main>
  );
}
