import { useState } from "react";
import { Alert, Pressable, Text, TextInput, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { KeyboardAwareScrollView } from "react-native-keyboard-controller";
import { isAuthError } from "@supabase/supabase-js";
import { BackButton } from "@/components/ui/backButton"
import { GradientBackground } from "@/components/ui/gradientBackground"
import { PasswordField } from "@/components/ui/passwordField";
import { LoginButton } from "@/components/auth/loginButton";
import { useAuth } from "@/context/AuthProvider";
import { Link, useRouter } from "expo-router";

export default function Login() {
  const { signIn, verifySignUpCode, resendSignUpCode } = useAuth();
  const router = useRouter()

  const [step, setStep] = useState<"form" | "code">("form");

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [emailFocused, setEmailFocused] = useState(false);
  const [code, setCode] = useState("");
  const [codeFocused, setCodeFocused] = useState(false);
  const [loading, setLoading] = useState(false);


  async function handleLogin() {
    setLoading(true);
    try {
      await signIn(email.trim(), password);
      router.replace("/tabs/home")
    } catch (error) {
      // The account exists but its email was never confirmed, so ask for the code from the sign up email
      if (isAuthError(error) && (error.code === "email_not_confirmed" || /email not confirmed/i.test(error.message))) {
        setCode("");
        setStep("code");
        return;
      }

      Alert.alert("Log in failed", error instanceof Error ? error.message : "Please try again.");
    } finally {
      setLoading(false);
    }
  }

  async function handleVerifyCode() {
    setLoading(true);
    try {
      await verifySignUpCode(email.trim(), code.trim());
      router.replace("/tabs/home")

    } catch (error) {
      Alert.alert("Verification failed", error instanceof Error ? error.message : "Please try again.");
      
    } finally {
      setLoading(false);
    }
  }

  async function handleResendCode() {
    try {
      await resendSignUpCode(email.trim());
      Alert.alert("Code sent", `We sent a new code to ${email.trim()}.`);
    } catch (error) {
      Alert.alert("Could not resend code", error instanceof Error ? error.message : "Please try again.");
    }
  }

  return (
    <GradientBackground>
      <View className="absolute inset-x-0 bottom-0 h-1/2 bg-white" />

      <SafeAreaView className="flex-1" edges={["top", "left", "right"]}>
        <BackButton/>

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
              Log In.
            </Text>
            <Text className="mt-1 text-lg font-base leading-6 text-[#2B0D16]">
              Log in to your account to continue your fitness journey.
            </Text>
          </View>

          {/* Bottom panel */}
          {step === "form" && (
          <View className="grow rounded-t-[32px] bg-white px-6 pb-10 pt-8">
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
                  className={`mt-2 h-[48px] mb-6 rounded-xl border-[1.5px] bg-white px-4 text-base text-neutral-900 ${
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
          </View>)}
          {step === "code" && (
          <View className="grow rounded-t-[32px] bg-white px-6 pb-10 pt-8">
              <Text className="text-lg font-semibold text-black">
                  Verification Code
              </Text>
              <Text className="mt-1 text-base text-neutral-600">
                  Enter the code we sent to {email.trim()}.
              </Text>
              <TextInput
                  value={code}
                  onChangeText={(text) => setCode(text.replace(/[^0-9]/g, ""))}
                  onFocus={() => setCodeFocused(true)}
                  onBlur={() => setCodeFocused(false)}
                  placeholder="123456"
                  placeholderTextColor="#8C8287"
                  keyboardType="number-pad"
                  textContentType="oneTimeCode"
                  autoComplete="one-time-code"
                  maxLength={10}
                  autoFocus
                  className={`mt-4 h-[64px] rounded-2xl border-[1.5px] bg-white px-4 text-base text-neutral-900 ${
                      codeFocused ? "border-[#DC5863]" : "border-neutral-400"
                  }`}/>

              <Pressable onPress={handleResendCode} className="self-end active:opacity-60">
                  <Text className="py-2 text-base font-semibold text-[#DC5863]">
                      Resend code
                  </Text>
              </Pressable>

              <View className="my-4 flex-row items-center gap-3">
                  <View className="h-px flex-1 bg-[#EFE7EA]" />
              </View>

              <LoginButton onPress={handleVerifyCode} loading={loading} label="Verify"/>

              <Pressable onPress={() => setStep("form")} className="mt-6 self-center active:opacity-60">
                  <Text className="text-base font-semibold text-[#DC5863]">
                      Use a different email
                  </Text>
              </Pressable>
          </View>
          )}
        </KeyboardAwareScrollView>
      </SafeAreaView>
    </GradientBackground>
  );
}
