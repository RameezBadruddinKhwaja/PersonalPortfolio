import { createClient, SupabaseClient } from "@supabase/supabase-js"

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || ""
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || ""

// Check if we have valid Supabase credentials
const hasValidCredentials = supabaseUrl.startsWith("http") && supabaseAnonKey.length > 10

if (!hasValidCredentials) {
  console.warn("Supabase env variables are not set or invalid. Set NEXT_PUBLIC_SUPABASE_URL and NEXT_PUBLIC_SUPABASE_ANON_KEY.")
}

// Create client only if we have valid credentials, otherwise use a mock URL for build
export const supabase: SupabaseClient = hasValidCredentials
  ? createClient(supabaseUrl, supabaseAnonKey)
  : createClient("https://placeholder.supabase.co", "placeholder-key")
