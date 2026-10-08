import { Text, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { KeyboardAwareScrollView } from "react-native-keyboard-controller";
import { BackButton } from "@/components/ui/backButton"
import { GradientBackground } from "@/components/ui/gradientBackground";
import { SignUpArea } from "@/components/auth/signupArea"

export default function SignUp() {
  return (
    <GradientBackground>
      {/* White backdrop for the bottom half, so the keyboard spacer below the panel shows white, not the gradient */}
      <View className="absolute inset-x-0 bottom-0 h-1/2 bg-white" />

      <SafeAreaView className="flex-1" edges={["top", "left", "right"]}>
        <BackButton/>

        {/* Scrolls the focused box above the keyboard, leaving bottomOffset px of space below it.
            "layout" mode adds a real spacer under the content instead of a scroll inset, which avoids
            a jump back to the top when the keyboard changes height between boxes (e.g. AutoFill bar). */}
        <KeyboardAwareScrollView
          bottomOffset={32}
          mode="layout"
          contentContainerStyle={{ flexGrow: 1 }}
          keyboardShouldPersistTaps="handled"
          keyboardDismissMode="interactive"
          showsVerticalScrollIndicator={false}
          bounces={false}
        >
          {/* Top half */}
          <View className="mt-4 px-6 pb-8">
            <Text className="text-6xl font-bold leading-[58px] tracking-tight text-[#1A0B10]">
              Sign Up!
            </Text>
            <Text className="mt-1 text-lg leading-6 text-[#2B0D16]">
              Making your fitness journey fun!
            </Text>
          </View>

          {/* Bottom panel */}
          <View className="grow rounded-t-[32px] bg-white px-6 pb-10 pt-8">
              <SignUpArea/>
          </View>
        </KeyboardAwareScrollView>

      </SafeAreaView>
    </GradientBackground>
  );
}
