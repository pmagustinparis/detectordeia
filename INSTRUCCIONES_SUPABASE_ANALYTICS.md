# 📊 Instrucciones: Crear Tabla Analytics en Supabase

## ⏱️ Tiempo estimado: 5 minutos

---

## 🎯 Paso 1: Abrir Supabase

1. Ve a [https://supabase.com](https://supabase.com)
2. Haz login con tu cuenta
3. Selecciona tu proyecto: **detectordeia**

---

## 🎯 Paso 2: Abrir SQL Editor

1. En el menú lateral izquierdo, busca **"SQL Editor"** (icono de documento con código)
2. Click en **"SQL Editor"**
3. Click en el botón **"New Query"** (arriba a la derecha)

---

## 🎯 Paso 3: Copiar y Pegar el Script

1. Abre el archivo: `supabase/migrations/20251118_create_analytics_events.sql`
2. **Copia TODO el contenido** del archivo (Ctrl+A, Ctrl+C)
3. **Pega** en el editor de Supabase (Ctrl+V)

---

## 🎯 Paso 4: Ejecutar el Script

1. Verifica que el código se pegó completo (debe empezar con `-- ============================================`)
2. Click en el botón **"Run"** (abajo a la derecha del editor)
   - O presiona `Ctrl + Enter` (Windows/Linux)
   - O presiona `Cmd + Enter` (Mac)

---

## ✅ Paso 5: Verificar que Funcionó

Deberías ver un mensaje de éxito que dice algo como:

```
Success. No rows returned
```

O:

```
Success
```

**Si ves errores en rojo**, cópiame el mensaje de error completo y lo solucionamos.

---

## 🔍 Paso 6: Verificar que la Tabla Existe

1. En el menú lateral izquierdo, busca **"Table Editor"** (icono de tabla)
2. Click en **"Table Editor"**
3. En la lista de tablas, deberías ver una nueva tabla llamada: **`analytics_events`**
4. Click en ella para ver su estructura

**Deberías ver estas columnas:**
- `id` (uuid)
- `user_id` (uuid)
- `anonymous_id` (varchar)
- `event_type` (varchar)
- `metadata` (jsonb)
- `tool_type` (varchar)
- `page_url` (text)
- `referrer` (text)
- `created_at` (timestamp)

---

## 🎉 ¡Listo!

Si ves la tabla `analytics_events` en el Table Editor, **todo funcionó correctamente**.

Avísame con un ✅ y yo arranco con el código de tracking.

---

## 🆘 Si Algo Sale Mal

**Problema: Sale error al ejecutar el script**
→ Copia el mensaje de error completo y pégamelo

**Problema: No veo el botón "Run"**
→ Asegúrate de estar en "SQL Editor", no en "Query"

**Problema: Dice que la tabla ya existe**
→ Perfecto, significa que ya estaba creada. Avísame igual.

---

## 📸 Ayuda Visual

### Dónde está SQL Editor:
```
┌─ Menú Supabase ────────┐
│ 🏠 Home                │
│ 📊 Table Editor        │
│ 🔍 SQL Editor  ← ACÁ  │
│ 🔐 Authentication      │
│ ...                    │
└────────────────────────┘
```

### Dónde está el botón Run:
```
┌─ SQL Editor ───────────────────────────┐
│ New Query  Templates                   │
├────────────────────────────────────────┤
│ [Acá pegas el código SQL]              │
│                                        │
│                                        │
├────────────────────────────────────────┤
│                        [▶ Run] ← ACÁ  │
└────────────────────────────────────────┘
```

---

## 🤝 Siguiente Paso

Una vez que veas la tabla creada, avísame y yo:
1. Creo la función `trackEvent()` en el código
2. La integro en detector, humanizador, parafraseador
3. Te muestro en preview cómo funciona
4. Pusheo el código

¡Avanti! 🚀
