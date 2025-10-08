import { createClient } from '@supabase/supabase-js'

const url = import.meta.env.VITE_SUPABASE_URL
const anonKey = import.meta.env.VITE_SUPABASE_ANON_KEY

if (!url) {
  throw new Error('Переменная окружения VITE_SUPABASE_URL не задана')
}

if (!anonKey) {
  throw new Error('Переменная окружения VITE_SUPABASE_ANON_KEY не задана')
}

export const supabase = createClient(url, anonKey, {
  auth: {
    persistSession: true,
    autoRefreshToken: true,
    detectSessionInUrl: true,
  },
})
