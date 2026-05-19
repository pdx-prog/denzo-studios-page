"use client";

import { useLocale } from "next-intl";
import { useRouter, usePathname } from "@/navigation";
import { motion } from "framer-motion";
import { useTranslations } from "next-intl";
import { useTransition } from "react";

export default function LanguageSwitcher() {
    const t = useTranslations("Navbar");
    const locale = useLocale(); // Obtiene el idioma activo ('en' o 'es')
    const router = useRouter();
    const pathname = usePathname();
    const [isPending, startTransition] = useTransition();

    const handleToggle = () => {
        if (isPending) return;
        const nextLocale = locale === "en" ? "es" : "en";

        startTransition(() => {
            // Realiza el reemplazo de ruta en segundo plano
            router.replace(pathname, { locale: nextLocale, scroll: false });
        });
    };

    return (
        <div className={`flex items-center gap-3 select-none transition-opacity duration-300 ${isPending ? 'opacity-50 pointer-events-none' : ''}`}>
            {/* Idioma Inglés */}
            <span
                onClick={() => locale !== "en" && handleToggle()}
                className={`text-[10px] font-extrabold uppercase tracking-[0.2em] transition-opacity duration-300 cursor-pointer ${locale === "en" ? "text-black dark:text-white opacity-100" : "text-black/60 dark:text-white/40 hover:opacity-80"
                    }`}
            >
                {t('en')}
            </span>

            {/* Contenedor del Switch (Estilo pastilla) */}
            <div
                onClick={handleToggle}
                className="relative w-12 h-6 bg-black/10 dark:bg-white/10 rounded-full border border-black/20 dark:border-white/10 p-0.5 cursor-pointer flex items-center transition-colors hover:border-black/30 dark:hover:border-white/20"
            >
                {/* Círculo animado */}
                <motion.div
                    layout
                    transition={{ type: "spring", stiffness: 500, damping: 30 }}
                    className="w-4.5 h-4.5 bg-black/80 dark:bg-white rounded-full shadow-[0_2px_4px_rgba(0,0,0,0.2)]"
                    style={{
                        alignSelf: "center",
                        marginLeft: locale === "en" ? "2px" : "auto",
                        marginRight: locale === "es" ? "2px" : "auto",
                    }}
                />
            </div>

            {/* Idioma Español */}
            <span
                onClick={() => locale !== "es" && handleToggle()}
                className={`text-[10px] font-extrabold uppercase tracking-[0.2em] transition-opacity duration-300 cursor-pointer ${locale === "es" ? "text-black dark:text-white opacity-100" : "text-black/60 dark:text-white/40 hover:opacity-80"
                    }`}
            >
                {t('es')}
            </span>
        </div>
    );
}
