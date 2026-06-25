"use client";

import { useState, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X, Upload, CheckCircle, Loader2 } from "lucide-react";

interface ApplicationModalProps {
  isOpen: boolean;
  onClose: () => void;
  selectedJob: string;
}

export default function ApplicationModal({ isOpen, onClose, selectedJob }: ApplicationModalProps) {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [errorMsg, setErrorMsg] = useState("");
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [fileName, setFileName] = useState("");

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      setFileName(e.target.files[0].name);
    }
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsSubmitting(true);
    setErrorMsg("");

    const formData = new FormData(e.currentTarget);
    formData.append("plaza_seleccionada", selectedJob);

    try {
      const response = await fetch("/api/apply", {
        method: "POST",
        body: formData,
      });

      const result = await response.json();

      if (!response.ok) {
        throw new Error(result.error || "Hubo un error al enviar tu aplicación.");
      }

      setIsSuccess(true);
      setTimeout(() => {
        setIsSuccess(false);
        onClose();
        setFileName("");
      }, 3000);
    } catch (err: any) {
      setErrorMsg(err.message);
    } finally {
      setIsSubmitting(false);
    }
  };

  if (!isOpen) return null;

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 sm:p-6">
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={onClose}
          className="absolute inset-0 bg-black/40 dark:bg-black/80 backdrop-blur-sm"
        />
        
        <motion.div
          initial={{ opacity: 0, scale: 0.95, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.95, y: 20 }}
          className="relative w-full max-w-2xl bg-white dark:bg-[#111111] rounded-3xl shadow-2xl overflow-hidden max-h-[90vh] flex flex-col border border-gray-100 dark:border-white/10"
        >
          <div className="px-6 py-4 border-b border-gray-100 dark:border-white/10 flex justify-between items-center bg-gray-50/50 dark:bg-white/5">
            <h3 className="text-xl font-bold text-gray-900 dark:text-white">Aplicación de Ingreso</h3>
            <button
              onClick={onClose}
              className="p-2 rounded-full text-gray-500 hover:bg-gray-200 dark:text-gray-400 dark:hover:bg-white/10 transition-colors"
            >
              <X size={20} />
            </button>
          </div>

          <div className="p-6 overflow-y-auto custom-scrollbar">
            {isSuccess ? (
              <motion.div 
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                className="flex flex-col items-center justify-center py-12 text-center"
              >
                <div className="w-16 h-16 bg-green-100 dark:bg-green-900/30 rounded-full flex items-center justify-center mb-6 text-green-600 dark:text-green-400">
                  <CheckCircle size={32} />
                </div>
                <h4 className="text-2xl font-bold text-gray-900 dark:text-white mb-2">¡Aplicación Enviada!</h4>
                <p className="text-gray-600 dark:text-gray-400">Hemos recibido tu información con éxito. Nos pondremos en contacto contigo pronto.</p>
              </motion.div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-5">
                {errorMsg && (
                  <div className="p-4 bg-red-50 dark:bg-red-900/20 text-red-600 dark:text-red-400 rounded-xl text-sm border border-red-200 dark:border-red-900/50">
                    {errorMsg}
                  </div>
                )}
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Plaza Seleccionada</label>
                  <input
                    type="text"
                    readOnly
                    value={selectedJob}
                    className="w-full px-4 py-3 rounded-xl bg-gray-100 dark:bg-white/5 border-transparent text-gray-500 dark:text-gray-400 cursor-not-allowed outline-none"
                  />
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Nombre Completo *</label>
                    <input
                      required
                      type="text"
                      name="nombre_completo"
                      placeholder="Juan Pérez"
                      className="w-full px-4 py-3 rounded-xl bg-white dark:bg-[#1a1a1a] border border-gray-200 dark:border-white/10 text-gray-900 dark:text-white focus:ring-2 focus:ring-violet-500 dark:focus:ring-[#00AAFF] focus:border-transparent outline-none transition-all"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Número de Contacto *</label>
                    <input
                      required
                      type="tel"
                      name="numero_contacto"
                      placeholder="+503 7000 0000"
                      className="w-full px-4 py-3 rounded-xl bg-white dark:bg-[#1a1a1a] border border-gray-200 dark:border-white/10 text-gray-900 dark:text-white focus:ring-2 focus:ring-violet-500 dark:focus:ring-[#00AAFF] focus:border-transparent outline-none transition-all"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Correo Electrónico *</label>
                  <input
                    required
                    type="email"
                    name="correo_electronico"
                    placeholder="juan@ejemplo.com"
                    className="w-full px-4 py-3 rounded-xl bg-white dark:bg-[#1a1a1a] border border-gray-200 dark:border-white/10 text-gray-900 dark:text-white focus:ring-2 focus:ring-violet-500 dark:focus:ring-[#00AAFF] focus:border-transparent outline-none transition-all"
                  />
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Departamento *</label>
                    <input
                      required
                      type="text"
                      name="departamento"
                      placeholder="San Salvador"
                      className="w-full px-4 py-3 rounded-xl bg-white dark:bg-[#1a1a1a] border border-gray-200 dark:border-white/10 text-gray-900 dark:text-white focus:ring-2 focus:ring-violet-500 dark:focus:ring-[#00AAFF] focus:border-transparent outline-none transition-all"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Municipio *</label>
                    <input
                      required
                      type="text"
                      name="municipio"
                      placeholder="Santa Tecla"
                      className="w-full px-4 py-3 rounded-xl bg-white dark:bg-[#1a1a1a] border border-gray-200 dark:border-white/10 text-gray-900 dark:text-white focus:ring-2 focus:ring-violet-500 dark:focus:ring-[#00AAFF] focus:border-transparent outline-none transition-all"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Curriculum Vitae (PDF/DOC) *</label>
                  <div 
                    onClick={() => fileInputRef.current?.click()}
                    className="mt-1 flex justify-center px-6 pt-5 pb-6 border-2 border-gray-300 dark:border-white/10 border-dashed rounded-xl hover:border-violet-500 dark:hover:border-[#00AAFF] cursor-pointer transition-colors bg-gray-50/50 dark:bg-white/5 hover:bg-gray-50 dark:hover:bg-white/10"
                  >
                    <div className="space-y-2 text-center">
                      <div className="mx-auto h-12 w-12 text-gray-400 dark:text-gray-500 flex items-center justify-center">
                        <Upload size={28} />
                      </div>
                      <div className="text-sm text-gray-600 dark:text-gray-400">
                        {fileName ? (
                          <span className="font-semibold text-violet-600 dark:text-[#00AAFF]">{fileName}</span>
                        ) : (
                          <span>Haz clic para subir un archivo</span>
                        )}
                      </div>
                      <p className="text-xs text-gray-500 dark:text-gray-500">PDF, DOC, DOCX hasta 5MB</p>
                    </div>
                    <input 
                      ref={fileInputRef}
                      id="cv" 
                      name="cv" 
                      type="file" 
                      accept=".pdf,.doc,.docx"
                      required 
                      className="sr-only" 
                      onChange={handleFileChange}
                    />
                  </div>
                </div>

                <div className="pt-4">
                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className="w-full flex justify-center items-center py-4 px-4 border border-transparent rounded-xl shadow-sm text-base font-medium text-white bg-violet-600 hover:bg-violet-700 dark:bg-[#00AAFF] dark:text-black dark:hover:bg-[#33BBFF] focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-violet-500 dark:focus:ring-offset-black disabled:opacity-70 disabled:cursor-not-allowed transition-all duration-300"
                  >
                    {isSubmitting ? (
                      <>
                        <Loader2 className="animate-spin -ml-1 mr-2 h-5 w-5" />
                        Enviando...
                      </>
                    ) : (
                      "Enviar Aplicación"
                    )}
                  </button>
                </div>
              </form>
            )}
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  );
}
