# Backlog de Producto — detectordeia.ai
**Última sesión:** Lunes 25 mayo 2026  
**Próxima revisión:** A definir  
**Criterio de priorización:** impacto en revenue directo

---

## PARA RETOMAR EN LA PRÓXIMA SESIÓN — LEÉ ESTO PRIMERO

### Lo que hicimos el 25 mayo (sesión de datos + producto)

Sesión de revisión de métricas post-lanzamiento y mejoras de conversión.

**Datos revisados:**

| Pregunta | Respuesta |
|---|---|
| ¿Respondió alguien de los 10 emails? | No. Ninguno. |
| ¿Se vendió algún Semestral? | No. Cero ventas desde el lanzamiento el 18 mayo. |
| ¿Subió el tráfico al humanizador? | +23.53% usuarios, -1.47% vistas. Más gente llega pero rebota más rápido. |
| ¿Subió el tráfico general? | Sí. +16% usuarios, +16% vistas. |
| ¿Subió /pricing? | **+53.85% usuarios** — el botón mobile del 20 mayo funciona. |
| ¿Cambiaron los checkout_started? | Bajaron: ~1-2/día vs baseline de 3-4/día. |
| ¿Checkouts anónimos? | 1 solo. El fix del flujo anónimo existía pero con demasiada fricción. |
| ¿Checkouts de Semestral? | Cero. |

**Ventas reales esta semana (6 Express 24h):**
- jonathan.garcia1361@alumnos.udg.mx (activo hasta 26 may)
- nicolashernandeztejero@gmail.com
- imartinez.mpfn@gmail.com
- lisrh9@gmail.com
- chamalejuancarlos849@gmail.com
- isaac.pucllas@gmail.com

**Bug encontrado y corregido:**
- `analytics_events` no tenía ningún evento `checkout_completed` — el webhook de Stripe nunca lo logueaba. Ya corregido: commit `da0bb4f`. A partir de ahora cada compra queda registrada con `plan_type`, `express_plan`, `session_id` y `hours`.

**Lectura del funnel (18-25 mayo):**
```
234  completed_analysis
231  upsell_modal_shown
 94  pricing_page_visited
 82  upsell_modal_dismissed
 11  checkout_started
  6  compras reales (solo visible cruzando users table)
  0  checkout_completed  ← ya corregido
```
Conversión checkout_started → compra: ~55%. El problema no es el cierre, es el volumen que llega al botón.

**Cambios de producto deployados (commit `5fb5c94`):**

| Cambio | Detalle |
|---|---|
| Guest checkout | Usuarios anónimos van directo a Stripe sin registro. El webhook crea la cuenta con `inviteUserByEmail` si el email no existe. |
| Email de invitación | Template en español configurado en Supabase → Authentication → Email Templates → Invite User. Subject: "Tu acceso a DetectordeIA está listo". |
| Escape hatch eliminado | Bloque "Podés empezar gratis hoy..." al pie de /pricing ya no existe. Mandaba gente de vuelta a home. |

**Estado del users table (express_plan activos históricos):**
- `24h`: 38 usuarios
- `7d`: 2 usuarios
- `full`: 1 usuario (Laura — Premium)

---

### Las preguntas correctas para la próxima sesión

**1. ¿Subió el volumen de checkout_started post-guest-checkout?**
Ahora que no hay fricción de registro, ¿llegan más anónimos a Stripe?
```sql
SELECT DATE(created_at) as fecha, COUNT(*) as total,
  metadata->>'plan_type' as plan,
  metadata->>'guest_checkout' as guest
FROM analytics_events
WHERE event_type = 'checkout_completed'
  AND created_at >= '2026-05-25'
GROUP BY fecha, plan, guest ORDER BY fecha;
```

**2. ¿Apareció algún checkout_completed registrado?**
Primera métrica real de conversión end-to-end.

**3. ¿Hay usuarios creados via guest checkout?**
```sql
SELECT email, express_plan, express_expires_at, created_at
FROM users
WHERE created_at >= '2026-05-25'
ORDER BY created_at DESC;
```

**4. ¿Sigue sin venderse el Semestral?**
Si para el 9 junio sigue en cero, hay que repensar el precio o la presentación.

---

## PARA RETOMAR EL LUNES 25 — ARCHIVADO (ya revisado)

### Lo que hicimos el 22 mayo (sesión de branding/diseño)

Sesión enfocada 100% en identidad visual. Sin cambios funcionales ni de producto. El objetivo era despegarnos del look "vibecodeado" y acercarnos a la seriedad de QuillBot — suite académica consolidada en español.

**Sistema visual aplicado (de Claude Design):**
- **Paleta:** papel crema (`#F7F5EF`), verde biblioteca (`#3B6E55`), tinta (`#1A1D24`). Cero azul naval, cero blanco puro.
- **Tipografía:** Source Serif 4 (titulares) + Geist (body) + Geist Mono (labels/métricas)
- **Assets:** carpeta `public/brandidentity-detectordeia/` con logos SVG, favicons, OG image, webmanifest

**Archivos modificados (resumen por capa):**

| Capa | Archivos | Qué cambió |
|---|---|---|
| Fundación CSS | `globals.css` | Tokens CSS completos, fuentes nuevas, eliminadas animaciones vibecoded (floatAround, pulse-glow, shimmer) |
| Shell global | `layout.tsx` | Head: favicon SVG verde, OG tags, theme-color. Footer: tinta oscuro, logo SVG blanco |
| Navegación | `AppSidebar`, `AppTopBar`, `MobileBottomNav` | Sidebar tinta + logo SVG. TopBar papel crema + logo color. Active state → verde |
| Landing pages | `HomePageClient`, `PricingPageClient` | Titulares serif, CTAs verde, fondos papel. Semestral card → verde-deep |
| Templates pSEO | `ComparisonPageClient`, `UniversityPageClient`, `GuidePageClient` | Cubre ~50+ páginas generadas. Eliminado violet/blue, unificado a verde/tinta |
| Páginas regionales | `mx`, `es`, `ar`, `co`, `cl`, `pe` | Colores por región unificados (antes cada uno tenía su color) |
| Interfaces de herramienta | `DetectorMain`, `HumanizadorMain`, `ParafraseadorMain` | Blue-900 → verde, gray → papel, PREMIUM badge → EXPRESS |
| Páginas de herramienta | `HumanizadorClient`, `ParafraseadorClient` | Secciones SEO (¿Por qué usar?, ¿Cómo funciona?) — mismos colores |
| Componentes de soporte | `ExpressPremiumComparisonCard`, `UsageLimitOverlay`, `CharacterLimitModal`, `PremiumUpsellBlock`, `PremiumUpsellCompact`, `SuccessClient` | Azul naval → verde/tinta |
| Datos comparativas | `src/lib/pseo/comparisons.ts` | 69 ocurrencias de "$12.99/mes" y "Premium" → precios reales actuales |
| Copy disperso | Varios | "Premium" → "Express/Semestral" en todos los textos visibles al usuario |

**Lo que se mantuvo intencionalmente:**
- Banner naranja `ExpressPromoBanner.tsx` — el usuario quiere que llame la atención, se deja amber/orange
- Backend de Laura (suscripción Premium) — sin tocar
- Lógica funcional de cualquier tipo — esta sesión fue 100% visual

**Fix adicional:**
- 2 links rotos en footer: `/detector-de-ia-universidad/unam` → `universidad-nacional-mexico` y `/pontificia-universidad-javeriana` → `universidad-javeriana`. Escáneo completo confirmó que no hay más slugs rotos en los 139 slugs del sitio.

**Commits de esta sesión:**
```
dbcef91 fix(footer): corregir slugs rotos de universidades en footer
31ec521 fix(brand): aplicar brand a secciones SEO de HumanizadorClient y ParafraseadorClient
a951b5c feat(brand): consistencia visual integral — eliminar azul-naval en todo el sitio
99cee16 fix(ui): corregir títulos ocultos en fondos oscuros y mejorar card Semestral
603cf25 fix(ui): badge Más Popular más llamativo en card Semestral
dd1867e fix(brand): logos SVG visibles — embeber estilos y corregir dimensiones
1e51e74 fix(copy): eliminar todas las menciones visibles a Premium del sitio público
90c468b fix(copy): eliminar menciones a Premium de upsell blocks y detector
a982395 feat(brand): aplicar nuevo sistema visual completo
```

---

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
| Navbar mobile | Botón "Planes" (amber) siempre visible en mobile. El componente real es `AppTopBar.tsx` (no `Header.tsx`). El link tenía `hidden md:inline-flex` — visible solo en desktop. |

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
- **Semestral Pass:** $0 (lanzado 18 mayo · ahora 6 meses · sin ventas aún)
- **Tráfico:** 70-120 usuarios/día · 97% primera visita · **86% desktop · 14% mobile** (sin acceso a /pricing hasta el 20 mayo)
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

### ✅ Guest checkout (implementado 25 mayo)
Usuarios anónimos ya pueden comprar sin registrarse. Ver commits `da0bb4f` y `5fb5c94`.

---

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
- Por qué churnearon los suscriptores → no hay offboarding survey. Premium retirado de UI pero el aprendizaje sigue siendo válido
- Fuente de los picos de tráfico Apr 28-29 y May 3-5 → revisar GSC
- Si el Semestral va a tener tracción → medir hasta el 9 junio para tener datos limpios. Hasta el 25 mayo: cero ventas.
- Si el guest checkout mejora el volumen de checkout_started → medir en la próxima sesión (baseline: 1-2/día con fricción de registro)
- Por qué el checkout_started bajó del baseline (3-4/día) a 1-2/día a pesar de +54% en /pricing → hipótesis: el tráfico mobile nuevo es más casual (llegó por el botón de nav, no por haber tocado el límite)
- Qué hacer con Laura si cancela → contacto manual, ofrecer Semestral $24.99 (cubre 6 meses vs los ~$13 que le quedan de su mes actual)
