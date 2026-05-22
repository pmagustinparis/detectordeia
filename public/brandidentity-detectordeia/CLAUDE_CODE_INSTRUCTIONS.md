# Instrucciones para Claude Code — detectordeIA

Rediseño del sitio aplicando el nuevo brand system. Pegale este documento entero a Claude Code en una sesión nueva, junto con los archivos de `/brand/`.

---

## Objetivo

Aplicar la nueva identidad de marca al sitio existente (https://www.detectordeia.ai). El sistema visual está pensado para una **suite académica de IA en español** — serio y confiable, pero moderno y techie. **No** un look corporativo aburrido, **no** un look "AI startup playful".

Referencia conceptual: la sobriedad editorial de Stripe/Substack + la solidez de QuillBot, pero con personalidad propia (serifa display, papel crema, verde biblioteca).

---

## 1. Paleta de color (tokens)

Definir estos tokens en el root CSS / Tailwind config:

```css
:root {
  /* Base */
  --tinta:        #1A1D24;   /* oklch(0.21 0.014 250) — texto, fondos oscuros */
  --tinta-soft:   #2D3138;   /* oklch(0.32 0.012 250) — texto secundario sobre claro */
  --papel:        #F7F5EF;   /* oklch(0.975 0.006 85) — BACKGROUND BASE — NO usar #FFF */
  --papel-2:      #F1EEE6;   /* oklch(0.955 0.008 85) — cards, surfaces elevadas */
  --papel-3:      #E8E3D7;   /* oklch(0.925 0.010 85) — hover de cards */
  --line:         #D8D3C5;   /* oklch(0.86 0.008 80)  — borders */
  --line-soft:    #E4DFD2;   /* oklch(0.92 0.008 80)  — borders sutiles */
  --mute:         #7A7E86;   /* oklch(0.52 0.010 250) — texto terciario, labels */

  /* Verde biblioteca — COLOR DE MARCA */
  --verde:        #3B6E55;   /* oklch(0.46 0.085 155) — CTA primaria, links, brand */
  --verde-deep:   #2D5944;   /* oklch(0.36 0.075 155) — hover, fondos verdes */
  --verde-soft:   #C7DECF;   /* oklch(0.88 0.04 155)  — backgrounds suaves, italics sobre dark */
  --verde-050:    #EDF3EE;   /* oklch(0.96 0.015 155) — hover sobre claro */

  /* Coral — alerta IA detectada (uso restringido) */
  --coral:        #DD6D4A;   /* oklch(0.64 0.155 35) */
  --coral-soft:   #F5DCD0;   /* oklch(0.92 0.04 35) */
}
```

### Reglas de uso

- **El background base del sitio es papel crema (`#F7F5EF`), nunca blanco puro.** Esto es la firma visual #1.
- **El verde es de marca**, no decorativo. Aparece en: CTA primaria, links de navegación, badges "verificado", subrayado del logo, theme-color del navegador. **Si todo es verde, nada lo es.**
- **El tinta no es negro puro** (`#1A1D24` tiene una pizca de azul). Usar `var(--tinta)` para todos los textos principales.
- **El coral solo aparece cuando se detecta IA** en el resultado del detector. Nunca como CTA, nunca decorativo.

---

## 2. Tipografía

### Fonts (Google Fonts)

```html
<link rel="preconnect" href="https://fonts.googleapis.com">
<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
<link href="https://fonts.googleapis.com/css2?family=Source+Serif+4:ital,opsz,wght@0,8..60,300..700;1,8..60,300..700&family=Geist:wght@300..700&family=Geist+Mono:wght@400..600&display=swap" rel="stylesheet">
```

### Tokens

```css
:root {
  --serif: 'Source Serif 4', 'Iowan Old Style', Georgia, serif;
  --sans:  'Geist', ui-sans-serif, system-ui, -apple-system, sans-serif;
  --mono:  'Geist Mono', ui-monospace, SFMono-Regular, monospace;
}
```

### Reglas de uso — IMPORTANTE

| Uso                                  | Familia            | Notas                                  |
|--------------------------------------|--------------------|----------------------------------------|
| H1, H2, H3 (titulares)               | `--serif` 300/400  | Letter-spacing -0.02em a -0.035em      |
| Hero / display grandes               | `--serif` 300      | Italics permitidos para énfasis        |
| Body text                            | `--sans` 400       | 16px base, line-height 1.5             |
| Botones, inputs, nav                 | `--sans` 500       | 14px en buttons, 16px en inputs        |
| Labels, eyebrows, métricas pequeñas  | `--mono` 500       | Uppercase + letter-spacing 0.12em      |
| Métricas grandes (% detección)       | `--mono` 400-500   | Tabular-nums, sin uppercase            |
| Citas APA formateadas                | `--mono` 400       | Para que se vea "técnico"              |

**Regla clave:** serifa para mostrar, sans para usar, mono para acentuar.

### Body styles base

```css
body {
  font-family: var(--sans);
  background: var(--papel);
  color: var(--tinta);
  font-size: 16px;
  line-height: 1.5;
  -webkit-font-smoothing: antialiased;
  text-rendering: optimizeLegibility;
}

h1, h2, h3, h4 {
  font-family: var(--serif);
  font-weight: 400;
  letter-spacing: -0.02em;
}
```

---

## 3. Logos — qué archivo usar dónde

Todos los archivos en `/brand/`. La regla general:

- **SVG** siempre que sea posible (escala perfecta, peso bajo).
- **PNG** solo donde un servicio externo no acepte SVG (algunos directorios SEO, redes sociales).

### Tabla de uso

| Dónde                                       | Archivo                                  | Por qué                                |
|---------------------------------------------|------------------------------------------|----------------------------------------|
| **Navbar del sitio (header)**               | `logo-detectordeia.svg`                  | Wordmark color tinta sobre papel       |
| **Footer del sitio**                        | `logo-detectordeia.svg` (más pequeño)    | Mismo, escalado                        |
| **Fondo oscuro / dark section**             | `logo-detectordeia-white.svg`            | Wordmark color papel                   |
| **Pestaña del navegador (favicon)**         | `favicon.svg` + `favicon.ico` (fallback) | Verde, símbolo solo                    |
| **iOS home screen**                         | `apple-touch-icon.png` (180×180)         | Verde, esquinas redondeadas            |
| **Android / PWA**                           | `android-chrome-192.png` y `-512.png`    | Verde                                  |
| **Open Graph (Twitter / FB / LinkedIn)**    | `og-image.png` (1200×630)                | Imagen con headline                    |
| **Twitter / X profile pic**                 | `icon-512-verde.png`                     | Cuadrado verde, símbolo papel          |
| **LinkedIn company page**                   | `icon-512-verde.png`                     | Lo mismo                               |
| **Twitter / LinkedIn header / banner**      | `banner-social.png` (1500×500)           | Banner horizontal                      |
| **Directorios SEO — logo PNG**              | `logo-detectordeia.png` (2000×500)       | Transparente, alta resolución          |
| **Directorios SEO — logo cuadrado**         | `icon-512-verde.png`                     | Si piden formato cuadrado              |
| **Directorios SEO — logo sobre fondo claro**| `logo-detectordeia-on-papel.png`         | Si necesitan fondo                     |
| **Email signature / firma**                 | `logo-detectordeia.png`                  | PNG transparente                       |

### HTML a poner en `<head>` (copiar tal cual)

```html
<!-- Favicons -->
<link rel="icon" type="image/svg+xml" href="/favicon.svg" />
<link rel="icon" type="image/x-icon" href="/favicon.ico" sizes="any" />
<link rel="icon" type="image/png" sizes="32x32" href="/favicon-32.png" />
<link rel="icon" type="image/png" sizes="16x16" href="/favicon-16.png" />
<link rel="apple-touch-icon" sizes="180x180" href="/apple-touch-icon.png" />
<link rel="manifest" href="/site.webmanifest" />
<meta name="theme-color" content="#2D5944" />

<!-- Open Graph -->
<meta property="og:title" content="detectordeIA — Detector, humanizador y citador APA en español" />
<meta property="og:description" content="Suite académica de IA en español para estudiantes y profesores. Detector de IA, humanizador, parafraseador y citador APA 7." />
<meta property="og:image" content="https://detectordeia.ai/og-image.png" />
<meta property="og:image:width" content="1200" />
<meta property="og:image:height" content="630" />
<meta property="og:url" content="https://detectordeia.ai" />
<meta property="og:type" content="website" />
<meta property="og:locale" content="es_ES" />

<!-- Twitter -->
<meta name="twitter:card" content="summary_large_image" />
<meta name="twitter:title" content="detectordeIA" />
<meta name="twitter:description" content="Detector, humanizador y citador APA en español." />
<meta name="twitter:image" content="https://detectordeia.ai/og-image.png" />

<!-- Fonts -->
<link rel="preconnect" href="https://fonts.googleapis.com">
<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
<link href="https://fonts.googleapis.com/css2?family=Source+Serif+4:ital,opsz,wght@0,8..60,300..700;1,8..60,300..700&family=Geist:wght@300..700&family=Geist+Mono:wght@400..600&display=swap" rel="stylesheet">
```

### Estructura de carpetas sugerida

```
public/
├── favicon.ico
├── favicon.svg
├── favicon-16.png
├── favicon-32.png
├── apple-touch-icon.png
├── android-chrome-192.png
├── android-chrome-512.png
├── og-image.png
├── site.webmanifest
└── brand/
    ├── logo-detectordeia.svg          (usar en navbar)
    ├── logo-detectordeia-white.svg    (usar en footer dark)
    ├── icon-verde.svg                 (usar en cards/badges)
    ├── banner-social.png
    └── logo-detectordeia-on-papel.png (para directorios SEO)
```

---

## 4. Componentes — estilos base

### Botón primario (CTA)

```css
.btn-primary {
  background: var(--verde);
  color: var(--papel);
  font-family: var(--sans);
  font-weight: 500;
  font-size: 15px;
  padding: 12px 22px;
  border-radius: 8px;
  border: none;
  letter-spacing: -0.005em;
  transition: background 150ms ease;
  cursor: pointer;
}
.btn-primary:hover { background: var(--verde-deep); }
```

### Botón secundario

```css
.btn-secondary {
  background: transparent;
  color: var(--tinta);
  border: 1px solid var(--line);
  /* resto igual al primary */
}
.btn-secondary:hover { background: var(--papel-2); border-color: var(--tinta); }
```

### Card / tool card

```css
.card {
  background: var(--papel-2);
  border: 1px solid var(--line-soft);
  border-radius: 8px;
  padding: 24px;
  transition: border-color 150ms;
}
.card:hover { border-color: var(--line); background: var(--papel); }
```

### Navbar

```css
.navbar {
  background: var(--papel);
  border-bottom: 1px solid var(--line-soft);
  padding: 18px 32px;
  font-family: var(--sans);
}
.navbar a { color: var(--tinta-soft); font-size: 14px; }
.navbar a:hover { color: var(--verde); }
```

### Input (textarea del detector)

```css
textarea, input {
  background: var(--papel-2);
  border: 1px solid var(--line);
  border-radius: 8px;
  padding: 14px 16px;
  font-family: var(--sans);
  font-size: 15px;
  color: var(--tinta);
  line-height: 1.55;
}
textarea:focus, input:focus {
  outline: none;
  border-color: var(--verde);
  box-shadow: 0 0 0 3px rgba(59, 110, 85, 0.12);
}
```

### Badge "humano detectado" / "IA detectada"

```css
.badge-humano {
  background: var(--verde-050);
  color: var(--verde-deep);
  font-family: var(--mono);
  font-size: 11px;
  text-transform: uppercase;
  letter-spacing: 0.12em;
  padding: 5px 10px;
  border-radius: 999px;
}
.badge-ia {
  background: var(--coral-soft);
  color: var(--coral);
  /* resto igual */
}
```

---

## 5. Hero del sitio — sugerencia

```html
<section class="hero">
  <p class="eyebrow">— Suite académica · Español</p>
  <h1>
    Detector, humanizador y citador APA,<br/>
    <em>en español de verdad.</em>
  </h1>
  <p class="lead">
    Pegá tu texto y nuestra IA evaluará la probabilidad de que esté generado.
    Después, refinálo, parafraseálo o generá las citas — todo en un solo lugar.
  </p>
  <div class="cta-row">
    <button class="btn-primary">Probar el detector →</button>
    <button class="btn-secondary">Ver cómo funciona</button>
  </div>
</section>

<style>
  .hero { padding: 96px 0 64px; max-width: 880px; }
  .eyebrow {
    font-family: var(--mono); font-size: 12px;
    text-transform: uppercase; letter-spacing: 0.14em;
    color: var(--mute); margin-bottom: 28px;
  }
  .hero h1 {
    font-family: var(--serif); font-weight: 300;
    font-size: clamp(48px, 6vw, 84px);
    line-height: 1.02; letter-spacing: -0.03em;
    margin: 0 0 24px;
  }
  .hero h1 em { font-style: italic; color: var(--verde-deep); font-weight: 400; }
  .hero .lead {
    font-family: var(--serif); font-weight: 300;
    font-size: 22px; line-height: 1.45;
    color: var(--tinta-soft); max-width: 50ch;
    margin: 0 0 36px;
  }
  .cta-row { display: flex; gap: 12px; }
</style>
```

---

## 6. Cosas que NO hacer

- ❌ Backgrounds blanco puro (`#FFF`). Siempre `--papel` (`#F7F5EF`).
- ❌ Gradientes morado/azul "AI" (OpenAI-style). Verde sólido sí.
- ❌ Emojis decorativos en titulares o navegación.
- ❌ Iconos de IA-sparkle (✨, los hexagonitos con cara, etc).
- ❌ Inter, Roboto o system-ui como tipografía principal. Usar Geist.
- ❌ Border-radius > 12px en cards. Máximo 8px (12px sólo en pills/badges).
- ❌ Shadows fuertes / drop shadows tipo Material. Solo borders sutiles.
- ❌ Verde QuillBot brillante (`#00b876`). Nuestro verde es más profundo: `#3B6E55`.

## Cosas que SÍ hacer

- ✅ Crema (`#F7F5EF`) como background base.
- ✅ Verde biblioteca para todo lo "verificable" y todas las CTAs.
- ✅ Italics en serifa para énfasis (en hero, en titulares importantes).
- ✅ Mono uppercase para eyebrows, labels y métricas.
- ✅ Espacio generoso (`padding: 96px 0` en secciones grandes).
- ✅ Borders sutiles (`--line-soft`) en lugar de shadows.
- ✅ Tabular-nums en métricas (`font-variant-numeric: tabular-nums`).

---

## 7. Plan de implementación sugerido

1. **Subir los archivos de `/brand/`** a la carpeta `public/` del proyecto.
2. **Reemplazar el `<head>`** con el snippet de la sección 3.
3. **Definir los tokens CSS** en el archivo global (`globals.css` o equivalente).
4. **Cargar las fuentes** con el `<link>` de Google Fonts.
5. **Reemplazar el logo** del navbar con `/brand/logo-detectordeia.svg`.
6. **Pintar el body** con `background: var(--papel)` y `color: var(--tinta)`.
7. **Refactorizar los CTAs** uno por uno con los estilos de la sección 4.
8. **Refactorizar el hero** con la sugerencia de la sección 5.
9. **Refactorizar las cards de herramientas** (Detector, Humanizador, Parafraseador, Citador APA).
10. **Verificar** que ninguna sección tenga `#FFFFFF` puro como fondo.

Si querés mantener compatibilidad mientras migrás, hacelo página por página — empezando por la home.
