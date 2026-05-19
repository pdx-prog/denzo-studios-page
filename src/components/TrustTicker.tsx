"use client";

import { motion } from "framer-motion";
import { SiYoutube, SiTiktok, SiGoogle, SiMeta } from "react-icons/si";
import { FaAmazon, FaMicrosoft } from "react-icons/fa";
import { useTranslations } from "next-intl";

// --- Custom Brand Lockups ---
const MetaLogo = () => (
  <div className="flex items-center gap-2">
    <SiMeta className="text-[#0668E1] text-3xl md:text-5xl" />
    <span className="font-sans font-semibold text-2xl md:text-4xl tracking-tight text-black dark:text-white drop-shadow-sm">Meta</span>
  </div>
);

const YouTubeLogo = () => (
  <div className="flex items-center gap-1.5">
    <SiYoutube className="text-[#FF0000] text-3xl md:text-5xl" />
    <span className="font-sans font-bold text-2xl md:text-4xl tracking-tighter text-black dark:text-white drop-shadow-sm">YouTube</span>
  </div>
);

const AmazonAdsLogo = () => (
  <div className="flex items-baseline gap-1">
    <span className="font-sans font-bold text-2xl md:text-4xl tracking-tighter text-black dark:text-white drop-shadow-sm">amazon</span>
    <span className="font-sans font-normal text-lg md:text-2xl text-black/90 dark:text-white/70">ads</span>
  </div>
);

const TikTokAdsLogo = () => (
  <div className="flex items-center gap-2">
    <div className="bg-white text-black p-1 md:p-1.5 rounded-lg flex items-center justify-center">
      <SiTiktok className="text-xl md:text-3xl" />
    </div>
    <span className="font-sans font-black text-xl md:text-3xl tracking-tight text-black dark:text-white drop-shadow-sm">ADS</span>
  </div>
);

const BingLogo = () => (
  <div className="flex items-center gap-2">
    <FaMicrosoft className="text-[#00A4EF] text-2xl md:text-4xl" />
    <span className="font-sans font-semibold text-2xl md:text-4xl tracking-tight text-black dark:text-white drop-shadow-sm">Bing</span>
  </div>
);

const GoogleAdsLogo = () => (
  <div className="flex flex-col items-center gap-0.5 mt-2">
    <SiGoogle className="text-[#4285F4] text-2xl md:text-4xl" />
    <span className="font-sans font-medium text-[10px] md:text-sm tracking-tight text-black/80 dark:text-white/80">Google Ads</span>
  </div>
);

const partners = [
  { Comp: MetaLogo, glow: "6, 104, 225" },       // Meta blue
  { Comp: YouTubeLogo, glow: "255, 0, 0" },      // Red
  { Comp: AmazonAdsLogo, glow: "255, 153, 0" },  // Orange
  { Comp: TikTokAdsLogo, glow: "255, 255, 255" },// White
  { Comp: BingLogo, glow: "0, 164, 239" },       // Blue
  { Comp: GoogleAdsLogo, glow: "66, 133, 244" }, // Blue
];

export default function TrustTicker() {
  const t = useTranslations("Home.TrustTicker");
  return (
    <div className="py-24 md:py-40 bg-white dark:bg-black/10 dark:bg-white/5 dark:bg-black/40 border-y border-black/5 dark:border-white/5 overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 mb-16 md:mb-20 text-center">
        <div className="inline-flex items-center justify-center px-6 py-2 bg-[#FFF3E0] dark:bg-orange-900/20 border border-[#FFD699] dark:border-orange-700/30 rounded-full shadow-sm">
          <span className="text-[10px] font-bold uppercase tracking-[0.4em] bg-gradient-to-r from-[#FF9500]/60 via-[#FFC566] to-[#FF9500]/60 text-transparent bg-clip-text">{t("badge")}</span>
        </div>
      </div>
      
      <div className="flex flex-col gap-12">
        {/* Partners Ticker */}
        <div className="relative flex overflow-x-hidden group">
          <motion.div 
            animate={{ x: ["0%", "-50%"] }}
            transition={{ duration: 40, repeat: Infinity, ease: "linear" }}
            className="flex gap-24 md:gap-32 whitespace-nowrap items-center"
          >
            {[...partners, ...partners, ...partners].map((partner, i) => {
              const PartnerComponent = partner.Comp;
              return (
                <div 
                  key={i} 
                  className="relative flex items-center justify-center opacity-100 transition-all cursor-default"
                  style={{ 
                    transitionDuration: "400ms",
                    transitionTimingFunction: "cubic-bezier(0.4, 0, 0.2, 1)" 
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.filter = `drop-shadow(0 0 25px rgba(${partner.glow}, 0.8))`;
                    e.currentTarget.style.transform = "scale(1.10)";
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.filter = "drop-shadow(0 0 0px rgba(0,0,0,0))";
                    e.currentTarget.style.transform = "scale(1)";
                  }}
                >
                  <PartnerComponent />
                </div>
              );
            })}
          </motion.div>
        </div>
      </div>
    </div>
  );
}
