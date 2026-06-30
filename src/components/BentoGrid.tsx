"use client";

import React from "react";
import Image from "next/image";
import { motion } from "framer-motion";
import { BrainCircuit, Sparkles, Search, Code2, Network, Check, Palette, PhoneCall } from "lucide-react";
import { useTranslations } from "next-intl";

export default function BentoGrid() {
  const t = useTranslations("Home.BentoGrid");

  const features = [
    {
      id: "ai",
      title: t("ai_title"),
      description: t("ai_desc"),
      iconBg: "bg-[#007AFF]/10 border-[#007AFF]/20",
      iconColor: "text-[#007AFF]",
      icon: <BrainCircuit />,
      colSpan: "md:col-span-2",
      rowSpan: "md:row-span-2",
      imageUrl: "/images/cards/ai.jpg"
    },
    {
      id: "ads",
      title: t("ads_title"),
      description: t("ads_desc"),
      iconBg: "bg-[#BF5AF2]/10 border-[#BF5AF2]/20",
      iconColor: "text-[#BF5AF2]",
      icon: <Sparkles />,
      colSpan: "md:col-span-1",
      rowSpan: "md:row-span-1",
      imageUrl: "/images/cards/ads.jpg"
    },
    {
      id: "seo",
      title: t("seo_title"),
      description: t("seo_desc"),
      iconBg: "bg-[#8E8E93]/10 border-[#8E8E93]/20",
      iconColor: "text-[#8E8E93] dark:text-white/70",
      icon: <Search />,
      colSpan: "md:col-span-1",
      rowSpan: "md:row-span-1",
      imageUrl: "/images/cards/seo.jpg"
    },
    {
      id: "web",
      title: t("web_title"),
      description: t("web_desc"),
      iconBg: "bg-[#FF9500]/10 border-[#FF9500]/20",
      iconColor: "text-[#FF9500]",
      icon: <Code2 />,
      colSpan: "md:col-span-2",
      rowSpan: "md:row-span-1",
      imageUrl: "/images/cards/web.jpg"
    },
    {
      id: "partners",
      title: t("partners_title"),
      description: t("partners_desc"),
      iconBg: "bg-[#34C759]/10 border-[#34C759]/20",
      iconColor: "text-[#34C759]",
      icon: <Network />,
      colSpan: "md:col-span-1",
      rowSpan: "md:row-span-1",
    },
    {
      id: "reviews",
      title: t("reviews_title"),
      description: t("reviews_desc"),
      iconBg: "bg-[#5856D6]/10 border-[#5856D6]/20",
      iconColor: "text-[#5856D6]",
      icon: <Check />,
      colSpan: "md:col-span-1",
      rowSpan: "md:row-span-1",
    },
    {
      id: "design",
      title: t("design_title"),
      description: t("design_desc"),
      iconBg: "bg-[#FF2D55]/10 border-[#FF2D55]/20",
      iconColor: "text-[#FF2D55]",
      icon: <Palette />,
      colSpan: "md:col-span-1",
      rowSpan: "md:row-span-1",
      imageUrl: "/images/cards/design.jpg"
    },
    {
      id: "callcenter",
      title: t("callcenter_title"),
      description: t("callcenter_desc"),
      iconBg: "bg-[#00C7BE]/10 border-[#00C7BE]/20",
      iconColor: "text-[#00C7BE]",
      icon: <PhoneCall />,
      colSpan: "md:col-span-1",
      rowSpan: "md:row-span-1",
      imageUrl: "/images/cards/callcenter.jpg"
    },
  ];

  return (
    <section className="py-24 md:py-40 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
      <div className="text-center md:text-left mb-16 md:mb-20">
        <h2 className="text-5xl md:text-7xl font-bold tracking-tight mb-8 text-black dark:text-white">
          {t("heading1")} <span className="bg-gradient-to-r from-[#007AFF] via-[#3395FF] to-[#007AFF] text-transparent bg-clip-text drop-shadow-sm">{t("heading2")}</span> <br />
          <span className="text-black/90 dark:text-white/50">{t("heading3")} <span className="bg-gradient-to-r from-[#6B7280] via-[#4B5563] to-[#6B7280] dark:from-[#D1D1D6] dark:via-[#FFFFFF] dark:to-[#D1D1D6] text-transparent bg-clip-text drop-shadow-[0_0_8px_rgba(156,163,175,0.4)]">{t("heading4")}</span></span>
        </h2>
        <p className="text-xl text-[#3A3A3C] dark:text-white/40 tracking-tight font-light leading-relaxed max-w-3xl">
          {t("description")}
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-4 gap-4 md:gap-5 auto-rows-[300px]">
        {features.map((feature, i) => {
          // "web" is a wide-but-short card; a full-width bottom band crops the
          // source image's 450x350 ratio into an overly thin, distorted sliver.
          const isWideShortCard = feature.colSpan === "md:col-span-2" && feature.rowSpan === "md:row-span-1";
          const imageContainerClass = isWideShortCard
            ? "absolute right-0 bottom-0 w-[62%] h-[80%] z-0 pointer-events-none"
            : "absolute inset-x-0 bottom-0 h-3/5 z-0 pointer-events-none";
          const imageMask = isWideShortCard
            ? "radial-gradient(130% 130% at 100% 100%, black 30%, transparent 85%)"
            : "linear-gradient(to top, black 5%, transparent 95%)";
          const imageClass = isWideShortCard
            ? "object-cover object-center scale-110 opacity-80 dark:opacity-60 group-hover:scale-[1.18] transition-transform duration-700"
            : "object-cover object-center scale-125 opacity-80 dark:opacity-60 group-hover:scale-[1.35] transition-transform duration-700";

          return (
            <motion.div
              id={feature.id}
              key={i}
              initial={{ opacity: 0, scale: 0.95 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: i * 0.05 }}
              className={`glass-panel p-8 flex flex-col justify-between group cursor-default hover:bg-[#EAEAEF] dark:hover:bg-white/[0.05] transition-all duration-700 ${feature.colSpan} ${feature.rowSpan}`}
            >
              {feature.imageUrl && (
                <div className={imageContainerClass}>
                  <Image
                    src={feature.imageUrl}
                    alt={feature.id}
                    fill
                    sizes="(max-width: 768px) 60vw, 30vw"
                    className={imageClass}
                    style={{ maskImage: imageMask, WebkitMaskImage: imageMask }}
                  />
                </div>
              )}
              <div className="absolute inset-0 bg-gradient-to-b from-transparent via-white/40 dark:via-white/5 to-transparent -translate-y-[200%] group-hover:animate-scan opacity-0 group-hover:opacity-100 transition-all duration-500 rounded-3xl pointer-events-none" />
              <div className="relative z-10 h-full flex flex-col">
                <div className={`w-12 h-12 rounded-[14px] ${feature.iconBg} border flex items-center justify-center mb-6 group-hover:scale-105 transition-transform duration-500`}>
                  {React.cloneElement(feature.icon, { className: `w-6 h-6 ${feature.iconColor}` })}
                </div>
                <div>
                  <h3 className="text-2xl font-bold mb-3 tracking-tight leading-tight text-[#1C1C1E] dark:text-white">{feature.title}</h3>
                  <p className="text-[#3A3A3C] dark:text-white/40 font-normal leading-relaxed text-[15px]">{feature.description}</p>
                </div>
              </div>
            </motion.div>
          );
        })}
      </div>
    </section>
  );
}