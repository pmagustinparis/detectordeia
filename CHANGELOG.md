# Changelog DetectorDeIA.ai

Todos los cambios notables en este proyecto serán documentados en este archivo.

## [1.1.0] - Noviembre 2024

### Added - Humanizador de IA
- ✨ Nueva herramienta: **Humanizador de IA en Español**
- 🆓 Humanización gratuita de hasta 600 caracteres por uso
- ♾️ Usos ilimitados sin registro
- 🔒 100% privado - no almacenamos texto
- 🎯 Optimizado específicamente para español (LATAM y España)

### Features del Humanizador
- Modo Estándar disponible gratuitamente
- Modo Avanzado bloqueado (próximamente en Premium)
- Botones de copiar y descargar resultado como .txt
- Contador de caracteres dinámico con alertas visuales
- Overlay premium cuando se excede límite de caracteres
- Blur del resultado con CTA para actualizar a Premium

### Landing Page Completa
- Sección "¿Cómo funciona?" (3 pasos)
- Sección "¿Por qué usar el humanizador?" (4 beneficios)
- Sección "¿Quién usa el humanizador?" (4 casos de uso)
- FAQ Section con 8 preguntas frecuentes (accordion expandible)
- CTA Final con scroll to top
- Premium Upsell Block

### Sistema de Upsell Premium
- Modal de captura de email para lista de espera
- Endpoint `/api/subscribe` para guardar emails en Google Sheets
- 3 CTAs estratégicos:
  - Overlay cuando se excede límite
  - Bottom upsell block
  - Desde FAQ
- Tooltips informativos en features bloqueadas

### SEO y Metadatos
- Meta tags optimizados (title, description, keywords)
- Open Graph tags completos
- Twitter Cards configurados
- Structured Data (JSON-LD):
  - WebApplication schema
  - FAQPage schema con 8 preguntas
- Canonical URLs correctas
- Robots directives configurados
- Sitemap.xml actualizado

### Internal Linking
- Link del Detector → Humanizador ("¿Tu texto suena a IA? Humanízalo")
- Link del Humanizador → Detector ("¿Quieres verificar si pasa como humano?")
- Navegación principal actualizada

### Technical Implementation
- Nuevo endpoint: `/api/humanize`
  - Integración con OpenAI GPT-3.5-turbo
  - Validación de caracteres (mín: 50, máx free: 600, máx absoluto: 15000)
  - Prompt especializado para humanización en español
  - Temperature: 0.3 para resultados consistentes

- Nuevo endpoint: `/api/subscribe`
  - Guarda emails en Google Sheets
  - Registra origen del click, IP, User Agent
  - Validación de formato de email
  - Error handling robusto

- Componentes nuevos:
  - `HumanizadorMain.tsx` - Componente principal de la herramienta
  - `EmailCaptureModal.tsx` - Modal para captura de emails
  - `FAQSection.tsx` - Sección de preguntas frecuentes
  - `HumanizadorClient.tsx` - Client component con landing completa

- Optimizaciones:
  - Área de resultado con altura fija y scroll interno
  - Overlay premium siempre visible (no requiere scroll)
  - Responsive design para mobile
  - Animaciones suaves
  - Loading states en todos los botones

### Files Added
```
src/app/humanizador/
  ├── page.tsx (with SEO metadata & structured data)
  └── HumanizadorClient.tsx

src/app/components/
  ├── HumanizadorMain.tsx
  ├── EmailCaptureModal.tsx
  └── FAQSection.tsx

src/app/api/
  ├── humanize/route.ts
  └── subscribe/route.ts (updated)

src/app/sitemap.ts (new)
.env.example (new)
CHANGELOG.md (this file)
```

### Files Modified
```
src/components/Header.tsx (added Humanizador link)
src/app/HomePageClient.tsx (added cross-link to Humanizador)
src/app/components/DetectorMain.tsx (fixed scroll behavior)
```

### Environment Variables
- `OPENAI_API_KEY` - Required for humanizer functionality
- `GOOGLE_SHEET_ID` - Optional, for email subscriptions
- `GOOGLE_SERVICE_ACCOUNT_EMAIL` - Optional, for Google Sheets
- `GOOGLE_PRIVATE_KEY` - Optional, for Google Sheets

### Documentation
- Added `.env.example` with all required variables
- Structured data validates on schema.org

---

## [1.0.0] - Octubre 2024

### Initial Release
- Detector de IA en Español
- Análisis hasta 1200 caracteres gratis
- Integración con Supabase
- Landing page completa
- Pricing page
- Sistema de feedback
