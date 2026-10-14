import { useRef, useState } from "react";
import { Modal, Pressable, Text, TextInput, View } from "react-native";
import { KeyboardAvoidingView } from "react-native-keyboard-controller";
import { Ionicons } from "@expo/vector-icons";
import { LoginButton } from "@/components/auth/loginButton";

export const CODE_LENGTH = 6;

type Props = {
  visible: boolean;
  email: string;
  code: string;
  onChangeCode: (code: string) => void;
  onVerify: () => void;
  onResend: () => void;
  onClose: () => void;
  loading?: boolean;
};

export function VerifyCodeModal({ visible, email, code, onChangeCode, onVerify, onResend, onClose, loading = false }: Props) {
  const inputRef = useRef<TextInput>(null);
  const [focused, setFocused] = useState(false);

  return (
    <Modal
      visible={visible}
      transparent
      statusBarTranslucent
      navigationBarTranslucent
      animationType="fade"
      onShow={() => inputRef.current?.focus()}
      onRequestClose={onClose}
    >
      <KeyboardAvoidingView behavior="padding" className="flex-1 justify-end bg-black/40">
        <View className="rounded-t-[32px] bg-white px-6 pb-10 pt-3">
          {/* Continues the white below the sheet, so the space behind the keyboard isn't the dark backdrop */}
          <View className="absolute inset-x-0 top-full h-screen bg-white" />

          <View className="h-1.5 w-12 self-center rounded-full bg-neutral-300" />

          <Pressable
            onPress={onClose}
            accessibilityRole="button"
            accessibilityLabel="Close"
            hitSlop={8}
            className="mt-2 h-10 w-10 items-center justify-center self-end rounded-full bg-neutral-100 active:opacity-60"
          >
            <Ionicons name="close" size={20} color="#6E6468" />
          </Pressable>

          <Text className="mt-2 text-3xl font-bold tracking-tight text-[#1A0B10]">
            Check your email
          </Text>
          <Text className="mt-1 text-base text-[#6E6468]">
            We sent a {CODE_LENGTH}-digit code to{" "}
            <Text className="font-semibold text-[#1A0B10]">{email}</Text>
          </Text>

          <View className="mt-6">
            <View className="flex-row gap-2">
              {Array.from({ length: CODE_LENGTH }, (_, index) => {
                const active = focused && index === Math.min(code.length, CODE_LENGTH - 1);

                return (
                  <View
                    key={index}
                    className={`h-[64px] flex-1 items-center justify-center rounded-2xl border-[1.5px] ${
                      active ? "border-[#DC5863] bg-[#FFF5F6]" : code[index] ? "border-neutral-400 bg-white" : "border-neutral-300 bg-white"
                    }`}
                  >
                    <Text className="text-2xl font-bold text-[#1A0B10]">{code[index] ?? ""}</Text>
                  </View>
                );
              })}
            </View>

            {/* Invisible input stretched over the boxes: it takes the taps and the typing, the boxes only display the digits */}
            <TextInput
              ref={inputRef}
              value={code}
              onChangeText={(text) => onChangeCode(text.replace(/[^0-9]/g, "").slice(0, CODE_LENGTH))}
              onFocus={() => setFocused(true)}
              onBlur={() => setFocused(false)}
              keyboardType="number-pad"
              textContentType="oneTimeCode"
              autoComplete="one-time-code"
              maxLength={CODE_LENGTH}
              caretHidden
              accessibilityLabel="Verification code"
              className="absolute inset-0 opacity-0"
            />
          </View>

          <View className="mb-4 mt-3 flex-row items-center">
            <Text className="text-base text-[#6E6468]">Didn&apos;t get it? </Text>
            <Pressable onPress={onResend} hitSlop={8} className="active:opacity-60">
              <Text className="text-base font-semibold text-[#DC5863]">Resend code</Text>
            </Pressable>
          </View>

          <LoginButton onPress={onVerify} loading={loading} disabled={code.length < CODE_LENGTH} label="Verify"/>
        </View>
      </KeyboardAvoidingView>
    </Modal>
  );
}
