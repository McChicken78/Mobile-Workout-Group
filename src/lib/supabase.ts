import { createClient } from "@supabase/supabase-js"
import AsyncStorage from "@react-native-async-storage/async-storage"


const supabaseUrl=process.env.EXPO_PUBLIC_SUPABASE_URL
const supabasePublishableKey=process.env.EXPO_PUBLIC_SUPABASE_PUBLISHABLE_KEY

if(!supabaseUrl || !supabasePublishableKey) {
  throw new Error("Supabase URL or Publishable Key is not correct in .env")
}

export const supabase = createClient( supabaseUrl, supabasePublishableKey, {
    auth: {
        storage: AsyncStorage,
        persistSession: true,
        autoRefreshToken: true,
        detectSessionInUrl: false,
        
    }
})