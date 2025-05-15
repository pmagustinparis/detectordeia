# 📚 Documentación de API - DetectordeIA.ai

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
| text      | string | Sí        | Texto a analizar (250-2000 caracteres)         |

#### Validaciones

- Longitud mínima: 250 caracteres
- Longitud máxima: 2000 caracteres (versión gratuita)
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

## Decisiones Técnicas

### 1. Modelo de IA
- **Decisión**: Uso de GPT-3.5-turbo
- **Razón**: Balance entre costo y precisión
- **Alternativas consideradas**: 
  - GPT-4: Mayor precisión pero costo elevado
  - Modelos especializados: Menor adaptabilidad al español

### 2. Formato de Respuesta
- **Decisión**: JSON estructurado con probabilidad y frases
- **Razón**: Facilita el procesamiento en frontend y futuras integraciones
- **Consideraciones**: 
  - Mantener consistencia en el formato
  - Incluir solo datos necesarios

### 3. Límites de Caracteres
- **Decisión**: 2000 caracteres en versión gratuita
- **Razón**: 
  - Balance entre utilidad y costos
  - Prevención de abusos
  - Optimización de tiempos de respuesta

### 4. Manejo de Errores
- **Estrategia**: Mensajes de error descriptivos en español
- **Implementación**: Try-catch con mensajes específicos
- **Consideraciones**: 
  - No exponer detalles técnicos
  - Mantener consistencia en mensajes

## Roadmap Técnico

### Fase 2 (Login + Pagos)
- Autenticación vía magic link
- Endpoints protegidos
- Límites por plan de suscripción

### Fase 3 (API Pública)
- Documentación con Swagger/OpenAPI
- Rate limiting
- API keys para desarrolladores

### Fase 4 (Mejoras)
- Caché de resultados
- Análisis por lotes
- Exportación de resultados

## Consideraciones de Seguridad

1. **Rate Limiting**
   - Implementar en próximas fases
   - Basado en IP y/o usuario

2. **Validación de Input**
   - Sanitización de texto
   - Prevención de inyección

3. **Privacidad**
   - No almacenamiento de textos
   - Logs mínimos necesarios

## Monitoreo y Métricas

### Métricas a Implementar
- Tiempo de respuesta
- Tasa de éxito/error
- Uso por plan
- Distribución de probabilidades

### Logging
- Errores de API
- Límites alcanzados
- Uso por endpoint

## Mantenimiento

### Tareas Periódicas
- Revisión de límites de caracteres
- Ajuste de prompts
- Actualización de dependencias

### Consideraciones de Escalabilidad
- Caché de resultados frecuentes
- Optimización de llamadas a OpenAI
- Monitoreo de costos 