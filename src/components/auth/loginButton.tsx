import { Pressable, Text } from "react-native";
import { Link } from "expo-router";



export function LoginButton() {
  return (
    <Link href="/auth/login" asChild>
      <Pressable
        accessibilityRole="button"
        accessibilityLabel="Continue with email"
        className="h-[54px] flex-row items-center justify-center gap-2.5 rounded-2xl bg-[#C94358] active:opacity-80"
    >
        <Text className="text-xl font-semibold text-white">Login</Text>
      </Pressable>
    </Link>
  );
}