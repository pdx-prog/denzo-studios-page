import { NextResponse } from "next/server";
import { notifyCV } from "@/lib/n8n";
import type { CVExperience, CVGeneratePayload } from "@/types/cv";

const formatExperiences = (experiencias: CVExperience[]) => {
  if (!experiencias || experiencias.length === 0) return "Sin experiencia laboral relevante.";
  return experiencias
    .map(
      (experience) =>
        `${experience.cargo} en ${experience.empresa} (${experience.fecha_inicio} - ${experience.fecha_fin}): ${experience.funciones}`
    )
    .join(", ");
};

export async function POST(request: Request) {
  try {
    const body = await request.json();

    if (!body || body.action !== "generate") {
      return NextResponse.json({ error: "Acción no válida o faltante" }, { status: 400 });
    }

    const data = body as CVGeneratePayload;

    const payload = {
      nombre_completo: data.nombre_completo,
      correo_electronico: data.correo_electronico,
      numero_contacto: data.numero_contacto,
      municipio: data.municipio,
      departamento: data.departamento,
      nivel_academico: data.nivel_academico,
      instituciones: (data.instituciones || []).join(", "),
      cursos_certificaciones: (data.cursos_certificaciones || []).join(", "),
      area_interes: data.area_interes,
      experiencias: formatExperiences(data.experiencias || []),
      conocimientos_tecnicos: (data.conocimientos_tecnicos || []).join(", "),
      herramientas: (data.herramientas || []).join(", "),
      idiomas: (data.idiomas || []).join(", "),
      habilidades_blandas: (data.habilidades_blandas || []).join(", "),
    };

    await notifyCV(payload);

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("Error en /api/generate-cv:", error);
    const message = error instanceof Error ? error.message : "Error interno del servidor";
    return NextResponse.json({ error: message }, { status: 500 });
  }
}
