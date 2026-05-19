"use client";

import { Sparkles, Mail, Phone, MapPin } from "lucide-react";
import { useTranslations } from "next-intl";

export default function Footer() {
  const t = useTranslations("Home.Footer");

  return (
    <footer className="pt-24 md:pt-40 pb-16 px-4 sm:px-6 lg:px-8 border-t border-black/5 dark:border-white/5 bg-white dark:bg-black/50 backdrop-blur-3xl">
      <div className="absolute inset-0 bg-gradient-to-t from-neon-purple/5 to-transparent pointer-events-none" />

      <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-16 relative z-10">

        <div className="lg:col-span-1">
          <a href="/" className="flex items-center mb-8 focus:outline-none focus-visible:ring-2 focus-visible:ring-neon-cyan rounded-md group">
            <div className="relative flex items-center justify-center">
              <img src="/logo.png" alt="Denzo Studios Logo" className="h-[72px] md:h-[88px] w-auto object-contain transition-all duration-300 dark:opacity-0 group-hover:scale-105" />
              <div className="absolute inset-0 bg-gradient-to-r from-[#007AFF] to-[#7AB6FF] [mask-image:url(/logo.png)] [mask-size:contain] [mask-repeat:no-repeat] [mask-position:center] [-webkit-mask-image:url(/logo.png)] [-webkit-mask-size:contain] [-webkit-mask-repeat:no-repeat] [-webkit-mask-position:center] transition-all duration-300 opacity-0 dark:opacity-100 group-hover:scale-105" />
            </div>
          </a>
          <p className="text-black/80 dark:text-white/40 max-w-sm font-light leading-relaxed text-sm">
            {t("tagline")}
          </p>
        </div>

        <div>
          <h4 className="font-bold text-black dark:text-white text-sm uppercase tracking-[0.2em] mb-8">{t("services")}</h4>
          <div className="flex flex-col gap-4 text-sm">
            <a href="#ads" className="text-black/80 dark:text-white/40 hover:text-black dark:hover:text-white transition-colors">{t("link_ads")}</a>
            <a href="#seo" className="text-black/80 dark:text-white/40 hover:text-black dark:hover:text-white transition-colors">{t("link_seo")}</a>
            <a href="#ai" className="text-black/80 dark:text-white/40 hover:text-black dark:hover:text-white transition-colors">{t("link_ai")}</a>
            <a href="#web" className="text-black/80 dark:text-white/40 hover:text-black dark:hover:text-white transition-colors">{t("link_web")}</a>
          </div>
        </div>

        <div>
          <h4 className="font-bold text-black dark:text-white text-sm uppercase tracking-[0.2em] mb-8">{t("company")}</h4>
          <div className="flex flex-col gap-4 text-sm">
            <a href="/about-us" className="text-black/80 dark:text-white/40 hover:text-black dark:hover:text-white transition-colors">{t("link_about")}</a>
            <a href="#" className="text-black/80 dark:text-white/40 hover:text-black dark:hover:text-white transition-colors">{t("link_careers")}</a>
            <a href="#" className="text-black/80 dark:text-white/40 hover:text-black dark:hover:text-white transition-colors">{t("link_privacy")}</a>
            <a href="#" className="text-black/80 dark:text-white/40 hover:text-black dark:hover:text-white transition-colors">{t("link_terms")}</a>
          </div>
        </div>

        <div>
          <h4 className="font-bold text-black dark:text-white text-sm uppercase tracking-[0.2em] mb-8">{t("contact")}</h4>
          <div className="flex flex-col gap-4 text-sm text-black/80 dark:text-white/40">
            <a href="tel:8332002676" className="flex items-center gap-3 hover:text-black dark:hover:text-white transition-colors">
              <Phone className="w-4 h-4 text-neon-cyan" />
              833-200-2676
            </a>
            <div className="flex items-center gap-3">
              <Mail className="w-4 h-4 text-neon-purple" />
              contact@denzostudiospro.com
            </div>
            <div className="flex items-center gap-3 italic">
              {t("bilingual")}
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto mt-32 pt-10 border-t border-black/5 dark:border-white/5 flex flex-col md:flex-row justify-between items-center text-[10px] text-black/40 dark:text-white/20 uppercase tracking-[0.3em] font-bold">
        <p>&copy; {new Date().getFullYear()} Denzo Studios. {t("copyright")}</p>
        <p className="mt-4 md:mt-0">{t("footer_tag")}</p>
      </div>
    </footer>
  );
}
