# 🧠 DetectordeIA.ai

## 1. Contexto General

Explorando keywords en Ahrefs encontré un alto volumen de búsqueda para términos como "detector de IA" en español, especialmente en España, México, Colombia y Argentina. También identifiqué que las herramientas actuales tienen baja precisión en español y una experiencia de usuario pobre.

### 🧩 Keywords principales detectadas

| Keyword                    | Volumen (España) | Volumen Global | Dificultad (KD) | Comentario                |
|---------------------------|------------------|----------------|------------------|---------------------------|
| detector de ia            | 128K             | 783K           | 4                | Principal keyword         |
| detector ia               | 35K              | 73K            | 3                | Variante fuerte           |
| ia detector               | 13K              | –              | Bajo             | Complementaria            |
| detector de plagio ia     | 1.3K             | –              | Bajo             | Foco educativo posible    |
| detector de ia gratis     | 600              | –              | Muy bajo         | Alta intención comercial  |
| detector de ia en textos  | 700              | –              | –                | Long tail específica      |

### 🌍 Búsquedas globales (ES + LATAM)

| País         | Volumen mensual estimado |
|--------------|---------------------------|
| Brasil       | 150K                      |
| España       | 128K                      |
| Colombia     | 124K                      |
| México       | 119K                      |
| Chile        | 54K                       |
| Perú         | 51K                       |
| Argentina    | ~45K                      |
| Otros LATAM  | ~100K                     |

**Conclusión SEO:**  
- Potencial de +700K búsquedas mensuales globales  
- Baja dificultad de posicionamiento (KD 3–4)  
- Alta intención de uso inmediato (keywords transaccionales)

---

## 2. Oportunidad Detectada

- Alto volumen de búsquedas globales en español  
- Baja competencia en las principales keywords  
- UX pobre y baja precisión de los actuales detectores en español  
- Fuerte oportunidad de capturar tráfico orgánico con una solución simple, localizada y efectiva  

---

## 3. Visión del Producto

- Herramienta online confiable para detectar si un texto fue escrito por IA  
- 100% enfocada en el mercado hispanohablante  
- Página única funcional  
- UX clara y rápida  
- Modelo freemium desde el día 1  
- Optimización para español (España + LATAM)

---

## 4. Monetización

### 🆓 Plan Gratuito (sin login)
- Hasta 5.000 caracteres por análisis
- Hasta 10 análisis diarios
- Resultado básico:  
  - Porcentaje estimado de generación por IA  
  - Frases sospechosas destacadas  
- Mínimo de 250 caracteres por texto
- Sin registro requerido: se controla mediante localStorage + fingerprint

Este plan permite captar tráfico orgánico con una propuesta de valor clara y generosa, maximizando la adopción inicial sin fricción.

---

### 💳 Planes Premium (con login requerido)

#### 🟨 Plan Starter – USD $7/mes
- Hasta 15.000 caracteres por análisis
- Hasta 50 análisis diarios
- Subida de archivo .txt, .docx o .pdf
- Reporte detallado con explicación por sección
- Historial de análisis de 7 días  
- Login requerido vía Magic Link

---

#### 🟦 Plan Pro – USD $12/mes
- Hasta 50.000 caracteres por análisis
- Análisis diarios ilimitados
- Carga múltiple de archivos
- Reporte detallado ampliado
- Historial de 30 días  
- Próximamente:
  - Humanizador IA (convierte un texto detectado como IA en uno humanizado)
  - API de uso básico (MVP v2)

---

#### 🟢 Extras y promociones
- Descuento anual: 20% en ambos planes
- Prueba gratuita opcional: 3 días al registrarse por primera vez (por definir)
- Pago con Stripe o LemonSqueezy

---

## 5. Estrategia SEO y pSEO

### 🌎 Enfoque

- SEO + pSEO en español como canal de adquisición principal  
- Enfoque en español neutro con variantes por región  

### 📂 pSEO por país

| País      | URL sugerida | Meta título                                      |
|-----------|--------------|--------------------------------------------------|
| España    | /espana      | Detector de IA para España                       |
| México    | /mexico      | Detector de textos con IA en México              |
| Colombia  | /colombia    | Detectar si un texto fue escrito por IA         |
| Argentina | /argentina   | Herramienta IA para detectar textos artificiales |
| Chile     | /chile       | ¿Texto hecho por IA? Detectalo gratis            |
| Perú      | /peru        | Detector de IA en español para Perú              |

### ✍️ Blog inicial

| Título                                         | URL sugerida                  |
|-----------------------------------------------|-------------------------------|
| ¿Cuál es el mejor detector de IA en español?   | /blog/mejor-detector-de-ia    |
| Cómo funciona un detector de inteligencia AI   | /blog/como-funciona-detector-ia |
| ¿Se puede evitar un detector de IA?            | /blog/como-evitar-detector-ia |
| Precisión real de los detectores en español    | /blog/precision-detectores-ia |
| Detectar textos de ChatGPT                     | /blog/detectar-chatgpt        |

---

## 6. Stack Técnico

- Frontend: V0 (Next.js + Tailwind)  
- Backend: Cursor (API routes)  
- Login: Clerk o Supabase (magic links)  
- Pagos: Stripe o LemonSqueezy  
- AI: OpenAI (GPT-3.5 / GPT-4)  
- Hosting: Vercel  
- UX research: Lovable  
- Benchmark & Research: Perplexity

---

## 7. PRD / Alcance MVP

### Funcionalidades sin login

- Textarea con contador  
- Botón "Analizar texto"  
- Llamada a `/api/analyze`  
- Resultado básico (porcentaje + frases)  
- Límite: 3 análisis diarios / 2.000 caracteres  

### Funcionalidades con login

- Registro vía magic link  
- Control de límites por plan  
- Historial de análisis  
- Resultados detallados  
- Checkout Stripe o LemonSqueezy  

---

## 8. Roadmap por Fases

1. **Fase 1 – MVP funcional**  
   - Input + análisis con OpenAI  
   - UI simple  
   - Límite diario

2. **Fase 2 – Login + Pagos**  
   - Auth + Clerk/Supabase  
   - Planes pagos  

3. **Fase 3 – SEO y tráfico**  
   - Páginas pSEO  
   - Blog inicial  

4. **Fase 4 – Feedback & mejoras**  
   - Captura de insights  
   - Ajustes UX y precisión  

---

## 9. Riesgos y Desafíos

- Falsos positivos/negativos  
- Evasión de detección  
- Mal uso académico  
- Costos OpenAI  
- Legislación en evolución  

---

## 10. Normativas y Cumplimiento

### 🛡️ GDPR (UE)

- Consentimiento explícito  
- Derecho al olvido  
- Política clara de privacidad  
- Cookies esenciales por defecto

### 📜 AI Act (UE - futuro)

- Disclaimer en resultados  
- Transparencia sobre precisión  
- Evitar marketing engañoso

### 🔒 Privacidad

- Textos sin login no se guardan  
- Textos con login: historial privado y borrable  
- Sin compartir a terceros

---

## 11. Diseño UX/UI

### 🔹 Principios clave

- **One-page app**  
- **Mobile-first**  
- **Carga rápida (<2.5s)**  
- **Input grande y claro**  
- **Límites visibles**

### 🔹 Resultados claros

- Semáforo o barra de confianza  
- Frases destacadas  
- Tooltips para explicaciones  

### 🔹 Upsell y planes

- CTA visibles  
- Login social o email sin fricción  
- Checkout embebido  

### 🔹 SEO y accesibilidad

- URLs keyword-rich  
- FAQ/blog desde la home  
- Contraste alto y botones grandes  
- Botón flotante para feedback  

---