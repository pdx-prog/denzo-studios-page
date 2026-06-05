"use client";

import React, { useRef } from "react";
import Image from "next/image";
import { Plus, ChevronLeft, ChevronRight } from "lucide-react";
import { useTranslations } from "next-intl";

export default function Cards() {
  const tBento = useTranslations("Home.BentoGrid");
  const tCards = useTranslations("Home.Cards");
  const scrollContainerRef = useRef<HTMLDivElement>(null);

  const scrollLeft = () => {
    if (scrollContainerRef.current) {
      scrollContainerRef.current.scrollBy({ left: -450, behavior: "smooth" });
    }
  };

  const scrollRight = () => {
    if (scrollContainerRef.current) {
      scrollContainerRef.current.scrollBy({ left: 450, behavior: "smooth" });
    }
  };

  const cards = [
    {
      id: "ai",
      kicker: tCards("kicker_ai"),
      title: tBento("ai_title"),
      description: tBento("ai_desc"),
      image: "/images/services/ai_dev.png",
    },
    {
      id: "ads",
      kicker: tCards("kicker_ads"),
      title: tBento("ads_title"),
      description: tBento("ads_desc"),
      image: "/images/services/ads_performance.png",
    },
    {
      id: "seo",
      kicker: tCards("kicker_seo"),
      title: tBento("seo_title"),
      description: tBento("seo_desc"),
      image: "/images/services/seo_search.png",
    },
    {
      id: "web",
      kicker: tCards("kicker_web"),
      title: tBento("web_title"),
      description: tBento("web_desc"),
      image: "/images/services/web_dev.png",
    },
    {
      id: "design",
      kicker: tCards("kicker_design"),
      title: tBento("design_title"),
      description: tBento("design_desc"),
      image: "/images/services/graphic_design.png",
    },
    {
      id: "callcenter",
      kicker: tCards("kicker_callcenter"),
      title: tBento("callcenter_title"),
      description: tBento("callcenter_desc"),
      image: "/images/services/call_center.png",
    },
  ];

  return (
    <section className="py-24 overflow-hidden relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-12 flex flex-col md:flex-row md:items-end justify-between gap-6 text-center md:text-left">
         <h2 className="text-4xl md:text-6xl font-bold tracking-tight text-black dark:text-white">
           {tCards("title")} <span className="bg-gradient-to-r from-[#007AFF] to-[#3395FF] text-transparent bg-clip-text">{tCards("title_highlight")}</span>
         </h2>
         
         {/* Navigation Buttons (Desktop) */}
         <div className="hidden md:flex items-center gap-3">
           <button 
             onClick={scrollLeft}
             className="w-12 h-12 rounded-full bg-zinc-100 dark:bg-zinc-800 flex items-center justify-center hover:bg-zinc-200 dark:hover:bg-zinc-700 transition-colors"
             aria-label="Anterior"
           >
             <ChevronLeft className="w-6 h-6 text-zinc-600 dark:text-zinc-300" />
           </button>
           <button 
             onClick={scrollRight}
             className="w-12 h-12 rounded-full bg-zinc-100 dark:bg-zinc-800 flex items-center justify-center hover:bg-zinc-200 dark:hover:bg-zinc-700 transition-colors"
             aria-label="Siguiente"
           >
             <ChevronRight className="w-6 h-6 text-zinc-600 dark:text-zinc-300" />
           </button>
         </div>
      </div>

      <div 
        ref={scrollContainerRef}
        className="flex overflow-x-auto snap-x snap-mandatory hide-scrollbar gap-6 pb-8 w-full scroll-smooth" 
        style={{ 
          paddingLeft: 'max(1rem, calc((100vw - 80rem) / 2))', 
          paddingRight: 'max(1rem, calc((100vw - 80rem) / 2))' 
        }}
      >
        {cards.map((card, i) => (
          <div 
            key={i} 
            className="snap-center shrink-0 w-[85vw] sm:w-[400px] md:w-[450px] h-[550px] rounded-[2rem] p-8 md:p-10 flex flex-col relative overflow-hidden bg-[#F5F5F7] dark:bg-[#1C1C1E] border border-zinc-200/50 dark:border-white/5 group hover:shadow-xl transition-all duration-500"
          >
            {/* Top: Text Content */}
            <div className="relative z-10 flex flex-col gap-2 h-1/2">
              <span className="text-sm font-semibold tracking-wide uppercase text-[#86868B] dark:text-[#98989D]">
                {card.kicker}
              </span>
              <h3 className="text-3xl md:text-4xl font-bold text-[#1D1D1F] dark:text-[#F5F5F7] tracking-tight leading-tight line-clamp-2">
                {card.title}
              </h3>
              <p className="text-[#86868B] dark:text-[#A1A1A6] mt-2 font-medium text-[17px] max-w-[95%] leading-relaxed line-clamp-3">
                {card.description}
              </p>
            </div>

            {/* Bottom: Image Container */}
            <div className="relative z-0 h-1/2 w-full mt-auto flex items-end justify-center group-hover:scale-105 transition-transform duration-700">
              <Image 
                src={card.image} 
                alt={card.title} 
                fill
                className="object-contain object-bottom drop-shadow-2xl"
                priority={i < 2}
              />
            </div>

            {/* Plus Button */}
            {/* <button className="absolute bottom-6 right-6 w-10 h-10 rounded-full bg-black/5 dark:bg-white/10 flex items-center justify-center backdrop-blur-md hover:bg-black/10 dark:hover:bg-white/20 transition-colors z-20">
              <Plus className="w-5 h-5 text-[#1D1D1F] dark:text-white" />
            </button> */}
          </div>
        ))}
      </div>
      
      {/* Mobile Navigation Buttons */}
      <div className="flex md:hidden items-center justify-center gap-4 mt-6">
           <button 
             onClick={scrollLeft}
             className="w-12 h-12 rounded-full bg-zinc-100 dark:bg-zinc-800 flex items-center justify-center hover:bg-zinc-200 dark:hover:bg-zinc-700 transition-colors"
           >
             <ChevronLeft className="w-6 h-6 text-zinc-600 dark:text-zinc-300" />
           </button>
           <button 
             onClick={scrollRight}
             className="w-12 h-12 rounded-full bg-zinc-100 dark:bg-zinc-800 flex items-center justify-center hover:bg-zinc-200 dark:hover:bg-zinc-700 transition-colors"
           >
             <ChevronRight className="w-6 h-6 text-zinc-600 dark:text-zinc-300" />
           </button>
      </div>

      {/* CSS to hide scrollbar but keep functionality */}
      <style dangerouslySetInnerHTML={{__html: `
        .hide-scrollbar::-webkit-scrollbar {
          display: none;
        }
        .hide-scrollbar {
          -ms-overflow-style: none;
          scrollbar-width: none;
        }
      `}} />
    </section>
  );
}