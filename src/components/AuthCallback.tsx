import { useEffect, useState } from "react"
import { supabase } from "../services/SupabaseClient"
import { useNavigate } from "react-router-dom"

/**
 * AuthCallback component handles the OAuth redirect from Supabase.
 * 
 * After the user authenticates with GitHub, Supabase redirects back to the app
 * with auth tokens in the URL hash fragment (e.g., #access_token=...).
 * 
 * This component:
 * 1. Lets Supabase's `detectSessionInUrl` pick up the tokens
 * 2. Waits for the session to be established
 * 3. Redirects to the home page
 */
const AuthCallback = () => {
    const navigate = useNavigate()
    const [error, setError] = useState<string | null>(null)

    useEffect(() => {
        const handleAuthCallback = async () => {
            try {
                // Supabase client with `detectSessionInUrl: true` will automatically
                // parse the hash fragment. We just need to wait for the session.
                const { data, error } = await supabase.auth.getSession()

                if (error) {
                    console.error("Auth callback error:", error.message)
                    setError(error.message)
                    // Redirect to home after a delay even on error
                    setTimeout(() => navigate("/", { replace: true }), 3000)
                    return
                }

                if (data.session) {
                    console.log("Auth callback: session established for", data.session.user.email || data.session.user.user_metadata?.user_name)
                }

                // Redirect to home page
                navigate("/", { replace: true })
            } catch (err) {
                console.error("Auth callback unexpected error:", err)
                setError("An unexpected error occurred during authentication")
                setTimeout(() => navigate("/", { replace: true }), 3000)
            }
        }

        handleAuthCallback()
    }, [navigate])

    if (error) {
        return (
            <div className="flex items-center justify-center min-h-screen 
                bg-gradient-to-br from-gray-50 to-gray-200 
                dark:from-gray-900 dark:to-gray-800 text-gray-800 dark:text-gray-50">
                <div className="text-center p-8 bg-white dark:bg-gray-800 rounded-2xl shadow-lg max-w-md">
                    <div className="text-4xl mb-4">⚠️</div>
                    <h2 className="text-xl font-bold mb-2 text-red-500">Authentication Error</h2>
                    <p className="text-gray-500 dark:text-gray-400 mb-4">{error}</p>
                    <p className="text-sm text-gray-400">Redirecting to home page...</p>
                </div>
            </div>
        )
    }

    return (
        <div className="flex items-center justify-center min-h-screen 
            bg-gradient-to-br from-gray-50 to-gray-200 
            dark:from-gray-900 dark:to-gray-800 text-gray-800 dark:text-gray-50">
            <div className="text-center p-8">
                <div className="w-12 h-12 border-4 border-purple-500 border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
                <p className="text-lg font-medium">Completing sign in...</p>
                <p className="text-sm text-gray-500 dark:text-gray-400 mt-2">Please wait while we set up your session</p>
            </div>
        </div>
    )
}

export default AuthCallback
