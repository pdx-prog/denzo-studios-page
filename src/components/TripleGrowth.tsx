"use client";

import React from "react";
import { motion } from "framer-motion";
import { CheckCircle2, Target, BarChart3 } from "lucide-react";
import { useTranslations } from "next-intl";

export default function TripleGrowth() {
  const t = useTranslations("Home.TripleGrowth");

  const sections = [
    {
      title: t("roi_title"),
      gradient: "from-[#007AFF] to-[#7AB6FF]",
      iconColor: "text-[#007AFF]",
      iconBg: "bg-[#007AFF]/10 border-[#007AFF]/20",
      icon: <CheckCircle2 />,
      points: [t("roi_1"), t("roi_2"), t("roi_3")],
    },
    {
      title: t("strategy_title"),
      gradient: "from-[#BF5AF2] to-[#E2B3FB]",
      iconColor: "text-[#BF5AF2]",
      iconBg: "bg-[#BF5AF2]/10 border-[#BF5AF2]/20",
      icon: <Target />,
      points: [t("strategy_1"), t("strategy_2"), t("strategy_3")],
    },
    {
      title: t("reporting_title"),
      gradient: "from-[#FF9500] to-[#FFC566]",
      iconColor: "text-[#FF9500]",
      iconBg: "bg-[#FF9500]/10 border-[#FF9500]/20",
      icon: <BarChart3 />,
      points: [t("reporting_1"), t("reporting_2"), t("reporting_3")],
    },
  ];

  return (
    <section className="py-24 md:py-40 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 md:gap-8">
        {sections.map((section, i) => (
          <motion.div
            key={section.title}
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: i * 0.1 }}
            className="group glass-panel p-8 md:p-10 hover:border-[#D1D1D6] dark:hover:border-white/20 transition-all duration-500 shadow-sm hover:shadow-md"
          >
            <div className={`w-12 h-12 rounded-[14px] ${section.iconBg} border flex items-center justify-center mb-8 transition-colors`}>
              {React.cloneElement(section.icon, { className: `w-[22px] h-[22px] ${section.iconColor}` })}
            </div>
            <h3 className={`text-[2rem] font-bold mb-8 tracking-tight bg-gradient-to-r ${section.gradient} text-transparent bg-clip-text drop-shadow-sm`}>
              {section.title}
            </h3>
            <ul className="space-y-6">
              {section.points.map((point, idx) => (
                <li key={idx} className="flex items-start gap-4 text-[#4b5563] dark:text-white/60 group-hover:text-[#1c1c1e] dark:group-hover:text-white/90 transition-colors text-[15px] font-medium leading-snug">
                  <div className="w-1.5 h-1.5 rounded-full bg-[#E5E5EA] dark:bg-white/20 mt-[6px] shrink-0" />
                  {point}
                </li>
              ))}
            </ul>
            <div className="mt-12 pt-8 border-t border-[#E5E5EA] dark:border-white/5 flex items-center justify-between opacity-0 group-hover:opacity-100 transition-opacity duration-700">
              <span className="text-[10px] font-bold uppercase tracking-[0.3em] text-[#8E8E93] dark:text-white/20">Metric Module 0{i + 1}</span>
              <div className={`w-2 h-2 rounded-full animate-pulse ${section.iconBg.split(" ")[0]}`} style={{ backgroundColor: section.gradient.match(/from-\[([^\]]+)\]/)?.[1] || "currentColor" }} />
            </div>
          </motion.div>
        ))}
      </div>
    </section>
  );
}
