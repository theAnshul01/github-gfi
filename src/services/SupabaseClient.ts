import { createClient } from "@supabase/supabase-js"

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL as string | undefined
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY as string | undefined

// Validate environment variables at startup
if (!supabaseUrl || !supabaseAnonKey) {
    console.error(
        "⚠️ Missing Supabase environment variables!\n" +
        "Make sure your .env file contains:\n" +
        "  VITE_SUPABASE_URL=https://your-project.supabase.co\n" +
        "  VITE_SUPABASE_ANON_KEY=eyJhbGciOi... (JWT token)\n\n" +
        "Current values:\n" +
        `  VITE_SUPABASE_URL: ${supabaseUrl ? "✅ set" : "❌ missing"}\n` +
        `  VITE_SUPABASE_ANON_KEY: ${supabaseAnonKey ? "✅ set" : "❌ missing"}`
    )
}

// Warn if the anon key doesn't look like a valid JWT
if (supabaseAnonKey && !supabaseAnonKey.startsWith("eyJ")) {
    console.warn(
        "⚠️ VITE_SUPABASE_ANON_KEY does not look like a valid Supabase JWT.\n" +
        "Supabase anon keys are JWTs that start with 'eyJ...'.\n" +
        "You can find your anon key in your Supabase dashboard:\n" +
        "  Project Settings → API → Project API keys → anon (public)\n" +
        `Current key starts with: "${supabaseAnonKey.substring(0, 20)}..."`
    )
}

export const supabase = createClient(supabaseUrl ?? "", supabaseAnonKey ?? "", {
    auth: {
        autoRefreshToken: true,
        persistSession: true,
        detectSessionInUrl: true, // Important: detects OAuth callback tokens in URL
    },
})

/**
 * Helper to check if the Supabase configuration is valid.
 * Returns true if env vars are set and the anon key looks like a JWT.
 */
export const isSupabaseConfigured = (): boolean => {
    return !!(
        supabaseUrl &&
        supabaseAnonKey &&
        supabaseAnonKey.startsWith("eyJ")
    )
}