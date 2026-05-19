"use client";

import { motion } from "framer-motion";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { Compass, Target } from "lucide-react";
import { useTranslations } from "next-intl";

export default function AboutUsPage() {
  const t = useTranslations("AboutUs");

  return (
    <main className="min-h-screen bg-background overflow-x-hidden">
      <Navbar />

      {/* ── HERO ──────────────────────────────────────────────── */}
      <section className="relative min-h-[60vh] flex items-center pt-32 pb-20 justify-center">
        {/* Ambient glow */}
        <div className="absolute top-0 right-[20%] w-[40vw] h-[50vh] bg-gradient-to-bl from-neon-purple/20 via-neon-cyan/10 to-transparent rounded-full blur-[120px] pointer-events-none" />
        <div className="absolute bottom-0 left-[10%] w-[30vw] h-[40vh] bg-gradient-to-tr from-[#3B82F6]/20 via-[#4F46E5]/10 to-transparent rounded-full blur-[100px] pointer-events-none" />

        <div className="relative z-10 w-full max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="mb-8 inline-flex items-center gap-3 px-5 py-2 rounded-full border border-white/10 dark:border-white/20 bg-black/5 dark:bg-white/5 backdrop-blur-md"
          >
            <div className="w-2 h-2 rounded-full bg-neon-cyan shadow-[0_0_8px_#06B6D4]" />
            <span className="text-[10px] font-bold tracking-[0.45em] uppercase text-black dark:text-white">
              {t("badge")}
            </span>
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, ease: [0.16, 1, 0.3, 1], delay: 0.1 }}
            className="text-5xl md:text-7xl lg:text-8xl font-bold tracking-tighter leading-[0.9] mb-8 text-[#1C1C1E] dark:text-white"
          >
            {t("headline_1")}
            <span className="bg-gradient-to-r from-[#007AFF] via-[#BF5AF2] to-[#FF9500] text-transparent bg-clip-text drop-shadow-sm">
              {t("headline_2")}
            </span>
          </motion.h1>

          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 1, delay: 0.3 }}
            className="text-xl md:text-2xl text-[#3A3A3C] dark:text-white/60 font-light tracking-tight max-w-3xl mx-auto leading-relaxed"
          >
            {t("subheadline")}
          </motion.p>
        </div>
      </section>

      {/* ── CONTENT ───────────────────────────────────────────── */}
      <section className="py-24 md:py-32 px-4 sm:px-6 lg:px-8 relative bg-transparent">
        <div className="max-w-5xl mx-auto flex flex-col gap-16 md:gap-24 text-3xl md:text-5xl lg:text-5xl font-medium tracking-tight text-[#1C1C1E] dark:text-white leading-[1.2]">
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
          >
            {t("content1_1")}
            <span className="text-black/40 dark:text-white/40">{t("content1_2")}</span>
            {t("content1_3")}
            <span className="text-[#007AFF] drop-shadow-sm">{t("content1_4")}</span>
            {t("content1_5")}
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
          >
            {t("content2_1")}
            <span className="bg-gradient-to-r from-[#007AFF] via-[#BF5AF2] to-[#FF9500] text-transparent bg-clip-text drop-shadow-sm">{t("content2_2")}</span>
            {t("content2_3")}
            <span className="text-black/40 dark:text-white/40">{t("content2_4")}</span>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
          >
            {t("content3_1")}
            <span className="text-black/40 dark:text-white/40">{t("content3_2")}</span>
            {t("content3_3")}
          </motion.div>
          
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
            className="text-2xl md:text-3xl lg:text-4xl text-[#3A3A3C] dark:text-white/50 font-light mt-4 leading-relaxed"
          >
            {t("content4")}
          </motion.div>
        </div>
      </section>

      {/* ── CTAS ──────────────────────────────────────────────── */}
      <section className="py-24 md:py-32 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="relative overflow-hidden rounded-3xl bg-gradient-to-br from-[#1E1E1E] to-[#111111] dark:from-black dark:to-[#0a0a0a] border border-white/10 p-12 md:p-20 shadow-2xl"
          >
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_20%_50%,rgba(147,51,234,0.15),transparent_65%)] pointer-events-none" />
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_80%_30%,rgba(6,182,212,0.15),transparent_60%)] pointer-events-none" />

            <div className="relative z-10 flex flex-col items-center text-center">
              <h2 className="text-4xl md:text-5xl lg:text-7xl font-bold tracking-tighter mb-10 text-white">
                {t("cta_headline_1")} <br className="hidden md:block" /> {t("cta_headline_2")}
                <span className="bg-gradient-to-r from-neon-cyan via-neon-purple to-neon-pink text-transparent bg-clip-text">
                  {t("cta_headline_3")}
                </span>
              </h2>

              <div className="flex flex-col sm:flex-row items-stretch justify-center gap-6 w-full max-w-3xl">
                {/* Primary CTA */}
                <a
                  href="tel:8332002676"
                  className="flex-1 group relative flex items-center justify-center gap-3 px-8 py-5 rounded-full bg-white text-black font-bold text-sm uppercase tracking-widest hover:bg-white/90 transition-all hover:scale-[1.02] active:scale-[0.98] shadow-[0_0_30px_rgba(255,255,255,0.2)]"
                >
                  <Target className="w-5 h-5 text-neon-purple" />
                  {t("primary_cta")}
                </a>
              </div>

              <div className="mt-6 flex flex-col sm:flex-row items-center justify-center gap-6 w-full max-w-3xl">
                 {/* Secondary CTA */}
                 <a
                  href="/#services"
                  className="group relative flex items-center justify-center gap-3 px-8 py-5 rounded-full border border-white/20 text-white font-bold text-sm uppercase tracking-widest hover:bg-white/5 transition-all hover:scale-[1.02] active:scale-[0.98]"
                >
                  <Compass className="w-5 h-5 text-neon-cyan" />
                  {t("secondary_cta")}
                </a>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      <Footer />
    </main>
  );
}
