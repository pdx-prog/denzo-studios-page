"use client";

import { useEffect, useRef, useState } from "react";
import { motion } from "framer-motion";
import { useTranslations } from "next-intl";
import { useTheme } from "next-themes";

export default function Hero() {
  const t = useTranslations("Home.Hero");
  const sectionRef = useRef<HTMLElement>(null);
  const { resolvedTheme } = useTheme();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  const isLight = mounted && resolvedTheme === "light";
  const videoSrc = isLight ? "/videos/herovideoblanco.mp4" : "/videos/herovideo.webm";

  useEffect(() => {
    const el = sectionRef.current;
    if (!el) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          window.dispatchEvent(new CustomEvent("videoSectionEnter"));
        } else if (entry.boundingClientRect.top < 0) {
          window.dispatchEvent(new CustomEvent("videoSectionLeave"));
        } else {
          window.dispatchEvent(new CustomEvent("videoSectionLeaveBack"));
        }
      },
      { threshold: 0 }
    );

    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  return (
    <section
      ref={sectionRef}
      className="relative w-full bg-background pt-20"
    >
      {/* Mobile/tablet: no video asset yet, just the centered title */}
      <div className="lg:hidden flex flex-col items-center justify-center text-center px-4 py-20 min-h-[60vh]">
        <div className="mb-4 inline-flex items-center gap-2 px-4 py-1.5 rounded-full border border-black/10 dark:border-white/10 bg-black/3 dark:bg-white/3 backdrop-blur-2xl">
          <div className="w-1.5 h-1.5 rounded-full bg-[#007AFF] shadow-[0_0_10px_#007AFF]" />
          <span className="text-[9px] font-bold tracking-[0.4em] uppercase bg-linear-to-r from-[#007AFF] to-[#7AB6FF] text-transparent bg-clip-text">
            {t("badge")}
          </span>
        </div>

        <h1 className="text-5xl sm:text-6xl font-bold tracking-tighter leading-[0.95]">
          <span className="bg-linear-to-r from-[#007AFF] via-[#BF5AF2] to-[#FF9500] text-transparent bg-clip-text">
            {t("headline1")}
          </span>{" "}
          <span className="text-black dark:text-white">{t("headline2")}</span>
        </h1>
      </div>

      {/* Desktop: video hero */}
      <div className="hidden lg:block relative aspect-video min-h-[calc(100vh-5rem)] w-full overflow-hidden bg-black">
        <video
          key={videoSrc}
          autoPlay
          muted
          playsInline
          className="absolute inset-0 h-full w-full object-cover"
          src={videoSrc}
        />
        {!isLight && (
          <div className="absolute inset-0 bg-linear-to-t from-black/70 via-black/10 to-black/40" />
        )}

        <motion.div
          initial={{ opacity: 0, y: 60 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
          className="absolute top-0 inset-x-0 z-20 pt-24 md:pt-28 px-4 text-center"
        >
          <div className="mb-4 inline-flex items-center gap-2 px-4 py-1.5 rounded-full border border-white/15 bg-white/5 backdrop-blur-2xl">
            <div className="w-1.5 h-1.5 rounded-full bg-[#007AFF] shadow-[0_0_10px_#007AFF]" />
            <span className="text-[9px] font-bold tracking-[0.4em] uppercase bg-gradient-to-r from-[#007AFF] to-[#7AB6FF] text-transparent bg-clip-text">
              {t("badge")}
            </span>
          </div>

          <h1 className="text-3xl md:text-5xl lg:text-6xl font-bold tracking-tighter leading-[0.95] drop-shadow-lg">
            <span className="bg-gradient-to-r from-[#007AFF] via-[#BF5AF2] to-[#FF9500] text-transparent bg-clip-text">
              {t("headline1")}
            </span>{" "}
            <span className="text-black dark:text-white">{t("headline2")}</span>
          </h1>
        </motion.div>
      </div>
    </section>
  );
}
