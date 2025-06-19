import { createClient } from '@supabase/supabase-js'

const supabaseUrl = process.env.SUPABASE_URL
const supabaseServiceKey = process.env.SUPABASE_SERVICE_ROLE_KEY

// Debug logs
console.log('Supabase URL exists:', !!supabaseUrl)
console.log('Supabase Service Key exists:', !!supabaseServiceKey)

// Solo crear el cliente si las variables están configuradas
export const supabase = supabaseUrl && supabaseServiceKey 
  ? createClient(supabaseUrl, supabaseServiceKey)
  : null

// Debug log
console.log('Supabase client created:', !!supabase) 