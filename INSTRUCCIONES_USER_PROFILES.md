# 📋 Instrucciones: Crear tabla user_profiles en Supabase

## Paso 1: Copiar el SQL

Abrí el archivo:
```
supabase/migrations/20251118_create_user_profiles.sql
```

Copiá **todo** el contenido del archivo.

---

## Paso 2: Ejecutar en Supabase

1. Andá a tu proyecto en [Supabase](https://supabase.com)
2. En el menú lateral, hacé click en **"SQL Editor"**
3. Click en **"New query"**
4. Pegá todo el SQL que copiaste
5. Click en **"Run"** (o presioná `Ctrl + Enter`)

---

## Paso 3: Verificar que funcionó

Deberías ver el mensaje: **"Success. No rows returned"** (es normal, solo creamos la tabla)

Para verificar que la tabla existe:
1. En el menú lateral, andá a **"Table Editor"**
2. Deberías ver una nueva tabla llamada **`user_profiles`**

---

## ¿Qué hace esta tabla?

Guarda información del usuario cuando completa el modal de onboarding:
- **role**: Estudiante, profesor, escritor, etc.
- **primary_use**: Para qué usa DetectordeIA (detectar, humanizar, parafrasear)
- **discovery_source**: Cómo nos encontró (Google, redes, recomendación, etc.)

Esta info te va a ayudar a:
- ✅ Entender mejor a tus usuarios
- ✅ Segmentar en el dashboard de analytics
- ✅ Tomar decisiones de producto
- ✅ Personalizar la experiencia

---

## Una vez ejecutado

Escribime "listo" o "ejecutado" y sigo con el código del modal y la integración.
