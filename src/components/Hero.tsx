"use client";

import { motion, useMotionValue, useSpring } from "framer-motion";
import { useRef } from "react";
import { useTranslations } from "next-intl";

export default function Hero() {
  const t = useTranslations("Home.Hero");
  const containerRef = useRef<HTMLElement>(null);

  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);
  const springX = useSpring(mouseX, { stiffness: 50, damping: 20, mass: 0.5 });
  const springY = useSpring(mouseY, { stiffness: 50, damping: 20, mass: 0.5 });

  const handleMouseMove = (e: React.MouseEvent<HTMLElement>) => {
    if (!containerRef.current) return;
    const rect = containerRef.current.getBoundingClientRect();
    mouseX.set(e.clientX - rect.left);
    mouseY.set(e.clientY - rect.top);
  };

  return (
    <section
      ref={containerRef}
      onMouseMove={handleMouseMove}
      className="relative min-h-[95vh] flex flex-col items-center justify-center overflow-hidden px-4 sm:px-6 lg:px-8 pt-20 bg-background group"
    >
      <div className="absolute inset-0 z-0 bg-background" />

      <motion.div
        className="absolute top-0 left-0 w-[600px] h-[600px] bg-gradient-to-r from-[#007AFF]/30 via-[#BF5AF2]/30 to-[#FF9500]/30 rounded-full blur-[120px] mix-blend-multiply dark:mix-blend-screen pointer-events-none opacity-0 group-hover:opacity-70 dark:group-hover:opacity-100 transition-opacity duration-1000 z-10"
        style={{ x: springX, y: springY, translateX: "-50%", translateY: "-50%" }}
      />

      <div className="z-20 text-center max-w-7xl mx-auto relative cursor-default">
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          className="mb-10 inline-flex items-center gap-3 px-6 py-2 rounded-full border border-black/10 dark:border-white/10 bg-black/[0.03] dark:bg-white/[0.03] backdrop-blur-2xl"
        >
          <div className="w-2 h-2 rounded-full bg-[#007AFF] shadow-[0_0_10px_#007AFF]" />
          <span className="text-[10px] font-bold tracking-[0.5em] uppercase bg-gradient-to-r from-[#007AFF] to-[#7AB6FF] text-transparent bg-clip-text drop-shadow-sm">
            {t("badge")}
          </span>
        </motion.div>

        <motion.h1
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1.2, ease: [0.16, 1, 0.3, 1] }}
          className="text-7xl md:text-9xl lg:text-[11rem] font-bold tracking-tighter leading-[0.8] mb-12"
        >
          <span className="bg-gradient-to-r from-[#007AFF] via-[#BF5AF2] to-[#FF9500] text-transparent bg-clip-text drop-shadow-sm">
            {t("headline1")}
          </span>
          <br />
          <span className="text-foreground drop-shadow-sm">{t("headline2")}</span>
        </motion.h1>

        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1.5, delay: 0.6 }}
          className="text-xl md:text-2xl text-black/80 dark:text-white/40 max-w-4xl mx-auto font-light tracking-tight mb-16 leading-relaxed"
        >
          <span className="bg-gradient-to-r from-[#0D9488] via-[#2DD4BF] to-[#0D9488] text-transparent bg-clip-text font-semibold drop-shadow-[0_0_10px_rgba(20,184,166,0.4)]">
            {t("subheadline")}
          </span>
          {t("description")}
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 1 }}
          className="w-full flex items-center justify-center"
        >
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
        </motion.div>
      </div>
    </section>
  );
}
