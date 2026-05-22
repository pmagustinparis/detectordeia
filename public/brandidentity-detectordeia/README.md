# detectordeIA — Brand assets
Versión 1.0 · Mayo 2026

## Estructura

### Logo principal (wordmark "detectordeIA" con acento académico)
- `logo-detectordeia.svg` — vector, color tinta · transparente
- `logo-detectordeia-white.svg` — vector, color papel · transparente
- `logo-detectordeia-verde.svg` — vector, verde biblioteca · transparente
- `logo-detectordeia.png` — 2000×500, tinta · transparente
- `logo-detectordeia-white.png` — 2000×500, papel · transparente
- `logo-detectordeia-verde.png` — 2000×500, verde · transparente
- `logo-detectordeia-on-papel.png` — 2400×800, sobre fondo crema
- `logo-detectordeia-on-tinta.png` — 2400×800, sobre fondo oscuro

### Símbolo / icono (solo asterisco)
- `favicon.svg` — vector, transparente, color tinta
- `favicon-white.svg` — vector, transparente, color papel
- `icon-light.svg` — vector, símbolo sobre fondo crema, esquinas redondeadas
- `icon-dark.svg` — vector, símbolo sobre fondo oscuro
- `icon-verde.svg` — vector, símbolo sobre fondo verde
- `symbol-1024.png` — 1024×1024, transparente, color tinta
- `symbol-1024-white.png` — 1024×1024, transparente, papel
- `icon-512-light.png` / `-dark.png` / `-verde.png` — variantes 512×512

### Favicons (para subir a la web)
- `favicon.ico` — multi-resolución 16/32/48 (estándar de navegadores)
- `favicon-16.png` — 16×16
- `favicon-32.png` — 32×32
- `favicon-48.png` — 48×48
- `apple-touch-icon.png` — 180×180 (iOS)
- `android-chrome-192.png` — 192×192 (PWA / Android)
- `android-chrome-512.png` — 512×512 (PWA / Android)
- `site.webmanifest` — manifiesto PWA listo para deploy

### Social
- `og-image.png` — 1200×630 (Open Graph, Twitter card grande)
- `banner-social.png` — 1500×500 (header de Twitter / LinkedIn)

## HTML que necesitas en `<head>`

```html
<!-- Favicons -->
<link rel="icon" type="image/svg+xml" href="/favicon.svg" />
<link rel="icon" type="image/x-icon" href="/favicon.ico" sizes="any" />
<link rel="icon" type="image/png" sizes="32x32" href="/favicon-32.png" />
<link rel="icon" type="image/png" sizes="16x16" href="/favicon-16.png" />
<link rel="apple-touch-icon" sizes="180x180" href="/apple-touch-icon.png" />
<link rel="manifest" href="/site.webmanifest" />
<meta name="theme-color" content="#1A1D24" />

<!-- Open Graph -->
<meta property="og:title" content="detectordeIA — Detector, humanizador y citador APA en español" />
<meta property="og:description" content="Suite académica de IA en español para estudiantes y profesores." />
<meta property="og:image" content="https://detectordeia.ai/og-image.png" />
<meta property="og:url" content="https://detectordeia.ai" />
<meta property="og:type" content="website" />

<!-- Twitter -->
<meta name="twitter:card" content="summary_large_image" />
<meta name="twitter:title" content="detectordeIA" />
<meta name="twitter:description" content="Detector, humanizador y citador APA en español." />
<meta name="twitter:image" content="https://detectordeia.ai/og-image.png" />
```

## Para directorios de SEO

Si te piden:
- **Logo PNG** → `logo-detectordeia.png` (transparente, 2000×500). Si necesitan cuadrado: `icon-512-light.png`.
- **Logo sobre fondo claro/oscuro** → `logo-detectordeia-on-papel.png` / `logo-detectordeia-on-tinta.png`.
- **Icono / avatar cuadrado** → `icon-512-dark.png` (lo más versátil) o `icon-512-verde.png` para destacar.
- **Favicon** → `favicon.ico` o `favicon-32.png`.
- **Screenshot del producto** → no incluido aquí, lo necesitas del sitio en vivo.

## Paleta

| Token         | OKLCH                       | HEX       | Uso                                       |
|---------------|-----------------------------|-----------|-------------------------------------------|
| Tinta         | oklch(0.21 0.014 250)       | #1A1D24   | Texto principal, fondos oscuros           |
| Papel         | oklch(0.975 0.006 85)       | #F7F5EF   | Background base (crema, NO blanco puro)   |
| Verde Biblio. | oklch(0.46 0.085 155)       | #3B6E55   | CTAs, links, verificación, badges         |
| Verde Deep    | oklch(0.36 0.075 155)       | #2D5944   | Hover de CTAs, fondos verdes              |
| Verde Soft    | oklch(0.88 0.04 155)        | #C7DECF   | Backgrounds suaves, italics sobre oscuro  |
| Coral         | oklch(0.64 0.155 35)        | #DD6D4A   | Alerta "IA detectada" (uso restringido)   |

## Tipografía

- **Display:** Source Serif 4 (Google Fonts) — titulares, marca, números grandes
- **UI:** Geist (Google Fonts) — interfaz, párrafos, formularios
- **Mono:** Geist Mono (Google Fonts) — métricas, etiquetas, citas APA

Import recomendado:

```html
<link rel="preconnect" href="https://fonts.googleapis.com">
<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
<link href="https://fonts.googleapis.com/css2?family=Source+Serif+4:ital,opsz,wght@0,8..60,300..700;1,8..60,300..700&family=Geist:wght@300..700&family=Geist+Mono:wght@400..600&display=swap" rel="stylesheet">
```
