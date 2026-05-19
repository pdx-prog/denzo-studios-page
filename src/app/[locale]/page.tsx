import Navbar from "@/components/Navbar";
import Hero from "@/components/Hero";
import TrustTicker from "@/components/TrustTicker";
import BentoGrid from "@/components/BentoGrid";
import TripleGrowth from "@/components/TripleGrowth";
import TechDNA from "@/components/TechDNA";
import EcommerceTicker from "@/components/EcommerceTicker";
import VisualShowcase from "@/components/VisualShowcase";
import Footer from "@/components/Footer";

export default function Home() {
  return (
    <main className="flex min-h-screen flex-col bg-background text-foreground selection:bg-neon-cyan/30">
      <Navbar />
      <Hero />
      <TrustTicker />
      <div id="services">
        <BentoGrid />
      </div>
      <VisualShowcase />
      <div id="about">
        <TripleGrowth />
        <TechDNA />
      </div>
      <EcommerceTicker />
      <div id="contact">
        <Footer />
      </div>
    </main>
  );
}
