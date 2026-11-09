import { Alert, Pressable, Text, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { GradientBackground } from "@/components/ui/gradientBackground";
import { useAuth } from '@/context/AuthProvider'

export default function Crews() {

   return (
      <GradientBackground>
         <SafeAreaView className="flex-1 bg-green-200" edges={["top", "left", "right"]}>
            <Text>Crews page logged in</Text>

         </SafeAreaView>
      </GradientBackground>
   );
}
