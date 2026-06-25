"use client";

import { aboutContent } from "@/content/jointheteam/about";
import { motion } from "framer-motion";
import { Target, Eye, Heart, Sparkles } from "lucide-react";

export default function AboutSection() {
  const containerVariants = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2
      }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 30 },
    show: { opacity: 1, y: 0, transition: { duration: 0.6 } }
  };

  return (
    <section id="about" className="py-24 bg-white dark:bg-[#050505] transition-colors duration-300 relative overflow-hidden">
      {/* Decorative background elements */}
      <div className="absolute top-1/2 left-0 w-64 h-64 bg-violet-100 dark:bg-[#00AAFF]/10 rounded-full blur-[80px] -translate-y-1/2 -translate-x-1/2 pointer-events-none" />
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          className="text-center max-w-3xl mx-auto mb-20"
        >
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white mb-6">
            Acerca de Nosotros
          </h2>
          <p className="text-lg text-gray-600 dark:text-gray-400 leading-relaxed">
            {aboutContent.shortDescription}
          </p>
        </motion.div>

        <motion.div 
          variants={containerVariants}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, margin: "-100px" }}
          className="grid grid-cols-1 md:grid-cols-2 gap-12 lg:gap-20 mb-20"
        >
          {/* History */}
          <motion.div variants={itemVariants} className="space-y-4">
            <div className="inline-flex items-center justify-center p-3 bg-violet-100 dark:bg-white/5 text-violet-600 dark:text-[#00AAFF] rounded-2xl mb-2">
              <Sparkles size={28} />
            </div>
            <h3 className="text-2xl font-bold text-gray-900 dark:text-white">Nuestra Historia</h3>
            <p className="text-gray-600 dark:text-gray-400 leading-relaxed">
              {aboutContent.history}
            </p>
          </motion.div>

          {/* Mission & Vision */}
          <motion.div variants={itemVariants} className="space-y-10">
            <div className="space-y-4 relative">
              <div className="absolute -left-4 top-2 bottom-2 w-1 bg-violet-200 dark:bg-[#00AAFF]/30 rounded-full hidden sm:block" />
              <div className="sm:pl-6">
                <div className="flex items-center gap-3 mb-3 text-gray-900 dark:text-white">
                  <Target className="text-violet-600 dark:text-[#00AAFF]" size={24} />
                  <h3 className="text-xl font-bold">Misión</h3>
                </div>
                <p className="text-gray-600 dark:text-gray-400 leading-relaxed">
                  {aboutContent.mission}
                </p>
              </div>
            </div>
            
            <div className="space-y-4 relative">
              <div className="absolute -left-4 top-2 bottom-2 w-1 bg-violet-200 dark:bg-[#00AAFF]/30 rounded-full hidden sm:block" />
              <div className="sm:pl-6">
                <div className="flex items-center gap-3 mb-3 text-gray-900 dark:text-white">
                  <Eye className="text-violet-600 dark:text-[#00AAFF]" size={24} />
                  <h3 className="text-xl font-bold">Visión</h3>
                </div>
                <p className="text-gray-600 dark:text-gray-400 leading-relaxed">
                  {aboutContent.vision}
                </p>
              </div>
            </div>
          </motion.div>
        </motion.div>

        {/* Values */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.6 }}
          className="bg-gray-50 dark:bg-[#111111] rounded-3xl p-8 md:p-12 border border-gray-100 dark:border-white/5"
        >
          <div className="flex items-center gap-4 mb-8">
            <div className="p-3 bg-violet-100 dark:bg-[#00AAFF]/20 text-violet-600 dark:text-[#00AAFF] rounded-xl">
              <Heart size={28} />
            </div>
            <h3 className="text-2xl font-bold text-gray-900 dark:text-white">Nuestros Valores</h3>
          </div>
          
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
            {aboutContent.values.map((value, index) => (
              <div key={index} className="space-y-2">
                <div className="text-xl font-semibold text-gray-900 dark:text-white flex items-center gap-2">
                  <span className="w-8 h-8 rounded-full bg-violet-100 dark:bg-white/5 text-violet-600 dark:text-[#00AAFF] flex items-center justify-center text-sm">
                    {index + 1}
                  </span>
                  {value.name}
                </div>
                <p className="text-gray-600 dark:text-gray-400 text-sm">
                  {value.description}
                </p>
              </div>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
}
