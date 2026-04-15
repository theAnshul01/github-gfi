import { useEffect, useState } from "react";
import { supabase } from "../services/SupabaseClient";

export function useAuth(){
    const [user, setUser] = useState<any>(undefined);

    useEffect(() => {
        supabase.auth.getUser().then(({ data }) => {
            setUser(data.user)
        })

        const { data: listener } = supabase.auth.onAuthStateChange(
            (_event, session) => {
                setUser(session?.user ?? null)
            }
        )

        return () => listener.subscription.unsubscribe()
    }, [])

    return user
}
