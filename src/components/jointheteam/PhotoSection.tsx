"use client";

import { useState } from "react";

export default function PhotoSection() {
  const [form, setForm] = useState({
    nombre_completo: "",
    correo_electronico: "",
    numero_contacto: "",
    area_profesional: "",
    foto: null as File | null,
  });
  const [fileError, setFileError] = useState("");
  const [confirmVisible, setConfirmVisible] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  const validatePhoto = (file: File) => {
    if (!["image/jpeg", "image/png"].includes(file.type)) {
      return "Solo se aceptan imágenes JPG o PNG.";
    }
    if (file.size > 10 * 1024 * 1024) {
      return "El archivo no puede superar los 10 MB.";
    }
    return "";
  };

  const handleChange = (field: keyof typeof form, value: string | File | null) => {
    setForm((prev) => ({ ...prev, [field]: value } as typeof form));
    if (field === "foto" && value instanceof File) {
      setFileError(validatePhoto(value));
    }
  };

  const handleSubmit = async () => {
    if (submitted) return;
    if (!form.nombre_completo || !form.correo_electronico || !form.numero_contacto || !form.area_profesional || !form.foto) {
      setFileError("Por favor completa todos los campos obligatorios y adjunta una foto.");
      return;
    }

    const fileValidation = validatePhoto(form.foto);
    if (fileValidation) {
      setFileError(fileValidation);
      return;
    }

    setConfirmVisible(true);
    setSubmitted(true);

    try {
      const body = new FormData();
      body.append("nombre_completo", form.nombre_completo);
      body.append("correo_electronico", form.correo_electronico);
      body.append("numero_contacto", form.numero_contacto);
      body.append("area_profesional", form.area_profesional);
      body.append("foto", form.foto);

      await fetch("/api/generate-photo", {
        method: "POST",
        body,
      });
    } catch (error) {
      console.error("Error al enviar la foto profesional:", error);
    }
  };

  return (
    <section id="foto" className="py-24 bg-gray-50 dark:bg-[#0a0a0a] transition-colors duration-300">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-[0.9fr_1.1fr] gap-12 items-start">
          <div className="space-y-6">
            <p className="text-sm uppercase tracking-[.3em] text-violet-600 dark:text-[#00AAFF]">Fotografía</p>
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white">
              Crea tu Foto Profesional para LinkedIn
            </h2>
            <p className="text-lg text-gray-600 dark:text-gray-300 max-w-2xl">
              Proyecta una imagen profesional y destaca en LinkedIn.
            </p>

            <div className="grid gap-3 rounded-3xl border border-gray-200 bg-white p-6 shadow-sm dark:border-white/10 dark:bg-[#111111]">
              {[
                "Foto profesional para LinkedIn",
                "Fondo limpio y corporativo",
                "Mejora de iluminación y calidad",
                "Apariencia profesional manteniendo tu imagen natural",
                "Lista para usar en LinkedIn, CV y portafolios",
              ].map((benefit) => (
                <div key={benefit} className="flex items-start gap-3">
                  <span className="mt-1 h-2.5 w-2.5 rounded-full bg-violet-600" />
                  <p className="text-sm text-gray-700 dark:text-gray-300">{benefit}</p>
                </div>
              ))}
            </div>
          </div>

          <div className="rounded-[2rem] border border-gray-200 bg-white p-8 shadow-sm dark:border-white/10 dark:bg-[#111111]">
            <div className="space-y-6">
              <div>
                <p className="text-sm uppercase tracking-[.3em] text-violet-600 dark:text-[#00AAFF]">Formulario</p>
                <h3 className="mt-2 text-2xl font-bold text-gray-900 dark:text-white">Genera tu foto profesional</h3>
              </div>

              <div className="grid gap-4">
                {([
                  { label: "Nombre completo", field: "nombre_completo", type: "text" },
                  { label: "Correo electrónico", field: "correo_electronico", type: "email" },
                  { label: "Número de contacto", field: "numero_contacto", type: "tel" },
                  { label: "Área profesional", field: "area_profesional", type: "text" },
                ] as const).map((item) => (
                  <label key={item.field} className="block">
                    <span className="text-sm font-medium text-gray-700 dark:text-gray-200">{item.label}</span>
                    <input
                      type={item.type}
                      value={form[item.field]}
                      onChange={(event) => handleChange(item.field, event.target.value)}
                      className="mt-2 w-full rounded-2xl border border-gray-200 bg-white px-4 py-3 text-gray-900 outline-none transition focus:border-violet-500 focus:ring-2 focus:ring-violet-200 dark:border-white/10 dark:bg-[#121212] dark:text-gray-100"
                      required
                    />
                  </label>
                ))}

                <label className="block">
                  <span className="text-sm font-medium text-gray-700 dark:text-gray-200">Foto (JPG o PNG, max 10MB)</span>
                  <input
                    type="file"
                    accept="image/jpeg,image/png"
                    onChange={(event) => {
                      const file = event.currentTarget.files?.[0] ?? null;
                      handleChange("foto", file);
                    }}
                    className="mt-2 w-full text-sm text-gray-700 dark:text-gray-200"
                  />
                </label>

                {fileError ? <p className="text-sm text-red-500">{fileError}</p> : null}
              </div>

              <button
                type="button"
                onClick={handleSubmit}
                disabled={submitted}
                className="w-full rounded-2xl bg-violet-600 px-6 py-3 text-sm font-semibold text-white transition hover:bg-violet-700 disabled:cursor-not-allowed disabled:opacity-60"
              >
                Generar mi Foto Profesional
              </button>

              {confirmVisible ? (
                <div className="rounded-3xl border border-green-200 bg-green-50 p-5 text-green-800 dark:border-green-900/30 dark:bg-green-950/20 dark:text-green-200">
                  <p className="font-semibold">¡Gracias por registrarte!</p>
                  <p className="mt-2 text-sm leading-6">
                    Hemos recibido tu fotografía correctamente. Nuestro sistema de Inteligencia Artificial procesará tu imagen para generar una versión profesional ideal para LinkedIn.
                    Te la enviaremos a tu correo electrónico cuando esté generada (Aprox 5 min.).
                  </p>
                </div>
              ) : null}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
