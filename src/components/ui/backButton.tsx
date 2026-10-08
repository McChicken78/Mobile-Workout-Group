import { Pressable } from "react-native"
import { router } from "expo-router"
import { Ionicons } from "@expo/vector-icons"

export function BackButton() {
  function handlePress() {
    if (router.canGoBack()) {
      router.back()
    } else {
      router.replace("/auth/welcome")
    }
  }

  return (
    <Pressable
      onPress={handlePress}
      accessibilityRole="button"
      accessibilityLabel="Back"
      hitSlop={8}
      className="ml-4 h-14 w-14 self-start items-center justify-center rounded-full bg-[#1A0B10] active:opacity-70"
    >
      <Ionicons name="chevron-back" size={30} color="white" />
    </Pressable>
  )
}