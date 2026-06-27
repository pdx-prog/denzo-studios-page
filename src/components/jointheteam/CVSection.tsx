"use client";

import { useState } from "react";
import type { CVExperience, CVProfessionalData } from "@/types/cv";

const emptyExperience: CVExperience = {
  empresa: "",
  cargo: "",
  fecha_inicio: "",
  fecha_fin: "",
  funciones: "",
};

const emptyProfessionalState: CVProfessionalData = {
  nivel_academico: "",
  instituciones: [],
  cursos_certificaciones: [],
  area_interes: "",
  tiene_experiencia: false,
  experiencias: [],
  conocimientos_tecnicos: [],
  herramientas: [],
  idiomas: [],
  habilidades_blandas: [],
};

const initialPersonalState = {
  nombre_completo: "",
  correo_electronico: "",
  numero_contacto: "",
  municipio: "",
  departamento: "",
};

export default function CVSection() {
  const [step, setStep] = useState<1 | 2 | 3 | 4>(1);
  const [personal, setPersonal] = useState(initialPersonalState);
  const [professional, setProfessional] = useState(emptyProfessionalState);
  const [submitted, setSubmitted] = useState(false);
  const [confirmVisible, setConfirmVisible] = useState(false);
  const [institutionInput, setInstitutionInput] = useState("");
  const [courseInput, setCourseInput] = useState("");
  const [technicalInput, setTechnicalInput] = useState("");
  const [toolInput, setToolInput] = useState("");
  const [languageInput, setLanguageInput] = useState("");
  const [softSkillInput, setSoftSkillInput] = useState("");
  const [experienceInput, setExperienceInput] = useState<CVExperience>(emptyExperience);

  const handlePersonalChange = (field: keyof typeof personal, value: string) => {
    setPersonal((prev) => ({ ...prev, [field]: value }));
  };

  const handleProfessionalChange = (field: keyof CVProfessionalData, value: string | boolean) => {
    setProfessional((prev) => ({ ...prev, [field]: value } as CVProfessionalData));
  };

  const addInstitution = () => {
    const normalized = institutionInput.trim();
    if (!normalized) return;
    setProfessional((prev) => ({
      ...prev,
      instituciones: [...prev.instituciones, normalized],
    }));
    setInstitutionInput("");
  };

  const removeInstitution = (index: number) => {
    setProfessional((prev) => ({
      ...prev,
      instituciones: prev.instituciones.filter((_, i) => i !== index),
    }));
  };

  const addCourse = () => {
    const normalized = courseInput.trim();
    if (!normalized) return;
    setProfessional((prev) => ({
      ...prev,
      cursos_certificaciones: [...prev.cursos_certificaciones, normalized],
    }));
    setCourseInput("");
  };

  const removeCourse = (index: number) => {
    setProfessional((prev) => ({
      ...prev,
      cursos_certificaciones: prev.cursos_certificaciones.filter((_, i) => i !== index),
    }));
  };

  const addExperience = () => {
    if (
      !experienceInput.empresa.trim() ||
      !experienceInput.cargo.trim() ||
      !experienceInput.fecha_inicio.trim() ||
      !experienceInput.fecha_fin.trim() ||
      !experienceInput.funciones.trim()
    ) {
      return;
    }

    setProfessional((prev) => ({
      ...prev,
      experiencias: [...prev.experiencias, experienceInput],
    }));
    setExperienceInput(emptyExperience);
  };

  const removeExperience = (index: number) => {
    setProfessional((prev) => ({
      ...prev,
      experiencias: prev.experiencias.filter((_, i) => i !== index),
    }));
  };

  const removeSkillItem = (field: keyof Pick<CVProfessionalData, "conocimientos_tecnicos" | "herramientas" | "idiomas" | "habilidades_blandas">, index: number) => {
    setProfessional((prev) => ({
      ...prev,
      [field]: prev[field].filter((_, i) => i !== index),
    } as CVProfessionalData));
  };

  const flushExperienceIfPending = () => {
    if (
      experienceInput.empresa.trim() ||
      experienceInput.cargo.trim() ||
      experienceInput.fecha_inicio.trim() ||
      experienceInput.fecha_fin.trim() ||
      experienceInput.funciones.trim()
    ) {
      setProfessional((prev) => ({
        ...prev,
        experiencias: [...prev.experiencias, experienceInput],
      }));
      setExperienceInput(emptyExperience);
    }
  };

  const handleSubmit = async () => {
    setConfirmVisible(true);
    setSubmitted(true);

    const body = {
      action: "generate",
      ...personal,
      nivel_academico: professional.nivel_academico,
      instituciones: professional.instituciones,
      cursos_certificaciones: professional.cursos_certificaciones,
      area_interes: professional.area_interes,
      experiencias: professional.experiencias,
      conocimientos_tecnicos: professional.conocimientos_tecnicos,
      herramientas: professional.herramientas,
      idiomas: professional.idiomas,
      habilidades_blandas: professional.habilidades_blandas,
    };

    try {
      await fetch("/api/generate-cv", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(body),
      });
    } catch (error) {
      console.error("Error al enviar datos para generar CV:", error);
    }
  };

  return (
    <section id="cv" className="py-24 bg-white dark:bg-[#050505] transition-colors duration-300">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-[1.2fr_0.8fr] gap-12">
          <div>
            <div className="mb-8 space-y-4">
              <p className="text-sm uppercase tracking-[.25em] text-violet-600 dark:text-[#00AAFF]">Sección</p>
              <h2 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white">
                Construye un CV que abra nuevas oportunidades
              </h2>
              <p className="text-lg text-gray-600 dark:text-gray-300 max-w-2xl">
                Completa el formulario y se enviarán tus datos para el proceso de selección.
              </p>
            </div>

            <div className="grid gap-6">
              {step === 1 ? (
                <div className="rounded-3xl border border-gray-200/80 bg-gray-50 p-6 dark:border-white/10 dark:bg-[#111111]">
                  <div className="flex flex-wrap items-center justify-between gap-4">
                    <div>
                      <p className="text-sm font-semibold text-violet-600 dark:text-[#00AAFF]">Paso 1</p>
                      <h3 className="mt-2 text-2xl font-bold text-gray-900 dark:text-white">Información Personal</h3>
                    </div>
                    <div className="rounded-full bg-violet-100 px-4 py-2 text-sm font-medium text-violet-700 dark:bg-[#00AAFF]/10 dark:text-[#00AAFF]">
                      {step}/4
                    </div>
                  </div>

                  <div className="mt-8 grid gap-4">
                    {(["nombre_completo", "correo_electronico", "numero_contacto", "municipio", "departamento"] as const).map((field) => (
                      <label key={field} className="block">
                        <span className="block text-sm font-medium text-gray-700 dark:text-gray-200 capitalize">{field.replace(/_/g, " ")}</span>
                        <input
                          type={field === "correo_electronico" ? "email" : "text"}
                          value={personal[field]}
                          onChange={(event) => handlePersonalChange(field, event.target.value)}
                          className="mt-2 w-full rounded-2xl border border-gray-200 bg-white px-4 py-3 text-gray-900 outline-none transition focus:border-violet-500 focus:ring-2 focus:ring-violet-200 dark:border-white/10 dark:bg-[#121212] dark:text-gray-100 dark:focus:border-[#00AAFF] dark:focus:ring-[#00AAFF]/20"
                          required
                        />
                      </label>
                    ))}
                  </div>

                  <div className="mt-8 flex justify-end">
                    <button
                      type="button"
                      onClick={() => setStep(2)}
                      className="inline-flex items-center justify-center rounded-2xl bg-violet-600 px-6 py-3 text-sm font-semibold text-white transition hover:bg-violet-700 focus:outline-none focus:ring-2 focus:ring-violet-300"
                    >
                      Continuar a profesional
                    </button>
                  </div>
                </div>
              ) : null}

              {step === 2 ? (
                <div className="rounded-3xl border border-gray-200/80 bg-gray-50 p-6 dark:border-white/10 dark:bg-[#111111]">
                  <div className="flex flex-wrap items-center justify-between gap-4">
                    <div>
                      <p className="text-sm font-semibold text-violet-600 dark:text-[#00AAFF]">Paso 2</p>
                      <h3 className="mt-2 text-2xl font-bold text-gray-900 dark:text-white">Información Profesional</h3>
                    </div>
                    <div className="flex items-center gap-4">
                      <span className="rounded-full bg-violet-100 px-4 py-2 text-sm font-medium text-violet-700 dark:bg-[#00AAFF]/10 dark:text-[#00AAFF]">
                        {step}/4
                      </span>
                      <button
                        type="button"
                        onClick={() => setStep(1)}
                        className="rounded-full border border-gray-200 px-4 py-2 text-sm text-gray-700 transition hover:border-violet-300 dark:border-white/10 dark:text-gray-200"
                      >
                        Volver
                      </button>
                    </div>
                  </div>

                  <div className="mt-8 grid gap-4">
                    <label className="block">
                      <span className="block text-sm font-medium text-gray-700 dark:text-gray-200">Nivel académico</span>
                      <input
                        type="text"
                        value={professional.nivel_academico}
                        onChange={(event) => handleProfessionalChange("nivel_academico", event.target.value)}
                        className="mt-2 w-full rounded-2xl border border-gray-200 bg-white px-4 py-3 text-gray-900 outline-none transition focus:border-violet-500 focus:ring-2 focus:ring-violet-200 dark:border-white/10 dark:bg-[#121212] dark:text-gray-100"
                        required
                      />
                    </label>

                    <div className="grid gap-4">
                      <label className="block">
                        <span className="block text-sm font-medium text-gray-700 dark:text-gray-200">Instituciones</span>
                        <div className="mt-2 flex gap-3">
                          <input
                            type="text"
                            value={institutionInput}
                            onChange={(event) => setInstitutionInput(event.target.value)}
                            placeholder="Ej. Universidad Nacional"
                            className="w-full rounded-2xl border border-gray-200 bg-white px-4 py-3 text-gray-900 outline-none transition focus:border-violet-500 focus:ring-2 focus:ring-violet-200 dark:border-white/10 dark:bg-[#121212] dark:text-gray-100"
                          />
                          <button
                            type="button"
                            onClick={addInstitution}
                            className="rounded-2xl bg-violet-600 px-5 py-3 text-sm font-semibold text-white transition hover:bg-violet-700"
                          >
                            Agregar
                          </button>
                        </div>
                      </label>
                      <div className="flex flex-wrap gap-2">
                        {professional.instituciones.map((item, index) => (
                          <span key={index} className="inline-flex items-center gap-2 rounded-full bg-violet-100 px-4 py-2 text-sm text-violet-700 dark:bg-white/5 dark:text-[#00AAFF]">
                            {item}
                            <button type="button" onClick={() => removeInstitution(index)} className="text-sm text-gray-500 hover:text-gray-900 dark:text-gray-400 dark:hover:text-white">
                              ×
                            </button>
                          </span>
                        ))}
                      </div>
                    </div>

                    <div className="grid gap-4">
                      <label className="block">
                        <span className="block text-sm font-medium text-gray-700 dark:text-gray-200">Cursos y certificaciones</span>
                        <div className="mt-2 flex gap-3">
                          <input
                            type="text"
                            value={courseInput}
                            onChange={(event) => setCourseInput(event.target.value)}
                            placeholder="Ej. Marketing digital"
                            className="w-full rounded-2xl border border-gray-200 bg-white px-4 py-3 text-gray-900 outline-none transition focus:border-violet-500 focus:ring-2 focus:ring-violet-200 dark:border-white/10 dark:bg-[#121212] dark:text-gray-100"
                          />
                          <button
                            type="button"
                            onClick={addCourse}
                            className="rounded-2xl bg-violet-600 px-5 py-3 text-sm font-semibold text-white transition hover:bg-violet-700"
                          >
                            Agregar
                          </button>
                        </div>
                      </label>
                      <div className="flex flex-wrap gap-2">
                        {professional.cursos_certificaciones.map((item, index) => (
                          <span key={index} className="inline-flex items-center gap-2 rounded-full bg-violet-100 px-4 py-2 text-sm text-violet-700 dark:bg-white/5 dark:text-[#00AAFF]">
                            {item}
                            <button type="button" onClick={() => removeCourse(index)} className="text-sm text-gray-500 hover:text-gray-900 dark:text-gray-400 dark:hover:text-white">
                              ×
                            </button>
                          </span>
                        ))}
                      </div>
                    </div>

                    <label className="block">
                      <span className="block text-sm font-medium text-gray-700 dark:text-gray-200">Área de interés</span>
                      <input
                        type="text"
                        value={professional.area_interes}
                        onChange={(event) => handleProfessionalChange("area_interes", event.target.value)}
                        className="mt-2 w-full rounded-2xl border border-gray-200 bg-white px-4 py-3 text-gray-900 outline-none transition focus:border-violet-500 focus:ring-2 focus:ring-violet-200 dark:border-white/10 dark:bg-[#121212] dark:text-gray-100"
                        required
                      />
                    </label>

                    <div className="mt-6 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-end">
                      <button
                        type="button"
                        onClick={() => {
                          flushExperienceIfPending();
                          setStep(3);
                        }}
                        className="inline-flex items-center justify-center rounded-2xl bg-violet-600 px-6 py-3 text-sm font-semibold text-white transition hover:bg-violet-700"
                      >
                        Continuar a experiencia
                      </button>
                    </div>
                  </div>
                </div>
              ) : null}

              {step === 3 ? (
                <div className="rounded-3xl border border-gray-200/80 bg-gray-50 p-6 dark:border-white/10 dark:bg-[#111111]">
                  <div className="flex flex-wrap items-center justify-between gap-4">
                    <div>
                      <p className="text-sm font-semibold text-violet-600 dark:text-[#00AAFF]">Paso 3</p>
                      <h3 className="mt-2 text-2xl font-bold text-gray-900 dark:text-white">Experiencia</h3>
                    </div>
                    <div className="flex items-center gap-4">
                      <span className="rounded-full bg-violet-100 px-4 py-2 text-sm font-medium text-violet-700 dark:bg-[#00AAFF]/10 dark:text-[#00AAFF]">
                        {step}/4
                      </span>
                      <button
                        type="button"
                        onClick={() => {
                          flushExperienceIfPending();
                          setStep(2);
                        }}
                        className="rounded-full border border-gray-200 px-4 py-2 text-sm text-gray-700 transition hover:border-violet-300 dark:border-white/10 dark:text-gray-200"
                      >
                        Volver
                      </button>
                    </div>
                  </div>

                  <div className="mt-8 rounded-3xl border border-gray-200/80 bg-white p-5 dark:border-white/10 dark:bg-[#0d0d0d]">
                    <div className="flex items-center justify-between gap-4">
                      <div>
                        <p className="text-sm font-medium text-gray-700 dark:text-gray-200">¿Tienes experiencia laboral?</p>
                      </div>
                      <button
                        type="button"
                        onClick={() => {
                          setProfessional((prev) => ({
                            ...prev,
                            tiene_experiencia: !prev.tiene_experiencia,
                          }));
                        }}
                        className="rounded-full border px-4 py-2 text-sm text-gray-700 transition hover:border-violet-300 dark:border-white/10 dark:text-gray-200"
                      >
                        {professional.tiene_experiencia ? "Sí" : "No"}
                      </button>
                    </div>

                    <p className="mt-4 text-sm leading-6 text-gray-600 dark:text-gray-400">
                      {professional.tiene_experiencia
                        ? "Agrega tus experiencias laborales para destacar tus responsabilidades."
                        : "Si no tienes experiencia laboral, comparte tus actividades extracurriculares (voluntariados, proyectos académicos, etc)."}
                    </p>
                  </div>

                  <div className="mt-6 rounded-3xl border border-gray-200/80 bg-white p-5 dark:border-white/10 dark:bg-[#0d0d0d]">
                    <div className="grid gap-4">
                      <div className="grid gap-4 md:grid-cols-2">
                        <label className="block">
                          <span className="block text-sm font-medium text-gray-700 dark:text-gray-200">
                            {professional.tiene_experiencia ? "Empresa" : "Institución / Organización"}
                          </span>
                          <input
                            type="text"
                            value={experienceInput.empresa}
                            onChange={(event) => setExperienceInput((prev) => ({ ...prev, empresa: event.target.value }))}
                            className="mt-2 w-full rounded-2xl border border-gray-200 bg-white px-4 py-3 text-gray-900 outline-none transition focus:border-violet-500 focus:ring-2 focus:ring-violet-200 dark:border-white/10 dark:bg-[#121212] dark:text-gray-100"
                          />
                        </label>
                        <label className="block">
                          <span className="block text-sm font-medium text-gray-700 dark:text-gray-200">
                            {professional.tiene_experiencia ? "Cargo" : "Rol / Actividad"}
                          </span>
                          <input
                            type="text"
                            value={experienceInput.cargo}
                            onChange={(event) => setExperienceInput((prev) => ({ ...prev, cargo: event.target.value }))}
                            className="mt-2 w-full rounded-2xl border border-gray-200 bg-white px-4 py-3 text-gray-900 outline-none transition focus:border-violet-500 focus:ring-2 focus:ring-violet-200 dark:border-white/10 dark:bg-[#121212] dark:text-gray-100"
                          />
                        </label>
                      </div>

                      <div className="grid gap-4 md:grid-cols-2">
                        <label className="block">
                          <span className="block text-sm font-medium text-gray-700 dark:text-gray-200">Fecha inicio</span>
                          <input
                            type="text"
                            placeholder="Ej. Ene 2023"
                            value={experienceInput.fecha_inicio}
                            onChange={(event) => setExperienceInput((prev) => ({ ...prev, fecha_inicio: event.target.value }))}
                            className="mt-2 w-full rounded-2xl border border-gray-200 bg-white px-4 py-3 text-gray-900 outline-none transition focus:border-violet-500 focus:ring-2 focus:ring-violet-200 dark:border-white/10 dark:bg-[#121212] dark:text-gray-100"
                          />
                        </label>
                        <label className="block">
                          <span className="block text-sm font-medium text-gray-700 dark:text-gray-200">Fecha fin</span>
                          <input
                            type="text"
                            placeholder="Ej. Dic 2024 / Presente"
                            value={experienceInput.fecha_fin}
                            onChange={(event) => setExperienceInput((prev) => ({ ...prev, fecha_fin: event.target.value }))}
                            className="mt-2 w-full rounded-2xl border border-gray-200 bg-white px-4 py-3 text-gray-900 outline-none transition focus:border-violet-500 focus:ring-2 focus:ring-violet-200 dark:border-white/10 dark:bg-[#121212] dark:text-gray-100"
                          />
                        </label>
                      </div>

                      <label className="block">
                        <span className="block text-sm font-medium text-gray-700 dark:text-gray-200">
                          {professional.tiene_experiencia ? "Funciones" : "Descripción de lo que hiciste"}
                        </span>
                        <textarea
                          value={experienceInput.funciones}
                          onChange={(event) => setExperienceInput((prev) => ({ ...prev, funciones: event.target.value }))}
                          rows={4}
                          className="mt-2 w-full rounded-2xl border border-gray-200 bg-white px-4 py-3 text-gray-900 outline-none transition focus:border-violet-500 focus:ring-2 focus:ring-violet-200 dark:border-white/10 dark:bg-[#121212] dark:text-gray-100"
                        />
                      </label>

                      <button
                        type="button"
                        onClick={addExperience}
                        className="inline-flex items-center justify-center rounded-2xl bg-violet-600 px-6 py-3 text-sm font-semibold text-white transition hover:bg-violet-700"
                      >
                        {professional.tiene_experiencia ? "Agregar experiencia" : "Agregar actividad"}
                      </button>
                    </div>

                    {professional.experiencias.length > 0 && (
                      <div className="mt-6 space-y-3">
                        <h4 className="text-lg font-semibold text-gray-900 dark:text-white">
                          {professional.tiene_experiencia ? "Tus experiencias" : "Tus actividades"}
                        </h4>
                        <div className="grid gap-3">
                          {professional.experiencias.map((experience, index) => (
                            <div key={index} className="rounded-2xl border border-gray-200 p-4 dark:border-white/10">
                              <div className="flex items-start justify-between gap-4">
                                <div>
                                  <p className="font-semibold text-gray-900 dark:text-white">{experience.cargo} en {experience.empresa}</p>
                                  <p className="text-sm text-gray-500 dark:text-gray-400">{experience.fecha_inicio} · {experience.fecha_fin}</p>
                                </div>
                                <button
                                  type="button"
                                  onClick={() => removeExperience(index)}
                                  className="text-sm font-medium text-red-600 transition hover:text-red-800 dark:text-red-400"
                                >
                                  Eliminar
                                </button>
                              </div>
                              <p className="mt-3 text-sm text-gray-600 dark:text-gray-300">{experience.funciones}</p>
                            </div>
                          ))}
                        </div>
                      </div>
                    )}
                  </div>

                  <div className="mt-6 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-end">
                    <button
                      type="button"
                      onClick={() => {
                        flushExperienceIfPending();
                        setStep(4);
                      }}
                      className="inline-flex items-center justify-center rounded-2xl bg-violet-600 px-6 py-3 text-sm font-semibold text-white transition hover:bg-violet-700"
                    >
                      Continuar a habilidades
                    </button>
                  </div>
                </div>
              ) : null}

              {step === 4 ? (
                <div className="rounded-3xl border border-gray-200/80 bg-gray-50 p-6 dark:border-white/10 dark:bg-[#111111]">
                  <div className="flex flex-wrap items-center justify-between gap-4">
                    <div>
                      <p className="text-sm font-semibold text-violet-600 dark:text-[#00AAFF]">Paso 4</p>
                      <h3 className="mt-2 text-2xl font-bold text-gray-900 dark:text-white">Habilidades</h3>
                    </div>
                    <div className="flex items-center gap-4">
                      <span className="rounded-full bg-violet-100 px-4 py-2 text-sm font-medium text-violet-700 dark:bg-[#00AAFF]/10 dark:text-[#00AAFF]">
                        {step}/4
                      </span>
                      <button
                        type="button"
                        onClick={() => setStep(3)}
                        className="rounded-full border border-gray-200 px-4 py-2 text-sm text-gray-700 transition hover:border-violet-300 dark:border-white/10 dark:text-gray-200"
                      >
                        Volver
                      </button>
                    </div>
                  </div>

                  <div className="mt-8 rounded-3xl border border-gray-200/80 bg-white p-5 dark:border-white/10 dark:bg-[#0d0d0d]">
                    <div className="mb-4">
                      <h4 className="text-lg font-semibold text-gray-900 dark:text-white">Habilidades</h4>
                      <p className="mt-2 text-sm text-gray-600 dark:text-gray-400">
                        Agrega manualmente tus conocimientos técnicos, herramientas, idiomas y habilidades blandas.
                      </p>
                    </div>

                    <div className="space-y-6">
                      {[
                        { label: "Conocimientos técnicos", field: "conocimientos_tecnicos", value: technicalInput, setValue: setTechnicalInput },
                        { label: "Herramientas", field: "herramientas", value: toolInput, setValue: setToolInput },
                        { label: "Idiomas", field: "idiomas", value: languageInput, setValue: setLanguageInput },
                        { label: "Habilidades blandas", field: "habilidades_blandas", value: softSkillInput, setValue: setSoftSkillInput },
                      ].map(({ label, field, value, setValue }) => (
                        <div key={field} className="space-y-3 rounded-3xl border border-gray-200/80 bg-gray-50 p-5 dark:border-white/10 dark:bg-[#111111]">
                          <div className="flex items-center justify-between gap-4">
                            <h5 className="font-semibold text-gray-900 dark:text-white">{label}</h5>
                            <button
                              type="button"
                              onClick={() => {
                                const normalized = value.trim();
                                if (!normalized) return;
                                setProfessional((prev) => ({
                                  ...prev,
                                  [field]: [...prev[field as keyof CVProfessionalData] as string[], normalized],
                                } as CVProfessionalData));
                                setValue("");
                              }}
                              className="rounded-full border border-gray-200 px-4 py-2 text-sm text-gray-700 transition hover:border-violet-300 dark:border-white/10 dark:text-gray-200"
                            >
                              Agregar
                            </button>
                          </div>

                          <div className="grid gap-3 md:grid-cols-[1fr_auto]">
                            <input
                              type="text"
                              value={value}
                              onChange={(event) => setValue(event.target.value)}
                              placeholder={`Ej. ${label}`}
                              className="w-full rounded-2xl border border-gray-200 bg-white px-4 py-3 text-gray-900 outline-none transition focus:border-violet-500 focus:ring-2 focus:ring-violet-200 dark:border-white/10 dark:bg-[#121212] dark:text-gray-100"
                            />
                          </div>

                          <div className="flex flex-wrap gap-2">
                            {(professional[field as keyof CVProfessionalData] as string[]).map((item, index) => (
                              <span key={index} className="inline-flex items-center gap-2 rounded-full bg-violet-100 px-4 py-2 text-sm text-violet-700 dark:bg-white/5 dark:text-[#00AAFF]">
                                {item}
                                <button
                                  type="button"
                                  onClick={() => removeSkillItem(field as keyof Pick<CVProfessionalData, "conocimientos_tecnicos" | "herramientas" | "idiomas" | "habilidades_blandas">, index)}
                                  className="text-sm text-gray-500 hover:text-gray-900 dark:text-gray-400 dark:hover:text-white"
                                >
                                  ×
                                </button>
                              </span>
                            ))}
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>

                  <div className="mt-6 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-end">
                    <button
                      type="button"
                      onClick={handleSubmit}
                      disabled={submitted}
                      className="inline-flex items-center justify-center rounded-2xl bg-violet-600 px-6 py-3 text-sm font-semibold text-white transition hover:bg-violet-700 disabled:cursor-not-allowed disabled:opacity-60"
                    >
                      Enviar datos de CV
                    </button>
                  </div>
                </div>
              ) : null}

              {confirmVisible ? (
                <div className="rounded-3xl border border-green-200 bg-green-50 p-5 text-green-800 dark:border-green-900/30 dark:bg-green-950/20 dark:text-green-200">
                  <p className="font-semibold">¡Gracias por registrarte!</p>
                  <p className="mt-2 text-sm">
                    Hemos recibido tu información correctamente. Nuestro equipo revisará los datos proporcionados y te acompañará en el proceso.
                  </p>
                </div>
              ) : null}
            </div>
          </div>

          <div className="rounded-[2rem] bg-violet-950 px-8 py-12 text-white shadow-2xl shadow-violet-500/10 dark:bg-[#081030] h-fit sticky top-24">
            <div className="mb-8">
              <div className="h-60 w-full overflow-hidden rounded-[2rem] bg-white/10" />
            </div>
            <div className="space-y-6">
              <p className="text-sm uppercase tracking-[.3em] text-violet-300">Inspiración</p>
              <h3 className="text-3xl font-bold">Diseña un perfil estratégico</h3>
              <p className="text-sm leading-7 text-violet-100/90">
                Tu perfil incluirá experiencia, formación y habilidades con enfoque profesional para solicitudes y entrevistas.
              </p>
              <div className="grid gap-3 text-sm text-violet-100/80">
                <div className="rounded-3xl bg-white/5 p-4">Presenta tu educación de forma clara.</div>
                <div className="rounded-3xl bg-white/5 p-4">Convierte tus logros en resultados medibles.</div>
                <div className="rounded-3xl bg-white/5 p-4">Destaca tus habilidades adaptadas a tu rol.</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
