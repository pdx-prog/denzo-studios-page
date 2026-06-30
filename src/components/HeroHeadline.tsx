"use client";

import { motion } from "framer-motion";
import { useTranslations } from "next-intl";

export default function HeroHeadline() {
  const t = useTranslations("Home.Hero");

  return (
    <section className="relative flex flex-col items-center justify-center overflow-hidden px-4 sm:px-6 lg:px-8 py-24 md:py-32 bg-background">
      <motion.div
        initial={{ opacity: 0, y: 100 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.3 }}
        transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
        className="z-20 text-center max-w-7xl mx-auto relative cursor-default"
      >
        <p className="text-3xl md:text-5xl lg:text-5xl font-medium tracking-tight text-[#1C1C1E] dark:text-white max-w-5xl mx-auto leading-[1.2] mb-16">
          <span className="bg-gradient-to-r from-[#0D9488] via-[#2DD4BF] to-[#0D9488] text-transparent bg-clip-text drop-shadow-[0_0_10px_rgba(20,184,166,0.4)]">
            {t("subheadline")}
          </span>
          {t("description")}
        </p>

        <div className="w-full flex items-center justify-center">
          <a href="tel:8332002676" className="group/btn relative w-full flex items-center justify-between px-5 py-3.5 rounded-full font-bold text-sm overflow-hidden transition-all duration-700 hover:scale-[1.02] active:scale-[0.98] shadow-[0_0_40px_rgba(52,199,89,0.15)] hover:shadow-[0_0_40px_rgba(0,122,255,0.25)] bg-[#1c1c1e] dark:bg-black/40 backdrop-blur-2xl border border-white/5 md:inline-flex md:w-auto md:justify-center md:gap-4 md:px-12 md:py-5 md:text-xl">
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_50%,rgba(52,199,89,0.2),transparent_60%)] opacity-100 group-hover/btn:opacity-0 transition-opacity duration-700 pointer-events-none" />
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_70%_50%,rgba(0,122,255,0.3),transparent_60%)] opacity-0 group-hover/btn:opacity-100 transition-opacity duration-700 pointer-events-none" />
            <div className="absolute inset-0 rounded-full border border-[#34C759]/60 opacity-100 group-hover/btn:opacity-0 transition-opacity duration-700 pointer-events-none" />
            <div className="absolute inset-0 rounded-full border border-[#007AFF]/60 opacity-0 group-hover/btn:opacity-100 transition-opacity duration-700 pointer-events-none" />
            <span className="relative z-10 text-white tracking-wide whitespace-nowrap transition-colors duration-700 drop-shadow-md">{t("cta")}</span>
            <span className="relative z-10 shrink-0 px-3 py-1.5 rounded-full bg-[#34C759]/15 group-hover/btn:bg-[#007AFF]/15 text-[#34C759] group-hover/btn:text-[#007AFF] text-sm font-semibold transition-colors duration-700 border border-[#34C759]/30 group-hover/btn:border-[#007AFF]/30 flex items-center gap-1.5 whitespace-nowrap md:px-4 md:text-base md:gap-2">
              <span className="w-1.5 h-1.5 rounded-full bg-[#34C759] group-hover/btn:bg-[#007AFF] animate-pulse transition-colors duration-700" />
              833-200-2676
            </span>
          </a>
        </div>
      </motion.div>
    </section>
  );
}
