## 🛠 MVP DETALLADO – DetectordeIA.ai

### 🌟 Objetivo del MVP

Lanzar una herramienta funcional, usable y enfocada en el mercado hispanohablante que permita detectar si un texto fue generado por inteligencia artificial.
Debe ofrecer valor desde el día 1 con una experiencia simple, confiable y rápida, optimizada para SEO y con modelo freemium.

---

### ✅ Funcionalidades Core (Fase 1)

#### 🤓 Sin Login (Plan Gratuito)

* Textarea para pegar texto
* Contador de caracteres dinámico
* Placeholder amigable (“Pega aquí tu texto para analizar…”)
* Botón “Analizar texto”
* Llamada a `/api/analyze`
* Resultado básico:

  * Porcentaje de probabilidad de IA
  * Frases sospechosas destacadas (si aplica)
* Límite de uso:

  * 3 análisis por día
  * Hasta 2.000 caracteres por análisis
* Control con:

  * `localStorage` + `fingerprint` para identificar al usuario anónimo
* Validación mínima: 250 caracteres requeridos para análisis

---

### 🔐 Con Login (Planes Premium – Fase 2)

#### ✨ Registro e Inicio de sesión

* Magic link vía email (sin contraseña)
* Autenticación con Clerk o Supabase Auth

#### 🟨 Plan Básico – \$5/mes

* Hasta 5.000 caracteres por análisis
* Hasta 100 análisis por día
* Historial de análisis (últimos 7 días)
* Resultados ampliados con más contexto

#### 🟦 Plan Pro – \$9/mes

* Hasta 10.000 caracteres por análisis
* Análisis ilimitados
* Historial de 30 días
* Precisión optimizada para español
* Acceso futuro a API básica

#### 🟩 Plan Educativo – \$15/mes

* Hasta 25.000 caracteres por análisis
* Análisis ilimitados
* Análisis por lotes (hasta 10 archivos) *(fase futura)*
* Informe estructurado descargable *(fase futura)*
* Historial extendido + soporte
* Descuento anual (20–25%)

---

### 💳 Pagos

* Stripe Checkout o LemonSqueezy embebido
* Desbloqueo inmediato al completar el pago
* Planes mensuales y anuales
* Confirmación visual al upgrade

---

### 🔁 Lógica de Uso

* Si se alcanza el límite gratuito: mostrar mensaje + CTA visible para upgrade
* Si no hay login, mostrar “Solo 2 análisis restantes hoy”
* Si está logueado: mostrar plan actual + contador de uso
* Historial visible solo para usuarios con cuenta

---

### ⚠️ Validaciones y Mensajes UX

* “Mínimo 250 caracteres para analizar un texto”
* “Límite diario alcanzado” → CTA: “Desbloquear más análisis”
* “Resultado orientativo – la precisión puede variar según el tipo de texto”
* Loading animado durante el análisis: “Analizando…”

---

### 🔮 Bonus (si hay tiempo en el sprint)

* Opcion para copiar resultado con un clic
* Tooltip explicando por qué se marca una frase como sospechosa
* Reporte de errores o feedback desde la landing
