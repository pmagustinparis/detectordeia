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

## 📅 CRONOGRAMA DE IMPLEMENTACIÓN

### **Sprint 1: Setup Supabase + Schema** (3-4 días)

#### Día 1: Configuración inicial
- [ ] **Agustín:** Crear proyecto en Supabase (5 min)
- [ ] **Claude:** Escribir migrations SQL completas (1 hora)
- [ ] **Agustín:** Ejecutar migrations en Supabase SQL Editor (2 min)
- [ ] **Claude:** Verificar que tablas se crearon correctamente

#### Día 2: Google OAuth
- [ ] **Agustín:** Configurar Google OAuth en Google Cloud Console (10 min)
- [ ] **Agustín:** Habilitar Google provider en Supabase Auth (5 min)
- [ ] **Claude:** Configurar Supabase client en Next.js
- [ ] **Claude:** Crear route /auth/callback

#### Día 3: Environment variables + Testing
- [ ] **Agustín:** Copiar credenciales Supabase a Vercel (5 min)
- [ ] **Claude:** Testear conexión local a Supabase
- [ ] **Claude:** Testear conexión en preview deployment
- [ ] **Agustín:** Verificar que preview funciona

#### Día 4: Buffer / Ajustes
- [ ] Resolver cualquier issue del setup
- [ ] Documentar configuración final

---

### **Sprint 2: Auth + Middleware** (3-4 días)

#### Día 5: Middleware + Protected routes
- [ ] **Claude:** Crear middleware para proteger rutas
- [ ] **Claude:** Proteger /dashboard (redirect a /login si no auth)
- [ ] **Claude:** Proteger API routes (return 401 si no auth)
- [ ] **Claude:** Testear protección de rutas

#### Día 6: Auth UI Components
- [ ] **Claude:** Crear `<AuthButton />` component
- [ ] **Claude:** Integrar en `<Header />`
- [ ] **Claude:** Crear página /login (o modal)
- [ ] **Claude:** Implementar logout functionality

#### Día 7: Auth Flow completo
- [ ] **Claude:** Implementar trigger para crear user en DB al registrarse
- [ ] **Claude:** Testear flow completo: Sign up → Dashboard
- [ ] **Claude:** Testear flow: Sign in → Dashboard
- [ ] **Claude:** Testear flow: Logout → Home

#### Día 8: Polish + Edge cases
- [ ] **Claude:** Manejar errores de OAuth
- [ ] **Claude:** Loading states en auth
- [ ] **Claude:** Redirect después de login

---

### **Sprint 3: Dashboard + Historial** (3-4 días)

#### Día 9: Dashboard básico
- [ ] **Claude:** Crear /dashboard/page.tsx
- [ ] **Claude:** Implementar query de user profile
- [ ] **Claude:** Mostrar: Nombre, email, avatar, plan_type
- [ ] **Claude:** UI básica del dashboard

#### Día 10: Usage stats
- [ ] **Claude:** Query de usage stats (usos hoy, usos mes)
- [ ] **Claude:** Mostrar límites restantes
- [ ] **Claude:** Progress bars visuales
- [ ] **Claude:** Testear con datos de prueba

#### Día 11: Historial
- [ ] **Claude:** Query de historial (últimos 10 usos + 7 días)
- [ ] **Claude:** UI de lista de historial
- [ ] **Claude:** Modal para ver detalle completo
- [ ] **Claude:** Botones: Copiar, Descargar, Eliminar

#### Día 12: Premium CTA + Polish
- [ ] **Claude:** Banner de Premium en dashboard (dismissible)
- [ ] **Claude:** Integrar EmailCaptureModal
- [ ] **Claude:** Responsive design del dashboard
- [ ] **Claude:** Testing completo de dashboard

---

### **Sprint 4: Rate Limiting + Tracking** (3-4 días)

#### Día 13: Anonymous ID + Tracking básico
- [ ] **Claude:** Implementar generación de anonymous_id (cookie)
- [ ] **Claude:** Función para insertar en usage_tracking
- [ ] **Claude:** Testear que se guarden registros

#### Día 14: Rate limiting en API routes
- [ ] **Claude:** Función `checkRateLimit(userId, anonymousId, toolType)`
- [ ] **Claude:** Integrar en /api/humanize
- [ ] **Claude:** Integrar en /api/paraphrase
- [ ] **Claude:** Integrar en /api/detect
- [ ] **Claude:** Return 429 cuando límite excedido

#### Día 15: Usage Limit Overlay
- [ ] **Claude:** Crear `<UsageLimitOverlay />` component
- [ ] **Claude:** Integrar en HumanizadorMain
- [ ] **Claude:** Integrar en ParafraseadorMain
- [ ] **Claude:** Integrar en DetectorMain
- [ ] **Claude:** Copy según estrategia de messaging

#### Día 16: History saving
- [ ] **Claude:** Guardar en history al procesar (solo autenticados)
- [ ] **Claude:** Verificar que aparece en dashboard
- [ ] **Claude:** Testear límite de 10 usos
- [ ] **Claude:** Testear filtro de 7 días

---

### **Sprint 5: Migración + Testing Final** (2-3 días)

#### Día 17: Migración de emails
- [ ] **Agustín:** Exportar Google Sheet a CSV (2 min)
- [ ] **Claude:** Script de migración CSV → Supabase
- [ ] **Agustín:** Ejecutar script (5 min)
- [ ] **Ambos:** Verificar count de emails migrados

#### Día 18: Testing end-to-end
- [ ] **Claude:** Test flow anónimo → límite → registro
- [ ] **Claude:** Test flow registrado → uso → historial
- [ ] **Claude:** Test reset de límites a medianoche
- [ ] **Claude:** Test eliminación de uso en historial
- [ ] **Claude:** Test exportar datos (GDPR)
- [ ] **Claude:** Test eliminar cuenta (GDPR)

#### Día 19: Performance + Security audit
- [ ] **Claude:** Verificar RLS policies funcionando
- [ ] **Claude:** Verificar que queries tienen indexes
- [ ] **Claude:** Performance test: response time <2s
- [ ] **Claude:** Security test: no se puede acceder a datos de otros users
- [ ] **Claude:** Verificar env vars no en código

#### Día 20: Deploy a producción
- [ ] **Claude:** Commit y push final
- [ ] **Agustín:** Merge a main
- [ ] **Agustín:** Deploy a producción en Vercel
- [ ] **Ambos:** Smoke test en producción
- [ ] **Ambos:** Monitoreo post-deploy (24h)

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

## 🎯 DEFINICIÓN DE "DONE"

Fase 0 está completa cuando:

### ✅ Funcional
- [ ] Usuario puede registrarse con Google
- [ ] Usuario puede iniciar sesión
- [ ] Usuario puede cerrar sesión
- [ ] Dashboard muestra datos correctos
- [ ] Historial muestra últimos 10 usos
- [ ] Límites funcionan (10 anónimo, 50 free)
- [ ] Overlay aparece al llegar a límite
- [ ] Emails migrados correctamente

### ✅ Técnico
- [ ] Response time <2s en p95
- [ ] Error rate <1%
- [ ] RLS policies funcionando
- [ ] No bugs P0 (críticos)

### ✅ Seguridad
- [ ] No se puede acceder a datos de otros users
- [ ] Env vars no en código
- [ ] HTTPS activo
- [ ] Features GDPR funcionando

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
