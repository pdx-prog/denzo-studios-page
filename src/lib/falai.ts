export async function processPhotoWithFalAI(imageUrl: string): Promise<string> {
  const apiKey = process.env.FAL_KEY;

  if (!apiKey) {
    throw new Error("FAL_KEY no está configurada");
  }

  const response = await fetch("https://api.fal.ai/api/v1/image", {
    method: "POST",
    headers: {
      Authorization: `Bearer ${apiKey}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      image_url: imageUrl,
      style: "professional",
      prompt: "Genera una foto profesional adecuada para LinkedIn con fondo limpio y mejora de iluminación.",
    }),
  });

  if (!response.ok) {
    const message = await response.text();
    throw new Error(`fal.ai error: ${response.status} ${message}`);
  }

  const data = await response.json();
  return data?.data?.output_url ?? data?.output_url ?? "";
}
