import { useState, useEffect, useRef, createContext, useContext } from "react"
import { Session, User } from "@supabase/supabase-js"
import { supabase } from "@/lib/supabase"

interface AuthContextType{
   session: Session | null
   user: User | null
   loading: boolean
   signUp: (email: string, password: string, displayName: string, firstName: string, lastName: string) => Promise<void>
   verifySignUpCode: (email: string, code: string) => Promise<void>
   resendSignUpCode: (email: string) => Promise<void>
   signIn: (email: string, password: string) => Promise<void>
   resendSignInCode: (email: string) => Promise<void>
   signOut: () => Promise<void>
}

const AuthContext = createContext<AuthContextType | null>(null)

export function AuthProvider ({children} : {children: React.ReactNode}) {
   const [session, setSession] = useState<Session | null>(null)
   const [user, setUser] = useState<User | null>(null)
   const [loading, setloading] = useState(true)
   // True while signIn checks the password, so that short-lived session never reaches the app
   const checkingPassword = useRef(false)

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
            if(checkingPassword.current) return

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


   async function signUp (email: string, password: string, displayName: string, firstName: string, lastName: string) {
      const {data, error} = await supabase.auth.signUp({
         email,
         password,
         options: { data: { display_name: displayName, first_name: firstName, last_name: lastName } }
      })

      if(error) throw error

      // Supabase returns a user with no identities when the email is already registered
      if(data.user && data.user.identities?.length === 0) {
         throw new Error("An account with this email already exists.")
      }
   }

   async function verifySignUpCode (email: string, code: string) {
      const {error} = await supabase.auth.verifyOtp({email, token: code, type: "email"})

      if(error) throw error
   }

   async function resendSignUpCode (email: string) {
      const {error} = await supabase.auth.resend({type: "signup", email})

      if(error) throw error
   }

   // Checks the password, then emails a login code. The user is only signed in once verifySignUpCode succeeds
   async function signIn (email: string, password: string) {
      checkingPassword.current = true

      try {
         const {error} = await supabase.auth.signInWithPassword({email, password})

         if(error) throw error

         // Drop the session the password check created, the emailed code is what signs the user in
         const {error: signOutError} = await supabase.auth.signOut({scope: "local"})

         if(signOutError) throw signOutError
      } finally {
         checkingPassword.current = false
      }

      await resendSignInCode(email)
   }

   async function resendSignInCode (email: string) {
      const {error} = await supabase.auth.signInWithOtp({email, options: {shouldCreateUser: false}})

      if(error) throw error
   }

   async function signOut () {
      const {error} = await supabase.auth.signOut()

      if(error) throw error
   }


   return (
      <AuthContext.Provider 
         value={{ session, user, loading, signIn, resendSignInCode, signUp, verifySignUpCode, resendSignUpCode, signOut }}>
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