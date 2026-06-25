import { NextResponse } from "next/server";
import { getSupabaseAdmin } from "@/lib/supabase";
import { notifyN8n } from "@/lib/n8n";

export async function POST(request: Request) {
  try {
    const formData = await request.formData();
    
    const nombre_completo = formData.get("nombre_completo") as string;
    const numero_contacto = formData.get("numero_contacto") as string;
    const correo_electronico = formData.get("correo_electronico") as string;
    const municipio = formData.get("municipio") as string;
    const departamento = formData.get("departamento") as string;
    const plaza_seleccionada = formData.get("plaza_seleccionada") as string;
    const cvFile = formData.get("cv") as File;

    if (!nombre_completo || !numero_contacto || !correo_electronico || !municipio || !departamento || !plaza_seleccionada || !cvFile) {
      return NextResponse.json({ error: "Faltan campos obligatorios" }, { status: 400 });
    }

    // Subir CV a Supabase Storage
    const fileExt = cvFile.name.split('.').pop();
    const fileName = `${Date.now()}-${Math.random().toString(36).substring(2)}.${fileExt}`;
    const filePath = `${fileName}`;

    const supabaseAdmin = getSupabaseAdmin();

    const { error: uploadError } = await supabaseAdmin.storage
      .from("cvs")
      .upload(filePath, cvFile, {
        cacheControl: "3600",
        upsert: false,
      });

    if (uploadError) {
      console.error("Error al subir CV:", uploadError);
      return NextResponse.json({ error: "Error al subir el currículum" }, { status: 500 });
    }

    // Obtener URL pública
    const { data: { publicUrl } } = supabaseAdmin.storage
      .from("cvs")
      .getPublicUrl(filePath);

    // Insertar registro en la base de datos
    const { error: dbError } = await supabaseAdmin
      .from("applications")
      .insert([
        {
          nombre_completo,
          numero_contacto,
          correo_electronico,
          municipio,
          departamento,
          plaza_seleccionada,
          cv_url: publicUrl,
        }
      ]);

    if (dbError) {
      console.error("Error al guardar aplicación:", dbError);
      // No eliminamos el archivo subido por simplicidad, pero sería una buena práctica
      return NextResponse.json({ error: "Error al guardar los datos de la aplicación" }, { status: 500 });
    }

    // Notificar a n8n
    await notifyN8n({
      nombre_completo,
      municipio,
      departamento,
      numero_contacto,
      correo_electronico,
      plaza_seleccionada,
      cv_url: publicUrl,
      fecha_aplicacion: new Date().toISOString(),
    });

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("Error no manejado:", error);
    return NextResponse.json({ error: "Error interno del servidor" }, { status: 500 });
  }
}
