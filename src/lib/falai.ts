import { fal } from "@fal-ai/client";

export async function processPhotoWithFalAI(imageUrl: string): Promise<string> {
  const apiKey = process.env.FAL_KEY;

  if (!apiKey) {
    throw new Error("FAL_KEY no está configurada");
  }

  // Configure the fal client with the server-side key
  fal.config({ credentials: apiKey });

  // Cast to `any`: el tipo BabyVersionInput sólo declara image_url,
  // pero el modelo acepta prompt/negative_prompt en tiempo de ejecución.
  const result = await fal.subscribe("fal-ai/image-editing/professional-photo", {
    input: {
      image_url: imageUrl,
      prompt:
        "professional studio headshot portrait, elegant neutral background, " +
        "soft cinematic studio lighting, high-end corporate photography, " +
        "IDENTICAL face to original photo, preserve exact facial features, " +
        "preserve exact eye color, skin tone, hair color and style, " +
        "preserve exact bone structure and identity, same person, " +
        "photorealistic, sharp focus on face, 8k resolution, " +
        "only background changed to professional studio setting",
      negative_prompt:
        "different person, altered face, changed facial features, " +
        "different eyes, different nose, different mouth, different skin tone, " +
        "face swap, identity change, deformed face, distorted features, " +
        "blurry face, plastic skin, unrealistic, cartoon, illustration, " +
        "painting, anime, bad anatomy, extra limbs",
    } as any,
  });

  // The API returns an images array; grab the first result's URL
  const data = result.data as any;
  const outputUrl: string =
    data?.images?.[0]?.url ??
    data?.image?.url ??
    data?.output_url ??
    "";

  if (!outputUrl) {
    throw new Error("fal.ai no devolvió una URL de imagen procesada");
  }

  return outputUrl;
}
