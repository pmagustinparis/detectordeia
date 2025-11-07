# FASE 0 - PASO A PASO EJECUTIVO

**Objetivo:** Transformar DetectorDeIA de app anónima a plataforma con usuarios autenticados.
**Duración:** 2-3 semanas
**Resultado:** Sistema completo de auth + dashboard + rate limiting + historial

---

## 📊 RESUMEN CONCEPTUAL

### De esto (ahora):
```
Usuario anónimo → Usa herramienta → Resultado instantáneo
❌ Sin tracking
❌ Sin límites reales
❌ Sin historial
❌ Sin auth
```

### A esto (Fase 0 completa):
```
Usuario anónimo (10 usos/día) → Usa herramienta → Resultado
                              ↓
                    [Llega a límite]
                              ↓
                    Sign up con Google
                              ↓
Usuario Free (50 usos/día) → Dashboard con historial → Listo para Premium (Fase 1)
```

---

## 🎯 DECISIONES CLAVE CONFIRMADAS

| Aspecto | Decisión |
|---------|----------|
| **Límites actuales (Fase 0)** | 10 usos/día anónimo, 50 usos/día Free |
| **Límites futuros (Fase 1)** | 5 anónimo, 20 Free, ilimitado Premium |
| **Historial** | Últimos 10 usos + 7 días (Free), 100 + 30 días (Premium) |
| **Auth** | Google OAuth via Supabase |
| **Messaging** | Progressive disclosure (no bombardear) |
| **Seguridad** | RLS + HTTPS + GDPR features desde día 1 |
| **Base de datos** | Supabase PostgreSQL |

---

## 📅 CRONOGRAMA DE IMPLEMENTACIÓN (ACTUALIZADO)

> **NOTA:** Roadmap reorganizado priorizando rate limiting antes que dashboard.
> **Fecha actualización:** 2025-01-07
> **Razón:** Dashboard necesita datos reales de tracking para ser útil. Primero implementamos tracking/rate limiting, luego mostramos los datos.

---

### ✅ **Sprint 1: Setup Supabase + Schema** (COMPLETADO)

#### Día 1: Configuración inicial
- [x] **Agustín:** Crear proyecto en Supabase (5 min)
- [x] **Claude:** Escribir migrations SQL completas (1 hora)
- [x] **Agustín:** Ejecutar migrations en Supabase SQL Editor (2 min)
- [x] **Claude:** Verificar que tablas se crearon correctamente

#### Día 2: Google OAuth
- [x] **Agustín:** Configurar Google OAuth en Google Cloud Console (10 min)
- [x] **Agustín:** Habilitar Google provider en Supabase Auth (5 min)
- [x] **Claude:** Configurar Supabase client en Next.js
- [x] **Claude:** Crear route /auth/callback

#### Día 3: Environment variables + Testing
- [x] **Agustín:** Copiar credenciales Supabase a Vercel (5 min)
- [x] **Claude:** Testear conexión local a Supabase
- [x] **Claude:** Testear conexión en preview deployment
- [x] **Agustín:** Verificar que preview funciona

#### Día 4: Buffer / Ajustes
- [x] Resolver cualquier issue del setup
- [x] Documentar configuración final

**Status:** ✅ 100% - Supabase funcionando con 5 tablas + RLS policies + OAuth configurado

---

### ✅ **Sprint 2: Auth + Middleware** (COMPLETADO)

#### Día 5: Middleware + Protected routes
- [x] **Claude:** Crear middleware para proteger rutas
- [x] **Claude:** Proteger /dashboard (redirect a /login si no auth)
- [x] **Claude:** Proteger API routes (return 401 si no auth)
- [x] **Claude:** Testear protección de rutas

#### Día 6: Auth UI Components
- [x] **Claude:** Crear `<AuthButton />` component
- [x] **Claude:** Integrar en `<Header />`
- [x] **Claude:** Crear página /login (o modal)
- [x] **Claude:** Implementar logout functionality

#### Día 7: Auth Flow completo
- [x] **Claude:** Implementar trigger para crear user en DB al registrarse
- [x] **Claude:** Testear flow completo: Sign up → Dashboard
- [x] **Claude:** Testear flow: Sign in → Dashboard
- [x] **Claude:** Testear flow: Logout → Home

#### Día 8: Polish + Edge cases
- [x] **Claude:** Manejar errores de OAuth
- [x] **Claude:** Loading states en auth
- [x] **Claude:** Redirect después de login

#### BONUS implementado (no planeado):
- [x] **Claude:** Sistema de incentivos progresivos (2-4 usos, 5+ usos)
- [x] **Claude:** Badges dinámicos "Sin registro" → "Cuenta activa"
- [x] **Claude:** Fix pestañeo de badges al cargar
- [x] **Claude:** useAuth hook custom

**Status:** ✅ 100% - Auth completo + Dashboard básico + Incentivos funcionando

---

### ✅ **Sprint 4: Rate Limiting + Tracking** (COMPLETADO)

> **CAMBIO DE ORDEN:** Este sprint se movió antes del Sprint 3 porque necesitamos tracking funcionando antes de mostrar datos en dashboard.

#### Día 9: Anonymous ID + Tracking básico
- [x] **Claude:** Implementar generación de anonymous_id (cookie persistente)
- [x] **Claude:** Función `trackUsage(userId, anonymousId, toolType, metadata)`
- [x] **Claude:** Testear que se guarden registros en usage_tracking
- [x] **Claude:** Testear que anonymous_id persiste entre sesiones

#### Día 10: Rate limiting en API routes
- [x] **Claude:** Función `checkRateLimit(userId, anonymousId, toolType)`
  - Return: `{ allowed: boolean, remaining: number, limit: number, resetAt: Date }`
- [x] **Claude:** Integrar en /api/humanize
- [x] **Claude:** Integrar en /api/paraphrase
- [x] **Claude:** Integrar en /api/analyze
- [x] **Claude:** Return 429 cuando límite excedido con header X-RateLimit-*

#### Día 11: Usage Limit Overlay + Client-side
- [x] **Claude:** Crear `<UsageLimitOverlay />` component
- [x] **Claude:** Integrar en HumanizadorMain (mostrar cuando 429)
- [x] **Claude:** Integrar en ParafraseadorMain (mostrar cuando 429)
- [x] **Claude:** Integrar en HomePageClient/DetectorMain (mostrar cuando 429)
- [x] **Claude:** Copy según estrategia de messaging:
  - Anónimo: "Usaste tus 10 análisis gratis hoy. Regístrate para 50/día"
  - Free: "Límite diario alcanzado (50/día). Vuelve mañana o upgrade a Premium"

#### Día 12: History saving
- [x] **Claude:** Guardar en history al procesar (solo usuarios autenticados)
- [x] **Claude:** Función `saveToHistory(userId, toolType, input, output, metadata)`
- [x] **Claude:** Integrar en las 3 herramientas
- [x] **Claude:** Testear que aparece en dashboard
- [x] **Claude:** Testear límite de 10 usos (eliminar más viejos)
- [x] **Claude:** Testear filtro de 7 días (cleanup automático)

**Status:** ✅ 100% - Rate limiting, tracking y history funcionando en producción

---

### ✅ **Sprint 3: Dashboard + Historial** (COMPLETADO)

> **CAMBIO DE ORDEN:** Se implementó DESPUÉS del Sprint 4 porque necesita datos reales de tracking para ser útil.

#### Día 13: Usage stats
- [x] **Claude:** Query de usage stats (usos hoy, usos este mes)
- [x] **Claude:** Mostrar límites restantes (ej: "15/50 usos hoy")
- [x] **Claude:** Progress bars visuales por herramienta
- [x] **Claude:** Testear con datos reales de usage_tracking

#### Día 14: Historial UI
- [x] **Claude:** Query de historial (últimos 10 usos + 7 días)
- [x] **Claude:** UI de lista de historial con filtros
- [x] **Claude:** Modal para ver detalle completo (input + output)
- [x] **Claude:** Botones: Copiar output, Descargar .txt

#### Día 15: Dashboard polish
- [x] **Claude:** Responsive design del dashboard
- [x] **Claude:** Empty states cuando no hay historial
- [x] **Claude:** Testing completo de dashboard

**Implementado:**
- `/src/lib/queries/usageStats.ts` - getUserUsageStats(), getUserHistory()
- `/src/app/dashboard/page.tsx` - Server Component con data fetching
- `/src/app/dashboard/DashboardClient.tsx` - Client Component con UI completo
- Stats: usos hoy, usos este mes, usos por herramienta con progress bars
- Historial: lista de últimos 10 usos + 7 días con modal detallado
- Copy to clipboard y download para outputs
- Diseño responsive con gradientes y colores por herramienta

**Status:** ✅ 100% - Dashboard completo con stats reales e historial funcionando

---

### ⏸️ **Sprint 5: Migración + Testing Final** (PENDIENTE - Al final)

#### Día 16: Migración de emails
- [ ] **Agustín:** Exportar Google Sheet a CSV (2 min)
- [ ] **Claude:** Script de migración CSV → Supabase email_waitlist
- [ ] **Agustín:** Ejecutar script (5 min)
- [ ] **Ambos:** Verificar count de emails migrados (validar que no se perdió nada)

#### Día 17: Testing end-to-end
- [ ] **Claude:** Test flow anónimo → límite → registro (Flow 1 completo)
- [ ] **Claude:** Test flow registrado → uso → historial (Flow 2 completo)
- [ ] **Claude:** Test flow límite Free alcanzado (Flow 3 completo)
- [ ] **Claude:** Test reset de límites a medianoche (UTC)
- [ ] **Claude:** Test eliminación de uso en historial
- [ ] **Claude:** Test exportar datos (GDPR feature)
- [ ] **Claude:** Test eliminar cuenta (GDPR feature)

#### Día 18: Performance + Security audit
- [ ] **Claude:** Verificar RLS policies funcionando (intentar acceder a data de otro user)
- [ ] **Claude:** Verificar que queries tienen indexes necesarios
- [ ] **Claude:** Performance test: response time <2s en p95
- [ ] **Claude:** Security test: no env vars en código, HTTPS activo
- [ ] **Claude:** Load test: 100 requests simultáneos sin fallar

#### Día 19: Deploy a producción
- [ ] **Claude:** Commit y push final
- [ ] **Claude:** Crear PR con resumen de cambios
- [ ] **Agustín:** Review + merge a main
- [ ] **Agustín:** Deploy a producción en Vercel
- [ ] **Ambos:** Smoke test en producción (registrarse, usar herramienta, ver historial)
- [ ] **Ambos:** Monitoreo post-deploy (24h)

**Status:** ⏳ 0% - Pendiente hasta terminar Sprints 3 y 4

---

## 🔧 TAREAS DE AGUSTÍN (Total: ~30 min)

### Setup inicial (Día 1-3):
1. ✅ Crear proyecto Supabase (5 min)
2. ✅ Ejecutar SQL migration (2 min copy/paste)
3. ✅ Configurar Google OAuth en GCP (10 min)
4. ✅ Habilitar Google en Supabase (2 min)
5. ✅ Copiar env vars a Vercel (5 min)

### Migración (Día 17):
6. ✅ Exportar emails de Google Sheets (2 min)
7. ✅ Ejecutar script de migración (5 min)

### Deploy (Día 20):
8. ✅ Merge a main y deploy (5 min)

**Total tiempo Agustín:** ~35 min (repartido en 3 semanas)

---

## 🤖 TAREAS DE CLAUDE (Total: ~14 horas)

### Sprint 1: Setup (3h)
- SQL migrations completas
- Supabase client config
- Auth callback route

### Sprint 2: Auth (4h)
- Middleware
- AuthButton component
- Login page/modal
- Auth flows completos

### Sprint 3: Dashboard (4h)
- Dashboard UI
- Stats queries
- Historial queries
- Premium CTA

### Sprint 4: Rate limiting (3h)
- Anonymous ID system
- Rate limit logic en APIs
- UsageLimitOverlay component
- History saving

### Sprint 5: Testing (2h)
- Script de migración
- Testing end-to-end
- Performance audit
- Security audit

**Total tiempo Claude:** ~16 horas

---

## 📦 ENTREGABLES FINALES

Al completar Fase 0, tendremos:

### Funcionalidad:
- ✅ Login con Google OAuth
- ✅ Dashboard de usuario
- ✅ Historial de últimos 10 usos (7 días)
- ✅ Rate limiting (10 anónimo, 50 free)
- ✅ Tracking de uso en database
- ✅ Emails migrados de Google Sheets
- ✅ Features GDPR (exportar, eliminar)

### Técnico:
- ✅ 5 tablas en Supabase (users, subscriptions, usage_tracking, email_waitlist, history)
- ✅ RLS policies configuradas
- ✅ Indexes optimizados
- ✅ Middleware de auth
- ✅ 3 componentes nuevos (AuthButton, Dashboard, UsageLimitOverlay)
- ✅ APIs protegidas con rate limiting

### Documentación:
- ✅ FASE_0_PLAN_CONCEPTUAL.md
- ✅ FASE_0_DECISIONES_FINALES.md
- ✅ FASE_0_PASO_A_PASO.md (este doc)
- ✅ Guías de setup (Supabase, OAuth)
- ✅ README actualizado

---

## 🎯 DEFINICIÓN DE "DONE" (ACTUALIZADO)

Fase 0 está completa cuando:

### ✅ Funcional
- [x] Usuario puede registrarse con Google ✅
- [x] Usuario puede iniciar sesión ✅
- [x] Usuario puede cerrar sesión ✅
- [x] **Límites funcionan (10 anónimo, 50 free)** ✅ Sprint 4
- [x] **Overlay aparece al llegar a límite** ✅ Sprint 4
- [x] **Historial guarda automáticamente** ✅ Sprint 4
- [x] Dashboard muestra datos correctos (stats + historial) ✅ Sprint 3
- [x] Historial muestra últimos 10 usos + 7 días ✅ Sprint 3
- [ ] Emails migrados correctamente ⏳ Sprint 5

### ✅ Técnico
- [x] Supabase configurado con 5 tablas ✅
- [x] RLS policies creadas ✅
- [x] Auth flow completo ✅
- [ ] Response time <2s en p95 ⏳ Sprint 5
- [ ] Error rate <1% ⏳ Sprint 5
- [ ] No bugs P0 (críticos) ⏳ Testing continuo

### ✅ Seguridad
- [x] Env vars no en código ✅
- [x] HTTPS activo ✅
- [ ] RLS policies funcionando (verificar) ⏳ Sprint 5
- [ ] No se puede acceder a datos de otros users ⏳ Sprint 5
- [ ] Features GDPR funcionando ⏳ Sprint 5

**Progreso actual:** ~80% completado (4/5 sprints) - Solo falta Sprint 5 (Testing + Migración + Deploy final)

---

## 📈 MÉTRICAS A MONITOREAR (Post-deploy)

### Primeras 24 horas:
- Registros exitosos
- Errores de auth
- Response time de APIs
- Usuarios que llegan a límite

### Primera semana:
- Tasa de conversión anónimo → registrado
- Usos promedio por usuario registrado
- Herramienta más popular
- Performance de queries

### Primer mes:
- DAU (Daily Active Users)
- MAU (Monthly Active Users)
- Retention (usuarios que vuelven)
- Power users (>20 usos/día)

---

## 🚨 RIESGOS Y MITIGACIONES

| Riesgo | Probabilidad | Impacto | Mitigación |
|--------|--------------|---------|------------|
| OAuth falla en local | Alta | Medio | Guía detallada de setup + troubleshooting |
| Rate limiting evadido | Media | Medio | Cookie + IP + User-Agent (upgrade a fingerprint si necesario) |
| Migración pierde emails | Baja | Alto | Backup de Google Sheet + validación de count |
| Queries lentas | Media | Alto | Indexes desde día 1 + monitoring |
| Usuarios confundidos | Media | Medio | UX clara + FAQs + tooltips |

---

## 🔄 FLUJOS CLAVE A TESTEAR

### Flow 1: Usuario nuevo → Registro
```
1. Entra a /humanizador (anónimo)
2. Usa 3 veces sin problemas
3. En uso #4 ve tip: "Registrándote puedes guardar historial"
4. Sigue usando hasta uso #10
5. Ve overlay: "Límite alcanzado - Regístrate para continuar"
6. Click "Registrarse con Google"
7. OAuth flow → Autoriza
8. Redirect a /dashboard
9. Ve bienvenida + stats + historial vacío
10. Vuelve a /humanizador
11. Header muestra avatar
12. Usa herramienta → Se guarda en historial
13. Va a /dashboard → Ve el uso guardado
```

### Flow 2: Usuario registrado → Usa herramienta
```
1. Usuario ya autenticado entra a /humanizador
2. Header muestra avatar + "Mi cuenta"
3. Usa herramienta (texto 450 chars)
4. Ve resultado
5. Mensaje: "✓ Guardado en tu historial"
6. Click en link → Va a /dashboard
7. Ve el uso en lista de historial
8. Click "Ver completo" → Modal con input/output
9. Click "Copiar output" → Copiado al clipboard
10. Click "Eliminar" → Confirmación → Eliminado
```

### Flow 3: Usuario alcanza límite Free
```
1. Usuario Free ha usado humanizador 50 veces hoy
2. Intenta usar vez #51
3. Ve overlay: "Límite diario alcanzado"
4. Opciones:
   - "Esperar hasta mañana" (límite resetea 00:00 UTC)
   - "Avísame cuando Premium esté disponible" → EmailCaptureModal
5. Espera hasta día siguiente
6. Límite resetea automáticamente
7. Puede usar de nuevo
```

---

## 🎬 CÓMO EMPEZAMOS

### Paso 0: Confirmación final
- [ ] Agustín confirma que está de acuerdo con todas las decisiones
- [ ] Agustín tiene ~30 min disponibles para setup manual en próximos días
- [ ] Ambos listos para arrancar

### Paso 1: Claude arranca Sprint 1
- [ ] Claude escribe SQL migrations
- [ ] Claude crea guía de setup para Agustín (con screenshots)
- [ ] Claude avisa a Agustín: "Listo para que hagas el setup"

### Paso 2: Agustín hace setup Supabase
- [ ] Agustín sigue guía paso a paso
- [ ] Crea proyecto, ejecuta migrations, configura OAuth
- [ ] Copia env vars a Vercel
- [ ] Avisa a Claude: "Setup listo"

### Paso 3: Claude continúa
- [ ] Sprint 2, 3, 4, 5 en secuencia
- [ ] Va avisando a Agustín de progreso
- [ ] Pide feedback en hitos clave

### Paso 4: Deploy
- [ ] Claude termina testing
- [ ] Agustín hace merge a main
- [ ] Monitoreamos juntos por 24h

---

## ✅ SIGUIENTE ACCIÓN

**¿Estás listo para empezar?**

Si SÍ → Responde "adelante" y arranco Sprint 1 (escribo SQL migrations + guía de setup)

Si hay dudas → Pregunta lo que necesites antes de arrancar

---

**Fase 0 será la base sólida para monetización en Fase 1. Hagámoslo bien.** 🚀
