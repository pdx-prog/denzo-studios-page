import { NextResponse } from "next/server";
import { getSupabaseAdmin } from "@/lib/supabase";
import { notifyCV } from "@/lib/n8n";
import { buildCVPrompt, buildSuggestPrompt, callGemini } from "@/lib/gemini";
import { pdf, Document, Page, View, Text, StyleSheet } from "@react-pdf/renderer";
import type { CVExperience, CVGeneratePayload, CVSuggestPayload } from "@/types/cv";

const ensureBucket = async (supabase: ReturnType<typeof getSupabaseAdmin>, bucketId: string) => {
  try {
    await supabase.storage.createBucket(bucketId, { public: true });
  } catch (error: any) {
    if (!error?.message?.includes("already exists")) {
      console.warn(`No se pudo crear el bucket ${bucketId}:`, error);
    }
  }
};

const formatExperiences = (experiencias: CVExperience[]) => {
  if (!experiencias || experiencias.length === 0) return "Sin experiencia laboral relevante.";
  return experiencias
    .map(
      (experience) =>
        `${experience.cargo} en ${experience.empresa} (${experience.fecha_inicio} - ${experience.fecha_fin}): ${experience.funciones}`
    )
    .join("; ");
};

const createCVDocument = (personal: Omit<CVGeneratePayload, "action" | "nivel_academico" | "instituciones" | "cursos_certificaciones" | "area_interes" | "experiencias" | "conocimientos_tecnicos" | "herramientas" | "idiomas" | "habilidades_blandas">, professional: Omit<CVGeneratePayload, "action" | "nombre_completo" | "correo_electronico" | "numero_contacto" | "municipio" | "departamento">, generated: any) => {
  const styles = StyleSheet.create({
    page: { padding: 40, fontSize: 12, fontFamily: "Helvetica" },
    section: { marginBottom: 16 },
    heading: { fontSize: 18, marginBottom: 8, fontWeight: "bold" },
    subheading: { fontSize: 14, marginBottom: 6, fontWeight: "bold" },
    text: { marginBottom: 4, lineHeight: 1.4 },
    listItem: { marginBottom: 2, marginLeft: 10 },
  });

  return (
    <Document>
      <Page size="A4" style={styles.page}>
        <View style={styles.section}>
          <Text style={styles.heading}>{personal.nombre_completo}</Text>
          <Text style={styles.text}>{personal.correo_electronico} | {personal.numero_contacto}</Text>
          <Text style={styles.text}>{personal.municipio}, {personal.departamento}</Text>
        </View>

        <View style={styles.section}>
          <Text style={styles.subheading}>Resumen profesional</Text>
          <Text style={styles.text}>{generated.resumen_profesional ?? ""}</Text>
        </View>

        <View style={styles.section}>
          <Text style={styles.subheading}>Educación</Text>
          {(generated.educacion ?? []).map((item: any, index: number) => (
            <View key={index}>
              <Text style={styles.text}>{item.titulo} — {item.institucion}</Text>
              <Text style={styles.text}>{item.periodo}</Text>
            </View>
          ))}
        </View>

        {professional.experiencias.length > 0 ? (
          <View style={styles.section}>
            <Text style={styles.subheading}>Experiencia</Text>
            {generated.experiencia?.map((item: any, index: number) => (
              <View key={index} style={{ marginBottom: 6 }}>
                <Text style={styles.text}>{item.cargo} — {item.empresa}</Text>
                <Text style={styles.text}>{item.periodo}</Text>
                {(item.logros ?? []).map((logro: string, logIndex: number) => (
                  <Text key={logIndex} style={styles.listItem}>• {logro}</Text>
                ))}
              </View>
            ))}
          </View>
        ) : null}

        <View style={styles.section}>
          <Text style={styles.subheading}>Habilidades</Text>
          <Text style={styles.text}>Técnicas: {(generated.habilidades?.tecnicas ?? professional.conocimientos_tecnicos).join(", ")}</Text>
          <Text style={styles.text}>Herramientas: {(generated.habilidades?.herramientas ?? professional.herramientas).join(", ")}</Text>
          <Text style={styles.text}>Idiomas: {(generated.habilidades?.idiomas ?? professional.idiomas).join(", ")}</Text>
          <Text style={styles.text}>Blandas: {(generated.habilidades?.blandas ?? professional.habilidades_blandas).join(", ")}</Text>
        </View>

        <View style={styles.section}>
          <Text style={styles.subheading}>Cursos</Text>
          {(generated.cursos ?? []).map((item: any, index: number) => (
            <Text key={index} style={styles.listItem}>• {item.nombre} — {item.institucion}</Text>
          ))}
        </View>
      </Page>
    </Document>
  );
};

export async function POST(request: Request) {
  try {
    const body = await request.json();

    if (!body || !body.action) {
      return NextResponse.json({ error: "Faltan datos de acción" }, { status: 400 });
    }

    const supabase = getSupabaseAdmin();
    await ensureBucket(supabase, "cvs-generados");

    if (body.action === "suggest") {
      const data = body as CVSuggestPayload;
      const prompt = buildSuggestPrompt({
        nivel_academico: body.nivel_academico ?? "",
        instituciones: data.instituciones,
        cursos_certificaciones: data.cursos_certificaciones,
        experiencias_formateadas: formatExperiences(data.experiencias ?? []),
      });

      const geminiResponse = await callGemini(prompt);
      const parsed = geminiResponse ?? {};

      return NextResponse.json({
        conocimientos_tecnicos: parsed.conocimientos_tecnicos ?? [],
        herramientas: parsed.herramientas ?? [],
        idiomas: parsed.idiomas ?? [],
        habilidades_blandas: parsed.habilidades_blandas ?? [],
      });
    }

    if (body.action === "generate") {
      const data = body as CVGeneratePayload;
      const professionalData = {
        nivel_academico: data.nivel_academico,
        instituciones: data.instituciones,
        cursos_certificaciones: data.cursos_certificaciones,
        area_interes: data.area_interes,
        experiencias: data.experiencias ?? [],
        conocimientos_tecnicos: data.conocimientos_tecnicos ?? [],
        herramientas: data.herramientas ?? [],
        idiomas: data.idiomas ?? [],
        habilidades_blandas: data.habilidades_blandas ?? [],
      };

      const prompt = buildCVPrompt({
        nivel_academico: professionalData.nivel_academico,
        instituciones: professionalData.instituciones,
        cursos_certificaciones: professionalData.cursos_certificaciones,
        area_interes: professionalData.area_interes,
        experiencias_formateadas: formatExperiences(professionalData.experiencias),
        conocimientos_tecnicos: professionalData.conocimientos_tecnicos,
        herramientas: professionalData.herramientas,
        idiomas: professionalData.idiomas,
        habilidades_blandas: professionalData.habilidades_blandas,
      });

      const geminiResponse = await callGemini(prompt);

      const document = createCVDocument(
        {
          nombre_completo: data.nombre_completo,
          correo_electronico: data.correo_electronico,
          numero_contacto: data.numero_contacto,
          municipio: data.municipio,
          departamento: data.departamento,
        },
        professionalData,
        geminiResponse
      );

      const pdfBuffer = await pdf(document).toBuffer();
      const fileName = `cv-${Date.now()}-${Math.random().toString(36).slice(2, 10)}.pdf`;
      const filePath = fileName;

      const { error: uploadError } = await supabase.storage
        .from("cvs-generados")
        .upload(filePath, pdfBuffer, {
          cacheControl: "3600",
          upsert: false,
          contentType: "application/pdf",
        });

      if (uploadError) {
        console.error("Error al subir CV generado:", uploadError);
        return NextResponse.json({ error: "Error al subir CV generado" }, { status: 500 });
      }

      const { data: publicUrlData } = supabase.storage
        .from("cvs-generados")
        .getPublicUrl(filePath);

      const publicUrl = publicUrlData.publicUrl;

      const { error: dbError } = await supabase
        .from("cv_requests")
        .insert([
          {
            nombre_completo: data.nombre_completo,
            correo_electronico: data.correo_electronico,
            numero_contacto: data.numero_contacto,
            municipio: data.municipio,
            departamento: data.departamento,
            cv_url: publicUrl,
          },
        ]);

      if (dbError) {
        console.error("Error al guardar solicitud de CV:", dbError);
      }

      await notifyCV({
        nombre_completo: data.nombre_completo,
        correo_electronico: data.correo_electronico,
        numero_contacto: data.numero_contacto,
        municipio: data.municipio,
        departamento: data.departamento,
        cv_url: publicUrl,
      });

      return NextResponse.json({ success: true });
    }

    return NextResponse.json({ error: "Acción no soportada" }, { status: 400 });
  } catch (error) {
    console.error("Error en /api/generate-cv:", error);
    const message = error instanceof Error ? error.message : "Error interno del servidor";
    return NextResponse.json({ error: message }, { status: 500 });
  }
}
