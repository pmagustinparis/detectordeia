# FASE 0 - PLAN CONCEPTUAL: Base de Datos + Autenticación

**Objetivo:** Transformar DetectorDeIA.ai de una aplicación anónima a una plataforma con usuarios registrados, preparando el terreno para monetización Premium en Fase 1.

**Duración estimada:** 2-3 semanas
**Prioridad:** 🔴 HIGH (Bloqueante para Fase 1 - Monetización)

---

## 📊 ESTADO ACTUAL: Arquitectura Sin Usuarios

### Flujo actual (Anónimo)
```
Usuario → Herramienta (Detector/Humanizador/Parafraseador)
       → API Route (/api/detect, /api/humanize, /api/paraphrase)
       → OpenAI API
       → Resultado inmediato
       → Sin tracking, sin límites reales, sin historial
```

### Características actuales
- ✅ **Sin registro:** Todo funciona anónimamente
- ✅ **Sin límites reales:** UI muestra "600 chars" pero NO bloquea
- ✅ **Overlay freemium:** Aparece si >600 chars, pero resultado se muestra
- ✅ **Email capture:** Se guardan en Google Sheets (Fecha, Email, Origen, IP, User Agent)
- ❌ **Sin tracking de uso**
- ❌ **Sin historial**
- ❌ **Sin autenticación**
- ❌ **Sin base de datos**

### Puntos de captura de email (4 activos)
1. **Humanizador Overlay** - Cuando >600 chars (`source: 'humanizador-overlay-premium'`)
2. **Humanizador CTA Bottom** - Botón al final de la página (`source: 'humanizador-bottom-cta'`)
3. **Parafraseador Overlay** - Cuando >600 chars (`source: 'parafraseador-overlay-premium'`)
4. **Parafraseador CTA Bottom** - Botón al final de la página (`source: 'parafraseador-bottom-cta'`)

---

## 🎯 ESTADO OBJETIVO: Plataforma con Usuarios

### Flujo futuro (Con auth)
```
Usuario NO autenticado
  → Puede usar herramientas con límites Free (600 chars)
  → Después de X usos diarios → Overlay "Regístrate para continuar"
  → Sign up con Google → Cuenta Free creada

Usuario autenticado (Free)
  → Puede usar herramientas con límites Free mejorados
  → Ve su historial de últimos usos
  → Puede copiar/descargar resultados pasados
  → Ve CTA de Premium en dashboard

Usuario autenticado (Premium)
  → Límites altos (15,000 chars)
  → 5 modos disponibles (Estándar + 4 premium)
  → Historial completo (últimos 100 usos)
  → Prioridad en API (respuestas más rápidas)
```

### Experiencia esperada

#### 1️⃣ Usuario nuevo (anónimo)
- Entra a `/humanizador`
- Usa la herramienta (<600 chars) → Funciona perfecto
- Usa otra vez → Funciona perfecto
- Después de 5 usos diarios → Overlay: "Regístrate gratis para continuar usando"
- Click en "Registrarse con Google" → Auth flow → Dashboard

#### 2️⃣ Usuario registrado (Free)
- Entra a `/humanizador`
- **SI NO está autenticado:** Header muestra "Iniciar sesión"
- **SI está autenticado:** Header muestra avatar + "Mi cuenta"
- Puede usar herramientas con límites Free
- Ve su historial en `/dashboard`
- Ve banner de Premium en todas las herramientas

#### 3️⃣ Usuario Premium (Fase 1)
- Misma experiencia que Free
- Pero sin limitaciones
- Acceso a modos premium
- Historial extendido

---

## 🗄️ ESQUEMA DE BASE DE DATOS (Supabase)

### Tabla: `users`
Información básica del usuario.

```sql
CREATE TABLE users (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),

  -- Auth (vía Supabase Auth)
  auth_id UUID UNIQUE NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,

  -- Profile
  email VARCHAR(255) UNIQUE NOT NULL,
  full_name VARCHAR(255),
  avatar_url TEXT,

  -- Plan
  plan_type VARCHAR(20) DEFAULT 'free' CHECK (plan_type IN ('free', 'premium')),

  -- Timestamps
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),

  -- Indexes
  CONSTRAINT users_email_key UNIQUE (email)
);

CREATE INDEX idx_users_auth_id ON users(auth_id);
CREATE INDEX idx_users_email ON users(email);
CREATE INDEX idx_users_plan_type ON users(plan_type);
```

**Notas:**
- `auth_id` conecta con Supabase Auth (built-in)
- `plan_type` define si es 'free' o 'premium'
- `avatar_url` viene de Google OAuth

---

### Tabla: `subscriptions`
Información de suscripciones Premium (Fase 1).

```sql
CREATE TABLE subscriptions (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID NOT NULL REFERENCES users(id) ON DELETE CASCADE,

  -- Stripe
  stripe_customer_id VARCHAR(255) UNIQUE,
  stripe_subscription_id VARCHAR(255) UNIQUE,
  stripe_price_id VARCHAR(255),

  -- Status
  status VARCHAR(20) DEFAULT 'active' CHECK (status IN ('active', 'canceled', 'past_due', 'trialing')),

  -- Billing
  current_period_start TIMESTAMP WITH TIME ZONE,
  current_period_end TIMESTAMP WITH TIME ZONE,
  cancel_at_period_end BOOLEAN DEFAULT FALSE,

  -- Timestamps
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),

  CONSTRAINT subscriptions_user_id_fkey FOREIGN KEY (user_id) REFERENCES users(id)
);

CREATE INDEX idx_subscriptions_user_id ON subscriptions(user_id);
CREATE INDEX idx_subscriptions_stripe_customer_id ON subscriptions(stripe_customer_id);
CREATE INDEX idx_subscriptions_status ON subscriptions(status);
```

**Notas:**
- Esta tabla se usará en Fase 1 (Stripe)
- Por ahora todos los usuarios son 'free'
- Se crea la estructura ahora para facilitar Fase 1

---

### Tabla: `usage_tracking`
Tracking de uso de herramientas (para rate limiting).

```sql
CREATE TABLE usage_tracking (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),

  -- User (puede ser NULL para anónimos)
  user_id UUID REFERENCES users(id) ON DELETE CASCADE,

  -- Anonymous tracking (para usuarios no autenticados)
  anonymous_id VARCHAR(255), -- Generado con fingerprint o cookie
  ip_address INET,

  -- Tool usage
  tool_type VARCHAR(20) NOT NULL CHECK (tool_type IN ('detector', 'humanizador', 'parafraseador')),

  -- Request details
  input_length INTEGER NOT NULL,
  output_length INTEGER,

  -- Status
  success BOOLEAN DEFAULT TRUE,
  error_message TEXT,

  -- Timestamp
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),

  -- Indexes
  CONSTRAINT usage_tracking_tool_type_check CHECK (tool_type IN ('detector', 'humanizador', 'parafraseador'))
);

CREATE INDEX idx_usage_user_id ON usage_tracking(user_id);
CREATE INDEX idx_usage_anonymous_id ON usage_tracking(anonymous_id);
CREATE INDEX idx_usage_created_at ON usage_tracking(created_at);
CREATE INDEX idx_usage_tool_type ON usage_tracking(tool_type);
```

**Notas:**
- `user_id` es NULL para usuarios anónimos
- `anonymous_id` se genera en el cliente (fingerprint)
- Se usa para rate limiting por día
- **Rate limits propuestos:**
  - Anónimos: 5 usos/día por tool (15 total/día)
  - Free registrados: 20 usos/día por tool (60 total/día)
  - Premium: Ilimitado

---

### Tabla: `email_waitlist`
Migración de emails capturados en Google Sheets.

```sql
CREATE TABLE email_waitlist (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),

  -- Email
  email VARCHAR(255) NOT NULL,

  -- Source tracking
  source VARCHAR(100) NOT NULL, -- ej: 'humanizador-overlay-premium'

  -- Metadata
  ip_address INET,
  user_agent TEXT,

  -- Status
  notified BOOLEAN DEFAULT FALSE,
  notified_at TIMESTAMP WITH TIME ZONE,

  -- Timestamps
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),

  CONSTRAINT email_waitlist_email_source_unique UNIQUE (email, source)
);

CREATE INDEX idx_waitlist_email ON email_waitlist(email);
CREATE INDEX idx_waitlist_notified ON email_waitlist(notified);
CREATE INDEX idx_waitlist_created_at ON email_waitlist(created_at);
```

**Notas:**
- Migrar datos existentes de Google Sheets
- `notified` se marca TRUE cuando se notifica del lanzamiento Premium
- Un email puede aparecer múltiples veces si vino de sources distintos

---

### Tabla: `history`
Historial de usos de las herramientas.

```sql
CREATE TABLE history (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID NOT NULL REFERENCES users(id) ON DELETE CASCADE,

  -- Tool info
  tool_type VARCHAR(20) NOT NULL CHECK (tool_type IN ('detector', 'humanizador', 'parafraseador')),
  mode VARCHAR(50), -- ej: 'standard', 'creative', 'formal'

  -- Content
  input_text TEXT NOT NULL,
  output_text TEXT NOT NULL,

  -- Metadata
  input_length INTEGER NOT NULL,
  output_length INTEGER NOT NULL,

  -- Timestamp
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),

  CONSTRAINT history_user_id_fkey FOREIGN KEY (user_id) REFERENCES users(id)
);

CREATE INDEX idx_history_user_id ON history(user_id);
CREATE INDEX idx_history_tool_type ON history(tool_type);
CREATE INDEX idx_history_created_at ON history(created_at DESC);
```

**Notas:**
- Solo para usuarios autenticados
- Free: Últimos 10 usos
- Premium: Últimos 100 usos
- Se pueden agregar resultados a "favoritos" en el futuro

---

## 🔐 AUTENTICACIÓN: Supabase Auth + Google OAuth

### Estrategia de Auth

**Opción elegida:** Supabase Auth con Google OAuth Provider

**¿Por qué?**
- ✅ Built-in en Supabase (sin setup extra complejo)
- ✅ Google OAuth es confiable y familiar para usuarios
- ✅ Manejo automático de tokens, refresh, sessions
- ✅ RLS (Row Level Security) nativo en Supabase
- ✅ Migración sencilla a otros providers en el futuro (GitHub, email/password)

### Flow de autenticación

#### Sign Up (Registro con Google)
```
1. Usuario click "Registrarse con Google"
2. Redirect a Google OAuth consent screen
3. Usuario autoriza la app
4. Google redirect a callback URL (/auth/callback)
5. Supabase crea registro en auth.users automáticamente
6. Trigger/hook crea registro en tabla users
7. Redirect a /dashboard con session activa
```

#### Sign In (Login)
```
1. Usuario click "Iniciar sesión con Google"
2. Mismo flow OAuth
3. Supabase reconoce usuario existente
4. Redirect a /dashboard con session activa
```

#### Session management
```
- Token JWT almacenado en httpOnly cookie
- Refresh automático antes de expirar
- Supabase Client verifica auth en cada request
- Middleware protege rutas privadas (/dashboard, /api/*)
```

---

## 🎨 COMPONENTES UI A CREAR/MODIFICAR

### Nuevos componentes

#### 1. `<AuthButton />` - Header auth UI
**Ubicación:** `/src/components/AuthButton.tsx`

**Estados:**
- **No autenticado:** Muestra "Iniciar sesión" button
- **Autenticado:** Muestra avatar + dropdown menu
  - Mi cuenta (link a /dashboard)
  - Cerrar sesión

**Uso:**
```tsx
// En Header.tsx
<AuthButton />
```

---

#### 2. `<Dashboard />` - Panel de usuario
**Ubicación:** `/src/app/dashboard/page.tsx`

**Secciones:**
1. **Header:** Bienvenida + plan actual (Free/Premium)
2. **Stats:** Usos hoy, usos este mes, límites restantes
3. **Historial reciente:** Últimos 10 usos (Free) o 100 (Premium)
4. **Premium CTA:** Banner invitando a upgrade (solo Free)

**Layout:**
```
┌─────────────────────────────────────┐
│ Hola, Agustín                       │
│ Plan: Free                    [🔄] │
├─────────────────────────────────────┤
│ 📊 Estadísticas                     │
│ Usos hoy: 3/20                      │
│ Usos mes: 45                        │
├─────────────────────────────────────┤
│ 📜 Historial reciente               │
│ ┌─────────────────────────────────┐ │
│ │ Humanizador - hace 2 horas      │ │
│ │ "Este es un texto..." [Ver]     │ │
│ └─────────────────────────────────┘ │
│ ┌─────────────────────────────────┐ │
│ │ Parafraseador - hace 5 horas    │ │
│ │ "Otro texto aquí..." [Ver]      │ │
│ └─────────────────────────────────┘ │
├─────────────────────────────────────┤
│ 💎 Upgrade a Premium                │
│ • 15,000 caracteres                 │
│ • 5 modos avanzados                 │
│ • Historial completo                │
│ [Próximamente - Avísame]            │
└─────────────────────────────────────┘
```

---

#### 3. `<UsageLimitOverlay />` - Límite de uso alcanzado
**Ubicación:** `/src/app/components/UsageLimitOverlay.tsx`

**Cuándo aparece:**
- Usuario anónimo: Después de 5 usos/día por tool
- Usuario Free: Después de 20 usos/día por tool

**Contenido:**
```
🚫 Límite diario alcanzado

Has usado el Humanizador 5 veces hoy.

[Opciones]
- Regístrate gratis → 20 usos/día (si anónimo)
- Espera hasta mañana → Se resetea a las 00:00 UTC
- Upgrade a Premium → Usos ilimitados (Fase 1)
```

---

### Modificaciones a componentes existentes

#### `<Header />`
**Archivo:** `/src/components/Header.tsx`

**Cambios:**
- Agregar `<AuthButton />` en el header
- Responsive: En mobile incluir en menú hamburguesa

---

#### `<HumanizadorMain />`, `<ParafraseadorMain />`
**Archivos:**
- `/src/app/components/HumanizadorMain.tsx`
- `/src/app/components/ParafraseadorMain.tsx`

**Cambios:**
1. Consultar límites antes de procesar
2. Si límite excedido → Mostrar `<UsageLimitOverlay />`
3. Si límite OK → Procesar normalmente
4. Registrar uso en `usage_tracking` y `history` (si autenticado)

---

#### API Routes: `/api/humanize`, `/api/paraphrase`, `/api/detect`

**Cambios:**
1. Verificar auth status (anónimo, free, premium)
2. Verificar límites de uso en `usage_tracking`
3. Si excede límite → Error 429 (Too Many Requests)
4. Si OK → Procesar con OpenAI
5. Registrar uso en `usage_tracking`
6. Si autenticado → Guardar en `history`

**Ejemplo de lógica:**
```typescript
// 1. Get user or anonymous ID
const session = await supabase.auth.getSession();
const userId = session?.user?.id;
const anonymousId = getAnonymousId(request); // cookie o fingerprint

// 2. Check usage limits
const usagesToday = await countUsagesToday(userId, anonymousId, 'humanizador');
const limit = userId ? 20 : 5; // Free users: 20, Anonymous: 5

if (usagesToday >= limit) {
  return NextResponse.json({ error: 'Límite diario alcanzado' }, { status: 429 });
}

// 3. Process with OpenAI
const result = await openai.chat.completions.create(...);

// 4. Track usage
await supabase.from('usage_tracking').insert({
  user_id: userId,
  anonymous_id: userId ? null : anonymousId,
  tool_type: 'humanizador',
  input_length: text.length,
  output_length: result.length,
  success: true,
});

// 5. Save to history (if authenticated)
if (userId) {
  await supabase.from('history').insert({
    user_id: userId,
    tool_type: 'humanizador',
    mode: 'standard',
    input_text: text,
    output_text: result,
    input_length: text.length,
    output_length: result.length,
  });
}

return NextResponse.json({ success: true, humanizedText: result });
```

---

## 🚀 ORDEN DE IMPLEMENTACIÓN

### Sprint 1: Supabase Setup + Schema (3-4 días)
**Objetivo:** Base de datos lista y funcionando

1. Crear proyecto en Supabase
2. Ejecutar migrations para crear tablas
3. Configurar Row Level Security (RLS) policies
4. Configurar Google OAuth en Supabase dashboard
5. Configurar environment variables en Vercel
6. Testing de conexión desde Next.js

**Entregables:**
- ✅ Supabase project ID
- ✅ Database schema deployed
- ✅ RLS policies configuradas
- ✅ Google OAuth configurado
- ✅ Variables de entorno en Vercel

---

### Sprint 2: Auth + Middleware (3-4 días)
**Objetivo:** Sistema de autenticación funcionando

1. Instalar `@supabase/ssr` y configurar cliente
2. Crear `/auth/callback` route para OAuth
3. Crear middleware para proteger rutas
4. Implementar `<AuthButton />` component
5. Modificar `<Header />` para incluir auth
6. Crear página `/login` (opcional, puede ser modal)
7. Testing de auth flow completo

**Entregables:**
- ✅ Login con Google funciona
- ✅ Session se mantiene en navegación
- ✅ Logout funciona
- ✅ Header muestra estado correcto
- ✅ Rutas protegidas (/dashboard, /api/*)

---

### Sprint 3: Dashboard + Historial (3-4 días)
**Objetivo:** Usuario ve su información y uso

1. Crear `/dashboard/page.tsx`
2. Implementar query de usage stats
3. Implementar query de historial
4. Implementar UI del dashboard
5. Crear modal para ver detalle de historial
6. Premium CTA en dashboard
7. Testing de dashboard completo

**Entregables:**
- ✅ Dashboard muestra stats correctas
- ✅ Historial muestra últimos 10 usos
- ✅ Usuario puede ver detalle de cada uso
- ✅ Premium CTA visible

---

### Sprint 4: Rate Limiting + Tracking (3-4 días)
**Objetivo:** Límites de uso funcionando

1. Implementar anonymous ID (fingerprint o cookie)
2. Modificar API routes para verificar límites
3. Implementar lógica de rate limiting
4. Crear `<UsageLimitOverlay />` component
5. Integrar overlay en herramientas
6. Testing de límites (anónimo y free)
7. Testing de registro en usage_tracking

**Entregables:**
- ✅ Usuarios anónimos: 5 usos/día funcionando
- ✅ Usuarios Free: 20 usos/día funcionando
- ✅ Overlay aparece correctamente
- ✅ Tracking se guarda en DB

---

### Sprint 5: Migración + Testing Final (2-3 días)
**Objetivo:** Datos migrados y todo funcionando

1. Migrar emails de Google Sheets a `email_waitlist`
2. Script de migración con validación
3. Testing end-to-end completo:
   - Flow anónimo → límite → registro
   - Flow registrado → uso → historial
   - Flow limits reset a medianoche
4. Testing de performance (queries optimizadas)
5. Deploy a producción
6. Monitoreo post-deploy

**Entregables:**
- ✅ Emails migrados (validar count)
- ✅ Toda la Fase 0 funcionando en producción
- ✅ No hay bugs críticos
- ✅ Performance aceptable (<2s response time)

---

## 🤔 DECISIONES TÉCNICAS A RESOLVER

### 1. Anonymous ID Strategy
**Problema:** ¿Cómo identificar usuarios anónimos para rate limiting?

**Opciones:**
- **A) Fingerprinting (FingerprintJS):**
  - ✅ Más preciso (identifica dispositivo)
  - ✅ Difícil de evadir
  - ❌ Librerías de pago para mejor accuracy
  - ❌ Preocupaciones de privacidad

- **B) Cookie simple:**
  - ✅ Simple de implementar
  - ✅ No requiere librerías externas
  - ❌ Fácil de evadir (borrar cookies)
  - ❌ No funciona en incógnito consistentemente

- **C) Combinación (Cookie + IP + User-Agent):**
  - ✅ Balance entre precisión y simplicidad
  - ✅ Gratis
  - ✅ Suficiente para rate limiting básico
  - ❌ Puede tener falsos positivos

**Recomendación:** Opción C - Cookie + IP + User-Agent
- Para un rate limiting básico es suficiente
- Evitamos complejidad y costos
- Si en el futuro hay problemas de abuso, upgradeamos a Fingerprinting

---

### 2. Rate Limit Reset Strategy
**Problema:** ¿Cuándo se resetean los límites diarios?

**Opciones:**
- **A) Medianoche UTC (00:00 UTC):**
  - ✅ Simple de implementar
  - ✅ Consistente para todos los usuarios
  - ❌ No considera timezone del usuario

- **B) 24 horas desde primer uso:**
  - ✅ Más "justo" por usuario
  - ❌ Complejo de calcular
  - ❌ Inconsistente para el usuario

- **C) Medianoche en timezone del usuario:**
  - ✅ Mejor UX
  - ❌ Requiere guardar timezone
  - ❌ Más complejo

**Recomendación:** Opción A - Medianoche UTC
- Simplicidad > Perfección en esta fase
- Podemos cambiar en el futuro si hay quejas
- Query simple: `WHERE created_at >= CURRENT_DATE`

---

### 3. History Retention Policy
**Problema:** ¿Cuánto historial guardamos?

**Opciones:**
- **A) Límite por count (10 Free, 100 Premium):**
  - ✅ Fácil de comunicar
  - ✅ Fácil de implementar (LIMIT en query)
  - ❌ Puede acumularse mucho si usuarios no usan por tiempo

- **B) Límite por tiempo (30 días Free, 1 año Premium):**
  - ✅ Datos se auto-limpian
  - ✅ Mejor para storage
  - ❌ Variable por usuario (puede confundir)

- **C) Híbrido (count Y tiempo):**
  - ✅ Lo mejor de ambos
  - ❌ Más complejo de comunicar

**Recomendación:** Opción A - Límite por count
- Más claro para el usuario: "Últimos 10 usos"
- En el futuro agregar cron job para limpiar history >90 días

---

### 4. Migración de emails de Google Sheets
**Problema:** ¿Cómo migramos los emails ya capturados?

**Pasos:**
1. Export de Google Sheets a CSV
2. Script de migración que lea CSV
3. Insert a `email_waitlist` con deduplicación
4. Validar que count coincida
5. Backup de Google Sheet (no borrar, solo archivar)

**Script sugerido:**
```typescript
// scripts/migrate-emails.ts
import { createClient } from '@supabase/supabase-js';
import fs from 'fs';
import csv from 'csv-parser';

const supabase = createClient(SUPABASE_URL, SUPABASE_KEY);

async function migrateEmails() {
  const emails = [];

  fs.createReadStream('emails-backup.csv')
    .pipe(csv())
    .on('data', (row) => {
      emails.push({
        email: row['Email'],
        source: row['Origen'],
        ip_address: row['IP'],
        user_agent: row['User Agent'],
        created_at: row['Fecha'],
      });
    })
    .on('end', async () => {
      console.log(`Found ${emails.length} emails to migrate`);

      // Insert con upsert para evitar duplicados
      const { data, error } = await supabase
        .from('email_waitlist')
        .upsert(emails, { onConflict: 'email,source' });

      if (error) {
        console.error('Migration error:', error);
      } else {
        console.log('Migration successful!');
      }
    });
}

migrateEmails();
```

---

### 5. Historial: ¿Guardar input/output completo?
**Problema:** Los textos pueden ser largos (hasta 15k chars). ¿Guardamos todo?

**Consideraciones:**
- Input: hasta 15,000 chars = ~15 KB
- Output: similar = ~15 KB
- Total por registro: ~30 KB
- 100 usos × 30 KB = 3 MB por usuario
- 1,000 usuarios × 3 MB = 3 GB

**Decisión:**
- ✅ SÍ, guardar input/output completo
- ✅ 3 GB es manejable en Supabase free tier (500 MB) y Pro tier (8 GB)
- ✅ Valor para el usuario: puede recuperar cualquier resultado pasado
- Si storage es problema en el futuro: comprimir con gzip o limitar retention

---

### 6. RLS (Row Level Security) Policies
**Problema:** ¿Cómo protegemos los datos?

**Políticas necesarias:**

```sql
-- Users: Solo pueden ver/editar su propio perfil
CREATE POLICY "Users can view own profile"
  ON users FOR SELECT
  USING (auth.uid() = auth_id);

CREATE POLICY "Users can update own profile"
  ON users FOR UPDATE
  USING (auth.uid() = auth_id);

-- History: Solo pueden ver su propio historial
CREATE POLICY "Users can view own history"
  ON history FOR SELECT
  USING (auth.uid() = (SELECT auth_id FROM users WHERE id = user_id));

CREATE POLICY "Users can insert own history"
  ON history FOR INSERT
  WITH CHECK (auth.uid() = (SELECT auth_id FROM users WHERE id = user_id));

-- Usage tracking: Solo pueden ver su propio tracking
CREATE POLICY "Users can view own usage"
  ON usage_tracking FOR SELECT
  USING (auth.uid() = (SELECT auth_id FROM users WHERE id = user_id));

-- Subscriptions: Solo pueden ver su propia suscripción
CREATE POLICY "Users can view own subscription"
  ON subscriptions FOR SELECT
  USING (auth.uid() = (SELECT auth_id FROM users WHERE id = user_id));

-- Email waitlist: Público (cualquiera puede insertar)
CREATE POLICY "Anyone can insert to waitlist"
  ON email_waitlist FOR INSERT
  WITH CHECK (true);
```

---

## 🔄 FLUJOS DETALLADOS

### Flujo 1: Usuario anónimo usa herramienta por primera vez

```
1. Usuario entra a /humanizador
2. No hay session, no hay cookie de anonymous_id
3. Frontend genera anonymous_id y lo guarda en cookie
4. Usuario ingresa texto y click "Humanizar"
5. Frontend llama POST /api/humanize con texto
6. API verifica:
   - No hay session (anónimo)
   - Lee anonymous_id de cookie
   - Query usage_tracking: COUNT(*) WHERE anonymous_id = X AND created_at >= TODAY
   - Count = 0 → OK, proceder
7. API llama OpenAI
8. API inserta en usage_tracking:
   - user_id: NULL
   - anonymous_id: X
   - tool_type: 'humanizador'
   - input_length: 450
   - success: true
9. API retorna resultado
10. Frontend muestra resultado
```

---

### Flujo 2: Usuario anónimo alcanza límite diario

```
1. Usuario ha usado humanizador 5 veces hoy
2. Intenta usar sexta vez
3. API verifica:
   - No hay session (anónimo)
   - Query usage_tracking: COUNT = 5
   - Límite = 5 → LÍMITE ALCANZADO
4. API retorna error 429: { error: 'Límite diario alcanzado', limit: 5, used: 5 }
5. Frontend muestra <UsageLimitOverlay> con opciones:
   - "Regístrate gratis → 20 usos/día"
   - "Espera hasta mañana"
6. Si usuario click "Regístrate gratis":
   - Redirect a /auth/login con callback=/humanizador
   - Inicia OAuth flow
```

---

### Flujo 3: Usuario se registra con Google

```
1. Usuario click "Registrarse con Google"
2. Frontend llama supabase.auth.signInWithOAuth({ provider: 'google' })
3. Redirect a Google OAuth consent screen
4. Usuario autoriza la app
5. Google redirect a /auth/callback?code=...
6. Callback route procesa código:
   - Supabase valida código con Google
   - Crea registro en auth.users automáticamente
   - Trigger/hook ejecuta función:
7. Database trigger ejecuta:
   INSERT INTO users (auth_id, email, full_name, avatar_url)
   SELECT id, email, raw_user_meta_data->>'full_name', raw_user_meta_data->>'avatar_url'
   FROM auth.users
   WHERE id = NEW.id;
8. Redirect a /dashboard
9. Dashboard muestra bienvenida:
   "¡Bienvenido, Agustín! Tu cuenta Free está activa."
```

---

### Flujo 4: Usuario registrado (Free) usa herramienta

```
1. Usuario autenticado entra a /humanizador
2. Header muestra avatar + "Mi cuenta"
3. Usuario ingresa texto y click "Humanizar"
4. Frontend llama POST /api/humanize con texto + session cookie
5. API verifica:
   - Hay session → user_id = UUID
   - Query users: plan_type = 'free'
   - Query usage_tracking: COUNT(*) WHERE user_id = UUID AND created_at >= TODAY
   - Count = 12 → OK (límite 20 para Free)
6. API llama OpenAI
7. API inserta en usage_tracking:
   - user_id: UUID
   - anonymous_id: NULL
   - tool_type: 'humanizador'
   - input_length: 450
   - success: true
8. API inserta en history:
   - user_id: UUID
   - tool_type: 'humanizador'
   - mode: 'standard'
   - input_text: "..."
   - output_text: "..."
9. API retorna resultado
10. Frontend muestra resultado
11. Usuario puede ir a /dashboard y ver este uso en historial
```

---

### Flujo 5: Usuario ve su historial en Dashboard

```
1. Usuario autenticado va a /dashboard
2. Dashboard component monta:
   - Verifica session (middleware ya lo hizo)
   - Query Supabase:
     SELECT * FROM history
     WHERE user_id = UUID
     ORDER BY created_at DESC
     LIMIT 10; -- Free users: 10, Premium: 100
3. Dashboard muestra lista de últimos usos:
   ┌─────────────────────────────────┐
   │ Humanizador - hace 2 horas      │
   │ "Este es un texto gener..."     │
   │ [Ver completo] [Copiar]         │
   └─────────────────────────────────┘
4. Usuario click "Ver completo":
   - Modal abre con input_text + output_text completos
   - Botones: Copiar input, Copiar output, Descargar
```

---

## 📈 MÉTRICAS Y KPIs A TRACKEAR

### Métricas de conversión
- **Registro:** % de anónimos que se registran al llegar al límite
- **Target:** >30% de los que ven overlay de límite
- **Engagement:** Usos promedio por usuario registrado vs anónimo
- **Target:** Free users usan 3x más que anónimos

### Métricas de uso
- **DAU (Daily Active Users):** Usuarios únicos por día
- **MAU (Monthly Active Users):** Usuarios únicos por mes
- **Usos por herramienta:** Qué herramienta es más popular
- **Tasa de límite alcanzado:** Cuántos usuarios llegan al límite diario

### Métricas técnicas
- **API response time:** <2s en p95
- **Error rate:** <1% en APIs
- **Database query time:** <100ms en p95

---

## ⚠️ RIESGOS Y MITIGACIONES

### Riesgo 1: OAuth no funciona en local
**Probabilidad:** Alta
**Impacto:** Medio
**Mitigación:**
- Configurar localhost como callback URL en Google Cloud Console
- Usar Supabase local development mode
- Documentar setup para desarrolladores

---

### Riesgo 2: Rate limiting se puede evadir fácilmente
**Probabilidad:** Media
**Impacto:** Medio
**Mitigación:**
- Usar combinación Cookie + IP + User-Agent (no solo cookie)
- En el futuro, si hay abuso: implementar Fingerprinting
- Monitorear usage_tracking por IP para detectar abuse patterns

---

### Riesgo 3: Migración de emails pierde datos
**Probabilidad:** Baja
**Impacto:** Alto
**Mitigación:**
- Backup completo de Google Sheet antes de migrar
- Script de validación que compara count pre/post migración
- NO borrar Google Sheet después de migrar (archivar)

---

### Riesgo 4: Performance de queries con muchos usuarios
**Probabilidad:** Media
**Impacto:** Alto
**Mitigación:**
- Crear indexes correctos desde el inicio (ver SQL arriba)
- Limitar queries de history con LIMIT estricto
- Usar Supabase query analyzer para optimizar
- Si crece mucho: implementar caching con Redis

---

### Riesgo 5: Usuarios confundidos por límites
**Probabilidad:** Media
**Impacto:** Medio
**Mitigación:**
- UX muy clara en overlays (explicar límites)
- Mostrar contador de usos restantes en herramientas
- FAQ section explicando límites y por qué existen
- Email onboarding al registrarse explicando beneficios

---

## 🎯 DEFINICIÓN DE "DONE" PARA FASE 0

La Fase 0 está COMPLETA cuando:

### Funcional
- ✅ Usuario puede registrarse con Google OAuth
- ✅ Usuario puede iniciar sesión con Google OAuth
- ✅ Usuario puede cerrar sesión
- ✅ Usuario anónimo tiene límite de 5 usos/día por herramienta
- ✅ Usuario Free tiene límite de 20 usos/día por herramienta
- ✅ Overlay de límite aparece correctamente
- ✅ Dashboard muestra stats y historial correctos
- ✅ Historial muestra últimos 10 usos (Free)
- ✅ Header muestra estado de auth correcto
- ✅ Todos los emails de Google Sheets migrados a Supabase
- ✅ API routes protegidas con auth middleware
- ✅ Rate limiting funciona correctamente

### Técnico
- ✅ RLS policies configuradas y testeadas
- ✅ Indexes de database creados
- ✅ No hay bugs críticos (P0)
- ✅ Performance: API response time <2s en p95
- ✅ Error rate <1% en 24h
- ✅ Deploy exitoso en producción

### Documentación
- ✅ README actualizado con setup de Supabase
- ✅ Environment variables documentadas
- ✅ Guía de migración de emails
- ✅ Decisiones técnicas documentadas

---

## 📝 PREGUNTAS PARA AGUSTÍN

Antes de empezar la implementación, necesito confirmar:

### 1. Límites de uso
- ¿Los límites propuestos (5 anónimo, 20 free) te parecen correctos?
- ¿O preferís otros números?

### 2. Experiencia de usuario
- ¿Querés que usuarios anónimos puedan seguir usando SIN límites hasta que lancemos Premium?
- ¿O preferís implementar límites desde ya para forzar registro?

### 3. Historial
- ¿10 usos para Free y 100 para Premium te parece bien?
- ¿O preferís otros números?

### 4. Migración de emails
- ¿Cuántos emails aproximadamente hay en el Google Sheet actualmente?
- ¿Tenés acceso para exportar a CSV cuando llegue el momento?

### 5. Prioridades
- ¿Hay alguna parte de la Fase 0 que querés priorizar?
- Por ejemplo: ¿Empezar por auth aunque no implementemos rate limiting todavía?

### 6. Timeline
- ¿Hay alguna fecha límite para tener Fase 0 lista?
- ¿O vamos tranquilos implementando bien?

---

## 🚦 SIGUIENTE PASO

Una vez que aclaremos las preguntas de arriba, podemos:

1. **Opción A - Empezar directo:** Si todo está claro, arranco con Sprint 1 (Supabase setup)
2. **Opción B - Más planning:** Si necesitás revisar algo, seguimos puliendo el plan

**¿Qué preferís?** 🚀
