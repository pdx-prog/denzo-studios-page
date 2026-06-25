"use client";

import { useState } from "react";
import { jobs } from "@/content/jointheteam/jobs";
import { PenTool, Briefcase, Video, Code, Layout, Megaphone } from "lucide-react";
import { motion } from "framer-motion";
import ApplicationModal from "@/components/jointheteam/ApplicationModal";

const iconMap = {
  PenTool: <PenTool size={24} />,
  Briefcase: <Briefcase size={24} />,
  Video: <Video size={24} />,
  Code: <Code size={24} />,
  Layout: <Layout size={24} />,
  Megaphone: <Megaphone size={24} />,
};

export default function JobsSection() {
  const [selectedJob, setSelectedJob] = useState<string | null>(null);
  
  const handleApplyClick = (jobTitle: string) => {
    setSelectedJob(jobTitle);
  };

  const closeModal = () => {
    setSelectedJob(null);
  };

  const containerVariants = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1
      }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    show: { opacity: 1, y: 0, transition: { type: "spring" as any, stiffness: 300, damping: 24 } }
  };

  return (
    <section id="jobs" className="py-24 bg-gray-50 dark:bg-[#0a0a0a] transition-colors duration-300">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <motion.h2 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white mb-4"
          >
            Plazas y Pasantías Disponibles
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ delay: 0.1 }}
            className="text-lg text-gray-600 dark:text-gray-400"
          >
            Explora las oportunidades que tenemos para ti. Selecciona la plaza que mejor se adapte a tu perfil y aplica hoy mismo.
          </motion.p>
        </div>

        <motion.div 
          variants={containerVariants}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, margin: "-100px" }}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
        >
          {jobs.map((job) => (
            <motion.div
              key={job.id}
              variants={itemVariants}
              whileHover={{ y: -5 }}
              className="bg-white dark:bg-[#111111] rounded-2xl p-8 shadow-sm hover:shadow-xl dark:shadow-none border border-gray-100 dark:border-white/10 hover:border-violet-300 dark:hover:border-[#00AAFF]/50 transition-all duration-300 flex flex-col h-full group relative overflow-hidden"
            >
              {/* Glow effect on dark mode hover */}
              <div className="absolute inset-0 bg-gradient-to-br from-[#00AAFF]/0 to-[#00AAFF]/0 group-hover:dark:from-[#00AAFF]/5 group-hover:dark:to-transparent transition-all duration-500 pointer-events-none" />
              
              <div className="flex justify-between items-start mb-6 relative z-10">
                <div className="p-3 bg-violet-50 dark:bg-white/5 text-violet-600 dark:text-[#00AAFF] rounded-xl group-hover:scale-110 transition-transform duration-300">
                  {iconMap[job.iconName]}
                </div>
                <span className={`px-3 py-1 text-xs font-semibold rounded-full ${
                  job.type === "Plaza" 
                    ? "bg-blue-50 text-blue-700 dark:bg-blue-900/30 dark:text-blue-300 border border-blue-100 dark:border-blue-800/50" 
                    : "bg-green-50 text-green-700 dark:bg-green-900/30 dark:text-green-300 border border-green-100 dark:border-green-800/50"
                }`}>
                  {job.type}
                </span>
              </div>
              
              <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-3 relative z-10">{job.title}</h3>
              <p className="text-gray-600 dark:text-gray-400 flex-grow mb-8 relative z-10">{job.description}</p>
              
              <button
                onClick={() => handleApplyClick(job.title)}
                className="w-full py-3 px-4 bg-gray-50 hover:bg-violet-600 dark:bg-white/5 dark:hover:bg-[#00AAFF] text-gray-900 hover:text-white dark:text-white font-medium rounded-xl transition-colors duration-300 relative z-10"
              >
                Aplicar
              </button>
            </motion.div>
          ))}
        </motion.div>
      </div>

      <ApplicationModal 
        isOpen={!!selectedJob} 
        onClose={closeModal} 
        selectedJob={selectedJob || ""} 
      />
    </section>
  );
}
