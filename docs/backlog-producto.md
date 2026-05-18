# Backlog de Producto — detectordeia.ai
**Última actualización:** Mayo 2026  
**Contexto:** Análisis basado en datos reales de Supabase, Stripe y Google Analytics

---

## Contexto del negocio

- **750 usuarios** registrados · 99.2% free · 0.8% premium
- **MRR actual: $12.99** (1 suscripción activa tras churns de mayo)
- **Revenue histórico total:** ~$230 desde nov 2025
- **Express Pass** genera más revenue acumulado que suscripciones ($102 vs $91)
- **Tráfico:** 70-120 usuarios únicos/día · 97% primera visita · 86% desktop
- **Adquisición:** 72% Google orgánico · ChatGPT envía 223 sesiones/mes
- **Perfil:** 64% estudiantes universitarios · 12% docentes · español nativo
- **Geografía:** España 38% · México 15% · Perú 10% · Colombia 7%
- **Churn suscripciones:** 100% en el primer mes (patrón de uso puntual, no mensual)

---

## Herramientas actuales

| Herramienta | Usos/mes | Usuarios únicos | Bounce en su página |
|---|---|---|---|
| Detector | 1,337 | 651 | — (es la home) |
| Humanizador | 154 | 57 | 13% |
| Parafraseador | 63 | 19 | 23% |
| Citador | — | — | 9% |

---

## Planes actuales

| Plan | Precio | Tipo |
|---|---|---|
| Free sin registro | $0 | Límites estrictos |
| Free registrado | $0 | Límites estrictos |
| Express 24h | $3.99 | One-time |
| Express 7 días | $8.99 | One-time |
| Premium Mensual | $12.99/mes | Recurrente |
| Premium Anual | $10.39/mes ($124.68) | Recurrente |

---

## TIER 1 — Esta semana (mínimo código, impacto directo)

### T1-1 · Fix label hardcodeado en Dashboard ✅ DONE
Label del historial ahora muestra `(Últimos 100 usos · 30 días)` a usuarios premium y `(Últimos 10 usos · 7 días)` a free.

### T1-2 · ExpressPromoBanner — restaurar naranja ✅ DONE
**Problema:** El banner de Express Pass en páginas de universidad y herramientas era naranja/amber, quedó azul en algún commit intermedio. El modal (`ExpressUnlockModal`) sigue naranja — hay inconsistencia visual.  
**Fix:** Cambiar `bg-blue-50 / border-blue-200 / bg-blue-900 / text-blue-900` → `bg-amber-50 / border-amber-200 / gradient orange-amber / text-amber-900` en `ExpressPromoBanner.tsx`.  
**Esfuerzo:** 15 min  
**Impacto:** Consistencia visual, mayor visibilidad del Express Pass

### T1-3 · Decisión: History para usuarios Express
**Situación:** `getUserHistory()` en `usageStats.ts:136` verifica `plan_type === 'premium'`. Los usuarios con Express activo tienen `plan_type = 'free'`, por lo que obtienen límites free (10 usos / 7 días) aunque pagaron.  
**Decisión pendiente:** ¿Express users deben tener history extendido? Propuesta: 30 usos / 14 días como tier intermedio.  
**Esfuerzo:** 1-2 horas  
**Impacto:** Retención Express, diferenciación de planes

### T1-4 · Emails manuales a power users activos (sin código)
**Usuarios con uso esta semana en free:**
- gisella.ceballos24@gmail.com (12 usos esta semana)
- escritora1506@gmail.com (9 usos)
- leodominguezgarcia007@gmail.com (7 usos)
- sanmartinnoa@gmail.com (7 usos)
- cmpaclauuuu@gmail.com (19 usos esta semana, nuevo)
- 948692@unizar.es (15 usos esta semana, Universidad de Zaragoza)

**Acción:** Email personal del fundador, 4 líneas, oferta 30% off primer mes o Express Pass.  
**Esfuerzo:** 1 hora  
**Impacto:** 1-2 conversiones inmediatas

---

## TIER 2 — Próximas 2 semanas (conversion + acquisition)

### T2-1 · Plan Semestral
**Por qué:** El 100% de suscripciones mensuales churnearon en el primer mes. Los estudiantes usan el producto intensamente durante períodos de entrega, no todos los meses igual. Un semestre es la unidad natural de compromiso académico.  
**Propuesta:** $29.99 por 4 meses (~$7.50/mes equivalente). Frame: *"Para todo el semestre, sin interrupciones."*  
**Implementación:**
1. Crear producto en Stripe ($29.99, 4 meses)
2. Agregar a pricing page entre Express 7d y Premium Mensual
3. Copy específico para estudiantes
4. Decidir si el Express 7d ($8.99) sigue teniendo sentido con este nuevo tier

**Esfuerzo:** 2-3 días  
**Impacto:** Primera opción de conversión que encaja con el patrón de uso real del 87% de los usuarios

### T2-2 · Email capture post-resultado (anónimos)
**Por qué:** GA4 muestra 97% de usuarios como primera visita. 160-220 usuarios activos por semana en Supabase, pero solo 38-39 registros nuevos. La mayoría son anónimos que usan el producto y se van sin dejar nada.  
**Propuesta:** Después del primer análisis completado por un usuario anónimo, mostrar inline (no modal bloqueante): *"¿Querés guardar este análisis? Solo tu email."* Un input + botón. Sin contraseña, sin registro completo.  
**Flujo:** email capturado → guardado en `email_waitlist` o tabla nueva → secuencia de email automática (24h, 7d).  
**Esfuerzo:** 2-3 días  
**Impacto:** Capturar 20-30 emails/semana de usuarios que ya probaron el producto

### T2-3 · pSEO universidades — fixes y expansión

**Situación real (corregida):**
Ya existen **417 páginas** generadas estáticamente:
- `/detector-de-ia-universidad/[slug]` — 148 páginas ✅ rankeando
- `/humanizador-universidad/[slug]` — 148 páginas ✅ construidas, tráfico bajo
- `/parafraseador-universidad/[slug]` — 148 páginas ✅ construidas, tráfico bajo
- `/citador-universidad/[slug]` — **no existe** ← oportunidad

Cubre 148 universidades en 20 países hispanohablantes + Brasil.

**Bug a resolver primero — 9 slugs duplicados en `universities.json`:**
`universidad-sevilla`, `universidad-zaragoza`, `universidad-nacional-colombia`, `universidad-antioquia`, `universidad-valle-colombia`, `buap-puebla`, `puce-ecuador`, `espol-ecuador`, `uni-peru`. Cada uno aparece 2 veces → sitemap con URLs duplicadas → señal negativa para Google.  
**Esfuerzo:** 30 min | **Impacto:** corregir indexación

**Oportunidad 1 — Citador universidad (nueva):** ✅ DONE
139 páginas `/citador-universidad/[slug]` + hub `/citadores-universidades` construidas y en sitemap.
Copy específico por universidad (estilo recomendado según facultades, datos reales de estudiantes y año de fundación).
Internal links cruzados: cada página de citador linkea al detector y humanizador de la misma universidad.

**Oportunidad 2 — Rankear humanizador y parafraseador universidad:**
Las páginas existen pero no generan tráfico medible. Verificar en Google Search Console si están indexadas y con qué posición. Si están en página 3-5, mejorar internal linking desde el hub `/humanizadores-universidades` y desde las páginas del detector.  
**Esfuerzo:** 1 semana de análisis + optimización  
**Impacto:** potencial de triplicar el tráfico de las páginas de universidades

### T2-4 · Cross-sell Detector → Humanizador (mejoras)
**Situación actual:** Existe en `DetectorMain.tsx:545`. Aparece cuando `probability >= 60`. Usa colores violeta que no matchean el design system.  
**Mejoras propuestas:**
1. Cambiar colores de `violet` → `blue-900/amber` (consistencia)
2. Bajar threshold de 60% a 50% (más usuarios lo ven)
3. Mejorar copy: agregar urgencia contextual (*"¿Tenés la entrega hoy?"*)
4. Medir con analytics si el click-through al humanizador mejora

**Esfuerzo:** 1 día  
**Impacto:** El Humanizador tiene 13% bounce (el más bajo de todas las páginas) pero llega 10x menos tráfico que el Detector. Este CTA es el puente.

### T2-5 · Trust signals en home
**Por qué:** 23% de los que no se registran dicen "No confío en el sitio aún" (surveys). La home actual tiene "Privacidad total" y "En español" como señales principales.  
**Propuesta:**
1. Contador dinámico: `SELECT COUNT(*) FROM usage_tracking` — mostrar análisis realizados (ya tenés el dato)
2. Logos o menciones de universidades (Complutense, Valencia, Málaga)
3. Considerar: "Creado por [nombre], Buenos Aires 2025" — humaniza el producto
4. Opcional: reseñas de Google si las hay

**Esfuerzo:** 1-2 días  
**Impacto:** Reducir objeción de confianza, mejorar conversión anónimo → registro

---

## TIER 3 — Próximo mes (producto + pricing estratégico)

### T3-1 · Repensar pricing completo
**Situación:** Con todos los datos encima, el gap más claro es la falta de un plan para estudiantes con uso regular pero no diario. El Express 7d ($8.99) tiene solo 4 ventas históricas — probablemente se canibaliza con el plan semestral si se lanza.

**Preguntas a resolver antes de implementar:**
- ¿El Express 7d sigue siendo útil si existe un Semestral?
- ¿Qué features diferencia cada tier exactamente?
- ¿Cómo se presenta visualmente la tabla de pricing con 5-6 opciones sin abrumar?
- ¿El copy de pricing page habla al estudiante o al profesional?
- ¿Hay que repensar los límites del plan free para ser más generosos (más adquisición) o más restrictivos (más conversión)?

**Esfuerzo:** 1 semana diseño + 1 semana implementación  
**Impacto:** Estructura de revenue más sostenible y alineada al patrón de uso real

### T3-2 · Express Pass modal — revisión visual
**Situación:** El modal `ExpressUnlockModal.tsx` ya tiene gradiente naranja en el botón CTA. El fondo es `bg-amber-50` (claro). Si antes se veía más llamativo, el cambio puede haber sido en el fondo del modal en sí o en el tamaño/posición.  
**Acción:** Revisar `git log -- src/app/components/ExpressUnlockModal.tsx` y comparar con versión anterior. Evaluar si vale darkear el fondo o agrandar el área naranja.  
**Esfuerzo:** Medio día  
**Impacto:** Mayor conversión en el momento de mayor intención de pago

### T3-3 · Investigar picos de tráfico (Apr 28-29, May 3-5)
**Situación:** GA4 muestra esos días con 2x usuarios normales (106-120 vs baseline de 63-85). Puede ser: período de parciales en España, mención en foro académico, contenido viral.  
**Acción:** Revisar Google Search Console para esas fechas específicas, cruzar con calendario académico español y latinoamericano.  
**Esfuerzo:** 2 horas  
**Impacto:** Si la fuente es replicable, es el mejor dato de acquisition del producto

### T3-4 · Página de profesor bien construida
**Situación actual:** `/detector-de-ia-para-profesores` tiene 69% de bounce. El mensaje actual habla de detectar IA en textos propios — no es el caso de uso del profesor, que quiere revisar trabajos de alumnos.  
**Propuesta:**
- Reescribir la página con el caso de uso real: *"Revisá los trabajos de tus alumnos antes de calificarlos"*
- CTA diferente: no Express Pass (one-time) sino Premium o futuro plan Teacher
- Mencionar el límite diario explícitamente para que evalúen si alcanza

**Esfuerzo:** 1-2 días  
**Impacto:** Reducir bounce del 69% en un segmento con mayor WTP

---

## TIER 4 — Cuando haya más volumen

### T4-1 · Detección en lote para docentes
**Caso de uso:** Un profesor sube 10-20 trabajos de alumnos en PDF/DOCX y obtiene resultados en tabla con porcentaje de IA por trabajo.  
**Por qué esperar:** Requiere UX nueva, procesamiento asíncrono, UI de resultados. Complejo. El segmento existe pero es chico hoy.  
**Por qué hacerlo eventualmente:** Único segmento con uso mensual recurrente natural. WTP mayor ($24.99-$49.99/mes). LTV 3-4x mayor que estudiante.  
**Esfuerzo:** 3-4 semanas  

### T4-2 · Secuencia de email para usuarios inactivos
**Situación:** 47 usuarios usaron el producto una vez y no volvieron. Sin email automatizado de seguimiento.  
**Propuesta:** Email a las 48h de inactividad post-primer uso: *"¿Pudiste con tu entrega?"* — corto, humano, sin template obvio. Requiere configurar Resend o similar con trigger por inactividad.  
**Esfuerzo:** 1 semana (setup de email automation)  
**Impacto:** Recuperar 10-20% de one-session users

### T4-3 · Generador de Citas — mejorar discovery
**Situación:** Las páginas pSEO de citas (`/generador-citas-apa-7`, `/generador-citas-apa`) tienen tráfico (215 y 94 sesiones) pero la herramienta misma (`/generador-de-citas`) tiene solo 22 sesiones. El CTA de las páginas pSEO no está convirtiendo a uso de la herramienta.  
**Acción:** Revisar el CTA en las páginas APA/MLA/Chicago y hacerlo más directo hacia la herramienta.  
**Esfuerzo:** 1 día  

---

## Datos clave para decisiones futuras

### Usuarios con checkout abandonado (calientes para outreach)
| Email | Intentos | Último intento |
|---|---|---|
| vanessaaraya179@gmail.com | 8 | Mar 14 |
| halvaradoa2@miumg.edu.gt | 2 | May 1 |
| maria.cepeda.m@gmail.com | 2 | May 11 |
| sanchezdebenito82@gmail.com | 2 | Abr 1 |

### Fuentes de referral inesperadas (a monitorear)
- **chatgpt.com**: 223 sesiones/mes — ChatGPT recomienda el producto orgánicamente
- **perplexity.ai + copilot.com**: 25 sesiones — AI search engines como canal emergente
- **plataformavirtual.iugna.edu.ar**: 3 sesiones — alguien lo compartió en una plataforma universitaria argentina

### Señales de alarma en pagos latinoamericanos
Múltiples usuarios con intentos fallidos por `transaction_not_allowed`, `try_again_later`, `incorrect_number`. Revenue perdido por fricción de pago en USD con tarjetas locales. Evaluar métodos de pago alternativos (PSE Colombia, OXXO México) cuando el volumen lo justifique.

---

## Lo que NO sabemos todavía y habría que medir

- **¿Qué keywords exactas traen el tráfico orgánico?** Google Search Console vinculado a GA4 no está exportando datos de keywords al Data API. Revisar directamente en GSC.
- **¿Por qué churnearon los suscriptores?** No hay offboarding survey. Agregar una pregunta de cancelación en Stripe o por email.
- **¿Cuál es la tasa de conversión anónimo → Express Pass?** No hay evento de analytics que trackee el journey completo desde primer uso anónimo hasta compra.
- **¿Qué tan usada es la feature de subida de archivos entre usuarios premium?** Sabemos que los free la intentan (69 eventos bloqueados) pero no cuántos premium la usan efectivamente.
