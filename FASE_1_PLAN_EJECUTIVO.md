# FASE 1 - PLAN EJECUTIVO: MONETIZACIÓN

**Fecha inicio:** 2025-11-07
**Duración estimada:** 3-4 semanas
**Objetivo:** Lanzar plan Premium y empezar a generar ingresos recurrentes

---

## 🎯 OBJETIVO PRINCIPAL

Transformar DetectorDeIA de plataforma freemium a negocio generador de ingresos mediante:
1. Integración de Stripe para pagos recurrentes
2. Activación de features premium (15K chars, 5 modos, historial extendido)
3. Página de pricing optimizada para conversión
4. Primera cohorte de usuarios pagos

---

## 📊 META DE INGRESOS

**Mes 1 post-lanzamiento:**
- 10 usuarios premium = $70 MRR
- Conversión objetivo: 2-5% de usuarios activos

**Mes 3:**
- 50 usuarios premium = $350 MRR

**Mes 6:**
- 100 usuarios premium = $700 MRR

---

## 🏗️ PLAN DE IMPLEMENTACIÓN

### **Sprint 1: Stripe Setup (Semana 1)**
**Tiempo:** 1 semana
**Owner:** Claude (código) + Agustín (configuración Stripe)

#### Tareas:
1. **Configuración Stripe** (Agustín - 30 min)
   - [ ] Crear cuenta Stripe
   - [ ] Crear producto "DetectorDeIA Premium"
   - [ ] Crear precio: $7/mes USD, renovación automática
   - [ ] Copiar Product ID y Price ID
   - [ ] Configurar webhook endpoint en Stripe Dashboard

2. **Backend Stripe** (Claude - 1 día)
   - [ ] Instalar `stripe` y `@stripe/stripe-js`
   - [ ] Crear `/api/stripe/create-checkout-session`
   - [ ] Crear `/api/stripe/webhook` (escuchar eventos)
   - [ ] Crear `/api/stripe/create-portal-session`
   - [ ] Configurar env vars: `STRIPE_SECRET_KEY`, `STRIPE_WEBHOOK_SECRET`

3. **Testing local** (Claude + Agustín - 2h)
   - [ ] Testear checkout flow con Stripe test mode
   - [ ] Testear webhooks con Stripe CLI
   - [ ] Verificar que subscription se guarda en Supabase

**Entregables:**
- Stripe integrado y funcional en test mode
- Webhooks procesando correctamente
- Subscriptions guardándose en DB

---

### **Sprint 2: Activar Features Premium (Semana 2)**
**Tiempo:** 1 semana
**Owner:** Claude

#### Tareas:
1. **Desbloquear límites premium** (1 día)
   - [ ] Actualizar `/api/humanize`:
     - Verificar `subscription_status` en DB
     - Si premium: `CHARACTER_LIMIT = 15000`
     - Si free/anónimo: `CHARACTER_LIMIT = 600`
   - [ ] Actualizar `/api/paraphrase` (misma lógica)
   - [ ] Actualizar `/api/analyze` (opcional, mismo límite)

2. **Implementar 5 modos** (2 días)
   - [ ] Diseñar prompts para cada modo:
     - **Estándar** (ya existe)
     - **Formal** - Tono profesional/corporativo
     - **Creativo** - Lenguaje expresivo, cambios profundos
     - **Simplificado** - Lenguaje simple, fácil de entender
     - **Académico** - Estilo universitario, formal riguroso
   - [ ] Actualizar UI: remover 🔒 de modos premium
   - [ ] Testear cada modo con textos de ejemplo

3. **Slider de intensidad en Parafraseador** (1 día)
   - [ ] Agregar slider: 20% - 40% - 60% - 80%
   - [ ] Mapear a temperatura del modelo:
     - 20% → temp 0.3 (conservador)
     - 40% → temp 0.45 (moderado - actual default)
     - 60% → temp 0.6 (profundo)
     - 80% → temp 0.75 (máximo)
   - [ ] Solo visible para premium

4. **Historial extendido** (1 día)
   - [ ] Premium: últimos 100 usos + 30 días
   - [ ] Free: últimos 10 usos + 7 días (ya implementado)
   - [ ] Actualizar queries en `/src/lib/queries/usageStats.ts`
   - [ ] Testear límites correctos

**Entregables:**
- Features premium funcionando
- Diferenciación clara free vs premium
- Testing completo de cada feature

---

### **Sprint 3: Página de Pricing (Semana 3)**
**Tiempo:** 1 semana
**Owner:** Claude

#### Tareas:
1. **Rediseñar /pricing** (2 días)
   - [ ] Comparativa visual Free vs Premium
   - [ ] Tabla de features clara
   - [ ] Botón "Comenzar Premium" → Stripe Checkout
   - [ ] Social proof (testimonios cuando estén disponibles)
   - [ ] FAQ de pricing (8-10 preguntas)

2. **Copy persuasivo** (1 día)
   - [ ] Headline atractivo
   - [ ] Beneficios claros por feature
   - [ ] Garantía de satisfacción
   - [ ] Urgencia sutil (sin ser agresivo)

3. **CTAs en herramientas** (1 día)
   - [ ] Actualizar overlay cuando usuario free llega a límite:
     - Mostrar diferencia premium
     - CTA "Ver planes" → /pricing
   - [ ] Badge "Premium" visible en UI cuando aplique
   - [ ] Tooltips explicando features premium

**Entregables:**
- Página /pricing completa y optimizada
- CTAs integrados en toda la app
- Copy finalizado y probado

---

### **Sprint 4: Launch + Waitlist (Semana 4)**
**Tiempo:** 1 semana
**Owner:** Claude + Agustín

#### Tareas:
1. **Preparar comunicación** (2 días)
   - [ ] Email de anuncio para waitlist
   - [ ] Template HTML profesional
   - [ ] Código de descuento: EARLYBIRD (20% off primer mes)
   - [ ] Asunto: "🎉 DetectorDeIA Premium ya está disponible"

2. **Deploy a producción** (1 día)
   - [ ] Review final de código
   - [ ] Testing en staging/preview
   - [ ] Deploy a producción
   - [ ] Smoke test en vivo
   - [ ] Activar Stripe live mode

3. **Notificar waitlist** (1 día)
   - [ ] Query de emails en `email_waitlist` table
   - [ ] Enviar emails (Resend.com o manual por ahora)
   - [ ] Marcar como notificados en DB
   - [ ] Monitorear respuestas/aperturas

4. **Monitoreo post-launch** (continuo)
   - [ ] Checkouts iniciados vs completados
   - [ ] Primeras conversiones
   - [ ] Errores en webhooks
   - [ ] Feedback de usuarios premium

**Entregables:**
- Premium live en producción
- Waitlist notificada
- Primeros usuarios premium
- Dashboard de métricas funcionando

---

## 📋 CHECKLIST DE DECISIONES PENDIENTES

Antes de empezar, confirmar:

### Pricing:
- [ ] **¿$7/mes está confirmado?** (recomendado: sí)
- [ ] **¿Trial gratuito?** (recomendación: 7 días gratis sin tarjeta, luego cobrar)
- [ ] **¿Plan anual?** (recomendación: $70/año = ahorro 17%, implementar después)

### Features:
- [ ] **¿Qué incluye Premium exactamente?**
  - ✅ 15,000 caracteres por uso
  - ✅ 5 modos (vs 1 en free)
  - ✅ Slider de intensidad (Parafraseador)
  - ✅ Historial: 100 usos + 30 días (vs 10 + 7)
  - ✅ Sin anuncios (ya no hay)
  - ❓ Soporte prioritario (¿cómo?)
  - ❓ Exportar múltiples formatos (¿implementar ahora o después?)

### Comunicación:
- [ ] **¿Email marketing tool?**
  - Opción 1: Resend.com (recomendado, $20/mes para 10k emails)
  - Opción 2: Sendgrid
  - Opción 3: Manual por ahora (Gmail)

---

## 🚨 RIESGOS Y MITIGACIONES

| Riesgo | Probabilidad | Impacto | Mitigación |
|--------|--------------|---------|------------|
| Stripe webhooks fallen | Media | Alto | Retry logic + logs + alertas |
| Conversión baja (<1%) | Media | Alto | A/B testing de pricing, encuestas |
| Bugs en features premium | Media | Medio | Testing exhaustivo antes de launch |
| Chargebacks | Baja | Medio | Política de reembolso clara |
| No hay emails en waitlist | Alta | Bajo | Lanzar igual, promocionar en redes |

---

## 📊 MÉTRICAS A TRACKEAR

### Durante implementación:
- Tiempo de respuesta APIs con features premium
- Errores en rate limiting premium
- Testing coverage de features nuevas

### Post-launch:
- **Conversión:** Usuarios free → Premium (meta: 2-5%)
- **MRR:** Monthly Recurring Revenue
- **Churn:** % usuarios que cancelan (meta: <5%)
- **LTV:** Lifetime Value por usuario
- **Stripe metrics:** Checkout abandonados, payment failures

---

## 🔗 ARCHIVOS A CREAR/MODIFICAR

### Crear:
```
/src/app/api/stripe/create-checkout-session/route.ts
/src/app/api/stripe/webhook/route.ts
/src/app/api/stripe/create-portal-session/route.ts
/src/lib/stripe.ts
/src/components/pricing/PricingTable.tsx
/src/components/premium/PremiumBadge.tsx
/src/app/pricing/PricingPageClient.tsx (rediseño completo)
/scripts/notify-waitlist.ts (opcional)
```

### Modificar:
```
/src/app/api/humanize/route.ts (agregar lógica premium)
/src/app/api/paraphrase/route.ts (agregar lógica premium)
/src/app/components/HumanizadorMain.tsx (5 modos + límite 15K)
/src/app/components/ParafraseadorMain.tsx (5 modos + slider + límite 15K)
/src/app/components/UsageLimitOverlay.tsx (messaging premium)
/src/app/dashboard/DashboardClient.tsx (botón "Gestionar suscripción")
/src/lib/queries/usageStats.ts (historial extendido para premium)
```

---

## ✅ DEFINITION OF DONE

Fase 1 está completa cuando:

### Funcional:
- [ ] Usuario free puede hacer checkout en Stripe
- [ ] Pago procesado → usuario pasa a premium en DB
- [ ] Usuario premium tiene acceso a features:
  - [ ] 15K caracteres por uso
  - [ ] 5 modos funcionando
  - [ ] Slider de intensidad (Parafraseador)
  - [ ] Historial: 100 usos + 30 días
- [ ] Usuario puede gestionar suscripción (cancelar, actualizar payment)
- [ ] Página /pricing clara y funcional

### Técnico:
- [ ] Stripe webhooks funcionando 100%
- [ ] Subscriptions sincronizadas (Stripe ↔ Supabase)
- [ ] Rate limiting diferenciado (free vs premium)
- [ ] Performance <2s incluso con features premium
- [ ] Error rate <1%

### Negocio:
- [ ] Al menos 1 usuario premium activo
- [ ] Waitlist notificada
- [ ] Métricas de conversión trackeadas
- [ ] Dashboard de ingresos visible

---

## 🎬 PRÓXIMA ACCIÓN

**¿Listo para empezar Fase 1?**

**Paso 1 (AHORA):** Confirmar decisiones pendientes
- Precio: ¿$7/mes confirmado?
- Trial: ¿7 días gratis?
- Features: ¿algo más que agregar/quitar?

**Paso 2 (DESPUÉS):** Empezar Sprint 1 - Stripe Setup
- Agustín: crear cuenta Stripe + producto
- Claude: implementar endpoints + webhooks

---

**¡Con Fase 0 completa, estamos listos para monetizar! 🚀**
