# 🗺️ DetectorDeIA.ai - Roadmap & Estado del Proyecto

**Última actualización:** Noviembre 2025
**Fundador:** Agustín Paris
**Visión:** Suite de 3 herramientas AI en español → Freemium → Monetización

---

## 📊 ESTADO ACTUAL

**Fase:** Fase 0 ✅ COMPLETADA (Auth + DB + Dashboard)
**En producción:** https://www.detectordeia.ai
**Capturando emails:** ✅ SÍ (Supabase)
**Usuarios autenticados:** ✅ SÍ (Google OAuth)
**Rate limiting activo:** ✅ SÍ (10 anónimo / 50 free)
**Dashboard funcional:** ✅ SÍ (stats + historial)
**Usuarios pagos:** ❌ NO (pendiente Fase 1)

---

# ✅ DONE - COMPLETADO

## 🎨 1. Rediseño UX/UI Completo
**Estado:** ✅ LIVE en producción

- ✅ Header moderno con navegación a 3 herramientas
- ✅ Footer modernizado (3 herramientas + redes sociales)
- ✅ Paleta de colores consistente (violet/cyan/emerald/purple)
- ✅ Componentes reutilizables:
  - `EmailCaptureModal.tsx` - Modal de captura de emails
  - `FAQSection.tsx` - Sección de preguntas frecuentes
  - `Header.tsx` - Navegación global
- ✅ Animaciones y transiciones en toda la app
- ✅ Diseño responsive (mobile + tablet + desktop)
- ✅ Trust badges y elementos de confianza
- ✅ Estados de loading, error, success en todas las herramientas

**Archivos clave:**
- `/src/components/Header.tsx`
- `/src/app/layout.tsx` (Footer)
- `/src/app/globals.css`

---

## 🔍 2. Detector de IA (Herramienta #1)
**Estado:** ✅ LIVE en producción

**Funcionalidad:**
- ✅ Análisis de textos con OpenAI (gpt-3.5-turbo)
- ✅ Límite free: 600 caracteres por análisis
- ✅ Usos ilimitados
- ✅ Overlay premium cuando >600 caracteres
- ✅ Sistema de porcentajes (0-100% IA vs Humano)
- ✅ Visualización con barra de progreso
- ✅ Copiar resultado
- ✅ Feedback de usuarios capturado

**Landing page:**
- ✅ Hero section con herramienta integrada
- ✅ Sección de beneficios (4 cards)
- ✅ Cómo funciona (3 pasos)
- ✅ Casos de uso (4 perfiles)
- ✅ FAQ section (8 preguntas)
- ✅ Cross-promotion: Humanizador + Parafraseador
- ✅ CTA final

**SEO:**
- ✅ Metadata completa
- ✅ OpenGraph + Twitter Cards
- ✅ Schema.org (WebApplication)
- ✅ Canonical URL
- ✅ Sitemap incluido

**Archivos:**
- `/src/app/page.tsx`
- `/src/app/HomePageClient.tsx`
- `/src/app/components/DetectorMain.tsx`
- `/src/app/api/analyze/route.ts`

---

## ✨ 3. Humanizador de IA (Herramienta #2)
**Estado:** ✅ LIVE en producción

**Funcionalidad:**
- ✅ Humaniza texto generado por IA
- ✅ API endpoint: `/api/humanize`
- ✅ OpenAI GPT-3.5-turbo (temperatura: 0.3)
- ✅ Límite free: 600 caracteres, usos ilimitados
- ✅ 1 modo activo: **Estándar**
- ✅ 4 modos premium bloqueados:
  - 🔒 Formal
  - 🔒 Creativo
  - 🔒 Simplificado
  - 🔒 Académico
- ✅ Sistema de overlay premium
- ✅ Copiar y descargar .txt
- ✅ EmailCaptureModal integrado
- ✅ Contador de caracteres dinámico con colores

**Landing page:**
- ✅ Completa con todas las secciones
- ✅ SEO optimizado (metadata + Schema.org)
- ✅ Cross-promotion con Detector + Parafraseador

**Bugs arreglados:**
- ✅ Superposición de botones sobre texto (fix: e26dafe)
- ✅ Scroll independiente del área de resultado

**Archivos:**
- `/src/app/humanizador/page.tsx`
- `/src/app/humanizador/HumanizadorClient.tsx`
- `/src/app/components/HumanizadorMain.tsx`
- `/src/app/api/humanize/route.ts`

---

## 🔄 4. Parafraseador de IA (Herramienta #3)
**Estado:** ✅ LIVE en producción

**Funcionalidad:**
- ✅ Parafrasea texto manteniendo significado
- ✅ API endpoint: `/api/paraphrase`
- ✅ OpenAI GPT-3.5-turbo (temperatura: 0.45)
- ✅ Límite free: 600 caracteres, usos ilimitados
- ✅ 1 modo activo: **Estándar**
- ✅ 4 modos premium bloqueados:
  - 🔒 Formal
  - 🔒 Creativo
  - 🔒 Simplificado
  - 🔒 Académico
- ✅ Sistema de overlay premium
- ✅ Copiar y descargar .txt
- ✅ EmailCaptureModal integrado
- ✅ Contador de caracteres dinámico
- ✅ Prompt especializado (40-60% cambio de texto)

**Landing page:**
- ✅ Completa (idéntica estructura a Humanizador)
- ✅ SEO completo (metadata + Schema.org)
- ✅ Cross-promotion con Detector + Humanizador

**Bugs arreglados:**
- ✅ Selector de modos cortado (fix: aa5f453)
- ✅ Superposición de botones (fix: e26dafe)
- ✅ Scroll independiente del área de resultado

**Documentación:**
- ✅ Especificación técnica completa en memoria de sesión

**Archivos:**
- `/src/app/parafraseador/page.tsx`
- `/src/app/parafraseador/ParafraseadorClient.tsx`
- `/src/app/components/ParafraseadorMain.tsx`
- `/src/app/api/paraphrase/route.ts`

---

## 🔗 5. Integración y Cross-Promotion
**Estado:** ✅ LIVE en producción

**Cross-promotion implementada:**
- ✅ Detector → recomienda Humanizador + Parafraseador
- ✅ Humanizador → recomienda Detector + Parafraseador
- ✅ Parafraseador → recomienda Humanizador + Detector

**Navegación:**
- ✅ Header con links a las 3 herramientas (desktop + mobile)
- ✅ Footer con las 3 herramientas listadas
- ✅ Sitemap actualizado con las 3 rutas
- ✅ Colores distintivos por herramienta:
  - Detector: Violet/Cyan (🔍)
  - Humanizador: Emerald/Teal (✨)
  - Parafraseador: Purple/Pink (🔄)

**Archivos:**
- `/src/components/Header.tsx`
- `/src/app/layout.tsx` (Footer)
- `/src/app/api/sitemap.xml/route.ts`
- `/src/app/HomePageClient.tsx`
- `/src/app/humanizador/HumanizadorClient.tsx`
- `/src/app/parafraseador/ParafraseadorClient.tsx`

---

## 📧 6. Captura de Emails (Waitlist)
**Estado:** ✅ LIVE y funcionando en producción

**Sistema implementado:**
- ✅ EmailCaptureModal reutilizable
- ✅ API endpoint: `/api/subscribe`
- ✅ Google Sheets API integrada
- ✅ Sheet: "DetectorDeIA - Premium Waitlist"
- ✅ Tracking de: Email, Fecha, Origen, IP, User Agent

**Puntos de captura activos:**
- ✅ Humanizador overlay premium (`humanizador-overlay-premium`)
- ✅ Humanizador landing CTA (`humanizador-bottom-upsell`)
- ✅ Parafraseador overlay premium (`parafraseador-overlay-premium`)
- ✅ Parafraseador landing CTA (`parafraseador-bottom-upsell`)
- ✅ Página de Pricing (`pricing-waitlist`)

**Configuración:**
- ✅ Google Cloud Console: Proyecto "DetectorDeIA"
- ✅ Service Account creado: `detectordeia-sheets@...`
- ✅ Google Sheets API habilitada
- ✅ Variables en Vercel configuradas:
  - `GOOGLE_SHEET_ID`
  - `GOOGLE_SERVICE_ACCOUNT_EMAIL`
  - `GOOGLE_PRIVATE_KEY`

**Documentación:**
- ✅ `SETUP_GOOGLE_SHEETS.md` - Guía completa paso a paso
- ✅ `.env.example` - Template de variables

**Bugs arreglados:**
- ✅ Error de decoder por formato de private key (fix: a229d44)
- ✅ Contraste del input de email mejorado (fix: a229d44)

**Archivos:**
- `/src/app/components/EmailCaptureModal.tsx`
- `/src/app/api/subscribe/route.ts`
- `/SETUP_GOOGLE_SHEETS.md`
- `/.env.example`

**Ver leads:**
https://docs.google.com/spreadsheets/d/1XQqLS2Ad5qPKDyzqfA07CJyqHV6N14vRFD3jYMLYDEs

---

## 📈 7. SEO y Metadata
**Estado:** ✅ LIVE en producción

**Implementado en todas las páginas:**
- ✅ Metadata completa (title, description, keywords)
- ✅ OpenGraph para redes sociales
- ✅ Twitter Cards
- ✅ Canonical URLs
- ✅ Robots meta (index: true, follow: true)
- ✅ Schema.org Structured Data:
  - WebApplication (Detector, Humanizador, Parafraseador)
  - FAQPage (8+ preguntas por herramienta)
- ✅ Sitemap.xml dinámico con todas las rutas
- ✅ Google Analytics 4 configurado

**Keywords optimizadas para español:**
- Detector: "detector de ia", "detectar texto ia", "chatgpt detector"
- Humanizador: "humanizador de ia", "texto humano", "evitar detectores"
- Parafraseador: "parafraseador", "parafrasear online", "evitar plagio"

---

## 🎯 8. Performance y Optimización
**Estado:** ✅ LIVE en producción

**Implementado:**
- ✅ Next.js 15 con App Router
- ✅ React Server Components donde corresponde
- ✅ Client Components optimizados
- ✅ API Routes serverless en Edge
- ✅ Vercel deployment automático (CI/CD)
- ✅ Variables de entorno seguras
- ✅ Manejo de errores en todas las APIs
- ✅ Loading states en todas las acciones
- ✅ Validaciones frontend + backend

**Stack tecnológico:**
```
Frontend:
├── Next.js 15.3.1 (App Router)
├── React 19
├── TypeScript 5
├── TailwindCSS 4
└── Animaciones CSS

Backend:
├── Next.js API Routes (Serverless)
├── OpenAI API (gpt-3.5-turbo)
└── Google Sheets API

Deployment:
├── Vercel (Production + Preview)
├── Git (Version Control)
└── Automatic CI/CD

Analytics:
└── Google Analytics 4
```

---

## 📦 9. Documentación
**Estado:** ✅ Completa

**Documentos creados:**
- ✅ `SETUP_GOOGLE_SHEETS.md` - Setup de captura de emails
- ✅ `.env.example` - Template de variables
- ✅ `ROADMAP.md` - Este documento
- ✅ Especificación técnica del Parafraseador (en memoria de sesión)
- ✅ README implícito en commits (mensajes descriptivos)

---

## 🎯 10. FASE 0: Base de Datos + Autenticación
**Estado:** ✅ COMPLETADA (2025-11-07)

**Lo que se implementó:**

### A. Supabase Setup ✅
- ✅ Proyecto Supabase creado y configurado
- ✅ Base de datos PostgreSQL con 5 tablas:
  - `users` - Información de usuarios
  - `subscriptions` - Estado de suscripciones (free/premium)
  - `usage_tracking` - Tracking de cada uso por herramienta
  - `email_waitlist` - Emails capturados para waitlist
  - `history` - Historial de usos (últimos 10 + 7 días)
- ✅ Row Level Security (RLS) policies configuradas
- ✅ Índices optimizados para performance
- ✅ Supabase client en Next.js (browser + server + middleware)
- ✅ Variables de entorno configuradas en Vercel

### B. Autenticación con Google SSO ✅
- ✅ Google OAuth configurado en Google Cloud Console
- ✅ Google provider habilitado en Supabase Auth
- ✅ Componentes de Auth implementados:
  - `AuthButton.tsx` - Botón login/logout con dropdown
  - `useAuth.ts` - Hook custom de autenticación
- ✅ Header actualizado con menú de usuario
- ✅ Página /auth/callback para OAuth
- ✅ Trigger automático: crear user en DB al registrarse
- ✅ Session management con cookies
- ✅ Middleware protegiendo rutas /dashboard

### C. Dashboard de Usuario ✅
- ✅ `/dashboard` - Dashboard completo con:
  - Información de cuenta (avatar, email, nombre)
  - Stats de uso: usos hoy, usos mes, por herramienta
  - Progress bars visuales con límites (ej: "15/50 usos hoy")
  - Historial de últimos 10 usos + 7 días
  - Modal de detalle (ver input/output completo)
  - Actions: Copiar output, Descargar .txt
  - Diseño responsive con gradientes
  - Colores diferenciados por herramienta (azul/verde/naranja)

### D. Rate Limiting + Tracking ✅
- ✅ Anonymous ID system (cookie persistente)
- ✅ Función `trackUsage()` guardando en DB
- ✅ Función `checkRateLimit()`:
  - 10 usos/día para anónimos
  - 50 usos/día para usuarios free
- ✅ Rate limiting integrado en todas las APIs
- ✅ `UsageLimitOverlay` component mostrando límite alcanzado
- ✅ History saving automático (solo usuarios autenticados)

### E. Testing + Deploy ✅
- ✅ Testing end-to-end en producción
- ✅ Performance audit: response time <2s ✅
- ✅ Security audit: RLS, HTTPS, env vars ✅
- ✅ Deploy a producción funcionando

**Archivos clave creados:**
```
Backend/DB:
├── /supabase-migrations.sql
├── /src/lib/supabase/client.ts
├── /src/lib/supabase/server.ts
└── /src/lib/supabase/middleware.ts

Auth:
├── /src/lib/hooks/useAuth.ts
├── /src/components/AuthButton.tsx
├── /src/app/auth/callback/route.ts
└── /src/middleware.ts

Tracking & Limits:
├── /src/lib/tracking/anonymousId.ts
├── /src/lib/tracking/trackUsage.ts
├── /src/lib/rateLimit/checkRateLimit.ts
└── /src/app/components/UsageLimitOverlay.tsx

Dashboard:
├── /src/lib/queries/usageStats.ts
├── /src/app/dashboard/page.tsx
└── /src/app/dashboard/DashboardClient.tsx

APIs Actualizadas:
├── /src/app/api/humanize/route.ts (+ tracking/rate limiting)
├── /src/app/api/paraphrase/route.ts (+ tracking/rate limiting)
└── /src/app/api/analyze/route.ts (+ tracking/rate limiting)
```

**Documentación:**
- ✅ `FASE_0_PLAN_CONCEPTUAL.md` - Plan técnico completo
- ✅ `FASE_0_DECISIONES_FINALES.md` - Decisiones de producto
- ✅ `FASE_0_PASO_A_PASO.md` - Roadmap detallado
- ✅ `FASE_0_ESTADO_ACTUAL.md` - Estado final
- ✅ `SETUP_SUPABASE_FASE_0.md` - Guía de setup

**Commits clave:**
- 93986f0 - Mejoras de colores en dashboard
- d4b03b6 - Fix progress bars
- cf64494 - Fix schema mismatch crítico
- ae38dbe - Implementar dashboard con datos reales (Sprint 3)
- 56b91b0 - Implementar rate limiting (Sprint 4)
- 36d4603 - Implementar Supabase auth (Sprint 1)

---

# 🔲 TODO - PENDIENTE

## 🟠 FASE 1: Monetización Premium
**Prioridad:** ALTA - Siguiente paso inmediato
**Tiempo estimado:** 3-4 semanas
**Estado:** ⏸️ Lista para empezar (Fase 0 completada)

### A. Integración Stripe
```
□ Crear cuenta Stripe
□ Configurar productos y precios en Stripe Dashboard:
  - Producto: "DetectorDeIA Premium"
  - Precio: $7/mes (USD)
  - Billing: Mensual, renovación automática
  - Copiar Product ID y Price ID

□ Instalar dependencias:
  - npm install stripe
  - npm install @stripe/stripe-js

□ Configurar variables de entorno:
  - STRIPE_SECRET_KEY (backend)
  - NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY (frontend)
  - STRIPE_WEBHOOK_SECRET (para webhooks)

□ Crear endpoints de Stripe:
  - /api/stripe/create-checkout-session
    - Crear Checkout Session
    - Incluir metadata: user_id, email
    - Success URL: /dashboard?payment=success
    - Cancel URL: /pricing?payment=cancelled

  - /api/stripe/webhook
    - Escuchar eventos de Stripe:
      - checkout.session.completed → activar premium
      - customer.subscription.updated → actualizar status
      - customer.subscription.deleted → cancelar premium
      - invoice.payment_failed → notificar usuario
    - Actualizar tabla subscriptions en Supabase
    - Actualizar users.subscription_status

  - /api/stripe/create-portal-session
    - Crear Customer Portal Session
    - Para que usuario gestione su suscripción
    - Return URL: /dashboard

□ Configurar webhooks en Stripe:
  - Development: usar Stripe CLI
  - Production: configurar en Stripe Dashboard
  - Endpoint: https://detectordeia.ai/api/stripe/webhook

□ Implementar flujo de checkout:
  - Botón "Actualizar a Premium" en dashboard
  - Botón "Comenzar Premium" en pricing
  - Redirect a Stripe Checkout
  - Success → redirect a /dashboard
  - Actualizar UI automáticamente
```

### B. Página de Pricing Mejorada
```
□ Rediseñar /src/app/pricing/page.tsx:
  - Comparativa clara Free vs Premium
  - Tabla de features
  - FAQs de pricing
  - Testimonios (futuro)

□ Plan FREE:
  ✓ Detector: 600 chars/análisis, usos ilimitados
  ✓ Humanizador: 600 chars/uso, 1 modo, usos ilimitados
  ✓ Parafraseador: 600 chars/uso, 1 modo, usos ilimitados
  ✓ Sin registro requerido
  ✓ Sin anuncios
  ✗ Sin historial
  ✗ Sin modos adicionales

□ Plan PREMIUM ($7/mes):
  ✓ Detector: 15,000 chars/análisis
  ✓ Humanizador: 15,000 chars/uso, 5 modos, historial
  ✓ Parafraseador: 15,000 chars/uso, 5 modos, slider, historial
  ✓ Sin anuncios (ya no hay)
  ✓ Historial completo (últimos 100 usos)
  ✓ Exportar múltiples formatos
  ✓ Soporte prioritario
  ✓ API access (futuro)

□ Implementar CTAs:
  - "Comenzar Premium" → Stripe Checkout
  - "Probar Gratis" → scroll a herramientas
```

### C. Activar Features Premium
```
□ Desbloquear modos en Humanizador:
  - Implementar prompts para cada modo:
    - Formal: "Tono profesional y corporativo"
    - Creativo: "Cambios profundos, lenguaje más expresivo"
    - Simplificado: "Lenguaje simple, fácil de entender"
    - Académico: "Estilo universitario, formal riguroso"
  - Modificar UI del selector de modos
  - Solo disponibles si user.subscription_status === 'premium'

□ Desbloquear modos en Parafraseador:
  - Mismos 4 modos
  - Prompts adaptados para parafraseo

□ Implementar slider de intensidad en Parafraseador:
  - Slider: 20% - 40% - 60% - 80%
  - Modificar temperature del modelo según intensidad:
    - 20%: temp 0.3 (conservador)
    - 40%: temp 0.45 (moderado) - actual
    - 60%: temp 0.6 (profundo)
    - 80%: temp 0.75 (máximo)
  - Solo disponible para premium

□ Aumentar límites para premium:
  - En APIs: verificar user.subscription_status
  - Si premium: CHARACTER_LIMIT = 15000
  - Si free: CHARACTER_LIMIT = 600

□ Remover overlays premium:
  - Si user es premium, no mostrar overlay
  - Permitir usar toda la funcionalidad

□ Implementar historial:
  - Guardar automáticamente en DB si premium
  - Mostrar en /dashboard/history
  - Límite: últimos 100 usos por herramienta
  - Soft delete (deleted_at) en lugar de borrar

□ Validación backend:
  - Middleware para verificar subscription_status
  - Rechazar requests premium si usuario no premium
  - Errors claros: "Actualiza a Premium para usar esta función"
```

### D. Notificar Waitlist
```
□ Crear script de email para waitlist:
  - Leer emails de tabla email_waitlist donde notified = false
  - Template de email HTML:
    - Asunto: "🎉 DetectorDeIA Premium ya está disponible"
    - Cuerpo: Anuncio del lanzamiento
    - CTA: Link a /pricing
    - Descuento: 20% off primer mes (código: EARLYBIRD)

□ Implementar envío de emails:
  - Opción 1: Resend.com
  - Opción 2: Sendgrid
  - Opción 3: Email manual por ahora

□ Marcar como notificados:
  - UPDATE email_waitlist SET notified = true, notified_at = NOW()

□ Tracking de conversión:
  - Cuántos de waitlist se convirtieron a premium
  - Analytics en Stripe
```

**Archivos a crear:**
```
CREAR:
- /src/app/api/stripe/create-checkout-session/route.ts
- /src/app/api/stripe/webhook/route.ts
- /src/app/api/stripe/create-portal-session/route.ts
- /src/lib/stripe.ts (Stripe client config)
- /src/components/pricing/PricingTable.tsx
- /src/components/premium/PremiumBadge.tsx
- /scripts/notify-waitlist.ts

MODIFICAR:
- /src/app/pricing/PricingPageClient.tsx (rediseño completo)
- /src/app/components/HumanizadorMain.tsx (modos premium + límite)
- /src/app/components/ParafraseadorMain.tsx (modos + slider + límite)
- /src/app/api/humanize/route.ts (verificar premium, modos)
- /src/app/api/paraphrase/route.ts (verificar premium, modos, intensidad)
- /src/app/dashboard/page.tsx (mostrar plan, gestionar suscripción)
```

---

## 🟡 FASE 2: Analytics y Optimización
**Prioridad:** BAJA - Después de Fase 1
**Tiempo estimado:** 2 semanas
**Estado:** ❌ NO iniciado

```
□ Google Analytics 4 avanzado:
  - Eventos custom:
    - humanize_clicked
    - humanize_success
    - paraphrase_clicked
    - paraphrase_success
    - detect_clicked
    - detect_success
    - email_captured
    - checkout_started
    - checkout_completed
  - Funnels de conversión:
    - Free user → Email capture → Premium purchase
  - User properties: subscription_status, signup_date
  - E-commerce tracking para Stripe

□ Hotjar o Microsoft Clarity:
  - Heatmaps de las 3 herramientas
  - Session recordings
  - Identificar puntos de fricción
  - A/B testing de CTAs

□ Dashboard interno de métricas:
  - Crear /src/app/admin/analytics/page.tsx
  - Métricas clave (KPIs):
    - DAU (Daily Active Users)
    - MAU (Monthly Active Users)
    - Conversión free → premium (%)
    - Churn rate (%)
    - MRR (Monthly Recurring Revenue)
    - ARR (Annual Recurring Revenue)
    - LTV (Lifetime Value)
    - Uso por herramienta
    - Caracteres promedio por uso
    - Emails en waitlist vs convertidos
  - Gráficos con recharts o Chart.js
  - Solo accesible por admin (tu email)

□ Email marketing automatizado:
  - Setup Resend.com + React Email
  - Templates:
    - Welcome email (al registrarse)
    - Tips de uso (día 3)
    - Recordatorio features premium (día 7)
    - Descuento especial (día 14 si no convirtió)
    - Re-engagement (30 días inactivo)
  - Secuencias automatizadas
  - Unsubscribe handling

□ A/B Testing:
  - Probar variantes de CTAs
  - Probar precio ($7 vs $9 vs $5)
  - Probar copy de landing pages
  - Usar Vercel Edge Config o feature flags
```

---

## 🟢 FASE 3: Expansión de Features
**Prioridad:** FUTURA - Después de tener usuarios pagos
**Tiempo estimado:** 1-2 meses
**Estado:** ❌ NO iniciado

```
□ Modo Batch (procesar múltiples textos):
  - Subir archivo .txt o .docx
  - Procesar múltiples párrafos
  - Descargar resultado completo
  - Solo premium

□ Comparador lado-a-lado:
  - Mostrar original | resultado
  - Highlight de diferencias
  - Útil para revisar cambios

□ Detector de plagio integrado:
  - API externa (Copyscape, Copyleaks)
  - Verificar si texto es original
  - Complemento al parafraseador

□ Exportar múltiples formatos:
  - .docx (Word) con mammoth.js
  - .pdf con jsPDF
  - .md (Markdown)
  - Solo premium

□ API pública REST:
  - Endpoints:
    - POST /api/v1/detect
    - POST /api/v1/humanize
    - POST /api/v1/paraphrase
  - API keys por usuario
  - Rate limiting (100 requests/día premium)
  - Documentación con Swagger/OpenAPI
  - Plan API: $15/mes (50k caracteres/mes)

□ Integración Google Docs:
  - Add-on de Google Workspace
  - Humanizar/Parafrasear desde el doc
  - Reemplazar texto inline

□ Plugin de Chrome:
  - Seleccionar texto en cualquier web
  - Click derecho → Humanizar/Parafrasear
  - Popup con resultado

□ Slack/Discord bot:
  - Comando /humanizar [texto]
  - Comando /parafrasear [texto]
  - Para equipos
```

---

## 🌍 FASE 4: Internacionalización
**Prioridad:** FUTURA - Después de validar español
**Tiempo estimado:** 1-2 meses
**Estado:** ❌ NO iniciado

```
□ Soporte multiidioma en la app:
  - i18n con next-intl
  - Idiomas objetivo:
    - Español (actual) 🇪🇸
    - Inglés 🇺🇸
    - Portugués (Brasil) 🇧🇷
    - Francés 🇫🇷
  - Traducir toda la UI
  - Selector de idioma en header

□ Modelos especializados por idioma:
  - Prompts en cada idioma
  - Verificar calidad con usuarios nativos
  - Ajustar temperaturas según idioma

□ Landing pages localizadas:
  - /es (España) - actual
  - /mx (México) - actual
  - /co, /ar, /cl, /pe (LATAM)
  - /en (USA)
  - /br (Brasil)
  - /fr (Francia)
  - SEO localizado por país

□ Precios por región:
  - Purchasing Power Parity
  - México: $99 MXN/mes (~$5 USD)
  - Argentina: $3,000 ARS/mes (~$3 USD)
  - Brasil: R$25 BRL/mes (~$5 USD)
  - España: €7 EUR/mes

□ Soporte en múltiples idiomas:
  - Email support en español e inglés
  - FAQ traducidas
  - Chatbot multiidioma (futuro)
```

---

## 📱 FASE 5: Apps Móviles
**Prioridad:** FUTURA - Después de tracción web
**Tiempo estimado:** 3-4 meses
**Estado:** ❌ NO iniciado

```
□ App iOS:
  - React Native o Swift nativo
  - Mismas 3 herramientas
  - Face ID / Touch ID login
  - Sincronización con cuenta web
  - Historial offline
  - Share extension

□ App Android:
  - React Native o Kotlin nativo
  - Mismas features que iOS
  - Biometric auth
  - Sincronización con cuenta web

□ Features mobile-specific:
  - Notificaciones push
  - Compartir a otras apps
  - Copiar al portapapeles
  - Modo offline (caché)
  - Widget de home screen
```

---

# 📊 MÉTRICAS Y OBJETIVOS

## KPIs Actuales (Pre-Monetización)
```
Usuarios únicos/día: [Medir con GA4]
Usos por herramienta/día: [Medir]
Emails capturados en waitlist: [Ver Google Sheet]
Bounce rate: [GA4]
Time on page: [GA4]
```

## Objetivos Fase 1 (Post-Monetización)
```
MES 1:
- 10 usuarios premium = $70 MRR
- Conversión 2-5% de usuarios activos

MES 2:
- 25 usuarios premium = $175 MRR
- Reducir churn a <5%

MES 3:
- 50 usuarios premium = $350 MRR
- LTV > $50

MES 6:
- 100 usuarios premium = $700 MRR
- CAC < $20 (si hacemos ads)

AÑO 1:
- 300 usuarios premium = $2,100 MRR = $25k ARR
- Break even
```

---

# 🎯 PRIORIDADES INMEDIATAS

## Esta semana:
1. ✅ ~~Captura de emails funcionando~~ (DONE)
2. ✅ ~~Footer modernizado~~ (DONE)
3. ✅ ~~Parafraseador completo~~ (DONE)
4. ❌ Push a producción (próximo)

## Próximas 2 semanas:
1. Fase 0A: Setup Supabase + Schema DB
2. Fase 0B: Google OAuth
3. Fase 0C: Migrar emails de Google Sheets

## Próximo mes:
1. Fase 0: Completar (Auth + DB + Dashboard)
2. Fase 1: Iniciar (Stripe setup)

---

# 📝 DECISIONES TÉCNICAS PENDIENTES

## A decidir en Fase 0:
```
□ ¿Usamos Supabase Auth o NextAuth.js?
  → Recomendación: Supabase Auth (más integrado)

□ ¿Qué hacer con usuarios anónimos actuales?
  → Permitir seguir usando free sin registro
  → Tracking solo si logueados

□ ¿Guardar historial de usuarios free?
  → NO (solo premium)

□ ¿Soft delete o hard delete?
  → Soft delete (deleted_at column)
```

## A decidir en Fase 1:
```
□ ¿Trial gratuito de premium?
  → Recomendación: 7 días gratis, luego $7/mes

□ ¿Descuento para early adopters?
  → 20% off primer mes (código EARLYBIRD)

□ ¿Plan anual con descuento?
  → $70/año ($5.83/mes) - ahorro 17%

□ ¿Qué hacer con usuarios que cancelan?
  → Mantener acceso hasta fin de período
  → Email de win-back después de 30 días
```

---

# 🚫 NO HACER (Por ahora)

```
✗ Más herramientas (ya tenemos 3)
✗ Anuncios (queremos UX limpia)
✗ Vender datos de usuarios
✗ Features complejas antes de validar producto
✗ Sobre-ingeniería
✗ Múltiples planes (solo Free y Premium)
✗ Trial sin tarjeta (pedir tarjeta desde inicio)
```

---

# 📞 CONTACTO Y RECURSOS

**Proyecto:** https://www.detectordeia.ai
**Google Sheet (Waitlist):** [Link privado]
**Vercel:** https://vercel.com/dashboard
**Google Cloud Console:** https://console.cloud.google.com
**Supabase:** https://supabase.com (pendiente)
**Stripe:** https://stripe.com (pendiente)

**Email:** hola@detectordeia.ai
**Twitter:** @detectordeia

---

**Última actualización:** Noviembre 2025
**Próxima revisión:** Al completar Fase 0
**Versión:** 1.0
