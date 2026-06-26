const GEMINI_API_URL =
  "https://generativelanguage.googleapis.com/v1beta/models/gemini-2.5-flash:generateContent";

export function buildSuggestPrompt(data: {
  nivel_academico: string;
  instituciones: string[];
  cursos_certificaciones: string[];
  experiencias_formateadas: string;
}): string {
  return `
Eres un experto en recursos humanos.
Con base en el siguiente perfil académico y laboral, sugiere habilidades relevantes.
Responde ÚNICAMENTE con un objeto JSON válido, sin texto adicional ni bloques markdown.

Perfil:
- Nivel académico: ${data.nivel_academico}
- Instituciones: ${data.instituciones.join(", ")}
- Cursos y certificaciones: ${data.cursos_certificaciones.join(", ")}
- Experiencia: ${data.experiencias_formateadas}

Estructura JSON requerida:
{
  "conocimientos_tecnicos": [""],
  "herramientas": [""],
  "idiomas": [""],
  "habilidades_blandas": [""]
}
  `;
}

export function buildCVPrompt(data: {
  nivel_academico: string;
  instituciones: string[];
  cursos_certificaciones: string[];
  area_interes: string;
  experiencias_formateadas: string;
  conocimientos_tecnicos: string[];
  herramientas: string[];
  idiomas: string[];
  habilidades_blandas: string[];
}): string {
  return `
Eres un experto en recursos humanos y redacción de CVs profesionales.
Genera el contenido de un CV profesional en español basado en el siguiente perfil.
Responde ÚNICAMENTE con un objeto JSON válido, sin texto adicional ni bloques markdown.

Perfil:
- Nivel académico: ${data.nivel_academico}
- Instituciones: ${data.instituciones.join(", ")}
- Cursos y certificaciones: ${data.cursos_certificaciones.join(", ")}
- Área de interés: ${data.area_interes}
- Experiencia laboral: ${data.experiencias_formateadas}
- Conocimientos técnicos: ${data.conocimientos_tecnicos.join(", ")}
- Herramientas: ${data.herramientas.join(", ")}
- Idiomas: ${data.idiomas.join(", ")}
- Habilidades blandas: ${data.habilidades_blandas.join(", ")}

Estructura JSON requerida:
{
  "resumen_profesional": "string",
  "educacion": [{ "institucion": "", "titulo": "", "periodo": "" }],
  "experiencia": [{ "empresa": "", "cargo": "", "periodo": "", "logros": [""] }],
  "habilidades": {
    "tecnicas": [""],
    "herramientas": [""],
    "idiomas": [""],
    "blandas": [""]
  },
  "cursos": [{ "nombre": "", "institucion": "" }]
}
  `;
}

function extractJson(payload: string) {
  const start = payload.indexOf("{");
  const end = payload.lastIndexOf("}");
  if (start === -1 || end === -1 || end <= start) {
    return null;
  }
  const candidate = payload.slice(start, end + 1);

  try {
    return JSON.parse(candidate);
  } catch {
    try {
      const cleaned = candidate
        .replace(/\n/g, " ")
        .replace(/\s+/g, " ")
        .replace(/\"\s*:\s*\"/g, '": "');
      return JSON.parse(cleaned);
    } catch {
      return null;
    }
  }
}

export async function callGemini(prompt: string): Promise<any> {
  const apiKey = process.env.GEMINI_API_KEY;

  if (!apiKey) {
    throw new Error("GEMINI_API_KEY no está configurada");
  }

  const url = apiKey.startsWith("ya29.")
    ? GEMINI_API_URL
    : `${GEMINI_API_URL}?key=${encodeURIComponent(apiKey)}`;

  const headers: Record<string, string> = {
    "Content-Type": "application/json",
  };

  if (apiKey.startsWith("ya29.")) {
    headers.Authorization = `Bearer ${apiKey}`;
  }

  const response = await fetch(url, {
    method: "POST",
    headers,
    body: JSON.stringify({
      prompt: {
        text: prompt,
      },
      temperature: 0.3,
      maxOutputTokens: 600,
    }),
  });

  if (!response.ok) {
    const message = await response.text();
    throw new Error(`Gemini API error: ${response.status} ${message}`);
  }

  const result = await response.json();
  const content = result?.candidates?.[0]?.content ?? result?.output?.[0]?.content ?? "";
  const parsed = extractJson(content);

  if (!parsed) {
    throw new Error("No se pudo parsear la respuesta de Gemini");
  }

  return parsed;
}
