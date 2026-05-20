# Backlog de Producto — detectordeia.ai
**Última sesión:** Miércoles 20 mayo 2026  
**Próxima revisión:** Lunes 25 mayo 2026  
**Criterio de priorización:** impacto en revenue directo

---

## PARA RETOMAR EL LUNES 25 — LEÉ ESTO PRIMERO

### Lo que hicimos el 20 mayo (sesión de producto)

Sesión de decisiones de producto y ajustes. Sin análisis de datos nuevos (eso va el 25).

**Decisiones tomadas:**
- El Semestral Pass duraba 4 meses pero se llamaba "Semestral" → inconsistencia. Se extendió a 6 meses reales.
- El plan Premium ($12.99/mes y $124.68/año) se retiró de toda la UI. Razón: 2×Semestral=$49.98/año vs Premium anual=$124.68, mismas funcionalidades. No tiene sentido vender la suscripción. Laura (única suscriptora) sigue activa — el backend no se tocó.
- La oferta pública queda en dos opciones únicamente: **Express Pass** (24h/7d) y **Semestral Pass** (6 meses).

**Lo que pusimos en producción:**

| Item | Descripción |
|---|---|
| Semestral 4→6 meses | Duración extendida de 2880h a 4380h. Precio igual ($24.99). Ahorro mensualizado: 52%→68% vs mensual |
| Premium retirado de UI | 27 archivos, 202 líneas eliminadas. Modales, pricing page, FAQs, SEO/pSEO, términos, banners, dashboard |
| Navbar mobile | Botón "Ver planes" (amber) siempre visible en mobile + hamburguesa. Antes no había acceso a planes desde mobile |

**Lo que NO cambió (sesión del 18 mayo):**
- Fix bug auth · Pricing page rediseñada · Cross-sell · Banner Express · pSEO · Dashboard historial · Emails enviados

Ver detalles del 18 mayo en git log (`a7c246e` hacia atrás).

---

### Las preguntas correctas para el lunes 25

> **Nota:** las preguntas 2, 4 y 5 siguen igual. Se agrega la pregunta 6 por los cambios del 20 mayo.

**1. ¿Respondió alguien de los 10 emails?**
Revisá tu bandeja. Si hay respuestas, son conversiones potenciales. Respondé de inmediato y ofrecé el Semestral a $24.99 o el Express Pass con 30% off si no lo compraron.

**2. ¿Se vendió algún Semestral Pass?**
Stripe → Products → Semestral Pass → ver ventas. También en Supabase:
```sql
SELECT u.email, u.express_plan, u.express_expires_at, u.created_at
FROM users u
WHERE u.express_plan = 'semestral'
ORDER BY u.created_at DESC;
```

**3. ¿Subió el tráfico al humanizador?**
GA4 → comparar sesiones a `/humanizador` esta semana vs semana anterior. Referencia: 154 usos/mes antes del cambio.

**4. ¿Cambiaron los checkout_started?**
```sql
SELECT DATE(created_at) as fecha, COUNT(*) as checkouts,
  metadata->>'plan_type' as plan
FROM analytics_events
WHERE event_type = 'checkout_started'
  AND created_at >= '2026-05-18'
GROUP BY fecha, plan
ORDER BY fecha;
```
Comparar con baseline previo: ~3-4 checkouts/día.

**5. ¿Alguna conversión directa del fix del flujo anónimo?**
```sql
SELECT COUNT(*) FROM analytics_events
WHERE event_type = 'checkout_started'
  AND created_at >= '2026-05-18'
  AND metadata->>'is_authenticated' = 'false';
```
Si hay checkouts de usuarios no autenticados → el fix de `?next=/pricing` está funcionando.

**6. ¿Apareció algún checkout de Semestral después del 20 mayo?**
```sql
SELECT DATE(created_at) as fecha, COUNT(*) as total,
  metadata->>'plan_type' as plan
FROM analytics_events
WHERE event_type = 'checkout_started'
  AND created_at >= '2026-05-20'
  AND metadata->>'plan_type' = 'semestral'
GROUP BY fecha, plan ORDER BY fecha;
```
Si hay checkouts de Semestral → la pricing page simplificada (solo 2 opciones) está convirtiendo mejor.

---

## ESTADO DEL NEGOCIO (baseline 18 mayo 2026)

- **750 usuarios** registrados · 99.2% free · 0.8% premium
- **MRR: $12.99** (lauraperezdoval@usal.es — única suscripción activa)
- **Revenue total histórico:** ~$230 desde nov 2025
- **Express Pass:** $102 acumulado (44% del revenue total) — el modelo que funciona
- **Semestral Pass:** $0 (lanzado hoy)
- **Tráfico:** 70-120 usuarios/día · 97% primera visita · 86% desktop
- **Adquisición:** 72% Google orgánico · ChatGPT 223 sesiones/mes (orgánico)
- **Perfil:** 64% estudiantes universitarios · 12% docentes · español nativo
- **Geografía:** España 38% · México 15% · Perú 10% · Colombia 7%
- **Churn suscripciones:** 100% en primer mes

---

## SEGUIMIENTO DE EMAILS ENVIADOS EL 18 MAYO

### Power users contactados
| Email | Usos totales | Usos esa semana | Respondió | Convirtió |
|---|---|---|---|---|
| gisella.ceballos24@gmail.com | 40 | 12 | — | — |
| escritora1506@gmail.com | 40 | 9 | — | — |
| leodominguezgarcia007@gmail.com | 27 | 7 | — | — |
| sanmartinnoa@gmail.com | 22 | 7 | — | — |
| cmpaclauuuu@gmail.com | 19 | 19 | — | — |
| 948692@unizar.es | 15 | 15 | — | — |

### Checkout abandonados contactados
| Email | Intentos checkout | Respondió | Convirtió |
|---|---|---|---|
| maria.cepeda.m@gmail.com | 2 | — | — |
| halvaradoa2@miumg.edu.gt | 2 | — | — |
| sanchezdebenito82@gmail.com | 2 | — | — |
| vanessaaraya179@gmail.com | 8 | — | — |

---

## PLANES Y PRECIOS (estado actual)

| Plan | Precio | Tipo | Implementado |
|---|---|---|---|
| Free sin registro | $0 | — | ✅ |
| Free registrado | $0 | — | ✅ |
| Express 24h | $3.99 | One-time | ✅ |
| Express 7 días | $8.99 | One-time | ✅ |
| **Semestral Pass** | **$24.99** | **One-time · 6 meses** | **✅** |
| ~~Premium Mensual~~ | ~~$12.99/mes~~ | ~~Recurrente~~ | ⚠️ funcional solo para Laura |
| ~~Premium Anual~~ | ~~$10.39/mes ($124.68)~~ | ~~Recurrente~~ | ⚠️ funcional solo para Laura |

**Price IDs Stripe:**
- Express 24h: `price_1ScR9nR5MbTVVQlk2oIBvATK`
- Express 7d: `price_1Sho71R5MbTVVQlkSbXwgWmk`
- Semestral: `price_1TYc1rR5MbTVVQlkQUg8LXhN`
- Premium mensual: `price_1ScRCOR5MbTVVQlkQkuJDJxi`
- Premium anual: `price_1ScUSzR5MbTVVQlklglZnaQp`

---

## BACKLOG PENDIENTE — ordenado por impacto revenue

### 🔜 T2-2 · Email capture post-resultado ← PRÓXIMO A IMPLEMENTAR

**Por qué es el más importante a mediano plazo:**
Sin emails de usuarios anónimos no hay retargeting, no hay secuencias, no hay revenue futuro. El 97% del tráfico se va sin dejar nada. Con ~100 usuarios nuevos/día y 97% anónimos, estamos perdiendo ~30-40 emails diarios de personas que ya probaron el producto.

**Qué construir:**
Después del primer análisis completado por un usuario anónimo, mostrar inline (NO modal bloqueante):
> *"¿Querés guardar este resultado? Solo tu email."*

Input de email + botón. Sin contraseña, sin fricción. El email va a la tabla `email_waitlist` y dispara una secuencia automática.

**Decisiones a tomar antes de implementar:**
- ¿Cuándo aparece? (después del primer análisis, o después de N análisis)
- ¿Qué email se manda a las 24hs? (redactar el copy)
- ¿Qué plataforma de email? (Resend ya está configurado en el proyecto)

**Esfuerzo:** 2-3 días | **Impacto:** 20-30 emails/semana de usuarios con valor probado

---

### ~~T2-3 · Flujo de cancelación~~ — deprioritizado

~~Con el modelo de suscripción retirado de la UI, este item pierde sentido. El único usuario con suscripción activa (Laura) será contactado manualmente si cancela y se le ofrecerá migrar al Semestral.~~

---

### T2-4 · Métodos de pago latinoamericanos

Múltiples pagos fallidos confirmados en Stripe: `transaction_not_allowed`, `try_again_later` desde Colombia, Guatemala, Bolivia, Perú. Son usuarios que QUIEREN pagar y el banco los bloquea en USD.

**Solución:** Habilitar en Stripe: OXXO (México), PSE (Colombia), MercadoPago (Argentina/LatAm).
**Esfuerzo:** 3-5 días | **Impacto:** desbloquear revenue de usuarios que hoy no pueden pagar

---

### T3-1 · Secuencia email checkout abandonado (automatizada)

Si `checkout_started` no tiene pago completado en 24h → email automático. Requiere Resend + trigger en Supabase o webhook de Stripe.
**Esfuerzo:** 1 semana

---

### T3-2 · Trust signals en home

23% de encuestados dijeron "No confío en el sitio aún". La home no tiene contadores, ni reseñas, ni señales de credibilidad más allá de los badges de "Sin registro / 100% privado".

**Propuesta:** contador dinámico de análisis realizados (ya tenés el dato en Supabase), logos de universidades reales, línea de "creado por".
**Esfuerzo:** 1-2 días

---

### T3-3 · Investigar picos de tráfico (Apr 28-29, May 3-5)

GA4 mostró 2x usuarios esos días vs baseline (106-120 vs 63-85). Puede ser periodo de parciales, mención en foro académico, contenido viral. Si la fuente es replicable, es el mejor dato de acquisition del producto.
**Acción:** revisar Google Search Console para esas fechas específicas.
**Esfuerzo:** 2 horas

---

### T3-4 · History para usuarios Express 24h y 7d

Actualmente Express 24h y 7d reciben límites de historial free (10/7d). El Semestral ya fue corregido y recibe límites premium. ¿Deben Express 24h y 7d recibir historial extendido durante su período activo? Decidir y documentar.
**Esfuerzo:** 1-2 horas si se decide que sí

---

## TIER 4 — Cuando haya más volumen

- **T4-1** · Detección en lote para docentes (único segmento con uso mensual recurrente real, WTP $24-49/mes)
- **T4-2** · Página `/detector-de-ia-para-profesores` reescrita (69% bounce actual, copy equivocado)
- **T4-3** · Rankear humanizador y parafraseador universidad en SEO (páginas existen, no rankean)
- **T4-4** · Discovery del Citador desde pSEO (páginas APA/MLA con 200+ sesiones no llevan a la herramienta)

---

## DATOS TÉCNICOS PARA LA PRÓXIMA SESIÓN

### Conexión a Supabase (MCP ya configurado)
```bash
claude mcp list  # verificar que "supabase" aparece como Connected
```
Si no aparece: `claude mcp add supabase --transport stdio -- npx -y @supabase/mcp-server-supabase@latest --access-token [TOKEN] --project-ref lmppnbfedhxxkykcxzyk`

**Nota de seguridad:** El token que usamos el 18 mayo fue compartido en el chat. Si querés regenerarlo, ir a [supabase.com/dashboard/account/tokens](https://supabase.com/dashboard/account/tokens), revocar el anterior, y configurar el nuevo en `~/.claude.json`.

### Conexión a Google Analytics
GA4 Property ID: `489921188`  
Necesita token OAuth renovado (expira en 1 hora). Obtener en [developers.google.com/oauthplayground](https://developers.google.com/oauthplayground) con el scope `https://www.googleapis.com/auth/analytics.readonly`.

Luego usar:
```bash
curl -s -X POST "https://analyticsdata.googleapis.com/v1beta/properties/489921188:runReport" \
  -H "Authorization: Bearer [TOKEN]" \
  -H "Content-Type: application/json" \
  -d '{"dateRanges":[{"startDate":"2026-05-18","endDate":"today"}],...}'
```

### Queries de Supabase más usadas

**Revenue por semana:**
```sql
SELECT DATE_TRUNC('week', created_at) as semana, COUNT(*) as nuevos
FROM users WHERE created_at >= NOW() - INTERVAL '30 days'
GROUP BY semana ORDER BY semana;
```

**Usuarios Semestral activos:**
```sql
SELECT email, express_plan, express_expires_at FROM users
WHERE express_plan = 'semestral' AND express_expires_at > NOW();
```

**Funnel de conversión:**
```sql
SELECT event_type, COUNT(*) as total
FROM analytics_events
WHERE created_at >= '2026-05-18'
GROUP BY event_type ORDER BY total DESC;
```

---

## LO QUE NO SABEMOS TODAVÍA

- Keywords exactas de tráfico orgánico → revisar GSC directamente (el Data API de GA4 no las exporta)
- Por qué churnearon los suscriptores → no hay offboarding survey. Pendiente agregar pregunta de cancelación en Stripe
- Efecto real del fix del flujo anónimo → medir en la revisión del 25 mayo
- Fuente de los picos de tráfico Apr 28-29 y May 3-5 → revisar GSC
- Si el Semestral va a tener tracción → medir hasta el 9 junio para tener datos limpios
