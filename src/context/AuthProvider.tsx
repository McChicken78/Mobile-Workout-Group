import { useState, useEffect, createContext, useContext } from "react"
import { Session, User } from "@supabase/supabase-js"
import { supabase } from "@/lib/supabase"

interface AuthContextType{
    session: Session | null
    user: User | null
    loading: boolean
    signUp: (email: string, password: string) => Promise<void>
    signIn: (email: string, password: string) => Promise<void>
    signOut: () => Promise<void>
}

const AuthContext = createContext<AuthContextType | null>(null)

export function AuthProvider ({children} : {children: React.ReactNode}) {
    const[session, setSession] = useState<Session | null>(null)
    const [user, setUser] = useState<User | null>(null)
    const [loading, setloading] = useState(true)

    useEffect(() => {
        async function InitializeSession () {
            const{data: {session}} = await supabase.auth.getSession()

            setSession(session)
            setUser(session?.user || null)
            setloading(false)
        }

        InitializeSession()

        const {data: {subscription}} = supabase.auth.onAuthStateChange(
            (event, session) => {
                setSession(session)
                setUser(session?.user || null)
                setloading(false)
            }
        )

        // Cleanup for no memory leak
        return() => {
            subscription.unsubscribe()
        }
    }, [])


    async function signUp (email: string, password: string) {
        const {error} = await supabase.auth.signUp({email, password})

        if(error) throw error
    }

    async function signIn (email: string, password: string) {
        const {error} = await supabase.auth.signInWithPassword({email, password})

        if(error) throw error
    }

    async function signOut () {
        const {error} = await supabase.auth.signOut()

        if(error) throw error
    }


    return (
        <AuthContext.Provider 
            value={{ session, user, loading, signIn, signUp, signOut }}>
            {children}
        </AuthContext.Provider>
    )
}

export function useAuth () {
    const context = useContext(AuthContext)
    
    if(!context) {
        throw new Error("useAuth must be used within an AuthProvider")
    }

    return context
}