"use client";

import { culturePhotos } from "@/content/jointheteam/culture";
import { motion } from "framer-motion";

export default function CultureSection() {
  return (
    <section id="culture" className="py-24 bg-gray-50 dark:bg-[#0a0a0a] transition-colors duration-300">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          className="text-center max-w-3xl mx-auto mb-16"
        >
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white mb-6">
            Cultura Denzo
          </h2>
          <p className="text-lg text-gray-600 dark:text-gray-400">
            Somos más que una agencia, somos un equipo. Conoce un poco de nuestro día a día, nuestras celebraciones y el ambiente que nos inspira a crear.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6">
          {culturePhotos.map((photo, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className={`relative overflow-hidden rounded-2xl group ${
                index === 0 || index === 3 ? "md:col-span-2 lg:col-span-2 aspect-[16/9]" : "aspect-square"
              }`}
            >
              <img
                src={photo.src}
                alt={photo.alt}
                className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                loading="lazy"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-end">
                <div className="p-6">
                  <span className="text-xs font-semibold uppercase tracking-wider text-violet-300 dark:text-[#00AAFF] mb-2 block">
                    {photo.category}
                  </span>
                  <h4 className="text-white font-medium text-lg">
                    {photo.alt}
                  </h4>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
