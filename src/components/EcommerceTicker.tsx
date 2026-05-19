"use client";

import { motion } from "framer-motion";
import { SiWebflow, SiWordpress, SiWoocommerce, SiShopify } from "react-icons/si";
import { useTranslations } from "next-intl";

// --- Custom Platform Lockups ---
const WixLogo = () => (
  <span className="font-sans font-black text-3xl md:text-5xl tracking-widest text-black dark:text-white drop-shadow-sm">WIX</span>
);

const WebflowLogo = () => (
  <div className="flex items-center gap-1.5">
    <SiWebflow className="text-[#4353FF] text-3xl md:text-5xl drop-shadow-sm" />
    <span className="font-sans font-bold text-2xl md:text-4xl tracking-tight text-black dark:text-white drop-shadow-sm">Webflow</span>
  </div>
);

const WordPressLogo = () => (
  <div className="flex items-center">
    <SiWordpress className="text-[#21759B] text-4xl md:text-6xl drop-shadow-sm bg-black/5 dark:bg-white/5 rounded-full" />
  </div>
);

const WooCommerceLogo = () => (
  <div className="flex items-center">
    <SiWoocommerce className="text-[#96588A] text-[6rem] md:text-[8rem] drop-shadow-sm" />
  </div>
);

const ShopifyLogo = () => (
  <div className="flex items-center gap-1.5">
    <SiShopify className="text-[#96BF48] text-3xl md:text-5xl drop-shadow-sm" />
    <span className="font-sans font-bold text-2xl md:text-4xl tracking-tight text-black dark:text-white drop-shadow-sm">shopify</span>
  </div>
);


const platforms = [
  { Comp: WixLogo, glow: "255, 255, 255" },        // White
  { Comp: WebflowLogo, glow: "67, 83, 255" },      // Blue
  { Comp: WordPressLogo, glow: "33, 117, 155" },   // Light Blue
  { Comp: WooCommerceLogo, glow: "150, 88, 138" }, // Purple
  { Comp: ShopifyLogo, glow: "150, 191, 72" },     // Green
];

export default function EcommerceTicker() {
  const t = useTranslations("Home.EcommerceTicker");
  return (
    <div className="py-24 md:py-40 bg-white dark:bg-black/5 dark:bg-white/5 dark:bg-black/20 border-t border-black/5 dark:border-white/5 overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 mb-16 md:mb-20 text-center">
        <div className="inline-flex items-center justify-center px-6 py-2 bg-[#FFF3E0] dark:bg-orange-900/20 border border-[#FFD699] dark:border-orange-700/30 rounded-full shadow-sm">
          <span className="text-[10px] font-bold uppercase tracking-[0.4em] bg-gradient-to-r from-[#FF9500] to-[#FFC566] text-transparent bg-clip-text">{t("badge")}</span>
        </div>
      </div>
      
      <div className="flex flex-col gap-12">
        {/* Partners Ticker */}
        <div className="relative flex overflow-x-hidden group">
          <motion.div 
            animate={{ x: ["-50%", "0%"] }}
            transition={{ duration: 40, repeat: Infinity, ease: "linear" }}
            className="flex gap-24 md:gap-32 whitespace-nowrap items-center"
          >
            {[...platforms, ...platforms, ...platforms].map((platform, i) => {
              const PlatformComponent = platform.Comp;
              return (
                <div 
                  key={i} 
                  className="relative flex items-center justify-center opacity-100 transition-all cursor-default"
                  style={{ 
                    transitionDuration: "400ms",
                    transitionTimingFunction: "cubic-bezier(0.4, 0, 0.2, 1)" 
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.filter = `drop-shadow(0 0 25px rgba(${platform.glow}, 0.8))`;
                    e.currentTarget.style.transform = "scale(1.10)";
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.filter = "drop-shadow(0 0 0px rgba(0,0,0,0))";
                    e.currentTarget.style.transform = "scale(1)";
                  }}
                >
                  <PlatformComponent />
                </div>
              );
            })}
          </motion.div>
        </div>
      </div>
    </div>
  );
}
