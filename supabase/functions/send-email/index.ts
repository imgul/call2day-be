import { serve } from "https://deno.land/std@0.168.0/http/server.ts";

const RESEND_API_KEY = Deno.env.get("RESEND_API_KEY")!;
const TO_EMAIL = Deno.env.get("NOTIFICATION_EMAIL")!;

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type",
};

serve(async (req) => {
  if (req.method === "OPTIONS") {
    return new Response("ok", { headers: corsHeaders });
  }

  try {
    const body = await req.json();
    const { type, fields } = body as { type: "contact" | "agent"; fields: Record<string, string> };

    let subject: string;
    let html: string;

    if (type === "contact") {
      subject = `Nieuwe offerte-aanvraag van ${fields.naam}`;
      html = `
        <h2>Nieuwe offerte-aanvraag via Call2Day</h2>
        <table cellpadding="8" style="border-collapse:collapse;font-family:sans-serif;font-size:14px;">
          <tr><td><strong>Naam</strong></td><td>${fields.naam}</td></tr>
          <tr><td><strong>Bedrijf</strong></td><td>${fields.bedrijf}</td></tr>
          <tr><td><strong>Telefoon</strong></td><td>${fields.telefoon}</td></tr>
          <tr><td><strong>E-mail</strong></td><td>${fields.email}</td></tr>
          <tr><td><strong>Bericht</strong></td><td style="white-space:pre-wrap">${fields.bericht}</td></tr>
        </table>
      `;
    } else {
      subject = `Nieuwe agent-aanmelding van ${fields.naam}`;
      html = `
        <h2>Nieuwe agent-aanmelding via Call2Day</h2>
        <table cellpadding="8" style="border-collapse:collapse;font-family:sans-serif;font-size:14px;">
          <tr><td><strong>Naam</strong></td><td>${fields.naam}</td></tr>
          <tr><td><strong>E-mail</strong></td><td>${fields.email}</td></tr>
          <tr><td><strong>Telefoon</strong></td><td>${fields.telefoon}</td></tr>
          <tr><td><strong>Geboortedatum</strong></td><td>${fields.geboortedatum}</td></tr>
          <tr><td><strong>Stad</strong></td><td>${fields.stad}</td></tr>
          <tr><td><strong>Werklocatie</strong></td><td>${fields.locatie}</td></tr>
          <tr><td><strong>Jaren ervaring</strong></td><td>${fields.ervaring}</td></tr>
        </table>
      `;
    }

    const res = await fetch("https://api.resend.com/emails", {
      method: "POST",
      headers: {
        "Authorization": `Bearer ${RESEND_API_KEY}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        from: "Call2Day <noreply@call2day.be>",
        to: [TO_EMAIL],
        reply_to: fields.email,
        subject,
        html,
      }),
    });

    if (!res.ok) {
      const err = await res.text();
      throw new Error(`Resend error: ${err}`);
    }

    return new Response(JSON.stringify({ ok: true }), {
      headers: { ...corsHeaders, "Content-Type": "application/json" },
    });
  } catch (err) {
    return new Response(JSON.stringify({ ok: false, error: (err as Error).message }), {
      status: 500,
      headers: { ...corsHeaders, "Content-Type": "application/json" },
    });
  }
});
