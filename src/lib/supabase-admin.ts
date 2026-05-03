import { createClient } from '@supabase/supabase-js'

/**
 * Admin Supabase client with service role key
 * Used for admin operations like creating users, reading all profiles
 * WARNING: Only use on the server, never expose to client
 */
export function createAdminClient() {
  const url = process.env.NEXT_PUBLIC_SUPABASE_URL
  const key = process.env.SUPABASE_SERVICE_ROLE_KEY
  if (!url?.trim() || !key?.trim()) {
    throw new Error('Missing NEXT_PUBLIC_SUPABASE_URL or SUPABASE_SERVICE_ROLE_KEY')
  }
  return createClient(
    url,
    key,
    {
      auth: {
        autoRefreshToken: false,
        persistSession: false
      }
    }
  )
}

// Keep the server client for regular operations
export { createClient as createServerClient } from './supabase-server'