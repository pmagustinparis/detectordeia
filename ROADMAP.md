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

## 🔍 FASE 2: SEO y pSEO (Programmatic SEO)
**Prioridad:** ALTA - Después de Fase 1
**Tiempo estimado:** 2-3 semanas
**Estado:** ⏸️ Pendiente (post-monetización)

**Objetivo:** Atraer tráfico orgánico mediante optimización SEO y generación de páginas programáticas.

### A. Research de Keywords
```
□ Análisis con Keywords Everywhere:
  - Keywords principales actuales (detectar ia, humanizador, parafraseador)
  - Long-tail keywords con intención de búsqueda
  - Análisis de volumen + dificultad + CPC
  - Identificar gaps de contenido

□ Análisis SERP:
  - Revisar top 10 resultados por keyword
  - Identificar featured snippets
  - Analizar intención de búsqueda (informacional, transaccional)
  - Competencia directa e indirecta

□ Oportunidades de ranking:
  - Keywords con alta intención + baja competencia
  - Preguntas frecuentes en "People Also Ask"
  - Variaciones regionales (España vs LATAM)
  - Keywords de comparación ("detector vs humanizador")
```

### B. Optimización On-Page Actual
```
□ Auditoría de páginas existentes:
  - / (home - Detector)
  - /humanizador
  - /parafraseador
  - /pricing
  - /dashboard (no-index)
  - Páginas de países (/mx, /ar, etc.)

□ Mejoras técnicas:
  - Title tags optimizados por keyword
  - Meta descriptions persuasivas
  - Headers (H1, H2, H3) con keywords
  - Internal linking estratégico
  - Image alt text
  - Schema.org markup expandido

□ Actualizar sitemap.xml:
  - Incluir todas las páginas públicas
  - Priority y changefreq correctos
  - Submit a Google Search Console

□ Optimizar robots.txt:
  - Bloquear /dashboard, /api
  - Permitir todo lo demás
  - Link al sitemap
```

### C. pSEO (Programmatic SEO)
```
□ Generar páginas por keyword long-tail:
  - "detector de ia gratis"
  - "como detectar texto de chatgpt"
  - "humanizador de texto ia online"
  - "parafrasear sin plagio"
  - "evitar detectores de ia"
  - + 20-30 keywords más

□ Templates de páginas pSEO:
  - /blog/[keyword-slug] (artículos SEO)
  - /herramientas/[tool-variation] (variaciones de herramientas)
  - /guias/[guide-topic] (guías paso a paso)

□ Contenido optimizado:
  - 800-1500 palabras por página
  - Responder intención de búsqueda
  - CTAs a herramientas principales
  - Internal linking entre artículos

□ Automatización (opcional):
  - Templates reutilizables
  - Generación con IA (revisado manualmente)
  - Deploy automático con Next.js
```

### D. Link Building Básico
```
□ Directorios relevantes:
  - Product Hunt
  - AlternativeTo
  - Directorio de herramientas AI

□ Guest posting:
  - Blogs de IA en español
  - Sitios de educación
  - Comunidades de escritores

□ Menciones:
  - Reddit (r/OpenAI, r/ChatGPT - español)
  - Twitter/X
  - LinkedIn
```

### E. Monitoreo y Medición
```
□ Google Search Console:
  - Configurado ✅
  - Monitorear impresiones, clicks, CTR
  - Identificar keywords ganando posiciones
  - Corregir errores de indexación

□ Google Analytics 4:
  - Ya configurado ✅
  - Segmentar tráfico orgánico
  - Bounce rate por landing page
  - Conversiones desde SEO

□ Tracking de rankings:
  - Herramienta: Ahrefs, SEMrush, o manual
  - Top 10-20 keywords objetivo
  - Monitoreo semanal/mensual
```

**Resultado esperado:**
- 2-3x tráfico orgánico en 3 meses
- Top 10 para 5-10 keywords principales
- 20-30 páginas pSEO indexadas
- Mayor conversión desde búsqueda orgánica

---

## 📊 FASE 3: Analytics y Optimización
**Prioridad:** MEDIA - Después de Fase 2
**Tiempo estimado:** 1-2 semanas
**Estado:** ⏸️ Pendiente (post-SEO)

**Objetivo:** Profundizar en métricas y optimizar conversión.

### A. Analytics Avanzado
```
□ Google Analytics 4 eventos custom:
  - checkout_started
  - checkout_completed
  - premium_feature_clicked
  - limit_reached
  - email_captured

□ Funnels de conversión:
  - Anónimo → Registro → Premium
  - Landing → Tool usage → Limit → Upgrade

□ User properties:
  - subscription_status
  - signup_date
  - preferred_tool
```

### B. Dashboard Interno de Métricas
```
□ Crear /admin/analytics (solo para Agustín):
  - MRR (Monthly Recurring Revenue)
  - Usuarios activos (DAU, MAU)
  - Conversión free → premium (%)
  - Churn rate (%)
  - LTV (Lifetime Value)
  - Uso por herramienta
  - Top keywords (desde Search Console)

□ Gráficos visuales:
  - Recharts o Chart.js
  - Vista temporal (día, semana, mes)
  - Comparativas mes vs mes
```

### C. Email Marketing Automatizado
```
□ Setup Resend.com + React Email:
  - Welcome email (al registrarse)
  - Tips de uso (día 3)
  - Recordatorio features premium (día 7)
  - Email de conversión (día 14 si no convirtió)

□ Secuencias:
  - Onboarding (3 emails)
  - Nurture to premium (4 emails)
  - Re-engagement (usuarios inactivos)
```

### D. A/B Testing (Opcional)
```
□ Testear:
  - Pricing ($7 vs $9 vs $5)
  - CTAs en overlay de límite
  - Copy de página /pricing
  - Duración de trial (7 días vs 14 días)
```

**Resultado esperado:**
- Mayor visibilidad de métricas clave
- Mejora en conversión free → premium (+1-2%)
- Email marketing automatizado funcionando
- Decisiones basadas en datos

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

## ✅ Completado:
1. ✅ Fase 0: Auth + DB + Dashboard + Rate Limiting (100%)
2. ✅ Testing y deploy en producción
3. ✅ 3 herramientas funcionando (Detector, Humanizador, Parafraseador)

## 📋 Próximos pasos:

### 1️⃣ **ANTES DE FASE 1** (Ahora - Research):
- [ ] Definir pricing final ($7/mes vs otras opciones)
- [ ] Definir features premium exactas
- [ ] Definir límites free vs premium
- [ ] Definir copy de página /pricing
- [ ] Definir estrategia de trial (7 días gratis vs sin trial)

### 2️⃣ **FASE 1** (3-4 semanas):
- [ ] Sprint 1: Stripe Setup
- [ ] Sprint 2: Features Premium (15K chars, 5 modos, slider)
- [ ] Sprint 3: Página Pricing optimizada
- [ ] Sprint 4: Launch + primeros usuarios pagos

### 3️⃣ **FASE 2** (Post-monetización):
- [ ] Research keywords con Keywords Everywhere
- [ ] Crear 20-30 páginas pSEO
- [ ] Optimizar SEO on-page
- [ ] Link building básico

---

# 📝 DECISIONES PENDIENTES (Research de Agustín)

## Para definir antes de Fase 1:

### Pricing:
```
□ ¿Precio final? Opciones:
  - $7/mes (propuesta inicial)
  - $5/mes (más accesible)
  - $9/mes (mayor valor percibido)
  - Otro precio?

□ ¿Trial gratuito?
  - Opción 1: 7 días gratis sin tarjeta
  - Opción 2: Sin trial, pago directo
  - Opción 3: 14 días gratis con tarjeta

□ ¿Plan anual desde el inicio?
  - Ejemplo: $70/año (ahorro 17%)
  - O implementar después?

□ ¿Descuento para early adopters?
  - Ejemplo: Código EARLYBIRD (20% off primer mes)
  - O precio normal desde el inicio?
```

### Features Premium:
```
□ Límites de caracteres:
  - Free: 600 chars (actual)
  - Premium: ¿15,000 chars? ¿10,000? ¿20,000?

□ Modos disponibles:
  - Free: 1 modo (Estándar)
  - Premium: ¿5 modos? (Formal, Creativo, Simplificado, Académico + Estándar)

□ Historial:
  - Free: 10 usos + 7 días (actual)
  - Premium: ¿100 usos + 30 días? ¿Ilimitado?

□ Otras features premium:
  - Slider de intensidad (Parafraseador)
  - ¿Exportar PDF/DOCX? (puede esperar)
  - ¿Soporte prioritario? ¿Cómo?
  - ¿Otras ideas?
```

### Copy y Messaging:
```
□ Value proposition principal:
  - ¿Qué mensaje resuena más?
  - "Texto humano, sin límites"
  - "Evita cualquier detector de IA"
  - "Herramientas profesionales de IA"
  - Otro?

□ Página /pricing:
  - ¿Qué enfatizar?
  - ¿Testimonios? (cuando estén disponibles)
  - ¿Garantía de reembolso?
  - ¿Comparativa con competencia?
```

### Cancelación y Retención:
```
□ Usuarios que cancelan:
  - ¿Mantener acceso hasta fin de período?
  - ¿Email de win-back? ¿Cuándo?
  - ¿Encuesta de por qué cancelaron?

□ Churn prevention:
  - ¿Email antes de renovación?
  - ¿Recordatorios de valor?
```

**Acción:** Agustín hace research y define todas estas decisiones antes de empezar implementación de Fase 1.

---

# 🚫 NO HACER (Fuera de scope)

**Foco:** Monetizar lo que ya tenemos, atraer tráfico, optimizar conversión.

```
✗ Más herramientas antes de validar Premium
✗ Apps móviles (iOS/Android)
✗ Internacionalización (otros idiomas)
✗ API pública REST
✗ Integraciones complejas (Google Docs, Chrome Extension, Slack bots)
✗ Features avanzadas (batch processing, detector de plagio)
✗ Anuncios (queremos UX limpia)
✗ Vender datos de usuarios
✗ Múltiples planes (solo Free y Premium)
✗ Sobre-ingeniería
```

**Enfoque actual:** Fase 1 (Monetización) → Fase 2 (SEO/pSEO) → Fase 3 (Analytics)

---

# 📞 CONTACTO Y RECURSOS

**Proyecto:** https://www.detectordeia.ai
**Vercel:** https://vercel.com/dashboard
**Google Cloud Console:** https://console.cloud.google.com
**Supabase:** https://supabase.com ✅
**Stripe:** https://stripe.com (pendiente Fase 1)

**Email:** hola@detectordeia.ai
**Twitter:** @detectordeia

---

**Última actualización:** 2025-11-07
**Estado:** Fase 0 ✅ Completada | Fase 1 ⏸️ En definición
**Próxima revisión:** Al empezar Fase 1 (post-research)
**Versión:** 2.0 (roadmap simplificado y enfocado)
