import { useState } from "react";
import { Alert, Pressable, Text, TextInput, View } from "react-native";
import { Link, useRouter } from "expo-router";
import { SafeAreaView } from "react-native-safe-area-context";
import { KeyboardAwareScrollView } from "react-native-keyboard-controller";
import { Ionicons } from "@expo/vector-icons";
import { isAuthError } from "@supabase/supabase-js";
import { AppleButton } from "@/components/auth/appleButton";
import { GoogleButton } from "@/components/auth/googleButton";
import { LoginButton } from "@/components/auth/loginButton";
import { PasswordField } from "@/components/ui/passwordField";
import { useAuth } from "@/context/AuthProvider";

export default function Welcome() {
  const { signIn, verifySignUpCode, resendSignUpCode } = useAuth();
  const router = useRouter();

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
      router.replace("/tabs/home");
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
      // A valid code confirms the account and signs the user in
      await verifySignUpCode(email.trim(), code.trim());
      router.replace("/tabs/home");
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
    <SafeAreaView className="flex-1 bg-white">
      <KeyboardAwareScrollView
        bottomOffset={32}
        mode="layout"
        contentContainerStyle={{ flexGrow: 1, justifyContent: "center" }}
        keyboardShouldPersistTaps="handled"
        keyboardDismissMode="interactive"
        showsVerticalScrollIndicator={false}
        bounces={false}
      >
        <View className="px-6 py-8">
          {/* Header */}
          <View className="mb-8 items-center">
            <View className="h-[72px] w-[72px] items-center justify-center rounded-3xl bg-[#DC5863]">
              <Ionicons name="barbell" size={36} color="white" />
            </View>
            <Text className="mt-6 text-4xl font-bold tracking-tight text-[#1A0B10]">
              Welcome back
            </Text>
            <Text className="mt-2 text-lg text-[#6E6468]">
              Log in to keep your streak going
            </Text>
          </View>

          {step === "form" && (
            <>
              <View className="gap-3">
                <AppleButton />
                <GoogleButton />
              </View>

              {/* Divider */}
              <View className="my-6 flex-row items-center gap-3">
                <View className="h-px flex-1 bg-[#EFE7EA]" />
                <Text className="text-sm text-[#6E6468]">or</Text>
                <View className="h-px flex-1 bg-[#EFE7EA]" />
              </View>

              <Text className="text-lg font-semibold text-black">
                Email
              </Text>
              <TextInput
                value={email}
                onChangeText={setEmail}
                onFocus={() => setEmailFocused(true)}
                onBlur={() => setEmailFocused(false)}
                placeholder="you@example.com"
                placeholderTextColor="#8C8287"
                keyboardType="email-address"
                textContentType="emailAddress"
                autoComplete="email"
                autoCapitalize="none"
                autoCorrect={false}
                className={`mt-2 h-[48px] mb-4 rounded-xl border-[1.5px] bg-white px-4 py-0 text-[14px] text-neutral-900 ${
                  emailFocused ? "border-[#DC5863]" : "border-neutral-400"
                }`}/>

              <PasswordField
                label="Password"
                value={password}
                onChangeText={setPassword}
                placeholder="Password"
                textContentType="password"
              />

              <Text className="mb-2 self-end py-2 text-base font-semibold text-[#DC5863]">
                Forgot password?
              </Text>

              <LoginButton onPress={handleLogin} loading={loading}/>

              <Text className="mt-8 text-center text-base text-[#6E6468]">
                Don&apos;t have an account?{" "}
                <Link href="/auth/signup" asChild>
                  <Text className="font-bold text-[#DC5863]">Sign up</Text>
                </Link>
              </Text>
            </>
          )}

          {step === "code" && (
            <>
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
                className={`mt-4 h-[48px] rounded-xl border-[1.5px] bg-white px-4 py-0 text-[14px] text-neutral-900 ${
                  codeFocused ? "border-[#DC5863]" : "border-neutral-400"
                }`}/>

              <Pressable onPress={handleResendCode} className="mb-2 self-end active:opacity-60">
                <Text className="py-2 text-base font-semibold text-[#DC5863]">
                  Resend code
                </Text>
              </Pressable>

              <LoginButton onPress={handleVerifyCode} loading={loading} label="Verify"/>

              <Pressable onPress={() => setStep("form")} className="mt-6 self-center active:opacity-60">
                <Text className="text-base font-semibold text-[#DC5863]">
                  Use a different email
                </Text>
              </Pressable>
            </>
          )}
        </View>
      </KeyboardAwareScrollView>
    </SafeAreaView>
  );
}
