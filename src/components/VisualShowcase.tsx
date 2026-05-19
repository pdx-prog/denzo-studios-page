"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import { useTranslations } from "next-intl";

export default function VisualShowcase() {
  const t = useTranslations("Home.VisualShowcase");

  return (
    <section className="py-24 md:py-40 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto overflow-hidden">
      <div className="text-center mb-16 md:mb-20">
        <div className="inline-flex items-center justify-center px-6 py-2 bg-[#E5F0FF] dark:bg-blue-900/20 border border-[#B3D4FF] dark:border-blue-700/30 rounded-full mb-8 shadow-sm">
          <span className="text-[#007AFF] dark:text-neon-cyan text-[10px] font-bold uppercase tracking-[0.4em]">{t("badge")}</span>
        </div>
        <h2 className="text-4xl md:text-6xl font-bold tracking-tight mb-2 text-black dark:text-white">
          {t("heading1")} <span className="bg-gradient-to-r from-[#007AFF] to-[#7AB6FF] text-transparent bg-clip-text drop-shadow-sm">{t("heading2")}</span>
        </h2>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 1.2 }}
          className="lg:col-span-8 relative group"
        >
          <div className="absolute -inset-4 bg-gradient-to-tr from-white/5 to-transparent blur-3xl opacity-0 group-hover:opacity-100 transition-opacity duration-1000" />
          <div className="relative glass-panel rounded-3xl overflow-hidden border border-black/10 dark:border-white/10 shadow-2xl z-10">
            <div className="absolute top-10 left-10 md:top-14 md:left-14 z-30 max-w-sm">
              <h3 className="text-3xl md:text-5xl font-bold tracking-tight text-white mb-3 drop-shadow-lg">{t("desktop_title")}</h3>
              <p className="text-white/80 font-medium text-lg drop-shadow-md leading-snug">{t("desktop_desc")}</p>
            </div>
            <div className="absolute top-0 left-0 w-full h-1/2 bg-gradient-to-b from-black/80 via-black/30 to-transparent z-20 pointer-events-none" />
            <Image
              src="/premium_ai_tool_ui_mockup_1774568425071.png"
              alt="AI Creative Tool Mockup"
              width={1600}
              height={1000}
              priority
              className="w-full h-auto scale-100 group-hover:scale-[1.02] transition-transform duration-1000 relative z-10"
            />
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 1.2, delay: 0.2 }}
          className="lg:col-span-4 relative group lg:-mx-8 z-20"
        >
          <div className="absolute -inset-10 bg-gradient-to-br from-neon-purple/20 to-transparent blur-3xl opacity-0 group-hover:opacity-100 transition-opacity duration-1000" />
          <div className="relative glass-panel rounded-3xl overflow-hidden border border-black/10 dark:border-white/10 shadow-2xl z-10 w-full h-full bg-black/5 dark:bg-black/50">
            <div className="absolute top-8 left-8 z-30 max-w-[200px]">
              <h3 className="text-2xl font-bold tracking-tight text-white mb-2 drop-shadow-lg">{t("mobile_title")}</h3>
              <p className="text-white/80 font-medium text-sm drop-shadow-md leading-snug">{t("mobile_desc")}</p>
            </div>
            <div className="absolute top-0 left-0 w-full h-1/2 bg-gradient-to-b from-black/80 via-black/30 to-transparent z-20 pointer-events-none" />
            <Image
              src="/premium_ai_iphone_mockup_1774566621489.png"
              alt="AI Mobile Interface Mockup"
              width={800}
              height={1600}
              className="w-full h-full object-cover scale-100 group-hover:scale-[1.03] transition-transform duration-1000 relative z-10"
            />
          </div>
        </motion.div>
      </div>
    </section>
  );
}
