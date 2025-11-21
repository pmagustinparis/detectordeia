# FASE 0 - DECISIONES FINALES Y RECOMENDACIONES

**Documento complementario a FASE_0_PLAN_CONCEPTUAL.md**

Este documento responde las preguntas y consideraciones de Agustín antes de empezar la implementación.

---

## 1️⃣ LÍMITES DE USO + ESTRATEGIA DE COPY

### ✅ Límites confirmados
- **Anónimos:** 5 usos/día por herramienta
- **Free registrados:** 20 usos/día por herramienta
- **Premium:** Ilimitado

### 📝 Estrategia de messaging (sin bombardear)

El desafío es **guiar progresivamente** sin saturar. Propongo una estrategia de **"progressive disclosure"** - mostrar información solo cuando es relevante.

#### Fase 1: Usuario nuevo (0-2 usos)
**Objetivo:** Dejar usar sin fricciones, generar valor primero

**UI Changes:**
- ❌ NO mostrar nada sobre límites
- ❌ NO mostrar banners de Premium
- ✅ Solo badges de valor: "100% privado", "No login", "En español"

**Copy:** Ninguno sobre límites. Pura experiencia.

---

#### Fase 2: Usuario recurrente (3-4 usos)
**Objetivo:** Crear awareness suave de que hay una cuenta

**UI Changes:**
- ✅ Agregar **badge sutil en footer de resultado**:
  ```
  💡 Tip: Crea una cuenta gratis para guardar tu historial
  ```
- Tamaño: Pequeño, color suave (gray-600)
- Posición: Abajo del resultado, no invasivo
- Frecuencia: Solo aparece en uso #3 y #4

**Copy sugerido:**
> 💡 **Tip:** Registrándote puedes acceder a tu historial y usar hasta 20 veces por día cada herramienta.

---

#### Fase 3: Usuario alcanza límite (uso #5)
**Objetivo:** Ofrecer upgrade a Free account (no Premium todavía)

**UI Changes:**
- ✅ **Overlay completo** (ya implementado en EmailCaptureModal, adaptar)
- Bloquea el uso hasta que se registre o espere al día siguiente

**Copy sugerido:**
```
🎯 Has usado el Humanizador 5 veces hoy

Eso significa que DetectorDeIA te está siendo útil. ¡Genial!

[Registrarme gratis con Google]
→ Hasta 20 usos diarios por herramienta
→ Historial de tus últimas semanas
→ 100% gratis, sin tarjeta de crédito

[Esperar hasta mañana]
Los límites se resetean a las 00:00 UTC
```

**Tono:** Positivo ("te está siendo útil") en vez de restrictivo ("se te acabaron los usos")

---

#### Fase 4: Usuario registrado (Free)
**Objetivo:** Crear valor con historial, no saturar con Premium

**UI Changes:**
- ✅ Header muestra avatar + "Mi cuenta"
- ✅ Después del resultado, link sutil a dashboard:
  ```
  ✓ Guardado en tu historial - [Ver todos mis usos]
  ```
- ❌ NO mostrar banner de Premium en cada uso
- ✅ Premium CTA **solo en dashboard**, no en herramientas

**Copy en herramientas (después de resultado):**
> ✓ **Guardado en tu historial** - Puedes verlo en cualquier momento en [tu dashboard](/dashboard)

**Copy en Dashboard (banner sutil):**
```
💎 Próximamente: Plan Premium

Avísame cuando esté disponible para:
• Humanizar hasta 15,000 caracteres
• 5 modos avanzados (Formal, Creativo, Académico...)
• Historial extendido de 1 mes

[Avísame cuando lance] [No, gracias]
```

**Frecuencia:** Banner aparece 1 vez (se puede cerrar con X, guarda en localStorage que no mostrar más)

---

#### Fase 5: Usuario Premium (Fase 1)
**Objetivo:** Experiencia premium sin mencionar límites

**UI Changes:**
- ✅ Badge en herramientas: "⭐ Premium"
- ✅ Sin menciones de límites en ningún lugar
- ✅ Dashboard muestra "Plan Premium activo"

---

### 📊 Resumen de messaging

| Etapa | Usos | Menciones de cuenta/límites | Intensidad |
|-------|------|---------------------------|-----------|
| Primera impresión | 0-2 | Ninguna | 🟢 Silencioso |
| Awareness | 3-4 | Tip sutil en resultado | 🟡 Suave |
| Conversión | 5 | Overlay completo | 🔴 Fuerte |
| Free user | Ilimitado* | Link a historial post-resultado | 🟢 Silencioso |
| Dashboard Free | - | Banner Premium 1x | 🟡 Suave |
| Premium | Ilimitado | Badge de status | 🟢 Silencioso |

*Ilimitado = hasta 20/día

---

## 2️⃣ RECOMENDACIÓN UX/PRODUCTO: ¿Límites ahora o en Fase 1?

### 🎯 Mi recomendación: **Opción A+ (Híbrida)**

Ni la A pura ni la B pura. Propongo una **Opción A modificada**:

### Opción A+ (Recomendada)
**Implementar infraestructura de límites AHORA, pero con números más generosos**

**Límites durante Fase 0:**
- Anónimos: **10 usos/día** por herramienta (en vez de 5)
- Free registrados: **50 usos/día** por herramienta (en vez de 20)
- Premium: Ilimitado

**Límites cuando lance Premium (Fase 1):**
- Anónimos: **5 usos/día**
- Free registrados: **20 usos/día**
- Premium: Ilimitado

### ¿Por qué esta opción?

#### ✅ Ventajas

1. **Construimos la base técnica ahora**
   - Tracking de uso funcionando
   - Rate limiting testeado en producción
   - No hay sorpresas técnicas cuando lancemos Premium

2. **Generamos registros sin frustrar**
   - 10 usos/día anónimos es generoso (la mayoría no llega)
   - 50 usos/día Free es MUY generoso (casi nadie llega)
   - Los que sí llegan son **power users** → target perfecto para Premium

3. **Datos para optimizar**
   - Vemos cuántos usuarios realmente llegan a límites
   - Podemos ajustar números antes de Fase 1
   - Aprendemos qué messaging funciona mejor

4. **Transición suave a Premium**
   - Cuando lancemos Premium, bajamos límites Free de 50→20
   - Notificamos a usuarios: "Estamos lanzando Premium, ajustamos límites Free"
   - Los que estaban usando >20/día → target natural para Premium

5. **No rompemos la experiencia actual**
   - 10 usos anónimos/día = usuario casual puede usar varias veces sin fricción
   - 50 usos Free/día = power user registrado tiene experiencia excelente
   - Nadie se siente bloqueado injustamente

#### ❌ Por qué NO Opción A pura (5/20)

- **Demasiado restrictivo para Fase 0** donde aún no hay Premium
- Riesgo de frustrar usuarios en fase de crecimiento
- 5 usos/día anónimos puede ser poco para usuario que está evaluando la herramienta
- No hay "premio" claro todavía (Premium no existe)

#### ❌ Por qué NO Opción B pura (sin límites)

- Llegaríamos a Fase 1 sin datos de comportamiento
- Tendríamos que implementar todo rate limiting de golpe (más riesgo)
- No sabríamos si los números son correctos
- Perderíamos oportunidad de crecer email list durante Fase 0

---

### 🎬 Plan de transición

#### **Durante Fase 0** (próximas 2-3 semanas)
```
Límites: 10 anónimo, 50 free
Objetivo: Construir infraestructura + crecer registros + obtener datos
Messaging: Suave (ver estrategia arriba)
```

#### **Pre-lanzamiento Fase 1** (1-2 semanas antes de Premium)
```
Anuncio: Email a todos los usuarios Free registrados
Subject: "Lanzamos Plan Premium - Ajustamos límites Free"

Cuerpo:
"Hola [nombre],

Tenemos noticias: DetectorDeIA lanza su Plan Premium con:
• Hasta 15,000 caracteres
• 5 modos avanzados (Formal, Creativo, Académico...)
• Historial extendido
• Precio de lanzamiento: $7/mes

Para hacer esto sustentable, ajustamos los límites del plan Free:
• Antes: 50 usos/día → Ahora: 20 usos/día

Sigues teniendo acceso completo, solo con un límite más realista.

Si usas las herramientas intensivamente, Premium es para ti:
[Ver planes y precios]

Gracias por ser early adopter,
Agustín"
```

#### **Lanzamiento Fase 1**
```
Límites: 5 anónimo, 20 free, ilimitado premium
Objetivo: Convertir power users a Premium
Messaging: Directo (ver estrategia Premium arriba)
```

---

### 📈 Proyección de impacto

Asumiendo 1,000 usuarios/día en Fase 0:

| Segmento | % usuarios | Comportamiento esperado |
|----------|-----------|------------------------|
| Casual (1-2 usos) | 70% | No ve límites, feliz |
| Regular (3-9 usos) | 25% | Ve tip de registro, algunos se registran |
| Power (10+ usos) | 5% | Llegan a límite anónimo → Se registran → Quedan en 50/día Free felices |

**Resultado:**
- ~250 usuarios ven el tip de registro
- ~50 usuarios (power users) se registran por límite
- ~0 usuarios frustrados (límites son generosos)
- Tenemos **50 power users registrados** que son target perfecto para Premium en Fase 1

---

### ✅ Decisión final recomendada

**Implementar Opción A+ (Híbrida):**
- Fase 0: Límites generosos (10/50)
- Fase 1: Límites ajustados (5/20) + Premium ilimitado
- Messaging: Progressive disclosure (ver sección 1)

**¿Te parece bien este approach?**

---

## 3️⃣ HISTORIAL: ¿Por count o por tiempo?

Excelente pregunta. Comparemos opciones:

### Opción A: Por count (10 free, 100 premium)

**Ventajas:**
- ✅ **Más predecible para el usuario:** "Ves tus últimos 10 usos"
- ✅ **Más simple de comunicar:** Copy claro, fácil de entender
- ✅ **Más simple de implementar:** Solo un `LIMIT 10` en query
- ✅ **Performance consistente:** Query siempre retorna N rows

**Desventajas:**
- ❌ Si usuario no usa por 6 meses, historial sigue ahí (storage)
- ❌ No hay auto-limpieza

---

### Opción B: Por tiempo (1 semana free, 1 mes premium)

**Ventajas:**
- ✅ **Auto-limpieza:** Datos viejos se van automáticamente
- ✅ **Mejor para storage:** No acumulamos infinito
- ✅ **Más realista:** "Historial del último mes" suena profesional

**Desventajas:**
- ❌ **Variable por usuario:** Un usuario puede tener 2 usos, otro 100
- ❌ **Puede confundir:** "¿Por qué Juan ve 5 y yo veo 50?"
- ❌ **Más complejo de comunicar:** "Últimos 7 días" vs "Últimos 10 usos"

---

### Opción C: Híbrida (Count + tiempo) - **RECOMENDADA**

**Combinación de ambas:**
```
Free: Últimos 10 usos O últimos 7 días (lo que ocurra primero)
Premium: Últimos 100 usos O últimos 30 días (lo que ocurra primero)
```

**Query SQL:**
```sql
SELECT * FROM history
WHERE user_id = $1
  AND created_at >= NOW() - INTERVAL '7 days'  -- Filtro de tiempo
ORDER BY created_at DESC
LIMIT 10;  -- Filtro de count
```

**Ventajas:**
- ✅ Lo mejor de ambos mundos
- ✅ Auto-limpieza (después de 7/30 días ya no aparece)
- ✅ Comunicación clara: "Últimos 10 usos (hasta 7 días atrás)"
- ✅ Usuario casual (2 usos/semana) → Ve sus últimos 7 días = ~2 usos
- ✅ Power user (10 usos/día) → Ve sus últimos 10 usos = ~1 día

**Cron job de limpieza** (opcional, para ahorrar storage):
```sql
-- Ejecutar 1x por semana
DELETE FROM history
WHERE created_at < NOW() - INTERVAL '90 days';
```

Esto borra todo lo que tenga más de 90 días (aunque no se muestre en UI).

---

### ✅ Recomendación final: Opción C (Híbrida)

**Límites de historial:**
- **Free:** Últimos 10 usos (hasta 7 días atrás)
- **Premium:** Últimos 100 usos (hasta 30 días atrás)

**Copy en dashboard:**
```
📜 Tu historial (últimos 7 días)
Mostrando tus últimos 10 usos

[Si es Premium]
📜 Tu historial (último mes)
Mostrando tus últimos 100 usos
```

**¿Te parece bien?**

---

## 4️⃣ SEGURIDAD Y PRIVACIDAD

Muy bien que lo menciones. Esto es CRÍTICO. Aquí está todo lo que vamos a implementar:

### 🔒 Seguridad de datos del usuario

#### 1. **Row Level Security (RLS) en Supabase**

Todas las tablas tienen políticas RLS que aseguran:
- Usuario solo puede ver/editar **sus propios datos**
- Imposible hacer query de datos de otro usuario (incluso con API key)

```sql
-- Ejemplo: Tabla history
CREATE POLICY "Users can only view their own history"
  ON history FOR SELECT
  USING (auth.uid() = (SELECT auth_id FROM users WHERE id = user_id));

-- Esto significa: el query solo retorna rows donde el user_id corresponde al auth_id del usuario autenticado
```

**Beneficio:** Aunque alguien tenga tu API key de Supabase, NO puede acceder a datos de otros usuarios.

---

#### 2. **Encriptación en tránsito y reposo**

- **HTTPS:** Todo tráfico encriptado (ya implementado en Vercel)
- **Supabase storage:** Encriptación AES-256 en reposo (automático)
- **Tokens JWT:** Firmados con secreto, no pueden ser falsificados

---

#### 3. **Datos sensibles en historial**

**Problema:** Guardamos `input_text` y `output_text` en historial. ¿Qué pasa si usuario pega contenido sensible?

**Solución:**
- Agregar disclaimer en dashboard:
  ```
  ⚠️ No pegues contraseñas, datos bancarios o información confidencial.
  Tu historial se guarda para tu conveniencia, pero nunca compartas datos sensibles.
  ```

- Opcionalmente: Feature de "Borrar este uso" en historial
  ```tsx
  <button onClick={() => deleteHistoryItem(id)}>
    🗑️ Eliminar
  </button>
  ```

---

#### 4. **OAuth con Google - Security benefits**

- ✅ No guardamos contraseñas (Google maneja eso)
- ✅ No tocamos credenciales de usuario
- ✅ Tokens se refrescan automáticamente
- ✅ Si usuario cambia password en Google, no afecta nuestra app
- ✅ Podemos revocar acceso desde Supabase dashboard

---

#### 5. **API Rate limiting a nivel de Supabase**

Supabase tiene rate limiting built-in:
- 1,000 requests/minuto por IP (gratis)
- 10,000 requests/minuto (Pro plan)

Esto previene:
- Ataques DDoS
- Scraping masivo
- Abuso de API

---

#### 6. **Environment variables nunca en código**

```
❌ NUNCA: const SUPABASE_KEY = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9..."
✅ SIEMPRE: const SUPABASE_KEY = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY
```

Configuramos en Vercel, nunca commiteamos a Git.

---

#### 7. **Logging y auditoría**

Implementar logging en acciones críticas:
- Usuario se registra → Log
- Usuario cambia plan → Log
- Usuario borra historial → Log
- Error de auth → Log

Esto nos permite:
- Debuggear problemas
- Detectar comportamiento sospechoso
- Compliance (si en el futuro lo necesitamos)

---

### 🛡️ Privacidad

#### 1. **Datos mínimos**

Solo guardamos lo estrictamente necesario:
```
users table:
- auth_id (necesario para auth)
- email (necesario para comunicación)
- full_name (nice to have, viene de Google)
- avatar_url (nice to have, viene de Google)
- plan_type (necesario para features)
```

**NO guardamos:**
- ❌ Teléfono
- ❌ Dirección
- ❌ Fecha de nacimiento
- ❌ Género
- ❌ Nada que no necesitemos

---

#### 2. **Anonimización de IPs**

En `usage_tracking` guardamos IP para rate limiting, pero:

```typescript
// Opción: Anonimizar IP (quitar último octeto)
const anonymizeIP = (ip: string) => {
  return ip.split('.').slice(0, 3).join('.') + '.0';
};

// Ejemplo: 192.168.1.100 → 192.168.1.0
```

Esto permite rate limiting pero protege privacidad del usuario.

---

#### 3. **GDPR Compliance (si aplicable)**

Aunque DetectorDeIA es principalmente LATAM/España, si tenemos usuarios EU:

**Derecho al olvido:**
```tsx
// /api/user/delete-account
export async function DELETE(request: Request) {
  const session = await supabase.auth.getSession();
  const userId = session.user.id;

  // 1. Borrar historial
  await supabase.from('history').delete().eq('user_id', userId);

  // 2. Borrar tracking
  await supabase.from('usage_tracking').delete().eq('user_id', userId);

  // 3. Borrar suscripción (si tiene)
  await supabase.from('subscriptions').delete().eq('user_id', userId);

  // 4. Borrar usuario
  await supabase.from('users').delete().eq('id', userId);

  // 5. Borrar auth
  await supabase.auth.admin.deleteUser(userId);

  return NextResponse.json({ success: true });
}
```

**Derecho a exportar datos:**
```tsx
// /api/user/export-data
export async function GET(request: Request) {
  const session = await supabase.auth.getSession();
  const userId = session.user.id;

  const { data: userData } = await supabase.from('users').select('*').eq('id', userId).single();
  const { data: history } = await supabase.from('history').select('*').eq('user_id', userId);
  const { data: usage } = await supabase.from('usage_tracking').select('*').eq('user_id', userId);

  const exportData = {
    user: userData,
    history,
    usage,
    exportedAt: new Date().toISOString(),
  };

  return new Response(JSON.stringify(exportData, null, 2), {
    headers: {
      'Content-Type': 'application/json',
      'Content-Disposition': 'attachment; filename="my-data.json"',
    },
  });
}
```

---

#### 4. **Política de privacidad**

Crear `/privacidad` page con:
- Qué datos guardamos
- Por qué los guardamos
- Cómo los protegemos
- Derechos del usuario (ver, exportar, borrar)
- Contacto para consultas

**Agregar link en footer:**
```tsx
<a href="/privacidad">Privacidad</a>
```

---

### ✅ Checklist de seguridad

Antes de ir a producción:

- [ ] RLS policies configuradas en todas las tablas
- [ ] Environment variables en Vercel (no en código)
- [ ] HTTPS activo (ya está con Vercel)
- [ ] OAuth configurado correctamente
- [ ] Rate limiting funcionando
- [ ] Logging de acciones críticas
- [ ] Página de privacidad publicada
- [ ] Disclaimer sobre no pegar datos sensibles
- [ ] Feature de "Borrar cuenta" funcionando
- [ ] Feature de "Exportar datos" funcionando

---

## 5️⃣ ESCALABILIDAD SIN OVERENGINEERING

### 🎯 Filosofía: "Simple now, scalable later"

Vamos a construir pensando en escala, pero sin complejidad innecesaria.

### ✅ Lo que SÍ hacemos (scalable)

#### 1. **Database indexes desde el inicio**
```sql
-- Estos indexes son gratis en performance (añaden ~1ms) pero críticos cuando crezcas
CREATE INDEX idx_history_user_id ON history(user_id);
CREATE INDEX idx_history_created_at ON history(created_at DESC);
CREATE INDEX idx_usage_user_id ON usage_tracking(user_id);
CREATE INDEX idx_usage_created_at ON usage_tracking(created_at);
```

**Por qué:** Agregar indexes después con millones de rows es costoso y lento.

---

#### 2. **UUIDs en vez de auto-increment IDs**
```sql
id UUID PRIMARY KEY DEFAULT gen_random_uuid()  -- ✅ Escalable
-- vs
id SERIAL PRIMARY KEY  -- ❌ Predecible, puede causar problemas
```

**Por qué:** UUIDs son únicos globalmente, permiten sharding futuro, no son predecibles.

---

#### 3. **Timestamps con timezone**
```sql
created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()  -- ✅
-- vs
created_at TIMESTAMP DEFAULT NOW()  -- ❌
```

**Por qué:** Si en el futuro movemos database a otra región, timestamps siguen correctos.

---

#### 4. **Foreign keys y constraints desde inicio**
```sql
user_id UUID NOT NULL REFERENCES users(id) ON DELETE CASCADE
```

**Por qué:** Integridad referencial garantizada, no tenemos "huérfanos" en la DB.

---

#### 5. **Supabase sobre database propio**

**Por qué escala:**
- Connection pooling automático
- Read replicas (en Pro plan)
- Backups automáticos
- Escalado vertical fácil (upgrade de plan)

**Límites de Supabase Free tier:**
- 500 MB storage (suficiente para empezar)
- 2 GB bandwidth/mes
- 50,000 usuarios auth
- Unlimited API requests

**Cuándo upgradeamos:**
- Storage >400 MB → Pro plan ($25/mes, 8 GB)
- Usuarios >40,000 → Pro plan
- Necesitamos analytics avanzados → Pro plan

---

### ❌ Lo que NO hacemos (overengineering)

#### 1. **NO: Caching con Redis desde el inicio**

**Por qué no:**
- Agrega complejidad (otro servicio)
- Costo extra
- Database queries con indexes son suficientemente rápidas (<100ms)

**Cuándo sí:**
- Cuando tengamos >10,000 DAU
- Cuando veamos queries lentas en monitoring (>500ms p95)

---

#### 2. **NO: Microservices desde el inicio**

**Por qué no:**
- Next.js API routes son suficientes
- Monolito bien estructurado es más fácil de mantener
- Menos moving parts = menos cosas que romper

**Cuándo sí:**
- Cuando un servicio tenga load muy diferente (ej: email processing)
- Cuando equipo crezca (>5 developers)

---

#### 3. **NO: CDN para assets desde el inicio**

**Por qué no:**
- Vercel ya tiene CDN built-in (Cloudflare)
- Assets de DetectorDeIA son mínimos

**Cuándo sí:**
- Si agregamos muchas imágenes/videos
- Si tenemos usuarios en múltiples continentes con latencia alta

---

#### 4. **NO: Queue system (SQS, RabbitMQ) desde el inicio**

**Por qué no:**
- API calls a OpenAI son suficientemente rápidas (~2s)
- No tenemos procesos batch largos

**Cuándo sí:**
- Si agregamos "procesar archivo de 100 páginas"
- Si agregamos email campaigns masivos

---

### 🔮 Plan de escalado

#### **0-1,000 users:**
- Supabase Free tier
- Next.js API routes
- OpenAI API directamente
- **Costo:** ~$30/mes (OpenAI)

#### **1,000-10,000 users:**
- Supabase Pro plan ($25/mes)
- Same architecture
- Monitor query performance
- **Costo:** ~$300/mes (OpenAI + Supabase)

#### **10,000-100,000 users:**
- Consider read replicas
- Implement Redis caching para queries calientes
- Optimize OpenAI usage (batch requests si es posible)
- **Costo:** ~$2,000/mes

#### **100,000+ users:**
- Separate services (email, processing)
- Multiple database instances
- CDN for assets
- Dedicated load balancing
- **Costo:** ~$10,000/mes

---

### ✅ Principios que seguimos

1. **Database first:** Indexes y constraints correctos desde día 1
2. **Monitor early:** Vercel Analytics + Supabase logs desde el inicio
3. **Vertical scaling primero:** Upgrade de plan antes de agregar complejidad
4. **Optimize when needed:** No antes
5. **Measure before optimizing:** Datos > intuición

---

## 6️⃣ SETUP DE SUPABASE: ¿Quién hace qué?

### 🔧 Tareas que DEBES hacer tú (manual en Supabase dashboard)

#### 1. **Crear proyecto en Supabase** (5 min)
- Ir a https://supabase.com
- Click "New project"
- Nombre: "detectordeia-prod"
- Database password: (generar seguro, guardar en 1Password)
- Region: "South America (São Paulo)" o "Europe West (Ireland)"
- Esperar ~2 min a que aprovisione

**Te proveo:** Paso a paso con screenshots cuando llegue el momento

---

#### 2. **Configurar Google OAuth en Supabase** (10 min)
- Ir a Authentication > Providers
- Habilitar Google
- Necesitas crear OAuth credentials en Google Cloud Console
- Copy/paste Client ID y Client Secret

**Te proveo:** Guía detallada (similar a SETUP_GOOGLE_SHEETS.md)

---

#### 3. **Copiar credenciales a Vercel** (5 min)
```
NEXT_PUBLIC_SUPABASE_URL=https://xxxxx.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=eyJhbGciOiJIUz...
SUPABASE_SERVICE_ROLE_KEY=eyJhbGciOiJIUz...
```

**Te proveo:** Exactamente qué copiar y dónde pegarlo

---

### 🤖 Tareas que hago YO (código + SQL)

#### 1. **Escribir SQL migrations**
Creo archivos `.sql` con todas las tablas, indexes, RLS policies.

Vos solo ejecutas:
```sql
-- Te paso el contenido completo, lo copias en Supabase SQL Editor, click "Run"
```

---

#### 2. **Implementar toda la lógica de Next.js**
- Configurar Supabase client
- Auth middleware
- API routes
- Componentes UI
- Todo el código TypeScript

---

#### 3. **Scripts de migración de datos**
Te doy un script que:
- Lees CSV de emails
- Lo ejecutas con `npm run migrate-emails`
- Migra todo a Supabase automáticamente

---

### 📋 División de trabajo

| Tarea | Quién | Tiempo estimado |
|-------|-------|-----------------|
| Crear proyecto Supabase | Tú | 5 min |
| Ejecutar SQL migration en editor | Tú | 2 min (copy/paste) |
| Configurar Google OAuth | Tú | 10 min (con mi guía) |
| Copiar env vars a Vercel | Tú | 5 min |
| Exportar CSV de Google Sheets | Tú | 2 min |
| Ejecutar script de migración | Tú | 5 min |
| **TOTAL para ti** | | **~30 min** |
| | | |
| Escribir migrations SQL | Yo | 1 hora |
| Implementar auth en Next.js | Yo | 4 horas |
| Implementar dashboard | Yo | 4 hours |
| Implementar rate limiting | Yo | 3 horas |
| Testing completo | Yo | 2 horas |
| **TOTAL para mi** | | **~14 horas** |

---

### 🎓 Te voy a enseñar mientras hacemos

Cada vez que tengas que hacer algo manual, te doy:
1. **Screenshot** de dónde hacer click
2. **Copy exacto** de qué pegar
3. **Explicación** de por qué lo hacemos así
4. **Troubleshooting** de errores comunes

**Objetivo:** Que entiendas qué estamos haciendo, no solo copy/paste ciego.

---

## 7️⃣ GOOGLE OAUTH: ¿Via Supabase o directo?

Excelente pregunta. Comparemos:

### Opción A: Google OAuth via Supabase (RECOMENDADO)

#### ✅ Ventajas

1. **Built-in en Supabase**
   - No necesitas manejar tokens manualmente
   - Refresh automático de tokens
   - Session management out of the box

2. **RLS funciona automáticamente**
   ```sql
   -- Este query ya sabe quién eres sin código extra
   SELECT * FROM history WHERE auth.uid() = ...
   ```
   Magic! Supabase inyecta `auth.uid()` automáticamente

3. **Menos código en Next.js**
   ```tsx
   // Solo esto:
   const { data, error } = await supabase.auth.signInWithOAuth({
     provider: 'google'
   });
   // vs 50 líneas de código manejando OAuth manualmente
   ```

4. **Multi-provider fácil**
   En el futuro, agregar GitHub es solo:
   ```tsx
   await supabase.auth.signInWithOAuth({ provider: 'github' });
   ```

5. **Security best practices**
   - Tokens nunca expuestos en frontend
   - httpOnly cookies automáticas
   - CSRF protection built-in

6. **Admin features gratis**
   - Ver usuarios en Supabase dashboard
   - Banear usuarios con 1 click
   - Reset passwords
   - Ver última actividad

#### ❌ Desventajas

1. **Vendor lock-in** (medio)
   - Si en el futuro migramos de Supabase, hay que reescribir auth
   - Mitigación: Supabase es open source (podemos self-host)

2. **Menos control fino**
   - No puedes customizar el OAuth flow 100%
   - Para mayoría de casos, no importa

---

### Opción B: Google OAuth directo (next-auth o manual)

#### ✅ Ventajas

1. **Control total**
   - Customizas cada paso del OAuth flow
   - Puedes agregar lógica custom en callbacks

2. **No depende de Supabase**
   - Si migramos database, auth sigue igual

3. **Más flexible para casos edge**
   - Link de cuentas (Google + GitHub mismo user)
   - Multi-tenancy complejo

#### ❌ Desventajas

1. **Mucho más código**
   - ~200 líneas para manejar OAuth correctamente
   - Token refresh manual
   - Session management manual

2. **Más superficie de ataque**
   - Más código = más lugares para bugs de seguridad
   - Necesitas entender OAuth 2.0 profundamente

3. **No se integra con RLS**
   - Tienes que pasar `userId` manualmente en cada query
   ```tsx
   // En vez de:
   await supabase.from('history').select('*');  // Magic, sabe el user

   // Tienes que hacer:
   await supabase.from('history').select('*').eq('user_id', session.userId);  // Manual
   ```

4. **Sin admin dashboard**
   - Tienes que construir tu propio panel de admin
   - O usar next-auth dashboard (menos features)

---

### 📊 Comparación directa

| Feature | Via Supabase | Directo (next-auth) |
|---------|--------------|---------------------|
| **Tiempo de setup** | 30 min | 3-4 horas |
| **Líneas de código** | ~50 | ~200 |
| **Token refresh** | ✅ Automático | ❌ Manual |
| **Session management** | ✅ Automático | ❌ Manual |
| **RLS integration** | ✅ Nativo | ❌ Manual |
| **Multi-provider** | ✅ Fácil | 🟡 Medio |
| **Admin dashboard** | ✅ Gratis | ❌ Build yourself |
| **Security** | ✅ Battle-tested | 🟡 Tu responsabilidad |
| **Vendor lock-in** | 🟡 Medio | ✅ None |
| **Customización** | 🟡 Limitada | ✅ Total |

---

### ✅ Recomendación: Via Supabase

**Por qué:**
1. **Tiempo es dinero:** 30 min vs 4 horas
2. **Seguridad:** Menos código = menos bugs
3. **Mantenimiento:** No tienes que actualizar librerías OAuth
4. **Features gratis:** Admin dashboard, email verification, password reset
5. **Escalabilidad:** Supabase Auth maneja millones de usuarios

**Cuándo considerar directo:**
- Si necesitas OAuth flow muy customizado (raro)
- Si tenés requirement de no vendor lock-in (puedes mitigar con self-hosting)
- Si necesitas integrar con identity provider custom (enterprise)

Para DetectorDeIA, **via Supabase es la mejor opción**.

---

## 🎯 RESUMEN DE DECISIONES FINALES

### ✅ Confirmado

| Decisión | Opción elegida | Rationale |
|----------|----------------|-----------|
| **Límites de uso** | 10 anónimo, 50 free (Fase 0) → 5/20 (Fase 1) | Generoso ahora, ajustamos pre-Premium |
| **Messaging strategy** | Progressive disclosure | No bombardear, guiar cuando relevante |
| **Historial** | 10 usos + 7 días (Free), 100 + 30 días (Premium) | Híbrido: predecible + auto-limpieza |
| **Seguridad** | RLS + HTTPS + minimal data + GDPR features | Built-in desde día 1 |
| **Escalabilidad** | Indexes + UUIDs + Supabase, sin overengineering | Simple now, scalable later |
| **OAuth** | Via Supabase | Menos código, más seguro, más fácil |
| **División de trabajo** | Agustín: ~30 min setup manual, Yo: ~14 horas código | Guías paso a paso para Agustín |

---

## 🚀 PRÓXIMOS PASOS

1. **Tú confirmas** que estás de acuerdo con todas las decisiones arriba
2. **Yo empiezo Sprint 1:** Supabase setup + migrations SQL
3. **Te paso guía** de cómo crear proyecto y configurar OAuth
4. **Tú haces** el setup manual (~30 min)
5. **Yo sigo** con Sprint 2-5 (auth, dashboard, rate limiting, migración)

**¿Estamos listos para arrancar?** 🎯
