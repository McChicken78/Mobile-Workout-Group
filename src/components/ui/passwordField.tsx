// src/components/ui/PasswordField.tsx
import { useState } from "react";
import { Pressable, Text, TextInput, TextInputProps, View } from "react-native";
import { Ionicons } from "@expo/vector-icons";

type Props = TextInputProps & {
  label: string;
};

export function PasswordField({ label, ...inputProps }: Props) {
  const [visible, setVisible] = useState(false);
  const [focused, setFocused] = useState(false);

  return (
    <View className="gap-2">
        <Text className="text-lg font-semibold text-black">{label}</Text>

      {/* The "box": border and background live here, not on the input */}
      <View
        className={`h-[64px]  flex-row items-center rounded-2xl bg-white pl-4 pr-1 ${
          focused
            ? "border-[2px] border-[#DC5863]"
            : "border-[1.5px] border-neutral-400"
        }`}
      >
        <TextInput
          {...inputProps}
          secureTextEntry={!visible}
          autoCapitalize="none"
          autoCorrect={false}
          onFocus={(e) => { setFocused(true); inputProps.onFocus?.(e); }}
          onBlur={(e) => { setFocused(false); inputProps.onBlur?.(e); }}
          placeholderTextColor="#8C8287"
          className="h-full flex-1 text-base text-neutral-900"
        />

        <Pressable
          onPress={() => setVisible(!visible)}
          accessibilityRole="button"
          accessibilityLabel={visible ? "Hide password" : "Show password"}
          className="h-11 w-11 items-center justify-center active:opacity-60"
        >
          <Ionicons
            name={visible ? "eye-off-outline" : "eye-outline"}
            size={20}
            color="#6E6468"
          />
        </Pressable>
      </View>
    </View>
  );
}