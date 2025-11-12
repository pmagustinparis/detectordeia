# 📊 Setup Google Sheets API - Captura de Emails

Este documento te guía paso a paso para configurar Google Sheets y empezar a capturar emails de usuarios interesados en Premium.

---

## 🎯 Objetivo

Cuando un usuario hace click en "Avísame cuando esté disponible" en cualquiera de las 3 herramientas, queremos guardar:
- ✉️ Email
- 📅 Fecha/hora
- 🎯 Origen (ej: "parafraseador-overlay-premium")
- 🌐 IP y User Agent

Esto se guardará en una Google Sheet que puedes ver en tiempo real.

---

## 📝 Paso 1: Crear Google Sheet

1. Ve a [Google Sheets](https://sheets.google.com)
2. Crea una nueva hoja de cálculo
3. Nómbrala: **"DetectorDeIA - Premium Waitlist"**
4. Copia el ID de la URL:
   ```
   https://docs.google.com/spreadsheets/d/[ESTE_ES_EL_ID]/edit
   ```
5. Guarda este ID - lo necesitarás después

---

## 🔧 Paso 2: Crear Service Account en Google Cloud

### 2.1 Crear proyecto en Google Cloud Console

1. Ve a [Google Cloud Console](https://console.cloud.google.com/)
2. Crea un nuevo proyecto o selecciona uno existente
3. Nómbralo: **"DetectorDeIA"**

### 2.2 Habilitar Google Sheets API

1. En el menú lateral, ve a **"APIs & Services" → "Library"**
2. Busca **"Google Sheets API"**
3. Haz click en **"Enable"** (Habilitar)

### 2.3 Crear Service Account

1. En el menú lateral, ve a **"APIs & Services" → "Credentials"**
2. Click en **"Create Credentials" → "Service Account"**
3. Llena el formulario:
   - **Service account name:** `detectordeia-sheets`
   - **Description:** `Service account para guardar emails de waitlist`
4. Click **"Create and Continue"**
5. **Role:** Selecciona "Editor" o "Owner" (para desarrollo)
6. Click **"Done"**

### 2.4 Crear clave JSON

1. En la lista de Service Accounts, encuentra el que acabas de crear
2. Click en el email del service account
3. Ve a la pestaña **"Keys"**
4. Click **"Add Key" → "Create new key"**
5. Selecciona **JSON**
6. Click **"Create"**
7. Se descargará un archivo JSON - **¡Guárdalo en un lugar seguro!**

---

## 🔑 Paso 3: Dar acceso al Service Account a tu Google Sheet

1. Abre el archivo JSON que descargaste
2. Busca el campo `"client_email"`, se verá así:
   ```json
   "client_email": "detectordeia-sheets@tu-proyecto.iam.gserviceaccount.com"
   ```
3. Copia ese email completo
4. Vuelve a tu Google Sheet
5. Click en **"Share"** (Compartir) en la esquina superior derecha
6. Pega el email del service account
7. Dale permisos de **"Editor"**
8. **IMPORTANTE:** Desmarca "Notify people" (no enviar notificación)
9. Click **"Share"**

---

## 🌍 Paso 4: Configurar variables de entorno

### 4.1 Local (.env.local)

Crea un archivo `.env.local` en la raíz del proyecto:

```bash
# OpenAI API Key (la que ya tienes)
OPENAI_API_KEY=sk-...

# Google Sheets API
GOOGLE_SHEET_ID=tu_spreadsheet_id_del_paso_1
GOOGLE_SERVICE_ACCOUNT_EMAIL=detectordeia-sheets@tu-proyecto.iam.gserviceaccount.com
GOOGLE_PRIVATE_KEY="-----BEGIN PRIVATE KEY-----\nMIIEvQ...(tu private key completa)...\n-----END PRIVATE KEY-----\n"
```

**Para obtener los valores:**

1. **GOOGLE_SHEET_ID:** El ID que copiaste en el Paso 1
2. **GOOGLE_SERVICE_ACCOUNT_EMAIL:** El campo `client_email` del JSON
3. **GOOGLE_PRIVATE_KEY:** El campo `private_key` del JSON
   - **IMPORTANTE:** Copia TODO el contenido, incluyendo los `\n`
   - Debe empezar con `-----BEGIN PRIVATE KEY-----\n`
   - Debe terminar con `\n-----END PRIVATE KEY-----\n`
   - Debe estar entre comillas dobles `"`

**Ejemplo de GOOGLE_PRIVATE_KEY:**
```
GOOGLE_PRIVATE_KEY="-----BEGIN PRIVATE KEY-----\nMIIEvQIBADANBgkqhkiG9w0BAQEFA...(muchas líneas)...kYa2Q=\n-----END PRIVATE KEY-----\n"
```

### 4.2 Vercel (Producción)

1. Ve a tu dashboard de Vercel
2. Selecciona tu proyecto **detectordeia**
3. Ve a **Settings → Environment Variables**
4. Agrega las 3 variables:
   - `GOOGLE_SHEET_ID`
   - `GOOGLE_SERVICE_ACCOUNT_EMAIL`
   - `GOOGLE_PRIVATE_KEY`
5. **Scope:** Production, Preview, Development (todas)
6. Click **"Save"**
7. **IMPORTANTE:** Redeploy para que tome las nuevas variables

---

## ✅ Paso 5: Probar que funciona

### 5.1 Test local

```bash
# 1. Asegúrate de tener las variables en .env.local
# 2. Reinicia el servidor de desarrollo
npm run dev

# 3. Abre http://localhost:3000/parafraseador
# 4. Scroll abajo y click en "Avísame cuando esté disponible"
# 5. Ingresa un email de prueba
# 6. Click "Avisarme"
```

Si todo está bien:
- ✅ Verás mensaje de éxito "¡Listo!"
- ✅ En tu Google Sheet aparecerá una nueva fila con:
  - Fecha/hora
  - El email que ingresaste
  - Origen: "parafraseador-bottom-upsell" (o similar)
  - IP
  - User Agent

### 5.2 Verificar errores

Si algo falla, revisa la consola del servidor:

```bash
# En la terminal donde corre `npm run dev`
# Verás errores como:
Error: Faltan variables de Google Sheets en el servidor.
# → Revisa que las 3 variables estén en .env.local

Error: invalid_grant
# → La private key está mal formateada
# → Asegúrate de copiarla completa con los \n

Error: The caller does not have permission
# → No compartiste la Sheet con el service account email
```

### 5.3 Test en producción

1. Deploy a Vercel (las variables ya deben estar configuradas)
2. Ve a https://www.detectordeia.ai/parafraseador
3. Repite el test del paso 5.1
4. Verifica que la fila aparezca en Google Sheets

---

## 📊 Estructura de la Google Sheet

El sistema creará automáticamente una hoja llamada **"Premium Subscriptions"** con estas columnas:

| Fecha | Email | Origen | IP | User Agent |
|-------|-------|--------|-------|------------|
| 2025-11-05T15:30:00.000Z | user@email.com | parafraseador-overlay-premium | 192.168.1.1 | Mozilla/5.0... |
| 2025-11-05T15:31:00.000Z | otro@email.com | humanizador-bottom-upsell | 192.168.1.2 | Mozilla/5.0... |

**Posibles orígenes (source):**
- `detector-overlay-premium`
- `humanizador-overlay-premium`
- `humanizador-bottom-upsell`
- `parafraseador-overlay-premium`
- `parafraseador-bottom-upsell`

---

## 🔄 Migración futura a Supabase

Cuando implementes Supabase en la Fase 0:

1. Exporta la Google Sheet a CSV
2. Importa los emails a la tabla `email_waitlist` en Supabase
3. Actualiza el endpoint `/api/subscribe` para usar Supabase
4. Mantén Google Sheets como backup si quieres

---

## ⚠️ Seguridad

**IMPORTANTE:**

1. ✅ **Nunca** commitees el archivo `.env.local` a Git
2. ✅ **Nunca** compartas la private key públicamente
3. ✅ El archivo `.gitignore` ya tiene `.env.local` listado
4. ✅ En Vercel, las variables están encriptadas y seguras
5. ✅ El JSON descargado de Google Cloud contiene info sensible - guárdalo en lugar seguro

**El archivo .gitignore debe contener:**
```
.env.local
.env*.local
*.json  # Para no commitear accidentalmente el service account JSON
```

---

## 📞 Soporte

Si tienes problemas:

1. Revisa los logs del servidor (`npm run dev`)
2. Verifica que las 3 variables estén correctamente configuradas
3. Confirma que compartiste la Sheet con el service account email
4. Asegúrate de que Google Sheets API esté habilitada en Google Cloud

---

## ✅ Checklist

- [ ] Google Sheet creada y ID copiado
- [ ] Proyecto en Google Cloud Console creado
- [ ] Google Sheets API habilitada
- [ ] Service Account creado
- [ ] JSON key descargado
- [ ] Sheet compartida con service account email
- [ ] Variables agregadas a `.env.local`
- [ ] Test local exitoso (email aparece en Sheet)
- [ ] Variables agregadas a Vercel
- [ ] Test en producción exitoso
- [ ] `.env.local` en `.gitignore`

---

¡Listo! Ahora cada vez que alguien se suscriba a la waitlist, su email se guardará automáticamente en tu Google Sheet. 🎉
