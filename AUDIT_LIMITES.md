# AUDITORÍA COMPLETA DE LÍMITES - DetectordeIA.ai
## Estado: 2025-11-21

---

## 📊 CONFIGURACIÓN ESPERADA

### Límites de Usos Diarios (Rate Limits)
| Herramienta | Anónimo | Free | PRO |
|------------|---------|------|-----|
| Detector | 1 (total) | 15 | ∞ |
| Humanizador | 1 (total) | 3 | ∞ |
| Parafraseador | 1 (total) | 10 | ∞ |

### Límites de Caracteres por Análisis
| Herramienta | Anónimo | Free | PRO |
|------------|---------|------|-----|
| Detector | 800 | 1,200 | 100,000 |
| Humanizador | 400 | 600 | 100,000 |
| Parafraseador | 400 | 600 | 100,000 |

---

## ✅ ARCHIVOS CORRECTOS

### `/src/lib/tracking/checkRateLimit.ts`
```typescript
const RATE_LIMITS = {
  anonymous: { total: 1 },
  free: {
    detector: 15,
    humanizador: 3,
    parafraseador: 10,
  },
  premium: {
    detector: Infinity,
    humanizador: Infinity,
    parafraseador: Infinity,
  },
};
```
**Estado: ✅ CORRECTO**

### `/src/app/components/DetectorMain.tsx`
```typescript
const CHARACTER_LIMITS = {
  anonymous: 800,
  free: 1200,
  premium: 100000,
};
```
**Estado: ✅ CORRECTO**

### `/src/app/components/HumanizadorMain.tsx`
```typescript
const CHARACTER_LIMITS = {
  anonymous: 400,
  free: 600,
  premium: 100000,
};
```
**Estado: ✅ CORRECTO**

### `/src/app/components/ParafraseadorMain.tsx`
```typescript
const CHARACTER_LIMITS = {
  anonymous: 400,
  free: 600,
  premium: 100000,
};
```
**Estado: ✅ CORRECTO**

### `/src/app/api/humanize/route.ts`
```typescript
const CHARACTER_LIMITS = {
  free: 600,
  premium: 100000,
};
```
**Estado: ✅ CORRECTO** (recién arreglado)

---

## ❌ ARCHIVOS CON ERRORES

### `/src/app/api/analyze/route.ts` - DETECTOR
```typescript
const CHARACTER_LIMITS = {
  free: 1200,
  premium: 15000,  // ❌ DEBERÍA SER 100000
};
```
**Estado: ❌ ERROR - Premium tiene 15,000 en vez de 100,000**

Mensaje de error también incorrecto:
```typescript
? 'El texto excede el límite de 1,200 caracteres del plan Free. Actualiza a Pro para analizar hasta 15,000 caracteres.'
: 'El texto excede el límite de 15,000 caracteres.'
```

### `/src/app/api/paraphrase/route.ts` - PARAFRASEADOR
```typescript
const CHARACTER_LIMITS = {
  free: 600,
  premium: 15000,  // ❌ DEBERÍA SER 100000
};
```
**Estado: ❌ ERROR - Premium tiene 15,000 en vez de 100,000**

Mensaje de error también incorrecto:
```typescript
? 'El texto excede el límite de 600 caracteres del plan Free. Actualiza a Pro para parafrasear hasta 15,000 caracteres.'
```

---

## 🔧 FIXES REQUERIDOS

### 1. `/src/app/api/analyze/route.ts` (líneas 205-222)
**Cambiar de:**
```typescript
const CHARACTER_LIMITS = {
  free: 1200,
  premium: 15000,
};
// ... error messages con "15,000 caracteres"
```

**A:**
```typescript
const CHARACTER_LIMITS = {
  free: 1200,
  premium: 100000, // ILIMITADO para PRO
};

if (text.length > charLimit) {
  return NextResponse.json(
    {
      error: userPlan === 'free'
        ? 'El texto excede el límite de 1,200 caracteres del plan Free. Actualiza a Pro para textos ilimitados.'
        : 'El texto excede el límite máximo permitido.',
      charLimit,
      currentLength: text.length,
    },
    { status: 400 }
  );
}
```

### 2. `/src/app/api/paraphrase/route.ts` (líneas 109-127)
**Cambiar de:**
```typescript
const CHARACTER_LIMITS = {
  free: 600,
  premium: 15000,
};
// ... error messages con "15,000 caracteres"
```

**A:**
```typescript
const CHARACTER_LIMITS = {
  free: 600,
  premium: 100000, // ILIMITADO para PRO
};

if (text.length > charLimit) {
  return NextResponse.json(
    {
      error: userPlan === 'free'
        ? 'El texto excede el límite de 600 caracteres del plan Free. Actualiza a Pro para textos ilimitados.'
        : 'El texto excede el límite máximo permitido.',
      charLimit,
      currentLength: text.length,
    },
    { status: 400 }
  );
}
```

---

## 📝 RESUMEN

**Archivos correctos:** 5/7 ✅
- checkRateLimit.ts ✅
- DetectorMain.tsx ✅
- HumanizadorMain.tsx ✅
- ParafraseadorMain.tsx ✅
- /api/humanize/route.ts ✅

**Archivos con errores:** 2/7 ❌
- /api/analyze/route.ts ❌ (Detector backend)
- /api/paraphrase/route.ts ❌ (Parafraseador backend)

**Impacto:**
- Usuarios PRO tienen límite de 15,000 caracteres en Detector y Parafraseador
- El mensaje dice "ilimitado" en el frontend pero el backend rechaza después de 15,000
- Mala experiencia de usuario y promesa incumplida

**Prioridad:** 🚨 CRÍTICO - Arreglar antes de deploy
