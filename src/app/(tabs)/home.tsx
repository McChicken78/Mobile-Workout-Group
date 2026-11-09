import { Alert, Pressable, Text, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { useAuth } from '@/context/AuthProvider'

export default function Home() {

   return (
      <SafeAreaView className="flex-1" edges={["top", "left", "right"]}>
         <Text>Home page logged in</Text>

      </SafeAreaView>
   );
}
