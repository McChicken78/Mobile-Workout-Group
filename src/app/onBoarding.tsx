import { Pressable, Alert, Text, TextInput, View } from "react-native";
import { useState } from "react";
import { Link, useRouter } from "expo-router"
import { SafeAreaView } from "react-native-safe-area-context"
import { GradientBackground } from "@/components/ui/gradientBackground"
import { LinearGradient } from "expo-linear-gradient";
import { useAuth } from '@/context/AuthProvider'


export default function OnBoarding() {
   const router = useRouter();
   const { signOut } = useAuth()

   const [page, setPage] = useState(0);
   const [goal, setGoal] = useState(3);
   const [weight, setWeight] = useState(null);

   async function handleLogout(){
      try{
         await signOut()
      }
      catch(error: any){
            Alert.alert(error)
      }
   }


   return (
      <SafeAreaView className="flex-1">
         <GradientBackground>
            <LinearGradient colors={["#00c6ff", "#0072ff"]} style={{ flex: 1 }} />
            <Pressable onPress={handleLogout}>
               <Text>Sign out</Text>
            </Pressable>
         </GradientBackground>
      </SafeAreaView>
   )
}