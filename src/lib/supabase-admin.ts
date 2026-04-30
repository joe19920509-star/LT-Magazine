import { createClient } from '@supabase/supabase-js'

/**
 * Admin Supabase client with service role key
 * Used for admin operations like creating users, reading all profiles
 * WARNING: Only use on the server, never expose to client
 */
export function createAdminClient() {
  return createClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.SUPABASE_SERVICE_ROLE_KEY!,
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