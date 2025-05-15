# 🚀 EXECUTION-PLAN.md – DetectordeIA.ai

## 1. Objetivo General

Lanzar un MVP funcional y monetizable de **DetectordeIA.ai**, un detector de textos generados por IA enfocado en el mercado hispanohablante, con una experiencia clara, confiable, y rápida desde la landing.

## 2. Principios Rectores

- Ejecutar rápido, pero con calidad visible (UX limpia y útil).
- Todo debe estar documentado, versionado y automatizable.
- Evitar tareas que no escalen o que bloqueen el avance.
- Validar feedback real lo antes posible.
- Construir pensando en SEO desde el día 1.

---

## 3. FASES DE EJECUCIÓN

---

### 🔹 Fase 1 – MVP Básico (sin login, gratuito)

**Objetivo**:  
Tener una landing funcional que detecta IA en un texto, sin login, con límites diarios.

**Entregables**:
- UI 100% funcional (desktop + mobile)
- Componente `Textarea + Contador + Botón`
- Endpoint `/api/analyze` conectado a OpenAI
- Resultado visual (porcentaje + frases)
- Lógica de límite diario (localStorage)

**Herramientas**:
- V0 para UI
- Cursor para lógica
- OpenAI API
- Tailwind
- Vercel

**Tareas**:
- [ ] Maquetar landing en V0
- [ ] Crear lógica de contador de caracteres
- [ ] Configurar endpoint `/api/analyze`
- [ ] Extraer frases sospechosas desde respuesta GPT
- [ ] Diseñar visualización: semáforo, porcentaje, frases
- [ ] Guardar número de análisis en localStorage
- [ ] Validar límite de 10 análisis/día por usuario

---

### 🔹 Fase 2 – Login + Planes Premium

**Objetivo**:  
Permitir upgrade a planes pagos con login por magic link y desbloqueo de límites.

**Entregables**:
- Registro/login con Clerk o Supabase (magic links)
- UI de cuenta + planes
- Control de acceso por plan
- Historial de análisis (7/30 días)

**Herramientas**:
- Clerk/Supabase Auth
- Stripe o LemonSqueezy
- API local para guardar historial en JSON (sin base de datos compleja)
- UI condicional por tipo de usuario

**Tareas**:
- [ ] Integrar login por magic link
- [ ] Definir estructura de usuario (free vs premium)
- [ ] Crear lógica de upgrade (UI + backend)
- [ ] Implementar panel de historial (para usuarios pagos)
- [ ] Incluir validación de caracteres por plan
- [ ] Implementar checkout (Stripe / LemonSqueezy)
- [ ] Crear webhook post-pago para actualizar plan

---

### 🔹 Fase 3 – SEO & Contenido

**Objetivo**:  
Capturar tráfico orgánico desde Google mediante pSEO y blog.

**Entregables**:
- Páginas pSEO por país y keyword
- Sección de blog inicial (5 artículos)
- Sitemap.xml
- Metatags correctos

**Herramientas**:
- V0 + rutas dinámicas Next.js
- Markdown o CMS headless opcional
- Notion/Docs para redactar contenido
- Ahrefs para tracking

**Tareas**:
- [ ] Crear estructura dinámica: `/[pais]` y `/blog/[slug]`
- [ ] Redactar artículos iniciales
- [ ] Crear página FAQ
- [ ] Subir contenido desde markdown o hardcode
- [ ] Agregar `<title>`, `<meta>`, canonical tags
- [ ] Subir a Search Console y verificar

---

### 🔹 Fase 4 – Feedback, Soporte y V2

**Objetivo**:  
Recolectar feedback de usuarios reales y preparar siguientes mejoras.

**Entregables**:
- Botón de feedback flotante
- Captura de errores/reportes
- Ajustes de pricing/UX
- Estimación para v2: detección por lotes, exportación PDF

**Herramientas**:
- Vercel Analytics
- Simple DB local o webhook para capturar feedback
- Notion para sistematizar respuestas

**Tareas**:
- [ ] Botón de "Sugerencias / Errores"
- [ ] Crear estructura interna para leer feedback
- [ ] Analizar uso real (límites, planes activados, etc.)
- [ ] Ajustes sobre onboarding, precisión y pricing

---

## 4. Checklist General

- [ ] Dominio en producción (`detectordeia.ai`)
- [ ] Logo y favicon simple (IA o ícono)
- [ ] Deploy en Vercel con variables seguras
- [ ] Tracking Google Analytics / Search Console
- [ ] Condiciones legales: Términos y Privacidad
- [ ] Disclaimer sobre precisión del sistema

---

## 5. Anexos futuros

- v2: Exportar PDF + análisis por lotes (solo planes pagos)
- v2: API pública para instituciones o herramientas externas
- v2: Reducción de falsos positivos mediante embeddings
- v2: Test A/B de pricing o UX

---