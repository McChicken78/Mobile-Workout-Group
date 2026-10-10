import "../global.css";

import { Stack } from "expo-router";
import { KeyboardProvider } from "react-native-keyboard-controller";
import { AuthProvider, useAuth } from "@/context/AuthProvider"
import { useRouter } from "expo-router"
import { useEffect } from "react";
import { ActivityIndicator, View } from "react-native";

function RootNavigation(){
  const { loading, session, user } = useAuth()

  const router = useRouter()
  useEffect(() => {
    if(loading){
      return
    }

    if(session){
      router.replace("/tabs/home")
    }
    else {
      router.replace("/auth/welcome")
    }

  }, [user, session, loading])

  if(loading){
    return (
      <View className="flex-1 justify-center items-center px-6">
        <ActivityIndicator size="large" color="#DC5863" />
      </View>
    )
  }

  return (
    <KeyboardProvider>
      <Stack screenOptions={{ headerShown: false }} />
    </KeyboardProvider>
  );

}

export default function RootLayout() {
  return (
    <AuthProvider>
      <RootNavigation/>
    </AuthProvider>    
  )

}
