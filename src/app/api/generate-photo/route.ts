import { NextResponse } from "next/server";
import { getSupabaseAdmin } from "@/lib/supabase";
import { notifyPhoto } from "@/lib/n8n";

export async function POST(request: Request) {
  try {
    const formData = await request.formData();

    const nombre_completo = formData.get("nombre_completo") as string;
    const correo_electronico = formData.get("correo_electronico") as string;
    const numero_contacto = formData.get("numero_contacto") as string;
    const area_profesional = formData.get("area_profesional") as string;
    const foto = formData.get("foto") as File;

    if (
      !nombre_completo ||
      !correo_electronico ||
      !numero_contacto ||
      !area_profesional ||
      !foto
    ) {
      return NextResponse.json({ error: "Faltan campos obligatorios" }, { status: 400 });
    }

    if (!["image/jpeg", "image/png"].includes(foto.type)) {
      return NextResponse.json({ error: "El archivo debe ser JPG o PNG" }, { status: 400 });
    }

    if (foto.size > 10 * 1024 * 1024) {
      return NextResponse.json({ error: "El archivo supera el tamaño máximo de 10MB" }, { status: 400 });
    }

    const supabase = getSupabaseAdmin();

    try {
      await supabase.storage.createBucket("fotos-originales", { public: true });
    } catch (error: any) {
      if (!error?.message?.includes("already exists")) {
        console.warn("No se pudo crear el bucket fotos-originales:", error);
      }
    }

    const fileExt = foto.name.split(".").pop();
    const fileName = `photo-${Date.now()}-${Math.random().toString(36).slice(2, 10)}.${fileExt}`;
    const filePath = fileName;

    const { error: uploadError } = await supabase.storage
      .from("fotos-originales")
      .upload(filePath, foto, {
        cacheControl: "3600",
        upsert: false,
      });

    if (uploadError) {
      console.error("Error al subir foto original:", uploadError);
      return NextResponse.json({ error: "Error al subir la imagen" }, { status: 500 });
    }

    const { data: publicUrlData } = supabase.storage
      .from("fotos-originales")
      .getPublicUrl(filePath);

    const originalPhotoUrl = publicUrlData.publicUrl;

    const { error: dbError } = await supabase.from("photo_requests").insert([
      {
        nombre_completo,
        correo_electronico,
        numero_contacto,
        area_profesional,
        foto_url: originalPhotoUrl,
      },
    ]);

    if (dbError) {
      console.error("Error al guardar solicitud de foto:", dbError);
    }

    await notifyPhoto({
      nombre_completo,
      correo_electronico,
      numero_contacto,
      area_profesional,
      foto_url: originalPhotoUrl,
    });

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("Error en /api/generate-photo:", error);
    return NextResponse.json({ error: "Error interno del servidor" }, { status: 500 });
  }
}
