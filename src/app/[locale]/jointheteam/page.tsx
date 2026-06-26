import JoinNavbar from "@/components/jointheteam/JoinNavbar";
import JoinFooter from "@/components/jointheteam/JoinFooter";
import HeroSection from "@/components/jointheteam/HeroSection";
import JobsSection from "@/components/jointheteam/JobsSection";
import AboutSection from "@/components/jointheteam/AboutSection";
import CultureSection from "@/components/jointheteam/CultureSection";
import CVSection from "@/components/jointheteam/CVSection";
import PhotoSection from "@/components/jointheteam/PhotoSection";
import FSPreloader from "@/components/jointheteam/FSPreloader";
import { PreloaderProvider } from "@/components/jointheteam/PreloaderContext";

export const metadata = {
  title: "Únete al equipo | Denzo Studios",
  description: "Buscamos personas apasionadas, creativas y comprometidas que quieran crecer profesionalmente junto a nosotros.",
};

export default function JoinTheTeamPage() {
  return (
    <PreloaderProvider>
      <div className="flex flex-col min-h-screen bg-white dark:bg-[#0a0a0a]">
        <FSPreloader />
        <JoinNavbar />
        <main className="flex-grow">
          <HeroSection />
          <JobsSection />
          <AboutSection />
          <CultureSection />
          <CVSection />
          <PhotoSection />
        </main>
        <JoinFooter />
      </div>
    </PreloaderProvider>
  );
}
