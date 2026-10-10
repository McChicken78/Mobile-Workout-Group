import { Alert, Pressable, Text, View } from "react-native";
import { Link } from "expo-router";
import { SafeAreaView } from "react-native-safe-area-context";
import { GradientBackground } from "@/components/ui/gradientBackground";
import { useAuth } from '@/context/AuthProvider'

export default function Home() {
  const { signOut } = useAuth()

  async function handleLogout(){
    try{
        await signOut()
    }
    catch(error: any){
        Alert.alert(error)
    }
  }

  return (
    <GradientBackground>
      <SafeAreaView className="flex-1" edges={["top", "left", "right"]}>
        <Text>Home page logged in</Text>

        <Pressable onPress={handleLogout}>
          <Text>Sign out</Text>
        </Pressable>
      </SafeAreaView>
    </GradientBackground>
  );
}
