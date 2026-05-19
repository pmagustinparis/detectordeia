# Backlog de Producto — detectordeia.ai
**Última actualización:** Mayo 2026  
**Criterio de priorización:** impacto en revenue directo  
**Contexto:** Análisis basado en datos reales de Supabase, Stripe y Google Analytics

---

## Estado del negocio

- **750 usuarios** registrados · 99.2% free · 0.8% premium
- **MRR actual: $12.99** (1 suscripción activa)
- **Revenue histórico total:** ~$230 desde nov 2025 (~$35/mes promedio)
- **Express Pass** genera más revenue acumulado que suscripciones ($102 vs $91)
- **Churn suscripciones: 100%** en el primer mes — el modelo mensual no encaja con estudiantes
- **Tráfico:** 70-120 usuarios únicos/día · 97% primera visita · 86% desktop
- **Adquisición:** 72% Google orgánico · ChatGPT envía 223 sesiones/mes sin hacer nada
- **Perfil:** 64% estudiantes universitarios · 12% docentes · español nativo
- **Geografía:** España 38% · México 15% · Perú 10% · Colombia 7%

---

## Herramientas y planes

| Herramienta | Usos/mes | Bounce en su página |
|---|---|---|
| Detector | 1,337 usos · 651 usuarios | — (es la home) |
| Humanizador | 154 usos · 57 usuarios | **13%** (más bajo de todo el sitio) |
| Parafraseador | 63 usos · 19 usuarios | 23% |
| Citador | — | 9% |

| Plan | Precio | Tipo | Ventas históricas |
|---|---|---|---|
| Free sin registro | $0 | — | — |
| Free registrado | $0 | — | — |
| Express 24h | $3.99 | One-time | 22 |
| Express 7 días | $8.99 | One-time | 4 |
| Premium Mensual | $12.99/mes | Recurrente | 6 creadas, todas churnearon |
| Premium Anual | $10.39/mes | Recurrente | 0 |

---

## TIER 0 — Sin código · Revenue esta semana

### T0-1 · Email a 6 power users activos ahora mismo ✅ DONE — 18 mayo 2026

Emails enviados manualmente. Potencial 1-2 conversiones en los próximos días.

**Los 6 usuarios:**

| Email | Usos totales | Usos esta semana | Señal |
|---|---|---|---|
| gisella.ceballos24@gmail.com | 40 | 12 | usuario recurrente de largo plazo |
| escritora1506@gmail.com | 40 | 9 | nombre sugiere escritora/creadora |
| leodominguezgarcia007@gmail.com | 27 | 7 | uso regular sostenido |
| sanmartinnoa@gmail.com | 22 | 7 | uso regular sostenido |
| cmpaclauuuu@gmail.com | 19 | 19 | nuevo esta semana, muy intenso |
| 948692@unizar.es | 15 | 15 | estudiante Universidad de Zaragoza |

---

**EMAIL A — Para usuarios de largo plazo** (gisella, escritora, leo, sanmartin)

```
Asunto: una pregunta de quien hizo DetectordeIA

Hola,

Soy Agustín, el fundador de DetectordeIA.ai. Vi que usás el detector seguido
y quería preguntarte directamente: ¿cómo te está yendo con el producto?
¿Para qué lo usás principalmente?

Si en algún momento los límites te molestan, puedo darte un descuento personal
en el Express Pass o en Premium. Solo respondé este mail.

Gracias por usar el producto,
Agustín
```

---

**EMAIL B — Para cmpaclauuuu** (19 usos esta semana, usuario nuevo muy activo)

```
Asunto: ey, gracias por usar DetectordeIA

Hola,

Soy Agustín, el fundador de DetectordeIA.ai. Vi que empezaste a usar el detector
esta semana y ya lo usaste bastante — me alegra que te esté sirviendo.

¿Para qué lo estás usando? Me ayuda saber para mejorar el producto. Y si los
límites te cortan el ritmo, puedo darte acceso extendido con descuento — solo escribime.

Gracias,
Agustín
```

---

**EMAIL C — Para 948692@unizar.es** (estudiante Unizar, 15 usos esta semana)

```
Asunto: hola desde DetectordeIA — una pregunta rápida

Hola,

Soy Agustín, el que hizo DetectordeIA.ai. Vi que usaste el detector varias veces
esta semana desde la Unizar — espero que te haya sido útil para las entregas.

¿Tenés más trabajos esta temporada? Si necesitás acceso sin límites para el
período de exámenes, puedo darte un descuento personal en el Express Pass.
Solo respondé este mail.

Suerte con los estudios,
Agustín
```

---

### T0-2 · Email a checkout abandonados recientes ✅ DONE — 18 mayo 2026

Emails enviados manualmente a los 4 usuarios con checkout abandonado.

| Email | Intentos | Último intento | Acción |
|---|---|---|---|
| maria.cepeda.m@gmail.com | 2 | May 11 | Email esta semana |
| halvaradoa2@miumg.edu.gt | 2 | May 1 | Email esta semana |
| sanchezdebenito82@gmail.com | 2 | Abr 1 | Email si hay tiempo |
| vanessaaraya179@gmail.com | 8 | Mar 14 | Frío, intentar igual |

```
Asunto: ¿tuviste problemas para completar el pago?

Hola,

Soy Agustín de DetectordeIA.ai. Vi que intentaste activar el Express Pass
pero no llegó a completarse.

¿Hubo algún problema con el pago? Si querés, te puedo ayudar directamente
o buscamos otra forma. Solo respondé este mail.

Agustín
```

---

## TIER 1 — Esta semana · Alto impacto en conversión · Poco código

### T1-1 · Fix label hardcodeado en Dashboard ✅ DONE
Label del historial ahora muestra `(Últimos 100 usos · 30 días)` a usuarios premium y `(Últimos 10 usos · 7 días)` a free.

### T1-2 · ExpressPromoBanner — restaurar naranja ✅ DONE
Banner consistente con el modal: `bg-amber-50`, `border-amber-200`, gradiente `from-orange-500 to-amber-500`.

### T1-3 · pSEO — duplicados y Citador ✅ DONE
- 9 slugs duplicados eliminados de `universities.json` (148 → 139 entradas únicas)
- 139 páginas `/citador-universidad/[slug]` + hub `/citadores-universidades` creadas y en sitemap
- Total pSEO universidades: 556 páginas (139 × 4 herramientas)

### T1-4 · Fix flujo anónimo modal → signup → checkout ✅ DONE

**Bug encontrado:** El modal para usuarios anónimos mandaba a `/auth/signup` sin `?next=/pricing`. Después del OAuth, el callback redirigía al dashboard y el flag `pending_plan_type` en localStorage quedaba huérfano — el usuario nunca llegaba al checkout.

**Fix:** Modal → `/auth/signup?next=/pricing`. `SignupForm` y `LoginForm` leen el `next` param y lo propagan al `redirectTo` del OAuth. El callback lo recibe y redirige a `/pricing` donde `PricingPageClient` auto-dispara el checkout.

Para usuarios autenticados: el modal ya iba directo a Stripe vía `/api/create-checkout-session` — correcto, sin cambios.

### T1-5 · Banner Express Pass — resetear al chocar con límite ✅ DONE

Cuando el usuario choca con el límite en cualquier herramienta, se emite `express-limit-exceeded` (custom event). El banner lo escucha y se muestra de nuevo, aunque el usuario lo haya cerrado antes. El flag de localStorage se limpia en ese momento.

### T1-6 · Cross-sell Detector → Humanizador ✅ DONE

- Threshold: 60% → 50% (más usuarios ven el CTA)
- Colores: `violet` → `amber/naranja` (consistente con Express Pass)
- Copy: muestra el % exacto + *"pase los detectores de tu universidad"*

---

## TIER 2 — Próximas 2 semanas · Revenue sostenido

### T2-1 · Plan Semestral ✅ DONE

- $24.99 · pago único · 4 meses (2880hs de acceso via `express_expires_at`)
- Pricing page rediseñada: 705 → ~270 líneas. 3 columnas con frame de use case claro.
- Semestral destacado como "MÁS POPULAR" en el centro.
- Checkout, webhook y env.example actualizados. Price ID: `price_1TYc1rR5MbTVVQlkQUg8LXhN`
- Express 7d mantenido con copy más específico ("semana de exámenes").

### T2-2 · Email capture post-resultado (anónimos)
**Por qué:** 97% de los usuarios se van sin dejar email. Sin email no hay retargeting, no hay secuencias, no hay nada. Es la base de todo el revenue futuro.  
**Propuesta:** Después del primer análisis de un usuario anónimo, mostrar inline (no modal): *"¿Querés guardar este análisis? Solo tu email."*  
**Flujo:** email → `email_waitlist` → secuencia automática (24h recordatorio, 7d oferta Express Pass)  
**Esfuerzo:** 2-3 días  
**Impacto:** Capturar 20-30 emails/semana de usuarios que ya probaron y obtuvieron valor

### T2-3 · Flujo de cancelación — oferta antes de churnear
**Situación:** Cuando un usuario cancela en Stripe, no hay nada que lo retenga. Sale sin fricción.  
**Propuesta:** Email automático inmediato al cancelar: *"Antes de irte — ¿querés 2 semanas gratis para pensarlo?"* o 40% off el próximo mes.  
**Esfuerzo:** 1 día (webhook Stripe + email)  
**Impacto:** Rescatar 20-30% de churns = $2-4 MRR extra por cada cancelación evitada

### T2-4 · Métodos de pago latinoamericanos
**Situación:** Múltiples pagos fallidos por `transaction_not_allowed`, `try_again_later` desde Colombia, Guatemala, Bolivia, Perú. Hay usuarios que QUIEREN pagar y el banco les bloquea la transacción en USD.  
**Propuesta:** Habilitar en Stripe: OXXO (México), PSE (Colombia), MercadoPago (Argentina/LatAm)  
**Esfuerzo:** 3-5 días  
**Impacto:** Desbloquear revenue de usuarios que hoy no pueden pagar aunque quieran

---

## TIER 3 — Próximo mes · Revenue a mediano plazo

### T3-1 · Secuencia email checkout abandonado (automatizada)
**Situación:** 17 usuarios arrancaron checkout y no completaron. Sin seguimiento automático.  
**Propuesta:** Si `checkout_started` no tiene `subscription_created` o pago en 24h → email automático *"¿Tuviste problemas con el pago?"*  
**Esfuerzo:** 1 semana (setup Resend + trigger Supabase)  
**Impacto:** Recuperar 2-3 conversiones/mes de manera automática

### T3-2 · Repensar pricing completo
El gap más claro: no hay opción para el estudiante con uso regular pero no diario. Con el semestral resuelto, revisar si el Express 7d sigue teniendo sentido, y reescribir los copies de pricing para hablarle explícitamente a cada perfil (estudiante en época de exámenes, escritora habitual, docente).  
**Esfuerzo:** 1 semana diseño + 1 semana código

### T3-3 · Trust signals en home
23% de los que no se registran dicen "No confío en el sitio aún". Agregar: contador dinámico de análisis realizados, menciones de universidades reales, línea de "creado por".  
**Esfuerzo:** 1-2 días

### T3-4 · Investigar picos de tráfico (Apr 28-29, May 3-5)
2x usuarios esos días vs baseline. Si la fuente es replicable, es el mejor dato de acquisition del producto. Revisar GSC y calendario académico español.  
**Esfuerzo:** 2 horas

### T3-5 · Decisión: History para usuarios Express
`getUserHistory()` da límites free a usuarios con Express activo. Decidir si merecen límites extendidos (30 usos / 14 días) como diferenciador de plan.  
**Esfuerzo:** 1-2 horas

---

## TIER 4 — Cuando haya más volumen

### T4-1 · Detección en lote para docentes
Subir 10-20 trabajos y ver resultados en tabla. Único segmento con uso mensual recurrente natural. WTP $24-49/mes. LTV 3-4x mayor que estudiante.  
**Esfuerzo:** 3-4 semanas

### T4-2 · Página de profesor reescrita
`/detector-de-ia-para-profesores` tiene 69% bounce. El copy actual habla de detectar IA en texto propio, no en trabajos de alumnos. Hay que reescribirla.  
**Esfuerzo:** 1-2 días

### T4-3 · Rankear humanizador y parafraseador universidad en SEO
Las páginas existen (139 cada una) pero no generan tráfico medible. Verificar posición en GSC y mejorar internal linking.  
**Esfuerzo:** 1 semana

### T4-4 · Generador de Citas — mejorar discovery desde pSEO
Las páginas APA/MLA tienen 215 y 94 sesiones pero la herramienta misma tiene 22. El CTA no convierte.  
**Esfuerzo:** 1 día

---

## Lo que NO sabemos todavía

- **Keywords exactas de tráfico orgánico** — revisar GSC directamente, el Data API de GA4 no las exporta
- **Por qué churnearon los suscriptores** — no hay offboarding survey. Agregar pregunta de cancelación en Stripe
- **Tasa de conversión anónimo → Express Pass** — no hay evento que trackee ese journey completo
- **Uso real de file upload entre usuarios premium** — sabemos que free la intenta (69 bloqueos/mes) pero no cuántos premium la usan
- **A dónde va exactamente el CTA del modal** — verificar antes de T1-4
