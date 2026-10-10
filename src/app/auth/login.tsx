import { useState } from "react";
import { Alert, Text, TextInput, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { BackButton } from "@/components/ui/backButton"
import { GradientBackground } from "@/components/ui/gradientBackground"
import { PasswordField } from "@/components/ui/passwordField";
import { LoginButton } from "@/components/auth/loginButton";
import { useAuth } from "@/context/AuthProvider";
import { Link, useRouter } from "expo-router";

export default function Login() {
  const { signIn } = useAuth();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [emailFocused, setEmailFocused] = useState(false);
  const [loading, setLoading] = useState(false);
  const router = useRouter()

  async function handleLogin() {
    setLoading(true);
    try {
      await signIn(email.trim(), password);
      router.replace("/tabs/home")
    } catch (error) {
      Alert.alert("Log in failed", error instanceof Error ? error.message : "Please try again.");
    } finally {
      setLoading(false);
    }
  }

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
            <Text className="text-lg font-semibold text-black">
                Email
            </Text>
            <TextInput
                value={email}
                onChangeText={setEmail}
                onFocus={() => setEmailFocused(true)}
                onBlur={() => setEmailFocused(false)}
                placeholder="default@example.com"
                placeholderTextColor="#8C8287"
                className={`mt-2 h-[64px] mb-6 rounded-2xl border-[1.5px] bg-white px-4 text-base text-neutral-900 ${
                    emailFocused ? "border-[#DC5863]" : "border-neutral-400"
                }`}/>

            <PasswordField
                label="Password"
                value={password}
                onChangeText={setPassword}
                placeholder="Your password"
                textContentType="password"
            />

            <Text className="self-end py-2 text-base font-semibold text-[#DC5863]">
                Forgot Password?
            </Text>

            <View className="my-4 flex-row items-center gap-3">
                <View className="h-px flex-1 bg-[#EFE7EA]" />
            </View>

            <LoginButton onPress={handleLogin} loading={loading}/>

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
