import { Pressable, Text, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { BackButton } from "@/components/ui/backButton"
import { GradientBackground } from "@/components/ui/gradientBackground"
import { LoginArea } from "@/components/auth/loginArea"
import { Link } from "expo-router";

export default function Login() {
  return (
    <GradientBackground>
      <SafeAreaView className="flex-1" edges={["top", "left", "right"]}>
        <BackButton/>

        {/* Top half */}
        <View className="mt-4 px-6 pb-8">
          <Text className="text-6xl font-bold leading-[58px] tracking-tight text-[#1A0B10]">
            Log In.
          </Text>
          <Text className="mt-1 text-lg font-base leading-6 text-[#2B0D16]">
            Log in to your account to continue your fitness journey.
          </Text>
        </View>

        {/* Bottom panel */}
        <View className="flex-1 rounded-t-[32px] bg-white px-6 pb-10 pt-8">
            <LoginArea/>


            <Text className="mt-6 text-center text-base text-neutral-800">
                New here?{" "}
                <Link href="/auth/signup" asChild>
                    <Text className="font-bold text-[#DC5863]">Create an account</Text>
                </Link>
            </Text>
        </View>

      </SafeAreaView>
    </GradientBackground>
  );
}
