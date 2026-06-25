"use client";

import { motion } from "framer-motion";

export default function HeroSection() {
  const scrollToJobs = () => {
    const element = document.getElementById("jobs");
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <section className="relative min-h-[90vh] flex items-center bg-white dark:bg-[#050505] transition-colors duration-300 overflow-hidden">
      {/* Background accents */}
      <div className="absolute top-0 right-0 w-1/2 h-full bg-gradient-to-l from-violet-50 to-transparent dark:from-[#00AAFF]/5 dark:to-transparent pointer-events-none" />
      <div className="absolute -top-40 -right-40 w-96 h-96 bg-violet-200 dark:bg-[#00AAFF]/20 rounded-full blur-[100px] pointer-events-none opacity-50 dark:opacity-30" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 w-full py-20">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
            className="flex flex-col items-start space-y-8"
          >
            <h1 className="text-5xl sm:text-6xl lg:text-7xl font-bold tracking-tight text-gray-900 dark:text-white">
              Únete al equipo de <br className="hidden sm:block" />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-violet-600 to-indigo-600 dark:from-[#00AAFF] dark:to-blue-500">
                Denzo Studios
              </span>
            </h1>
            
            <p className="text-xl sm:text-2xl text-gray-600 dark:text-gray-300 max-w-lg leading-relaxed">
              Buscamos personas apasionadas, creativas y comprometidas que quieran crecer profesionalmente junto a nosotros.
            </p>
            
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={scrollToJobs}
              className="px-8 py-4 bg-violet-600 hover:bg-violet-700 dark:bg-transparent dark:hover:bg-[#00AAFF]/10 text-white dark:text-[#00AAFF] font-semibold rounded-full shadow-lg shadow-violet-500/30 dark:shadow-none dark:border-2 dark:border-[#00AAFF] transition-all duration-300 text-lg group"
            >
              <span className="flex items-center gap-2">
                Ver Plazas
                <svg className="w-5 h-5 group-hover:translate-y-1 transition-transform" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 14l-7 7m0 0l-7-7m7 7V3" />
                </svg>
              </span>
            </motion.button>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 1, delay: 0.2, ease: "easeOut" }}
            className="relative hidden lg:block"
          >
            <div className="aspect-[4/3] rounded-3xl overflow-hidden shadow-2xl relative">
              <div className="absolute inset-0 bg-gradient-to-tr from-violet-500/20 to-transparent dark:from-[#00AAFF]/20 mix-blend-overlay z-10" />
              <img
                src="https://images.unsplash.com/photo-1522071820081-009f0129c71c?ixlib=rb-4.0.3&auto=format&fit=crop&w=1200&q=80"
                alt="Equipo de trabajo en Denzo Studios"
                className="object-cover w-full h-full"
              />
            </div>
            {/* Decorative elements */}
            <div className="absolute -bottom-6 -left-6 w-24 h-24 bg-dots-pattern opacity-20" />
          </motion.div>
        </div>
      </div>
    </section>
  );
}
