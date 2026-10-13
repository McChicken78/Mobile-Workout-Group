import { useState } from "react";
import { Alert, Pressable, Text, TextInput, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { KeyboardAwareScrollView } from "react-native-keyboard-controller";
import { BackButton } from "@/components/ui/backButton"
import { GradientBackground } from "@/components/ui/gradientBackground";
import { PasswordField } from "@/components/ui/passwordField";
import { SignUpButton } from "@/components/auth/signupButton";
import { useAuth } from "@/context/AuthProvider";

export default function SignUp() {
  const { signUp, verifySignUpCode, resendSignUpCode } = useAuth();

  const [displayName, setDisplayName] = useState("");
  const [focusDisplayName, setFocusDisplayName] = useState(false);
  const [email, setEmail] = useState("");
  const [focusEmail, setFocusEmail] = useState(false);
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [step, setStep] = useState<"form" | "code">("form");
  const [code, setCode] = useState("");
  const [focusCode, setFocusCode] = useState(false);

  async function handleSignUp() {
    setLoading(true);
    try {
      await signUp(email.trim(), password, displayName.trim());
      setCode("");
      setStep("code");
    } catch (error) {
      Alert.alert("Sign up failed", error instanceof Error ? error.message : "Please try again.");
    } finally {
      setLoading(false);
    }
  }

  async function handleVerifyCode() {
    setLoading(true);
    try {
      // A valid code confirms the account and signs the user in
      await verifySignUpCode(email.trim(), code.trim());
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
              Sign Up!
            </Text>
            <Text className="mt-1 text-lg leading-6 text-[#2B0D16]">
              Making your fitness journey fun!
            </Text>
          </View>

          {/* Bottom panel */}
          <View className="grow rounded-t-[32px] bg-white px-6 pb-10 pt-8">
            {step === "form" ? (
              <>
                <Text className="text-lg font-semibold text-black">
                  Display Name
                </Text>
                <TextInput
                  value={displayName}
                  onChangeText={setDisplayName}
                  onFocus={() => setFocusDisplayName(true)}
                  onBlur={() => setFocusDisplayName(false)}
                  placeholder="Lebron James"
                  placeholderTextColor="#8C8287"
                  className={`mt-2 h-[64px] mb-6 rounded-2xl border-[1.5px] bg-white px-4 text-base text-neutral-900 ${
                    focusDisplayName ? "border-[#DC5863]" : "border-neutral-400"
                  }`}/>

                <Text className="text-lg font-semibold text-black">
                  Email
                </Text>
                <TextInput
                  value={email}
                  onChangeText={setEmail}
                  onFocus={() => setFocusEmail(true)}
                  onBlur={() => setFocusEmail(false)}
                  placeholder="default@example.com"
                  placeholderTextColor="#8C8287"
                  className={`mt-2 h-[64px] mb-6 rounded-2xl border-[1.5px] bg-white px-4 text-base text-neutral-900 ${
                    focusEmail ? "border-[#DC5863]" : "border-neutral-400"
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

                <SignUpButton onPress={handleSignUp} loading={loading}/>
              </>
            ) : (
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
                  onFocus={() => setFocusCode(true)}
                  onBlur={() => setFocusCode(false)}
                  placeholder="123456"
                  placeholderTextColor="#8C8287"
                  keyboardType="number-pad"
                  textContentType="oneTimeCode"
                  autoComplete="one-time-code"
                  maxLength={10}
                  autoFocus
                  className={`mt-4 h-[64px] rounded-2xl border-[1.5px] bg-white px-4 text-base text-neutral-900 ${
                    focusCode ? "border-[#DC5863]" : "border-neutral-400"
                  }`}/>

                <Pressable onPress={handleResendCode} className="self-end active:opacity-60">
                  <Text className="py-2 text-base font-semibold text-[#DC5863]">
                    Resend code
                  </Text>
                </Pressable>

                <View className="my-4 flex-row items-center gap-3">
                  <View className="h-px flex-1 bg-[#EFE7EA]" />
                </View>

                <SignUpButton onPress={handleVerifyCode} loading={loading} label="Verify"/>

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
    </GradientBackground>
  );
}
