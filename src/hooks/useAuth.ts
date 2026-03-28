import { useState, useEffect } from "react"
import { supabase, isSupabaseConfigured } from "../services/SupabaseClient"
import type { User, Session } from "@supabase/supabase-js"

export const useAuth = () => {
    const [user, setUser] = useState<User | null>(null)
    const [session, setSession] = useState<Session | null>(null)
    const [loading, setLoading] = useState<boolean>(true)
    const [authError, setAuthError] = useState<string | null>(null)
    const isConfigured = isSupabaseConfigured()

    useEffect(() => {
        if (!isConfigured) {
            console.warn("Supabase is not properly configured. Auth features are disabled.")
            setLoading(false)
            setAuthError("Supabase is not configured. Check your environment variables.")
            return
        }

        const getSession = async () => {
            try {
                const { data, error } = await supabase.auth.getSession()
                
                if (error) {
                    console.error("Error getting session:", error.message)
                    setAuthError(error.message)
                    setLoading(false)
                    return
                }

                console.log("Initial session:", data.session)
                setSession(data.session)
                setUser(data.session?.user ?? null)
            } catch (err) {
                console.error("Unexpected error getting session:", err)
                setAuthError("Failed to retrieve session")
            } finally {
                setLoading(false)
            }
        }   

        getSession()

        const { data: { subscription } } = supabase.auth.onAuthStateChange(
            (event, session) => {
                console.log("Auth event:", event)
                console.log("Session:", session)
                
                setSession(session)
                setUser(session?.user ?? null)
                setAuthError(null)
                setLoading(false)

                // Handle specific auth events
                if (event === "SIGNED_IN") {
                    console.log("User signed in:", session?.user?.email || session?.user?.user_metadata?.user_name)
                } else if (event === "SIGNED_OUT") {
                    console.log("User signed out")
                } else if (event === "TOKEN_REFRESHED") {
                    console.log("Token refreshed")
                }
            }
        )

        return () => subscription.unsubscribe()
    }, [isConfigured])

    const signInWithGithub = async () => {
        if (!isConfigured) {
            setAuthError("Supabase is not configured. Cannot sign in.")
            return { data: null, error: new Error("Supabase not configured") }
        }

        setAuthError(null)

        const baseUrl = import.meta.env.VITE_SUPABASE_REDIRECT_URL || window.location.origin
        const redirectTo = `${baseUrl}/auth/callback`

        const { data, error } = await supabase.auth.signInWithOAuth({
            provider: "github",
            options: {
                redirectTo,
                scopes: "repo,user"
            }
        })

        if (error) {
            console.error("Supabase OAuth sign-in error:", error)
            setAuthError(error.message)
            return { data, error }
        }

        console.log("Supabase OAuth sign-in data:", data)
        return { data, error }
    }

    const signOut = async () => {
        const { error } = await supabase.auth.signOut()
        if (error) {
            console.error("Supabase sign-out error:", error)
            setAuthError(error.message)
        } else {
            console.log("Signed out successfully")
            setUser(null)
            setSession(null)
            setAuthError(null)
        }
    }

    /**
     * Get the GitHub provider token from the current session.
     * This token can be used to make authenticated GitHub API calls.
     */
    const getGithubToken = (): string | undefined => {
        return session?.provider_token ?? undefined
    }

    return {
        user, 
        session,
        loading,
        authError,
        isConfigured,
        signInWithGithub,
        signOut,
        getGithubToken
    }
}