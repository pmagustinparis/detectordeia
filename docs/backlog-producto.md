# Backlog de Producto — detectordeia.ai
**Criterio de priorización:** impacto en revenue directo  
**Contexto:** Análisis basado en datos reales de Supabase, Stripe y Google Analytics

---

## Estado del negocio (18 mayo 2026)

- **750 usuarios** registrados · 99.2% free · 0.8% premium
- **MRR actual: $12.99** (1 suscripción activa)
- **Revenue histórico total:** ~$230 desde nov 2025 (~$35/mes promedio)
- **Express Pass** genera más revenue acumulado que suscripciones ($102 vs $91)
- **Churn suscripciones: 100%** en el primer mes
- **Tráfico:** 70-120 usuarios únicos/día · 97% primera visita · 86% desktop
- **Adquisición:** 72% Google orgánico · ChatGPT envía 223 sesiones/mes
- **Perfil:** 64% estudiantes universitarios · 12% docentes · español nativo
- **Geografía:** España 38% · México 15% · Perú 10% · Colombia 7%

---

## Herramientas y planes (pre-18 mayo)

| Herramienta | Usos/mes | Bounce en su página |
|---|---|---|
| Detector | 1,337 usos · 651 usuarios | — (es la home) |
| Humanizador | 154 usos · 57 usuarios | 13% |
| Parafraseador | 63 usos · 19 usuarios | 23% |
| Citador | — | 9% |

| Plan | Precio | Ventas históricas |
|---|---|---|
| Express 24h | $3.99 one-time | 22 |
| Express 7 días | $8.99 one-time | 4 |
| Semestral Pass | $24.99 one-time | **NUEVO** |
| Premium Mensual | $12.99/mes | 6 creadas, todas churnearon |
| Premium Anual | $10.39/mes | 0 |

---

## ✅ SPRINT 18 MAYO 2026 — TODO LO QUE ENTRÓ EN PRODUCCIÓN

### Sin código
- **T0-1** — Emails manuales a 6 power users activos (gisella, escritora, leo, sanmartin, cmpaclauuuu, 948692@unizar.es)
- **T0-2** — Emails a 4 checkout abandonados recientes (maria.cepeda, halvaradoa2, sanchezdebenito, vanessaaraya)

### Conversión directa
- **T1-1** — Dashboard: label historial dinámico por plan (free vs premium)
- **T1-2** — ExpressPromoBanner: restaurado a naranja/amber (era azul)
- **T1-3** — pSEO: 9 slugs duplicados eliminados (148 → 139 universidades únicas) + 139 páginas de Citador por universidad creadas (556 páginas pSEO en total)
- **T1-4** — Fix crítico: flujo anónimo modal → signup → checkout. El flag `pending_plan_type` ahora se consume correctamente después del OAuth via `?next=/pricing`
- **T1-5** — Banner Express reaparece automáticamente cuando el usuario choca con un límite (custom event `express-limit-exceeded`)
- **T1-6** — Cross-sell Detector → Humanizador: threshold 60% → 50%, colores violet → amber, copy con % exacto y urgencia

### Nuevo producto
- **T2-1** — Semestral Pass $24.99 (4 meses · pago único · sin renovación). Pricing page rediseñada (705 → 270 líneas). Semestral como "MÁS POPULAR" en el centro.

---

## 📊 MEDICIÓN — Qué mirar y cuándo

### Revisión 1 — Lunes 25 mayo (7 días)

**Emails (T0-1, T0-2):**
- ¿Cuántas respuestas recibiste de los 10 emails?
- ¿Alguna conversión directa?
- Métrica: respuestas ≥ 3 = bueno · conversiones ≥ 1 = excelente

**Semestral Pass (T2-1):**
- ¿Se vendió alguno? Revisar Stripe → Products → Semestral Pass
- ¿Hay `checkout_started` con `plan_type: semestral` en Supabase?
- Métrica objetivo: 1 venta en los primeros 7 días

**Fix flujo anónimo (T1-4):**
```sql
SELECT COUNT(*) FROM analytics_events 
WHERE event_type = 'checkout_started' 
AND created_at >= '2026-05-18'
AND metadata->>'plan_type' = 'express';
```
Comparar con la semana anterior. Si subió → el fix funcionó.

**Cross-sell humanizador (T1-6):**
- En GA4: sesiones a `/humanizador` esta semana vs semana anterior
- Métrica: aumento ≥ 20% en sesiones al humanizador

---

### Revisión 2 — Lunes 9 junio (3 semanas)

**Revenue total:**
- Comparar ingresos semana 19-25 mayo vs 26 mayo-9 junio
- Métrica objetivo: ≥ $50 de revenue en los 3 primeros semanas post-lanzamiento

**Semestral Pass:**
- ¿Cuántas ventas acumuladas?
- ¿Quiénes compraron? (perfil: España/LatAm, uso previo del detector)
- Métrica objetivo: 3-5 ventas en 3 semanas

**Express Pass:**
- ¿Cambió la tasa de ventas semanales? (baseline: ~3-4/semana)
- ¿Algún efecto del banner que reaparece al chocar con límite?

**Humanizador:**
- ¿Creció el tráfico al humanizador?
- ¿Creció la conversión de humanizador a Express Pass?

**Emails de power users:**
- ¿Alguno de los 6 convirtió en las 3 semanas? Revisar en Supabase por email.

---

### Revisión 3 — Lunes 29 junio (fin de semestre España)

**La pregunta central:** ¿el Semestral Pass captura el pico de fin de semestre?

El calendario académico español cierra exámenes en junio. Si el Semestral tiene tracción, debería verse un pico de ventas en la segunda quincena de junio — estudiantes que entran en modo exámenes y pagan por el semestre completo antes de que empiece el nuevo período.

**Métricas a revisar:**
- Revenue total mayo 18 → junio 29 vs igual período del año anterior (no tenemos, pero sirve como baseline futuro)
- Distribución de ventas por tipo: Express 24h / Express 7d / Semestral / Premium
- País de las conversiones: ¿España o LatAm lidera el Semestral?

---

## 🔜 PENDIENTE — Próximas semanas (mediano plazo)

### T2-2 · Email capture post-resultado (anónimos) ← PRÓXIMO
**Por qué es el más importante a mediano plazo:** Sin emails de usuarios anónimos no hay retargeting, no hay secuencias de conversión, no hay nada. El 97% del tráfico se va sin dejar nada. Es la base de todo el revenue futuro.

**Propuesta:** Después del primer análisis de un usuario anónimo, mostrar inline (no modal bloqueante): *"¿Querés guardar este análisis? Solo tu email."* Input + botón. Sin contraseña.

**Flujo:** email → tabla `email_waitlist` → secuencia automática (24h, 7d)  
**Esfuerzo:** 2-3 días  
**Impacto:** Capturar 20-30 emails/semana de usuarios que ya obtuvieron valor

---

### T2-3 · Flujo de cancelación — oferta antes de churnear
Cuando un usuario cancela en Stripe, email automático inmediato: *"Antes de irte — ¿querés 2 semanas gratis?"*  
**Esfuerzo:** 1 día (webhook Stripe + email)  
**Impacto:** Rescatar 20-30% de churns

---

### T2-4 · Métodos de pago latinoamericanos
Múltiples pagos fallidos por `transaction_not_allowed` desde Colombia, Guatemala, Bolivia. Habilitar OXXO (México), PSE (Colombia), MercadoPago.  
**Esfuerzo:** 3-5 días  
**Impacto:** Desbloquear revenue de usuarios que quieren pagar pero su banco rechaza USD

---

### T3-1 · Secuencia email checkout abandonado (automatizada)
Si `checkout_started` sin pago en 24h → email automático. Requiere Resend + trigger Supabase.  
**Esfuerzo:** 1 semana

---

### T3-2 · Trust signals en home
23% de los que no se registran dicen "No confío en el sitio aún". Contador dinámico de análisis, logos de universidades, línea de "creado por".  
**Esfuerzo:** 1-2 días

---

### T3-3 · Investigar picos de tráfico (Apr 28-29, May 3-5)
2x usuarios esos días vs baseline. Revisar GSC y calendario académico.  
**Esfuerzo:** 2 horas

---

### T3-4 · Decisión: History para usuarios Express
Express users reciben límites free de historia (10/7d). Decidir si merecen extendido (30/14d).  
**Esfuerzo:** 1-2 horas

---

## TIER 4 — Cuando haya más volumen

- **T4-1** · Detección en lote para docentes ($24-49/mes, uso mensual recurrente)
- **T4-2** · Página de profesor reescrita (69% bounce actual)
- **T4-3** · Rankear humanizador y parafraseador universidad en SEO
- **T4-4** · Generador de Citas — mejorar discovery desde pSEO

---

## Datos clave

### Power users contactados el 18 mayo (seguimiento)
| Email | Usos totales | Usos esa semana | Respondió | Convirtió |
|---|---|---|---|---|
| gisella.ceballos24@gmail.com | 40 | 12 | — | — |
| escritora1506@gmail.com | 40 | 9 | — | — |
| leodominguezgarcia007@gmail.com | 27 | 7 | — | — |
| sanmartinnoa@gmail.com | 22 | 7 | — | — |
| cmpaclauuuu@gmail.com | 19 | 19 | — | — |
| 948692@unizar.es | 15 | 15 | — | — |

### Checkout abandonados contactados el 18 mayo
| Email | Intentos | Respondió | Convirtió |
|---|---|---|---|
| maria.cepeda.m@gmail.com | 2 | — | — |
| halvaradoa2@miumg.edu.gt | 2 | — | — |
| sanchezdebenito82@gmail.com | 2 | — | — |
| vanessaaraya179@gmail.com | 8 | — | — |

### Fuentes de referral inesperadas (monitorear)
- **chatgpt.com**: 223 sesiones/mes orgánicas
- **perplexity.ai + copilot.com**: 25 sesiones — AI search como canal emergente
- **plataformavirtual.iugna.edu.ar**: universidad argentina que compartió el link

### Pagos latinoamericanos fallidos (revenue perdido)
`transaction_not_allowed`, `try_again_later`, `incorrect_number` — Colombia, Guatemala, Bolivia, Perú. Atacar con métodos de pago locales en T2-4.

---

## Lo que NO sabemos todavía

- Keywords exactas de tráfico orgánico → revisar GSC directamente
- Por qué churnearon los suscriptores → no hay offboarding survey
- Tasa de conversión anónimo → Express/Semestral → no hay evento que trackee el journey completo
- Uso real de file upload entre usuarios premium
- Fuente de los picos de tráfico de Apr 28-29 y May 3-5
