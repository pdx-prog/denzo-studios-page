"use client";

import { motion, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";
import { useTranslations } from "next-intl";

export default function TechDNA() {
  const t = useTranslations("Home.TechDNA");
  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({ target: containerRef, offset: ["start end", "end start"] });
  const y1 = useTransform(scrollYProgress, [0, 1], ["0%", "20%"]);
  const y2 = useTransform(scrollYProgress, [0, 1], ["0%", "-20%"]);

  return (
    <section id="tech-dna" ref={containerRef} className="relative py-24 md:py-40 overflow-hidden min-h-[70vh] flex items-center bg-white dark:bg-black">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 w-full z-10 text-center">
        <motion.div initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 1 }}>
          <div className="inline-flex items-center justify-center px-6 py-2 bg-[#E5F0FF] dark:bg-blue-900/20 border border-[#B3D4FF] dark:border-blue-700/30 rounded-full mb-8 shadow-sm">
            <span className="text-[#007AFF] dark:text-[#7AB6FF] text-[10px] font-bold uppercase tracking-[0.4em]">{t("badge")}</span>
          </div>
          <h2 className="text-6xl md:text-9xl font-bold tracking-tighter mb-12 leading-[0.85]">
            {t("headline1")} <br />
            {t("headline2")} <br />
            <span className="bg-gradient-to-r from-[#007AFF] to-[#7AB6FF] text-transparent bg-clip-text drop-shadow-sm">{t("headline3")}</span>
          </h2>
          <p className="text-xl md:text-2xl text-black/80 dark:text-white/40 font-light mb-16 max-w-2xl mx-auto leading-relaxed">
            {t("description")}
          </p>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-8 md:gap-12 max-w-3xl mx-auto text-sm font-bold tracking-widest uppercase text-black/80 dark:text-white/60">
            <div className="flex flex-col items-center gap-4">
              <div className="w-1 h-1 rounded-full bg-neon-cyan shadow-[0_0_10px_#00f0ff]" />
              {t("tech1")}
            </div>
            <div className="flex flex-col items-center gap-4">
              <div className="w-1 h-1 rounded-full bg-neon-purple shadow-[0_0_10px_#7a00ff]" />
              {t("tech2")}
            </div>
            <div className="flex flex-col items-center gap-4">
              <div className="w-1 h-1 rounded-full bg-neon-pink shadow-[0_0_10px_#ff00a0]" />
              {t("tech3")}
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
