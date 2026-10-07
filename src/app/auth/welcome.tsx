import { Text, View } from "react-native";
import { Link } from "expo-router";
import { SafeAreaView } from "react-native-safe-area-context";
import { AppleButton } from "@/components/auth/appleButton";
import { GoogleButton } from "@/components/auth/googleButton";
import { EmailButton } from "@/components/auth/emailButton";

export default function Welcome() {
  return (
    <SafeAreaView className="flex-1 bg-[#DC5863]" edges={["top", "left", "right"]}>
      {/* Top half */}
      <View className="flex-1 justify-center px-6">
        <Text className="text-6xl font-bold leading-[58px] tracking-tight text-[#1A0B10]">
          Show up.{"\n"}Together.
        </Text>
        <Text className="mt-3 text-lg leading-6 text-[#2B0D16]">
          Log workouts, keep your streak, and see how your crew is doing.
        </Text>
      </View>

      {/* Bottom panel */}
      <View className="rounded-t-[32px] bg-white px-6 pb-10 pt-8">
        <Text className="mb-5 text-3xl font-bold text-[#1A0B10]">Welcome back!</Text>

        <View className="gap-3">
          <AppleButton />
          <GoogleButton />
        </View>

        {/* Divider */}
        <View className="my-6 flex-row items-center gap-3">
          <View className="h-px ml-6 flex-1 bg-[#EFE7EA]" />
          <Text className="text-sm text-[#6E6468]">or</Text>
          <View className="h-px mr-6 flex-1 bg-[#EFE7EA]" />
        </View>

        <EmailButton />

        <Text className="mt-6 text-center text-base text-neutral-800">
          New here?{" "}
          <Link href="/auth/signup" asChild>
            <Text className="font-bold text-[#DC5863]">Create an account</Text>
          </Link>
        </Text>

        
      </View>
    </SafeAreaView>
  );
}