"use client";

import { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Sparkles, Phone, ChevronDown, Search, BrainCircuit, PhoneCall, Palette, Code2, Menu, X, Globe } from "lucide-react";
import { ThemeToggle } from "./ThemeToggle";
import { useTranslations } from "next-intl";
import { Link } from "@/navigation";
import LanguageSwitcher from "./LanguajeSwitcher";



export default function Navbar() {
  const t = useTranslations("Navbar");
  const links = [
    { name: t("home"), href: "/" },
    {
      name: t("services"),
      href: "/#services",
      subServices: [
        { name: t("ga"), href: "/services/google-ads", icon: Sparkles, color: "text-neon-purple" },
        { name: t("meta"), href: "/services/meta-ads", icon: Globe, color: "text-neon-pink" },
        { name: t("so"), href: "/services/seo", icon: Search, color: "text-[#34C759]" },
        { name: t("aid"), href: "/services/ai-development", icon: BrainCircuit, color: "text-neon-cyan" },
        { name: t("cc"), href: "/services/call-center", icon: PhoneCall, color: "text-[#FF6B35]" },
        { name: t("gd"), href: "/services/graphic-design", icon: Palette, color: "text-[#FF2D9B]" },
        { name: t("wd"), href: "/services/website-development", icon: Code2, color: "text-[#4F46E5]" },
      ]
    },
    { name: t("aboutUs"), href: "/about-us" },
    { name: t("contact"), href: "/contact" },
  ];

  const [isServicesOpen, setIsServicesOpen] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [isVisible, setIsVisible] = useState(true);
  const lastScrollY = useRef(0);
  // Once scroll passes the hero going down, the navbar should stay visible
  // no matter what — only re-arm the hide-on-scroll-down behavior if the
  // user scrolls back up into the hero section.
  const belowHero = useRef(false);

  useEffect(() => {
    const handleEnter = () => {
      belowHero.current = false;
    };
    const handleLeave = () => {
      belowHero.current = true;
      setIsVisible(true);
    };
    const handleLeaveBack = () => {
      belowHero.current = false;
    };

    window.addEventListener('videoSectionEnter', handleEnter);
    window.addEventListener('videoSectionLeave', handleLeave);
    window.addEventListener('videoSectionLeaveBack', handleLeaveBack);

    const handleScroll = () => {
      const currentScrollY = window.scrollY;

      setScrolled(currentScrollY > 20);

      if (belowHero.current) {
        setIsVisible(true); // Ya pasamos el hero: siempre visible
      } else if (currentScrollY > lastScrollY.current && currentScrollY > 100) {
        setIsVisible(false); // Ocultar al hacer scroll hacia abajo (dentro del hero)
      } else {
        setIsVisible(true);  // Mostrar al hacer scroll hacia arriba o al tope
      }

      lastScrollY.current = currentScrollY;
    };
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => {
      window.removeEventListener("scroll", handleScroll);
      window.removeEventListener('videoSectionEnter', handleEnter);
      window.removeEventListener('videoSectionLeave', handleLeave);
      window.removeEventListener('videoSectionLeaveBack', handleLeaveBack);
    };
  }, []);

  const toggleMobileMenu = () => setIsMobileMenuOpen(!isMobileMenuOpen);

  return (
    <header className="z-[100]">
      <motion.nav
        initial={{ opacity: 0, filter: "blur(12px)" }}
        animate={{
          opacity: isVisible || isMobileMenuOpen ? 1 : 0.35,
          filter: isVisible || isMobileMenuOpen ? "blur(0px)" : "blur(10px)",
        }}
        transition={{ duration: 0.5, ease: [0.25, 0.1, 0.25, 1] }}
        style={{ pointerEvents: isVisible || isMobileMenuOpen ? "auto" : "none" }}
        className={`fixed top-0 left-0 w-full z-[100] px-4 py-3 sm:px-6 lg:px-8 flex justify-between items-center transition-colors duration-500 ${
          isMobileMenuOpen
            ? "bg-white dark:bg-black/90 backdrop-blur-2xl border-b border-black/10 dark:border-white/10"
            : !isVisible
            ? "bg-transparent border-transparent"
            : scrolled
            ? "bg-white/40 dark:bg-black/30 backdrop-blur-2xl border-b border-black/10 dark:border-white/10"
            : "bg-transparent"
        }`}
      >
        {/* Logo */}
        <Link href="/" className="flex items-center relative z-50 focus:outline-none focus-visible:ring-2 focus-visible:ring-neon-cyan rounded-md group">
          <div className="relative h-11 md:h-14 flex items-center justify-center">
            <img src="/logo.png" alt="Denzo Studios Logo" className="h-12 md:h-16 w-auto object-contain transition-all duration-300 dark:opacity-0 group-hover:scale-105" />
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 h-12 md:h-16 aspect-505/178 bg-gradient-to-r from-[#007AFF] to-[#7AB6FF] [mask-image:url(/logo.png)] [mask-size:contain] [mask-repeat:no-repeat] [mask-position:center] [-webkit-mask-image:url(/logo.png)] [-webkit-mask-size:contain] [-webkit-mask-repeat:no-repeat] [-webkit-mask-position:center] transition-all duration-300 opacity-0 dark:opacity-100 group-hover:scale-105" />
          </div>
        </Link>

        {/* Desktop Links */}
        <div className="hidden lg:flex items-center gap-8 text-[10px] font-bold text-black/80 dark:text-white/60 uppercase tracking-[0.2em]">
          {links.map((link) => (
            <div
              key={link.name}
              className="relative group py-2"
              onMouseEnter={() => link.subServices && setIsServicesOpen(true)}
              onMouseLeave={() => link.subServices && setIsServicesOpen(false)}
            >
              <a
                href={link.href}
                className="hover:text-black dark:hover:text-white transition-colors flex items-center gap-1"
              >
                {link.name}
                {link.subServices && (
                  <ChevronDown className={`w-3 h-3 transition-transform duration-300 ${isServicesOpen ? 'rotate-180' : ''}`} />
                )}
              </a>

              {link.subServices && (
                <AnimatePresence>
                  {isServicesOpen && (
                    <motion.div
                      initial={{ opacity: 0, y: 10, scale: 0.95 }}
                      animate={{ opacity: 1, y: 0, scale: 1 }}
                      exit={{ opacity: 0, y: 10, scale: 0.95 }}
                      transition={{ duration: 0.2, ease: "easeOut" }}
                      className="absolute top-full left-1/2 -translate-x-1/2 mt-2 w-[550px] bg-white dark:bg-black/95 backdrop-blur-3xl border border-black/10 dark:border-white/10 rounded-3xl overflow-hidden p-6 shadow-[0_20px_50px_rgba(0,0,0,0.5)]"
                    >
                      <div className="grid grid-cols-3 gap-4">
                        {link.subServices.map((sub) => (
                          <Link
                            key={sub.name}
                            href={sub.href}
                            className="p-4 rounded-2xl hover:bg-black/5 dark:hover:bg-white/5 transition-all text-black/80 dark:text-white/50 hover:text-black dark:hover:text-white flex flex-col gap-3 group/item border border-transparent hover:border-black/10 dark:hover:border-white/10"
                          >
                            <motion.div
                              whileHover={{ scale: 1.1, rotate: 5 }}
                              className={`w-10 h-10 rounded-xl bg-black/5 dark:bg-white/5 flex items-center justify-center transition-all group-hover/item:bg-black/10 dark:group-hover/item:bg-white/10 ${sub.color}`}
                            >
                              <sub.icon className="w-5 h-5 group-hover/item:drop-shadow-[0_0_8px_currentColor]" />
                            </motion.div>
                            <span className="text-[10px] tracking-widest font-bold uppercase leading-tight">{sub.name}</span>
                          </Link>
                        ))}
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              )}
            </div>
          ))}
        </div>

        {/* Right Actions */}
        <div className="flex items-center gap-4 relative z-50">
          <LanguageSwitcher />
          <ThemeToggle />
          <Link href="tel:8332002676" className="hidden md:flex items-center gap-2 text-black/90 dark:text-white/70 hover:text-black dark:hover:text-white transition-colors text-sm">
            <Phone className="w-4 h-4 text-neon-cyan" />
            833-200-2676
          </Link>
          <Link
            href="tel:8332002676"
            className="text-[10px] font-bold uppercase tracking-widest bg-white text-black hover:bg-white/90 px-6 py-2.5 rounded-full transition-all active:scale-95 shadow-[0_0_20px_rgba(0,0,0,0.1)]"
          >
            Call Now
          </Link>

          {/* Mobile Menu Toggle */}
          <button
            onClick={toggleMobileMenu}
            className="lg:hidden w-10 h-10 flex flex-col items-center justify-center gap-1.5 focus:outline-none"
          >
            <motion.span
              animate={{ rotate: isMobileMenuOpen ? 45 : 0, y: isMobileMenuOpen ? 7.5 : 0 }}
              className="w-6 h-0.5 bg-black dark:bg-white rounded-full transition-colors duration-300"
            />
            <motion.span
              animate={{ opacity: isMobileMenuOpen ? 0 : 1 }}
              className="w-6 h-0.5 bg-black dark:bg-white rounded-full transition-colors duration-300"
            />
            <motion.span
              animate={{ rotate: isMobileMenuOpen ? -45 : 0, y: isMobileMenuOpen ? -7.5 : 0 }}
              className="w-6 h-0.5 bg-black dark:bg-white rounded-full transition-colors duration-300"
            />
          </button>
        </div>
      </motion.nav>

      {/* Mobile Menu Overlay */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, x: "100%" }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: "100%" }}
            transition={{ type: "spring", damping: 25, stiffness: 200 }}
            className="fixed inset-0 z-40 bg-white dark:bg-black pt-24 px-6 lg:hidden overflow-y-auto"
          >
            <div className="flex flex-col gap-8 pb-12">
              {links.map((link) => (
                <div key={link.name} className="flex flex-col gap-6">
                  <Link
                    href={link.href}
                    onClick={() => !link.subServices && setIsMobileMenuOpen(false)}
                    className="text-3xl font-bold tracking-tighter hover:text-neon-cyan transition-colors"
                  >
                    {link.name}
                  </Link>

                  {link.subServices && (
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 ml-4">
                      {link.subServices.map((sub) => (
                        <Link
                          key={sub.name}
                          href={sub.href}
                          onClick={() => setIsMobileMenuOpen(false)}
                          className="flex items-center gap-4 p-4 rounded-2xl bg-black/5 dark:bg-white/5 border border-black/5 dark:border-white/5"
                        >
                          <div className={`w-10 h-10 rounded-xl bg-black/5 dark:bg-white/5 flex items-center justify-center ${sub.color}`}>
                            <sub.icon className="w-5 h-5" />
                          </div>
                          <span className="text-xs font-bold uppercase tracking-widest">{sub.name}</span>
                        </Link>
                      ))}
                    </div>
                  )}
                </div>
              ))}

              <div className="mt-8 pt-8 border-t border-black/10 dark:border-white/10 flex flex-col gap-6">
                <Link href="tel:8332002676" className="flex items-center gap-4 text-2xl font-bold tracking-tight">
                  <Phone className="w-6 h-6 text-neon-cyan" />
                  833-200-2676
                </Link>
                <LanguageSwitcher />
                <ThemeToggle />
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}
