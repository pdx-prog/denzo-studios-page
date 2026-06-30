import Navbar from "@/components/Navbar";
import Hero from "@/components/Hero";
import HeroHeadline from "@/components/HeroHeadline";
import TrustTicker from "@/components/TrustTicker";
import BentoGrid from "@/components/BentoGrid";
import AboutStack from "@/components/AboutStack";
import EcommerceTicker from "@/components/EcommerceTicker";
import VisualShowcase from "@/components/VisualShowcase";
import Footer from "@/components/Footer";

export default function Home() {
  return (
    <main className="min-h-screen bg-background text-foreground selection:bg-neon-cyan/30">
      <Navbar />
      <Hero />
      <HeroHeadline />
      <TrustTicker />

      <div id="services">
        <BentoGrid />
      </div>
      <div id="about">
        <AboutStack />
      </div>
      <VisualShowcase />
      <EcommerceTicker />
      <div id="contact">
        <Footer />
      </div>
    </main>
  );
}
