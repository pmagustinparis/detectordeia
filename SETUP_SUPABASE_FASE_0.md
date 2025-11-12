# GUÍA DE SETUP: SUPABASE + GOOGLE OAUTH - FASE 0

**Tiempo estimado:** 25-30 minutos
**Requisitos:** Cuenta de Google, tarjeta de crédito (NO se cobra, solo para verificación)

Esta guía te llevará paso a paso por todo el setup necesario para Fase 0.

---

## 📋 RESUMEN DE PASOS

1. **Crear proyecto Supabase** (5 min)
2. **Ejecutar migrations SQL** (2 min)
3. **Configurar Google OAuth** (10 min)
4. **Copiar credenciales a Vercel** (5 min)
5. **Verificar setup** (3 min)

---

## PASO 1: CREAR PROYECTO EN SUPABASE

### 1.1 Ir a Supabase

1. Abre tu navegador
2. Ve a: https://supabase.com
3. Click en **"Start your project"** (esquina superior derecha)
4. Si no tienes cuenta, click **"Sign Up"** y usa tu Google account
5. Si ya tienes cuenta, click **"Sign In"**

---

### 1.2 Crear nuevo proyecto

1. Una vez dentro del dashboard, verás tus proyectos (probablemente vacío)
2. Click en **"New Project"** (botón verde)

**Aparecerá un formulario con estos campos:**

**Organization:**
- Si es tu primer proyecto, Supabase ya habrá creado una organización con tu nombre
- Selecciona esa organización del dropdown

**Name:**
- Ingresa: `detectordeia-prod`

**Database Password:**
- Click en el icono de **"Generate a password"** (genera uno seguro)
- **⚠️ MUY IMPORTANTE:** Copia esta password y guárdala en un lugar seguro (1Password, LastPass, o un archivo seguro)
- La vas a necesitar si alguna vez necesitas conectar directamente a la database

**Region:**
- Selecciona **"South America (São Paulo)"** si tus usuarios son principalmente LATAM
- O selecciona **"Europe West (Ireland)"** si son principalmente España
- Recomendación: São Paulo (menor latencia para LATAM)

**Pricing Plan:**
- Selecciona **"Free"** (ya seleccionado por defecto)
- Límites del plan Free:
  - 500 MB database storage
  - 1 GB file storage
  - 2 GB bandwidth/mes
  - 50,000 monthly active users
  - Unlimited API requests
- Suficiente para empezar, upgradeamos cuando sea necesario

3. Click en **"Create new project"**

4. **Espera ~2 minutos** mientras Supabase aprovisiona tu proyecto
   - Verás una barra de progreso
   - Dice "Setting up your project..."
   - NO cierres la ventana

5. Cuando termine, verás el dashboard de tu proyecto 🎉

---

### 1.3 Copiar credenciales (las vas a necesitar después)

En el dashboard de tu proyecto:

1. En el menú lateral izquierdo, click en **"Settings"** (ícono de engranaje abajo)
2. Click en **"API"** (en el submenú de Settings)

Verás dos secciones importantes:

**Project URL:**
- Algo como: `https://abcdefghijklmn.supabase.co`
- Click en el icono de **copiar** al lado
- Pega esto en un archivo temporal (Notepad, Notes, etc.)
- Etiqueta como: `NEXT_PUBLIC_SUPABASE_URL`

**API Keys:**

**anon / public key:**
- Es una key larga que empieza con `eyJhbG...`
- Click en **"Copy"** al lado de "anon public"
- Pega en tu archivo temporal
- Etiqueta como: `NEXT_PUBLIC_SUPABASE_ANON_KEY`

**service_role key:**
- Click en **"Reveal"** primero (está oculta por seguridad)
- También empieza con `eyJhbG...` (pero es diferente a la anon)
- Click en **"Copy"**
- Pega en tu archivo temporal
- Etiqueta como: `SUPABASE_SERVICE_ROLE_KEY`
- **⚠️ IMPORTANTE:** Esta key es super sensible, NUNCA la compartas públicamente

Tu archivo temporal ahora debe verse así:
```
NEXT_PUBLIC_SUPABASE_URL=https://abcdefghijklmn.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...
SUPABASE_SERVICE_ROLE_KEY=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...
```

✅ **Checkpoint:** Tienes las 3 credenciales copiadas

---

## PASO 2: EJECUTAR MIGRATIONS SQL

Ahora vamos a crear todas las tablas de la base de datos.

### 2.1 Abrir SQL Editor

1. En el menú lateral izquierdo, click en **"SQL Editor"** (ícono de <>)
2. Verás el editor de SQL con varios templates
3. Click en **"New query"** (botón arriba a la derecha)

---

### 2.2 Copiar y ejecutar migrations

1. Abre el archivo `supabase-migrations.sql` que está en la raíz del proyecto
2. **Copia TODO el contenido** (Ctrl+A, Ctrl+C o Cmd+A, Cmd+C)
3. Pega en el SQL Editor de Supabase
4. Click en **"Run"** (botón verde abajo a la derecha, o Ctrl+Enter)

**Verás:**
- El editor ejecuta el SQL
- Aparece "Success. No rows returned" (es correcto!)
- O aparecerán varios mensajes de "Success"
- Scroll down en el panel de resultados

**⚠️ Si ves algún error:**
- Lee el mensaje de error
- Usualmente es por typo o porque ya existe algo
- Copia el error y mándamelo, lo resolvemos

**Si todo va bien:**
- No hay mensajes de error en rojo
- Solo mensajes en verde/gris de success

---

### 2.3 Verificar que se crearon las tablas

En el SQL Editor, ejecuta esta query (borra el contenido anterior y pega esto):

```sql
SELECT table_name
FROM information_schema.tables
WHERE table_schema = 'public'
  AND table_name IN ('users', 'subscriptions', 'usage_tracking', 'email_waitlist', 'history')
ORDER BY table_name;
```

Click **"Run"**

**Deberías ver 5 filas en los resultados:**
- email_waitlist
- history
- subscriptions
- usage_tracking
- users

✅ **Checkpoint:** Las 5 tablas existen

---

### 2.4 Verificar RLS (Row Level Security)

Ejecuta esta query:

```sql
SELECT tablename, rowsecurity
FROM pg_tables
WHERE schemaname = 'public'
  AND tablename IN ('users', 'subscriptions', 'usage_tracking', 'email_waitlist', 'history');
```

**Deberías ver 5 filas con `rowsecurity = true`**

✅ **Checkpoint:** RLS está habilitado en todas las tablas

---

## PASO 3: CONFIGURAR GOOGLE OAUTH

Ahora vamos a configurar la autenticación con Google.

### 3.1 Crear OAuth credentials en Google Cloud Console

1. Ve a: https://console.cloud.google.com/
2. Si es tu primera vez, acepta los términos de servicio

---

#### 3.1.1 Crear o seleccionar proyecto

**Si ya tienes un proyecto de Google Cloud:**
- En la parte superior, click en el dropdown del proyecto actual
- Selecciona tu proyecto (ej: el que usaste para Google Sheets)
- Salta al paso 3.1.2

**Si NO tienes un proyecto:**
1. En la parte superior, click en el dropdown de proyectos
2. Click en **"NEW PROJECT"** (esquina superior derecha del modal)
3. Project name: `DetectorDeIA`
4. Location: Deja "No organization" (o selecciona tu organización si tienes)
5. Click **"CREATE"**
6. Espera ~30 segundos
7. Aparecerá una notificación cuando esté listo
8. Click en la notificación o en el dropdown de proyectos y selecciona "DetectorDeIA"

✅ **Checkpoint:** Estás dentro de tu proyecto de Google Cloud

---

#### 3.1.2 Ir a OAuth consent screen

1. En el menú hamburguesa (☰) arriba a la izquierda
2. Navega a: **APIs & Services > OAuth consent screen**
3. O busca "OAuth consent screen" en la barra de búsqueda superior

**Si es la primera vez:**

**User Type:**
- Selecciona **"External"** (permite que cualquier usuario con Google account se registre)
- Click **"CREATE"**

**OAuth consent screen (paso 1 de 4):**

- **App name:** `DetectorDeIA`
- **User support email:** Tu email
- **App logo:** (opcional, puedes agregar después)
- **App domain:** (dejar vacío por ahora)
- **Authorized domains:**
  - Click **"+ ADD DOMAIN"**
  - Ingresa: `detectordeia.ai`
- **Developer contact information:** Tu email

Click **"SAVE AND CONTINUE"**

**Scopes (paso 2 de 4):**
- Click **"ADD OR REMOVE SCOPES"**
- En el modal, busca y selecciona:
  - `userinfo.email`
  - `userinfo.profile`
  - `openid`
- Click **"UPDATE"**
- Click **"SAVE AND CONTINUE"**

**Test users (paso 3 de 4):**
- Por ahora, no agregues test users (lo haremos público)
- Click **"SAVE AND CONTINUE"**

**Summary (paso 4 de 4):**
- Revisa que todo esté correcto
- Click **"BACK TO DASHBOARD"**

✅ **Checkpoint:** OAuth consent screen configurado

---

#### 3.1.3 Crear OAuth Client ID

1. En el menú lateral izquierdo (dentro de APIs & Services)
2. Click en **"Credentials"**
3. Click en **"+ CREATE CREDENTIALS"** (arriba)
4. Selecciona **"OAuth client ID"**

**Create OAuth client ID:**

**Application type:**
- Selecciona **"Web application"**

**Name:**
- Ingresa: `DetectorDeIA Web Client`

**Authorized JavaScript origins:**
- Click **"+ ADD URI"**
- Ingresa: `http://localhost:3000` (para desarrollo local)
- Click **"+ ADD URI"** otra vez
- Ingresa: `https://detectordeia.ai` (para producción)
- Click **"+ ADD URI"** otra vez
- Ingresa: `https://www.detectordeia.ai` (para www)

**Authorized redirect URIs:**
- Click **"+ ADD URI"**
- Ingresa: `http://localhost:3000/auth/callback` (desarrollo)
- Click **"+ ADD URI"**
- **⚠️ IMPORTANTE:** Necesitamos agregar el callback de Supabase

Antes de continuar, ve a Supabase:
1. Abre otra pestaña con tu proyecto de Supabase
2. Settings > API
3. Busca **"Configuration"** section
4. Copia la URL que dice **"URL"** (algo como `https://abcdefg.supabase.co`)
5. El redirect URI será: `https://TU_PROJECT_ID.supabase.co/auth/v1/callback`

Ejemplo: `https://abcdefg.supabase.co/auth/v1/callback`

Vuelve a Google Cloud Console:
- Click **"+ ADD URI"**
- Pega: `https://TU_PROJECT_ID.supabase.co/auth/v1/callback`

También agrega producción:
- Click **"+ ADD URI"**
- Ingresa: `https://detectordeia.ai/auth/callback`
- Click **"+ ADD URI"**
- Ingresa: `https://www.detectordeia.ai/auth/callback`

5. Click **"CREATE"**

**Aparecerá un modal con tus credenciales:**

📝 **Copia estas credenciales:**
- **Client ID:** Empieza con números, termina con `.apps.googleusercontent.com`
- **Client Secret:** String aleatorio

Cópialas a tu archivo temporal:
```
GOOGLE_CLIENT_ID=123456789-abc...apps.googleusercontent.com
GOOGLE_CLIENT_SECRET=GOCSPX-...
```

Click **"OK"** para cerrar el modal

✅ **Checkpoint:** OAuth Client ID creado

---

### 3.2 Configurar Google provider en Supabase

Ahora vamos a conectar Google OAuth con Supabase.

1. Ve a tu proyecto de Supabase
2. En el menú lateral, click en **"Authentication"**
3. Click en **"Providers"** (en el submenú)
4. Busca **"Google"** en la lista de providers
5. Click en el toggle para habilitarlo (debe ponerse verde)

**Configuración de Google:**

**Enabled:** ✅ (ya activado)

**Client ID (for OAuth):**
- Pega el `GOOGLE_CLIENT_ID` que copiaste de Google Cloud Console
- Ejemplo: `123456789-abc...apps.googleusercontent.com`

**Client Secret (for OAuth):**
- Pega el `GOOGLE_CLIENT_SECRET` que copiaste
- Ejemplo: `GOCSPX-...`

**Redirect URL:**
- Ya está pre-filled por Supabase
- Debería ser: `https://TU_PROJECT_ID.supabase.co/auth/v1/callback`
- **⚠️ Verifica** que esta URL esté en los redirect URIs de Google Cloud Console (paso 3.1.3)

**Skip nonce checks:** ❌ (dejar sin marcar)

6. Click **"Save"** (abajo)

✅ **Checkpoint:** Google OAuth configurado en Supabase

---

## PASO 4: COPIAR CREDENCIALES A VERCEL

Ahora vamos a agregar las environment variables en Vercel.

### 4.1 Ir a Vercel settings

1. Ve a: https://vercel.com
2. Selecciona tu proyecto **detectordeia**
3. Click en **"Settings"** (pestaña arriba)
4. En el menú lateral, click en **"Environment Variables"**

---

### 4.2 Agregar variables de Supabase

Vas a agregar 3 variables. Para cada una:

**Variable 1:**
- **Key:** `NEXT_PUBLIC_SUPABASE_URL`
- **Value:** Tu Supabase URL (ejemplo: `https://abcdefg.supabase.co`)
- **Environment:** Selecciona **Production, Preview, Development** (las 3)
- Click **"Save"**

**Variable 2:**
- **Key:** `NEXT_PUBLIC_SUPABASE_ANON_KEY`
- **Value:** Tu Supabase anon key (la que copiaste en paso 1.3)
- **Environment:** Selecciona **Production, Preview, Development**
- Click **"Save"**

**Variable 3:**
- **Key:** `SUPABASE_SERVICE_ROLE_KEY`
- **Value:** Tu Supabase service role key (la que copiaste en paso 1.3)
- **Environment:** Selecciona **Production, Preview, Development**
- Click **"Save"**

---

### 4.3 Mantener variables existentes

**⚠️ IMPORTANTE:** NO borres las variables que ya existen:
- `OPENAI_API_KEY`
- `GOOGLE_SHEET_ID`
- `GOOGLE_SERVICE_ACCOUNT_EMAIL`
- `GOOGLE_PRIVATE_KEY`

Todas conviven sin problema.

✅ **Checkpoint:** 3 nuevas variables agregadas en Vercel

---

### 4.4 Redeploy para aplicar cambios

Las environment variables solo se aplican en el próximo deploy.

**Opción A: Esperar al próximo push**
- Las variables estarán disponibles cuando hagamos push del código de auth

**Opción B: Forzar redeploy ahora (opcional)**
1. Ve a **"Deployments"** (pestaña arriba)
2. Click en los 3 puntos del último deployment
3. Click **"Redeploy"**
4. Confirma

Por ahora, **Opción A** está bien. Las usaremos cuando empujemos el código.

---

## PASO 5: VERIFICAR SETUP

Vamos a verificar que todo está configurado correctamente.

### 5.1 Checklist rápido

Marca cada ítem:

**Supabase:**
- [ ] Proyecto creado
- [ ] 5 tablas creadas (users, subscriptions, usage_tracking, email_waitlist, history)
- [ ] RLS habilitado en las 5 tablas
- [ ] Credenciales copiadas (URL + anon key + service role key)

**Google OAuth:**
- [ ] OAuth consent screen configurado
- [ ] OAuth Client ID creado
- [ ] Redirect URIs incluyen callback de Supabase
- [ ] Client ID y Secret copiados

**Supabase Auth:**
- [ ] Google provider habilitado
- [ ] Client ID configurado
- [ ] Client Secret configurado

**Vercel:**
- [ ] `NEXT_PUBLIC_SUPABASE_URL` agregada
- [ ] `NEXT_PUBLIC_SUPABASE_ANON_KEY` agregada
- [ ] `SUPABASE_SERVICE_ROLE_KEY` agregada

✅ **Si todo está marcado, el setup está completo!**

---

## 🎉 SETUP COMPLETO

Tu parte del setup está lista! Ahora el sistema tiene:

- ✅ Base de datos con schema completo
- ✅ Google OAuth configurado
- ✅ Supabase conectado con Google
- ✅ Environment variables en Vercel

---

## 📝 PRÓXIMOS PASOS

Ahora yo (Claude) voy a:

1. Configurar Supabase client en Next.js
2. Crear el callback route para OAuth
3. Implementar el componente `<AuthButton />`
4. Crear el middleware de auth
5. Testear que todo funciona

**Tiempo estimado para completar mi parte:** ~4 horas

Te aviso cuando esté listo para que testees! 🚀

---

## 🆘 TROUBLESHOOTING

### Error: "Invalid redirect URI" en Google OAuth

**Causa:** La URL de callback no está agregada en Google Cloud Console

**Solución:**
1. Ve a Google Cloud Console > APIs & Services > Credentials
2. Click en tu OAuth Client
3. En "Authorized redirect URIs", verifica que esté:
   - `https://TU_PROJECT_ID.supabase.co/auth/v1/callback`
4. Guarda cambios

---

### Error: "Failed to execute SQL" en Supabase

**Causa:** Puede que ya exista alguna tabla o haya un error de sintaxis

**Solución:**
1. Lee el mensaje de error específico
2. Si dice "already exists", probablemente esté bien
3. Ejecuta las queries de verificación (paso 2.3 y 2.4)
4. Si las 5 tablas aparecen, todo está bien
5. Si no, copia el error completo y mándamelo

---

### Error: Variables no aparecen en Vercel

**Causa:** No se hizo redeploy después de agregar variables

**Solución:**
1. Ve a Deployments en Vercel
2. Redeploy el último deployment
3. O espera al próximo push (las variables se aplicarán)

---

### No puedo encontrar algo en Supabase

**Solución:**
- Usa la barra de búsqueda arriba (Cmd+K o Ctrl+K)
- Escribe lo que buscas (ej: "SQL Editor", "API", "Authentication")

---

## 📞 CONTACTO

Si te trabas en algún paso:
1. Copia el mensaje de error completo
2. Toma un screenshot de la pantalla
3. Mándamelo y lo resolvemos juntos

¡Éxito con el setup! 🎯
