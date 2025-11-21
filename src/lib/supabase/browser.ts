"use client"

import { createBrowserClient } from "@supabase/ssr"
import type { SupabaseClient } from "@supabase/supabase-js"

let supabaseClient: SupabaseClient | null = null

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || ""
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || ""

// Check if we have valid Supabase credentials
const hasValidCredentials = supabaseUrl.startsWith("http") && supabaseAnonKey.length > 10

export function createBrowserSupabaseClient(): SupabaseClient | null {
  if (!hasValidCredentials) {
    console.warn("Supabase credentials not configured. OAuth features disabled.")
    return null
  }

  if (supabaseClient) return supabaseClient

  supabaseClient = createBrowserClient(supabaseUrl, supabaseAnonKey)
  return supabaseClient
}

export function hasSupabaseConfig(): boolean {
  return hasValidCredentials
}
