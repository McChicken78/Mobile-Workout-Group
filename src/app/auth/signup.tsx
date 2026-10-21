import { useState } from "react";
import { Alert, Modal, Text, TextInput, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { KeyboardAwareScrollView } from "react-native-keyboard-controller";
import { Ionicons } from "@expo/vector-icons";
import { PasswordField } from "@/components/ui/passwordField";
import { SignUpButton } from "@/components/auth/signupButton";
import { useAuth } from "@/context/AuthProvider";
import { useRouter } from "expo-router";

export default function SignUp() {
   const { signUp } = useAuth();
   const router = useRouter();

   const [firstName, setFirstName] = useState("");
   const [focusFirstName, setFocusFirstName] = useState(false);
   const [lastName, setLastName] = useState("");
   const [focusLastName, setFocusLastName] = useState(false);
   const [displayName, setDisplayName] = useState("");
   const [focusDisplayName, setFocusDisplayName] = useState(false);
   const [email, setEmail] = useState("");
   const [focusEmail, setFocusEmail] = useState(false);
   const [password, setPassword] = useState("");
   const [loading, setLoading] = useState(false);
   const [checkEmailVisible, setCheckEmailVisible] = useState(false);

   async function handleSignUp() {
      if (password.length < 8) {
         Alert.alert("Sign up failed", "Your password needs at least 8 characters.");
         return;
      }

      setLoading(true);
      try {
         await signUp(email.trim(), password, displayName.trim(), firstName.trim(), lastName.trim());
         setCheckEmailVisible(true);
      } catch (error) {
         Alert.alert("Sign up failed", error instanceof Error ? error.message : "Please try again.");
      } finally {
         setLoading(false);
      }
   }

   function handleGoToLogin() {
      setCheckEmailVisible(false);

      if (router.canGoBack()) {
         router.back();
      } else {
         router.replace("/auth/welcome");
      }
   }

   return (
      <SafeAreaView className="flex-1 bg-white">
         <KeyboardAwareScrollView
            bottomOffset={32}
            contentContainerStyle={{ flexGrow: 1 }}
            keyboardShouldPersistTaps="handled"
            keyboardDismissMode="interactive"
            showsVerticalScrollIndicator={false}
            bounces={false}
         >
            <View className="grow px-6 py-8">
               <View className="grow justify-center">
                  {/* Header */}
                  <View className="mb-8 items-center">
                     <View className="h-[72px] w-[72px] items-center justify-center rounded-3xl bg-[#DC5863]">
                        <Ionicons name="barbell" size={36} color="white" />
                     </View>
                     <Text className="mt-6 text-4xl font-bold tracking-tight text-[#1A0B10]">
                        Create your account
                     </Text>
                     <Text className="mt-2 text-lg text-[#6E6468]">
                        Join your crew in under a minute
                     </Text>
                  </View>

                  <View className="flex-row gap-3">
                     <View className="flex-1">
                        <Text className="text-lg font-semibold text-black">
                           First name
                        </Text>
                        <TextInput
                           value={firstName}
                           onChangeText={setFirstName}
                           onFocus={() => setFocusFirstName(true)}
                           onBlur={() => setFocusFirstName(false)}
                           placeholder="First"
                           placeholderTextColor="#8C8287"
                           textContentType="givenName"
                           autoComplete="given-name"
                           autoCapitalize="words"
                           className={`mt-2 h-[48px] mb-4 rounded-xl border-[1.5px] bg-white px-4 py-0 text-[14px] text-neutral-900 ${
                              focusFirstName ? "border-[#DC5863]" : "border-neutral-400"
                           }`}/>
                     </View>

                     <View className="flex-1">
                        <Text className="text-lg font-semibold text-black">
                           Last name
                        </Text>
                        <TextInput
                           value={lastName}
                           onChangeText={setLastName}
                           onFocus={() => setFocusLastName(true)}
                           onBlur={() => setFocusLastName(false)}
                           placeholder="Last"
                           placeholderTextColor="#8C8287"
                           textContentType="familyName"
                           autoComplete="family-name"
                           autoCapitalize="words"
                           className={`mt-2 h-[48px] mb-4 rounded-xl border-[1.5px] bg-white px-4 py-0 text-[14px] text-neutral-900 ${
                              focusLastName ? "border-[#DC5863]" : "border-neutral-400"
                           }`}/>
                     </View>
                  </View>

                  <Text className="text-lg font-semibold text-black">
                     Display name
                  </Text>
                  <TextInput
                     value={displayName}
                     onChangeText={setDisplayName}
                     onFocus={() => setFocusDisplayName(true)}
                     onBlur={() => setFocusDisplayName(false)}
                     placeholder="What your crew sees"
                     placeholderTextColor="#8C8287"
                     className={`mt-2 h-[48px] mb-4 rounded-xl border-[1.5px] bg-white px-4 py-0 text-[14px] text-neutral-900 ${
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
                     placeholder="you@example.com"
                     placeholderTextColor="#8C8287"
                     keyboardType="email-address"
                     textContentType="emailAddress"
                     autoComplete="email"
                     autoCapitalize="none"
                     autoCorrect={false}
                     className={`mt-2 h-[48px] mb-4 rounded-xl border-[1.5px] bg-white px-4 py-0 text-[14px] text-neutral-900 ${
                        focusEmail ? "border-[#DC5863]" : "border-neutral-400"
                     }`}/>

                  <PasswordField
                     label="Password"
                     value={password}
                     onChangeText={setPassword}
                     placeholder="At least 8 characters"
                     textContentType="password"
                  />

                  <View className="mt-6">
                     <SignUpButton onPress={handleSignUp} loading={loading} label="Create account"/>
                  </View>
               </View>

               {/* Footer */}
               <View className="mt-8 items-center">
                  <Text className="text-base text-[#6E6468]">
                     Already have an account?{" "}
                     <Text onPress={handleGoToLogin} className="font-bold text-[#DC5863]">Log in</Text>
                  </Text>
                  <Text className="mt-2 text-sm text-[#6E6468]">
                     By signing up you agree to our <Text className="underline">Privacy Policy</Text>.
                  </Text>
               </View>
            </View>
         </KeyboardAwareScrollView>

         <Modal
            visible={checkEmailVisible}
            transparent
            animationType="fade"
            onRequestClose={() => setCheckEmailVisible(false)}
         >
            <View className="flex-1 items-center justify-center bg-black/50 px-6">
               <View className="w-full rounded-[32px] bg-white px-6 pb-6 pt-8">
                  <Text className="text-center text-2xl font-bold text-[#1A0B10]">
                     Check your email
                  </Text>
                  <View className="m-4 mb-8 items-center gap-1">
                     <Text className="text-center text-base text-neutral-600">
                        We sent a verification link to:
                     </Text>

                     <View className="rounded-xl bg-[#FDE8EB] px-3 py-1">
                        <Text className="text-base font-bold text-[#DC5863]">{email.trim()}</Text>
                     </View>

                     <Text className="text-center text-base text-neutral-600">
                        Login after confirming your email
                     </Text>
                  </View>

                  <SignUpButton onPress={handleGoToLogin} label="Go to log in"/>
               </View>
            </View>
         </Modal>
      </SafeAreaView>
   );
}
