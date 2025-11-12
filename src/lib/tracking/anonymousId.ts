/**
 * Anonymous ID System
 *
 * Genera y mantiene un ID único para usuarios no autenticados.
 * Usado para rate limiting y tracking de uso.
 *
 * Cookie: detector_anonymous_id
 * Duración: 365 días
 * Propósito: Identificar usuarios anónimos entre sesiones
 */

'use client';

import { v4 as uuidv4 } from 'uuid';

const COOKIE_NAME = 'detector_anonymous_id';
const COOKIE_MAX_AGE = 365 * 24 * 60 * 60; // 1 año en segundos

/**
 * Obtiene el anonymous_id actual o genera uno nuevo
 * @returns string - UUID del usuario anónimo
 */
export function getAnonymousId(): string {
  // Intentar leer de cookie existente
  const existingId = getCookie(COOKIE_NAME);

  if (existingId) {
    return existingId;
  }

  // Generar nuevo ID
  const newId = uuidv4();

  // Guardar en cookie
  setCookie(COOKIE_NAME, newId, COOKIE_MAX_AGE);

  return newId;
}

/**
 * Lee una cookie por nombre
 * @param name - Nombre de la cookie
 * @returns string | null
 */
function getCookie(name: string): string | null {
  if (typeof document === 'undefined') {
    return null; // SSR safety
  }

  const value = `; ${document.cookie}`;
  const parts = value.split(`; ${name}=`);

  if (parts.length === 2) {
    return parts.pop()?.split(';').shift() || null;
  }

  return null;
}

/**
 * Guarda una cookie
 * @param name - Nombre de la cookie
 * @param value - Valor a guardar
 * @param maxAge - Duración en segundos
 */
function setCookie(name: string, value: string, maxAge: number): void {
  if (typeof document === 'undefined') {
    return; // SSR safety
  }

  const secure = window.location.protocol === 'https:' ? 'Secure;' : '';

  document.cookie = `${name}=${value}; Max-Age=${maxAge}; Path=/; SameSite=Lax; ${secure}`;
}

/**
 * Elimina el anonymous_id (útil al hacer login)
 */
export function clearAnonymousId(): void {
  if (typeof document === 'undefined') {
    return;
  }

  document.cookie = `${COOKIE_NAME}=; Max-Age=0; Path=/;`;
}

/**
 * Hook de React para obtener anonymous_id
 * Incluye estado para re-render cuando cambia
 */
import { useEffect, useState } from 'react';

export function useAnonymousId(): string | null {
  const [anonymousId, setAnonymousId] = useState<string | null>(null);

  useEffect(() => {
    // Solo ejecutar en cliente
    setAnonymousId(getAnonymousId());
  }, []);

  return anonymousId;
}
