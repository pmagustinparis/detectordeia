import { NextRequest, NextResponse } from 'next/server';
import { createClient } from '@supabase/supabase-js';
import { Resend } from 'resend';

function getSupabaseAdmin() {
  return createClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.SUPABASE_SERVICE_ROLE_KEY!
  );
}

const MAX_PER_RUN = 50; // límite por ejecución para no saturar Resend

// ─── Plantilla HTML ───────────────────────────────────────────────────────────

function buildEmailHtml(opts: {
  isHighRisk: boolean;
  probability: number;
  toolType: string;
}): { subject: string; html: string } {
  const { isHighRisk, probability, toolType } = opts;

  if (isHighRisk) {
    // Variante urgente: ≥70% IA
    const subject = `Tu texto marcó ${probability}% IA — 3 pasos para bajarlo`;
    const html = `<!DOCTYPE html>
<html lang="es">
<head>
<meta charset="UTF-8"/>
<meta name="viewport" content="width=device-width, initial-scale=1.0"/>
<title>${subject}</title>
</head>
<body style="margin:0;padding:0;background:#f9f7f4;font-family:-apple-system,BlinkMacSystemFont,'Segoe UI',sans-serif;">
  <table width="100%" cellpadding="0" cellspacing="0" style="background:#f9f7f4;padding:32px 16px;">
    <tr><td align="center">
      <table width="100%" cellpadding="0" cellspacing="0" style="max-width:580px;background:#ffffff;border-radius:16px;overflow:hidden;border:1px solid #e8e4de;">

        <!-- Header rojo -->
        <tr>
          <td style="background:#7f1d1d;padding:24px 32px;">
            <p style="margin:0;font-size:12px;font-weight:600;letter-spacing:0.1em;text-transform:uppercase;color:#fca5a5;">
              Resultado de tu análisis
            </p>
            <h1 style="margin:8px 0 0;font-size:22px;font-weight:700;color:#ffffff;line-height:1.3;">
              Tu texto marcó <span style="color:#fca5a5;">${probability}% IA</span>
            </h1>
          </td>
        </tr>

        <!-- Body -->
        <tr>
          <td style="padding:28px 32px;">
            <p style="margin:0 0 20px;font-size:15px;color:#3d3831;line-height:1.6;">
              Hola,<br/><br/>
              Analizaste un texto en <strong>Detector de IA</strong> y el resultado fue <strong>${probability}% de probabilidad de IA</strong>.
              Eso significa que un detector universitario lo marcaría como generado por IA.
            </p>

            <p style="margin:0 0 12px;font-size:14px;font-weight:700;color:#3d3831;">
              Los 3 patrones más comunes que disparan el porcentaje:
            </p>
            <table width="100%" cellpadding="0" cellspacing="0" style="margin-bottom:20px;">
              <tr>
                <td style="padding:10px 14px;background:#fef2f2;border-radius:8px;margin-bottom:8px;font-size:13px;color:#7f1d1d;">
                  <strong>1. Oraciones perfectamente simétricas</strong> — la IA construye frases de longitud similar. Varía el ritmo.
                </td>
              </tr>
              <tr><td style="height:6px;"></td></tr>
              <tr>
                <td style="padding:10px 14px;background:#fef2f2;border-radius:8px;font-size:13px;color:#7f1d1d;">
                  <strong>2. Conectores genéricos</strong> — "en primer lugar", "por otro lado", "en conclusión". Reemplazalos por transiciones más personales.
                </td>
              </tr>
              <tr><td style="height:6px;"></td></tr>
              <tr>
                <td style="padding:10px 14px;background:#fef2f2;border-radius:8px;font-size:13px;color:#7f1d1d;">
                  <strong>3. Voz pasiva excesiva</strong> — "se puede observar que", "es posible destacar que". Usá voz activa y primera persona.
                </td>
              </tr>
            </table>

            <p style="margin:0 0 16px;font-size:14px;color:#6b6258;line-height:1.6;">
              Si necesitás entregar el texto <strong>hoy o mañana</strong>, el Humanizador lo reescribe automáticamente evitando los patrones que detectamos:
            </p>

            <!-- CTA -->
            <table width="100%" cellpadding="0" cellspacing="0">
              <tr>
                <td align="center" style="padding:4px 0 20px;">
                  <a href="https://detectordeia.ai/humanizador"
                     style="display:inline-block;background:#1a1612;color:#f9f7f4;font-size:14px;font-weight:600;text-decoration:none;padding:14px 28px;border-radius:10px;">
                    Humanizar mi texto →
                  </a>
                  <br/>
                  <span style="font-size:11px;color:#9c9089;margin-top:6px;display:block;">
                    Express Pass · $5.99 · 24 horas ilimitado
                  </span>
                </td>
              </tr>
            </table>

            <hr style="border:none;border-top:1px solid #e8e4de;margin:4px 0 20px;"/>
            <p style="margin:0;font-size:12px;color:#9c9089;line-height:1.6;">
              Recibiste este email porque analizaste un texto en detectordeia.ai.<br/>
              <a href="https://detectordeia.ai" style="color:#9c9089;">detectordeia.ai</a> ·
              <!-- Unsubscribe link placeholder — agregar cuando tengas lista de unsub -->
              <a href="https://detectordeia.ai/unsubscribe?email={{email}}" style="color:#9c9089;">Cancelar suscripción</a>
            </p>
          </td>
        </tr>

      </table>
    </td></tr>
  </table>
</body>
</html>`;
    return { subject, html };
  }

  // Variante soft: <70% IA
  const toolLabel = toolType === 'humanizador'
    ? 'humanizaste un texto'
    : toolType === 'parafraseador'
    ? 'parafraseaste un texto'
    : 'analizaste un texto';

  const subject = `Tu resultado de Detector de IA — ${probability}% de probabilidad`;
  const html = `<!DOCTYPE html>
<html lang="es">
<head>
<meta charset="UTF-8"/>
<meta name="viewport" content="width=device-width, initial-scale=1.0"/>
<title>${subject}</title>
</head>
<body style="margin:0;padding:0;background:#f9f7f4;font-family:-apple-system,BlinkMacSystemFont,'Segoe UI',sans-serif;">
  <table width="100%" cellpadding="0" cellspacing="0" style="background:#f9f7f4;padding:32px 16px;">
    <tr><td align="center">
      <table width="100%" cellpadding="0" cellspacing="0" style="max-width:580px;background:#ffffff;border-radius:16px;overflow:hidden;border:1px solid #e8e4de;">

        <!-- Header neutro -->
        <tr>
          <td style="background:#1a1612;padding:24px 32px;">
            <p style="margin:0;font-size:12px;font-weight:600;letter-spacing:0.1em;text-transform:uppercase;color:#9c9089;">
              Tu resultado
            </p>
            <h1 style="margin:8px 0 0;font-size:22px;font-weight:700;color:#f9f7f4;line-height:1.3;">
              ${probability}% de probabilidad de IA
            </h1>
          </td>
        </tr>

        <!-- Body -->
        <tr>
          <td style="padding:28px 32px;">
            <p style="margin:0 0 20px;font-size:15px;color:#3d3831;line-height:1.6;">
              Hola,<br/><br/>
              Hace un momento ${toolLabel} en <strong>detectordeia.ai</strong>. Tu resultado fue <strong>${probability}%</strong> — dentro del rango de baja sospecha.
            </p>

            <p style="margin:0 0 12px;font-size:14px;font-weight:700;color:#3d3831;">
              ¿Qué significa este porcentaje?
            </p>
            <table width="100%" cellpadding="0" cellspacing="0" style="margin-bottom:20px;">
              <tr>
                <td style="padding:10px 14px;background:#f2f8f4;border-radius:8px;font-size:13px;color:#166534;">
                  <strong>0–40%</strong> → Texto con estilo humano predominante. Bajo riesgo de detección.
                </td>
              </tr>
              <tr><td style="height:6px;"></td></tr>
              <tr>
                <td style="padding:10px 14px;background:#fefce8;border-radius:8px;font-size:13px;color:#854d0e;">
                  <strong>40–70%</strong> → Zona gris. Algunos detectores lo marcarían, otros no.
                </td>
              </tr>
              <tr><td style="height:6px;"></td></tr>
              <tr>
                <td style="padding:10px 14px;background:#fef2f2;border-radius:8px;font-size:13px;color:#7f1d1d;">
                  <strong>70–100%</strong> → Alta probabilidad. Los detectores universitarios (Turnitin, etc.) lo marcarían.
                </td>
              </tr>
            </table>

            <p style="margin:0 0 16px;font-size:14px;color:#6b6258;line-height:1.6;">
              Si querés analizar más textos o usar el Humanizador para reducir el porcentaje antes de entregar:
            </p>

            <!-- CTA -->
            <table width="100%" cellpadding="0" cellspacing="0">
              <tr>
                <td align="center" style="padding:4px 0 20px;">
                  <a href="https://detectordeia.ai"
                     style="display:inline-block;background:#1a1612;color:#f9f7f4;font-size:14px;font-weight:600;text-decoration:none;padding:14px 28px;border-radius:10px;">
                    Volver al Detector →
                  </a>
                  <br/>
                  <span style="font-size:11px;color:#9c9089;margin-top:6px;display:block;">
                    Gratis · Sin registro · Resultado en segundos
                  </span>
                </td>
              </tr>
            </table>

            <hr style="border:none;border-top:1px solid #e8e4de;margin:4px 0 20px;"/>
            <p style="margin:0;font-size:12px;color:#9c9089;line-height:1.6;">
              Recibiste este email porque solicitaste guardar tu resultado en detectordeia.ai.<br/>
              <a href="https://detectordeia.ai" style="color:#9c9089;">detectordeia.ai</a> ·
              <a href="https://detectordeia.ai/unsubscribe?email={{email}}" style="color:#9c9089;">Cancelar suscripción</a>
            </p>
          </td>
        </tr>

      </table>
    </td></tr>
  </table>
</body>
</html>`;
  return { subject, html };
}

// ─── Handler ─────────────────────────────────────────────────────────────────

export async function GET(request: NextRequest) {
  // Verificar que viene de Vercel Cron (o de un test manual con header correcto)
  const authHeader = request.headers.get('authorization');
  if (authHeader !== `Bearer ${process.env.CRON_SECRET}`) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  const supabase = getSupabaseAdmin();
  const resend = new Resend(process.env.RESEND_API_KEY);

  // Traer hasta MAX_PER_RUN leads que aún no recibieron email
  const { data: leads, error: fetchError } = await supabase
    .from('email_waitlist')
    .select('id, email, tool_type, result_probability, result_confidence, created_at')
    .is('email_sent_at', null)
    .order('created_at', { ascending: true })
    .limit(MAX_PER_RUN);

  if (fetchError) {
    console.error('[cron/send-lead-emails] Error fetching leads:', fetchError);
    return NextResponse.json({ error: 'DB error' }, { status: 500 });
  }

  if (!leads || leads.length === 0) {
    return NextResponse.json({ sent: 0, message: 'No pending leads' });
  }

  let sent = 0;
  let failed = 0;
  const failedEmails: string[] = [];

  for (const lead of leads) {
    const probability = lead.result_probability ?? 0;
    const isHighRisk = probability >= 70;
    const toolType = lead.tool_type ?? 'detector';

    const { subject, html } = buildEmailHtml({ isHighRisk, probability, toolType });

    try {
      const { error: sendError } = await resend.emails.send({
        from: 'Detector de IA <hola@detectordeia.ai>',
        to: lead.email,
        subject,
        html,
      });

      if (sendError) {
        console.error(`[cron] Error enviando a ${lead.email}:`, sendError);
        failed++;
        failedEmails.push(lead.email);
        continue;
      }

      // Marcar como enviado
      await supabase
        .from('email_waitlist')
        .update({ email_sent_at: new Date().toISOString() })
        .eq('id', lead.id);

      sent++;
    } catch (err) {
      console.error(`[cron] Excepción enviando a ${lead.email}:`, err);
      failed++;
      failedEmails.push(lead.email);
    }
  }

  console.log(`[cron/send-lead-emails] ✅ Enviados: ${sent}, fallidos: ${failed}`);
  return NextResponse.json({ sent, failed, failedEmails: failedEmails.slice(0, 5) });
}
