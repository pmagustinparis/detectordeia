# Analytics Dashboard V2 - FAQ

## ¿Cómo funcionan los datos del dashboard?

### 📊 **Actualización de datos**

**Los datos son 100% en tiempo real** con las siguientes características:

#### **Al cargar el dashboard:**
- Se ejecutan queries a la base de datos de Supabase
- Se procesan todos los eventos desde el inicio del timeframe seleccionado
- NO hay datos cacheados, siempre consulta la DB en vivo

#### **Timeframes disponibles:**
- 7 días
- 14 días
- 30 días (default)
- 90 días

#### **¿Cómo actualizar manualmente?**
1. Click en el botón "🔄 Actualizar" en el header del dashboard
2. O cambiar el timeframe en el selector
3. Ambas acciones hacen un fetch fresco de todos los datos

---

## 🔢 **¿Por qué algunos números no suman?**

### **Razones comunes:**

#### **1. Usuarios de prueba (Test Users)**
- Los test users (definidos en `TEST_USER_CONFIG`) se **excluyen** de:
  - MRR y revenue metrics
  - Conversion rate calculations
  - Churn metrics
- Pero **se incluyen** en:
  - Total registered users (marcados con badge "TEST")
  - Usage tracking general
  - Lista completa de usuarios

**Test users actualmente:**
```typescript
TEST_USER_CONFIG = {
  emails: ['parisagustin@gmail.com', 'latamify@gmail.com']
}
```

#### **2. Usuarios anónimos vs registrados**
- **Usuarios activos totales** = Registrados + Anónimos
- Los anónimos NO cuentan para:
  - Conversion rate
  - MRR
  - Premium metrics
- Los anónimos SÍ cuentan para:
  - Total active users
  - Funnel de anónimos
  - Product engagement

#### **3. Timeframes diferentes**
- North Star Metrics: Compara con período anterior (trend %)
- Cohort Analysis: Agrupa por mes de signup
- Hot Leads: Últimos 30 días siempre (independiente del timeframe)

#### **4. Eventos sin user_id**
- Algunos eventos pueden tener solo `anonymous_id` sin `user_id`
- Esto pasa cuando un usuario anónimo hace algo antes de registrarse
- Estos eventos:
  - **SÍ** cuentan para total events
  - **NO** cuentan para métricas de usuarios registrados
  - **SÍ** aparecen en funnel de anónimos

---

## 💰 **MRR y Revenue**

### **Cálculo de MRR (Monthly Recurring Revenue):**

```typescript
MRR = (Usuarios Premium × Precio Mensual)

Donde:
- Usuarios Premium = usuarios con plan_type = 'premium'
- Excluyendo test users
- Precio Mensual:
  - Plan mensual: $10/mes
  - Plan anual: $96/año ÷ 12 = $8/mes
```

### **MRR Breakdown:**
- **New MRR:** Nuevas suscripciones en el período
- **Churned MRR:** Suscripciones canceladas en el período
- **Net Growth:** New - Churned

### **¿Por qué el MRR no coincide con Stripe?**
El dashboard calcula MRR basado en el estado actual de la DB. Si:
- Hay webhooks de Stripe pendientes de procesar
- Hay cambios de plan no sincronizados
- Hay suscripciones en estado "incomplete"

Entonces el MRR puede diferir temporalmente.

**Solución:** Los webhooks de Stripe deberían sincronizar automáticamente. Si no, revisar `/api/webhooks/stripe`.

---

## 🔄 **Conversion Funnel**

### **Funnel de usuarios registrados:**
```
1. Signup (entrada)
2. First Use (usó alguna herramienta)
3. Pricing Visit (visitó /pricing)
4. Premium (convirtió a premium)
```

### **Funnel de usuarios anónimos:**
```
1. Tool Usage (usó herramienta sin registrarse)
2. Pricing Visit (visitó /pricing)
3. Checkout Started (intentó comprar)
4. Signup (se registró)
```

### **¿Por qué hay menos "First Use" que "Signup"?**
- Algunos usuarios se registran pero nunca usan las herramientas
- Pueden haber venido desde un anuncio o link directo
- Se registraron pero abandonaron antes de usar

---

## 🎯 **Hot Leads**

### **¿Qué es un Hot Lead?**
Usuarios con alta probabilidad de conversión identificados por:

#### **Criterios de identificación:**
1. **High usage + no pricing visit**
   - ≥5 usos en últimos 30 días
   - Nunca visitó /pricing
   - **Acción:** Mostrarle benefits de premium

2. **Saw pricing multiple times**
   - ≥3 visitas a /pricing
   - No convirtió
   - **Acción:** Ofrecer descuento o trial

3. **Abandoned checkout**
   - Inició checkout pero no completó
   - **Acción:** Email de recuperación

4. **Premium at risk (churn)**
   - Usuario premium sin actividad en 14+ días
   - **Acción:** Engagement campaign

### **Prioridades:**
- **HIGH:** Acción inmediata (contactar hoy)
- **MEDIUM:** Monitorear y actuar pronto

---

## 👥 **Lista de Usuarios Registrados**

### **Datos mostrados:**
- **Email:** Email del usuario
- **Nombre:** full_name del perfil
- **Plan:** free | premium
- **Registrado:** Fecha de creación
- **Usos:** Total de uses completados (analysis + humanization + paraphrase)
- **Test User:** Badge si está en TEST_USER_CONFIG

### **Funciones:**
- **Buscar:** Por email o nombre
- **Filtrar:** Por plan (All / Free / Premium)
- **Mostrar test users:** Toggle para incluir/excluir
- **Contactar individual:** Click en "📧 Contactar"
- **Contactar masivo:** Click en "📧 Contactar todos" (BCC)

### **Orden:**
Cronológico descendente (más nuevos primero)

---

## 📈 **Product Engagement**

### **Métricas por herramienta:**
- **Total Uses:** Count de eventos completed_*
- **Unique Users:** Count distinct de user_id
- **Avg Uses per User:** Total / Unique
- **Success Rate:** % de requests exitosos

### **¿Por qué "Avg Uses per User" es decimal?**
Es un promedio. Ejemplo:
- 100 usos totales
- 30 usuarios únicos
- Avg = 100 / 30 = 3.33 usos por usuario

---

## 🔍 **User Insights**

### **Demographics:**
- **Total Profiles:** Usuarios que completaron user_profiles
- **Completion Rate:** % de usuarios registrados con perfil completo
- **By Role:** Top roles (estudiante, profesional, etc.)
- **By Primary Use:** Top usos principales
- **By Discovery Source:** De dónde vinieron

### **Top Users:**
- Top 10 usuarios más activos por evento count
- Excluyendo test users
- Útil para identificar power users

### **Recent Signups:**
- Últimos 20 signups
- Con datos de signup path (anonymous → signup o directo)
- Events before signup: cuántos usos anónimos antes de registrarse
- Events since signup: cuánto han usado post-registro

---

## 📅 **Cohort Retention**

### **¿Qué es un cohort?**
Grupo de usuarios que se registraron en el mismo mes.

### **Ejemplo:**
```
Cohort: Nov 2024 (50 usuarios)
Mes 0 (Nov): 50 activos (100%)
Mes 1 (Dec): 30 activos (60%)
Mes 2 (Jan): 20 activos (40%)
```

### **Retention rate:**
% de usuarios del cohort que sigue activo N meses después.

### **¿Por qué cohorts recientes tienen 100%?**
Es normal. El cohort del mes actual siempre tiene 100% en mes 0 porque acabaron de registrarse.

---

## ⚙️ **Performance**

### **Tiempo de carga:**
- **Normal:** 2-5 segundos
- **Lento:** 5-10 segundos (con muchos usuarios)
- **Muy lento:** >10 segundos (problema de DB o queries)

### **Optimizaciones implementadas:**
- Queries en paralelo (Promise.all)
- Índices en Supabase (user_id, created_at, event_type)
- Exclusión de test users en queries pesadas
- Timeframe limitado

### **Si el dashboard está lento:**
1. Reducir el timeframe (90d → 30d)
2. Verificar índices en Supabase
3. Revisar logs en Vercel (puede haber queries lentas)

---

## 🐛 **Problemas comunes**

### **"No data available"**
- Verificar que hay eventos en `analytics_events` table
- Verificar que el timeframe seleccionado tiene datos
- Check Supabase connection

### **"Credenciales incorrectas"**
- Usuario: `Agus`
- Contraseña: `1908`
- Hard-coded en `/api/admin/analytics-v2/route.ts`

### **"MRR = $0 pero tengo usuarios premium"**
- Verificar tabla `subscriptions`
- Verificar que users tienen `plan_type = 'premium'`
- Verificar que no están marcados como test users
- Check Stripe webhooks funcionando

### **"Conversión rate = 0%"**
- Normal si no hay usuarios premium todavía
- Se calcula como: Premium users / (Total registered - Test users)
- Necesitas al menos 1 usuario premium para > 0%

---

## 🔐 **Acceso y seguridad**

### **Autenticación:**
- Basic Auth (username + password)
- Hardcoded en código (para prototipo)
- TODO: Migrar a auth real con Supabase

### **Datos sensibles:**
- Emails visibles (para contactar)
- Nombres visibles
- NO se muestran: passwords, tokens, payment info

---

## 📝 **Changelog**

### **Versión actual: V2**

**Mejoras vs V1:**
- ✅ Queries modulares (más rápido)
- ✅ Secciones colapsables
- ✅ Lista completa de usuarios
- ✅ Búsqueda y filtros en usuarios
- ✅ Contacto masivo
- ✅ UI mejorada con gradientes
- ✅ Timeframe selector
- ✅ Hot Leads panel
- ✅ Cohort retention

---

## ❓ **Preguntas frecuentes**

### **¿Puedo exportar los datos?**
No hay export nativo. Opciones:
- Copiar/pegar desde la tabla
- Screenshot
- TODO: Agregar export CSV

### **¿Puedo ver datos por fecha específica?**
No directamente. Los timeframes son fijos (7d, 14d, 30d, 90d).
TODO: Agregar date range picker custom.

### **¿Puedo filtrar por herramienta?**
Sí, en Product Engagement hay breakdown por herramienta.
En Conversion Funnel hay "by tool" section.

### **¿Los datos se guardan históricos?**
Sí, todos los eventos se guardan en `analytics_events` permanentemente.
Puedes cambiar timeframe para ver períodos pasados.

---

## 🚀 **Próximas mejoras (TODO)**

- [ ] Export CSV de usuarios
- [ ] Date range picker custom
- [ ] Gráficos de tendencia (MRR over time, signups over time)
- [ ] Alertas automáticas (email cuando MRR cae, etc.)
- [ ] Comparación período vs período
- [ ] Segmentación por país/región
- [ ] Integración con Stripe Dashboard
- [ ] Real-time updates (WebSockets)
- [ ] Mobile-responsive improvements
- [ ] Auth real (no hardcoded)

---

**Última actualización:** 21 Nov 2025
**Versión:** V2.0
