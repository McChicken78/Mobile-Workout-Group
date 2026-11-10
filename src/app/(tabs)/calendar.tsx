import { Alert, Pressable, Text, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { GradientBackground } from "@/components/ui/gradientBackground";

export default function Calendar() {

   return (
      <GradientBackground>
         <SafeAreaView className="flex-1 bg-green-200" edges={["top", "left", "right"]}>
            <Text>Calendar page logged in</Text>

         </SafeAreaView>
      </GradientBackground>
   );
}
