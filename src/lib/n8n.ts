export async function notifyN8n(data: {
  nombre_completo: string;
  municipio: string;
  departamento: string;
  numero_contacto: string;
  correo_electronico: string;
  plaza_seleccionada: string;
  cv_url: string;
  fecha_aplicacion: string;
}) {
  try {
    const webhookUrl = process.env.N8N_WEBHOOK_URL;
    
    if (!webhookUrl) {
      console.warn("N8N_WEBHOOK_URL no está definido. Omitiendo notificación.");
      return;
    }

    const response = await fetch(webhookUrl, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(data),
    });

    if (!response.ok) {
      throw new Error(`n8n webhook error: ${response.status}`);
    }
  } catch (error) {
    console.error("Error al notificar a n8n:", error);
    // No lanzamos el error para no interrumpir el flujo principal
  }
}

export async function notifyCV(data: any): Promise<void> {
  try {
    const webhookUrl = process.env.N8N_WEBHOOK_CV;
    if (!webhookUrl) {
      console.warn("N8N_WEBHOOK_CV no está definido. Omitiendo notificación de CV.");
      return;
    }
    console.log("[n8n] Enviando a N8N_WEBHOOK_CV:", webhookUrl);
    const response = await fetch(webhookUrl, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(data),
    });
    if (!response.ok) throw new Error(`n8n CV webhook error: ${response.status}`);
  } catch (error) {
    console.error("Error notifying n8n CV webhook:", error);
  }
}

export async function notifyPhoto(data: {
  nombre_completo: string;
  correo_electronico: string;
  numero_contacto: string;
  area_profesional: string;
  foto_url: string;
}): Promise<void> {
  try {
    const webhookUrl = process.env.N8N_WEBHOOK_PHOTO;
    if (!webhookUrl) {
      console.warn("N8N_WEBHOOK_PHOTO no está definido. Omitiendo notificación de foto.");
      return;
    }
    console.log("[n8n] Enviando a N8N_WEBHOOK_PHOTO:", webhookUrl);
    const response = await fetch(webhookUrl, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(data),
    });
    if (!response.ok) throw new Error(`n8n Photo webhook error: ${response.status}`);
  } catch (error) {
    console.error("Error notifying n8n Photo webhook:", error);
  }
}
