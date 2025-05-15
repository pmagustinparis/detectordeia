# 📚 Documentación de API - DetectordeIA.ai

## Planes y Límites

### 🆓 Plan Gratuito (sin login)
- Hasta 5.000 caracteres por análisis
- Hasta 10 análisis diarios
- Mínimo 250 caracteres por texto
- Sin login: control por localStorage + fingerprint

### 💳 Planes Premium (con login requerido)
- Starter: hasta 15.000 caracteres/análisis, 50 análisis diarios, subida de archivos, historial 7 días
- Pro: hasta 50.000 caracteres/análisis, ilimitados, carga múltiple, historial 30 días, API y humanizador IA próximamente

## Endpoints

### POST /api/analyze

Analiza un texto para determinar si fue generado por IA.

#### Request

```http
POST /api/analyze
Content-Type: application/json

{
  "text": "string"
}
```

#### Parámetros

| Parámetro | Tipo   | Requerido | Descripción                                    |
|-----------|--------|-----------|------------------------------------------------|
| text      | string | Sí        | Texto a analizar (250-5.000 caracteres en plan gratuito)         |

#### Validaciones

- Longitud mínima: 250 caracteres
- Longitud máxima: 5.000 caracteres (plan gratuito)
- El texto debe ser una cadena no vacía

#### Response

```json
{
  "probability": number,      // 0-100
  "suspiciousPhrases": string[] // Frases sospechosas detectadas
}
```

#### Códigos de Estado

| Código | Descripción                                    |
|--------|------------------------------------------------|
| 200    | Análisis exitoso                               |
| 400    | Error de validación (texto inválido)           |
| 500    | Error interno del servidor                     |

#### Ejemplo de Respuesta Exitosa

```json
{
  "probability": 85,
  "suspiciousPhrases": [
    "La frase 'en el contexto de' aparece repetidamente",
    "Uso excesivo de conectores formales"
  ]
}
```

// ... resto igual ... 