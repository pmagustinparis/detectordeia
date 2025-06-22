import { createClient } from '@supabase/supabase-js'

// Estas variables son públicas y seguras para usar en el navegador.
// Se configuran en Vercel con el prefijo NEXT_PUBLIC_
const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY

// Debug logs para el cliente (se ejecutarán solo en el navegador)
if (typeof window !== 'undefined') {
  console.log('Supabase URL (public) exists:', !!supabaseUrl)
  console.log('Supabase Anon Key (public) exists:', !!supabaseAnonKey)
}

// Creamos un único cliente de Supabase que puede ser usado en toda la aplicación (cliente y servidor).
// Este cliente usa la clave anónima (pública), ideal para leer datos de forma segura.
// Para operaciones que requieran privilegios de admin (como escribir en la base de datos),
// debemos crear un cliente "admin" por separado directamente en las rutas de API del servidor.
export const supabase = 
  supabaseUrl && supabaseAnonKey 
    ? createClient(supabaseUrl, supabaseAnonKey)
    : null;

if (typeof window !== 'undefined') {
  console.log('Supabase client (public) created:', !!supabase)
} 