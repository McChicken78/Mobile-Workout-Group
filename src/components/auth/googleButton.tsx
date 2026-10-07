// src/components/auth/GoogleButton.tsx
import { Alert, Pressable, Text } from "react-native";
import { GoogleLogo } from "./googleLogo";

type Props = {
  onPress?: () => void;
};

export function GoogleButton({ onPress }: Props) {
  function handlePress() {
    if (onPress) {
      onPress();
    } else {
      Alert.alert("Coming soon", "Sign in with Google isn't ready yet.");
    }
  }

  return (
    <Pressable onPress={handlePress} accessibilityRole="button" accessibilityLabel="Continue with Google" className="h-[54px] mx-4 flex-row items-center justify-center gap-2.5 rounded-2xl border-[1.5px] border-neutral-300 bg-white active:opacity-80">
      <GoogleLogo size={18} />
      <Text className="text-base font-semibold text-[#1A0B10]">
        Continue with Google
      </Text>
    </Pressable>
  );
}