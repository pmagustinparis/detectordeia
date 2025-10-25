# Configuración de Google Sheets para Feedback

## Paso 1: Crear Google Sheet

1. Ve a https://sheets.google.com
2. Crea una nueva hoja de cálculo
3. Nómbrala "Detector IA - Feedbacks"
4. Copia el ID de la URL (la parte larga entre `/d/` y `/edit`):
   ```
   https://docs.google.com/spreadsheets/d/ESTE_ES_EL_ID/edit
   ```

## Paso 2: Crear Service Account en Google Cloud

1. Ve a https://console.cloud.google.com
2. Crea un proyecto nuevo (o usa uno existente)
3. Ve a "APIs & Services" > "Credentials"
4. Click en "Create Credentials" > "Service Account"
5. Dale un nombre: "detector-ia-feedback"
6. Click "Create and Continue"
7. Rol: "Editor" (o puedes dejarlo sin rol)
8. Click "Done"

## Paso 3: Generar clave JSON

1. Click en el Service Account que creaste
2. Ve a la pestaña "Keys"
3. Click "Add Key" > "Create new key"
4. Selecciona JSON
5. Click "Create"
6. Se descarga un archivo JSON

## Paso 4: Habilitar Google Sheets API

1. En Google Cloud Console, ve a "APIs & Services" > "Library"
2. Busca "Google Sheets API"
3. Click "Enable"

## Paso 5: Compartir la Google Sheet con el Service Account

1. Abre el archivo JSON descargado
2. Copia el valor de `client_email` (algo como `detector-ia-feedback@proyecto.iam.gserviceaccount.com`)
3. Ve a tu Google Sheet
4. Click en "Compartir" (arriba a la derecha)
5. Pega el email del service account
6. Dale permisos de "Editor"
7. Desactiva "Notificar a las personas"
8. Click "Compartir"

## Paso 6: Agregar variables de entorno

Del archivo JSON descargado, necesitás 3 valores:

1. `client_email` - Email del service account
2. `private_key` - Clave privada (incluye los `\n`)
3. El ID de tu Google Sheet (del Paso 1)

Agregalos a tu `.env.local`:

```bash
# Google Sheets para Feedback
GOOGLE_SHEET_ID=tu_sheet_id_aqui
GOOGLE_SERVICE_ACCOUNT_EMAIL=tu-service-account@proyecto.iam.gserviceaccount.com
GOOGLE_PRIVATE_KEY="-----BEGIN PRIVATE KEY-----\nMIIE...toda la clave...=\n-----END PRIVATE KEY-----\n"
```

**IMPORTANTE:**
- La `GOOGLE_PRIVATE_KEY` debe estar entre comillas dobles
- Mantén los `\n` en el texto (no los reemplaces)

## Paso 7: Agregar variables en Vercel (si usas Vercel)

1. Ve a tu proyecto en Vercel
2. Settings > Environment Variables
3. Agrega las 3 variables:
   - `GOOGLE_SHEET_ID`
   - `GOOGLE_SERVICE_ACCOUNT_EMAIL`
   - `GOOGLE_PRIVATE_KEY`

## ¡Listo!

Ahora cuando los usuarios envíen feedback, se guardará automáticamente en tu Google Sheet.

Podés ver los feedbacks en:
- La Google Sheet directamente
- Tu panel admin: https://detectordelaia.ai/admin/feedback
