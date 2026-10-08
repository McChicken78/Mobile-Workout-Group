import { Text, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { BackButton } from "@/components/ui/backButton"

export default function SignUp() {
  return (
    <SafeAreaView className="flex-1 bg-[#DC5863]" edges={["top", "left", "right"]}>
      {/* Top half */}
      <View className="flex-1 justify-center px-6">
        <BackButton/>
        <Text className="mt-8 text-6xl font-bold leading-[58px] tracking-tight text-[#1A0B10]">
          Sign Up!
        </Text>
        <Text className="mt-3 text-lg leading-6 text-[#2B0D16]">
          Sign up to begin your fitness journey solo or with the motivation of your friends.
        </Text>
      </View>

      {/* Bottom panel */}
      <View className="rounded-t-[32px] bg-white px-6 pb-10 pt-8">

      </View>
    </SafeAreaView>
  );
}
