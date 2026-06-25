"use client";

import { useEffect, useRef } from "react";
import {
  motion,
  Variants,
  useScroll,
  useTransform,
  useMotionValue,
  useInView,
  animate,
} from "framer-motion";

function CountUp({ to, suffix = "" }: { to: number; suffix?: string }) {
  const count = useMotionValue(0);
  const ref = useRef<HTMLSpanElement>(null);
  const inView = useInView(ref, { once: true, margin: "-10%" });

  useEffect(() => {
    if (!inView) return;
    const controls = animate(count, to, {
      duration: 2,
      ease: "easeOut",
    });
    return controls.stop;
  }, [inView, count, to]);

  return (
    <motion.span ref={ref} className="block text-4xl font-bold text-white mb-1">
      <Counter count={count} suffix={suffix} />
    </motion.span>
  );
}

// Separate component to subscribe to motion value updates
function Counter({ count, suffix }: { count: ReturnType<typeof useMotionValue<number>>; suffix: string }) {
  const rounded = useTransform(count, (v) => `${Math.round(v)}${suffix}`);
  return <motion.span>{rounded}</motion.span>;
}

export default function HeroSection() {
  const { scrollY } = useScroll();
  const backgroundY = useTransform(scrollY, [0, 1000], [0, 250]);

  const scrollToJobs = () => {
    const element = document.getElementById("jobs");
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
    }
  };

  const container: Variants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.15, delayChildren: 0.3 },
    },
  };

  const item: Variants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: "easeOut" } }
  };

  return (
    <motion.section
      initial={{ opacity: 0, y: 40, scale: 0.98 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      transition={{ duration: 0.9, ease: "easeOut", delay: 0.1 }}
      className="relative min-h-[100svh] flex items-end overflow-hidden mt-[-80px] pt-[80px]"
    >
      {/* Background Image & Overlay */}
      <motion.div
        className="absolute inset-x-0 -top-[25vh] h-[125vh] bg-[#0a0a0a]"
        style={{ y: backgroundY }}
      >
        <img
          src="https://images.unsplash.com/photo-1522071820081-009f0129c71c?ixlib=rb-4.0.3&auto=format&fit=crop&w=1920&q=80"
          alt="Equipo de trabajo en Denzo Studios"
          className="w-full h-full object-cover opacity-60"
        />
        <div
          className="absolute inset-0"
          style={{
            background: `
              linear-gradient(to top, rgba(10,10,10,0.95) 0%, rgba(10,10,10,0.45) 55%, rgba(10,10,10,0.15) 100%),
              linear-gradient(to right, rgba(10,10,10,0.7) 0%, transparent 60%)
            `
          }}
        />
      </motion.div>

      {/* Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 w-full pb-16 md:pb-24">
        <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-12">

          <motion.div
            variants={container}
            initial="hidden"
            animate="visible"
            className="flex flex-col items-start max-w-3xl"
          >
            <motion.p variants={item} className="text-[#00AAFF] font-semibold tracking-widest uppercase text-sm mb-5">
              Carreras · Denzo Studios
            </motion.p>
            <motion.h1 variants={item} className="text-5xl sm:text-6xl lg:text-[5rem] font-bold tracking-tight text-white leading-[1.05] mb-6">
              <span className="block">Únete al equipo que</span>
              <span className="block">crea el futuro digital</span>
            </motion.h1>

            <motion.p variants={item} className="text-lg sm:text-xl text-white/70 max-w-xl leading-relaxed mb-8">
              Buscamos personas apasionadas, creativas y comprometidas que quieran crecer profesionalmente junto a nosotros.
            </motion.p>

            <motion.div variants={item} className="flex flex-wrap gap-4">
              <motion.button
                whileHover={{ scale: 1.05, boxShadow: "0 0 16px rgba(255,255,255,0.4)" }}
                whileTap={{ scale: 0.95 }}
                onClick={scrollToJobs}
                className="inline-flex items-center gap-2 px-8 py-4 bg-white text-[#0a0a0a] font-semibold rounded-full transition-colors duration-300 text-[15px]"
              >
                Ver Plazas
                <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M19 14l-7 7m0 0l-7-7m7 7V3" />
                </svg>
              </motion.button>
              <motion.a
                href="#culture"
                whileHover={{ scale: 1.05, backgroundColor: "rgba(255,255,255,0.1)", borderColor: "rgba(255,255,255,0.6)" }}
                whileTap={{ scale: 0.95 }}
                className="inline-flex items-center gap-2 px-8 py-4 bg-transparent text-white/90 border-2 border-white/30 font-semibold rounded-full transition-colors duration-300 text-[15px]"
              >
                Nuestra Cultura
              </motion.a>
            </motion.div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 1, delay: 0.5, ease: "easeOut" }}
            className="hidden md:flex gap-10 pb-4"
          >
            <div>
              <CountUp to={6} />
              <span className="text-sm text-white/50 leading-snug block max-w-[120px]">Plazas<br />disponibles</span>
            </div>
            <div>
              <CountUp to={10} suffix="+" />
              <span className="text-sm text-white/50 leading-snug block max-w-[120px]">Beneficios<br />exclusivos</span>
            </div>
          </motion.div>

        </div>
      </div>
    </motion.section>
  );
}
