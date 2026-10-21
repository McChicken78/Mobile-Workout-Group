import { ActivityIndicator, Pressable, Text } from "react-native";

type Props = {
   onPress: () => void;
   loading?: boolean;
   disabled?: boolean;
   label?: string;
};

export function LoginButton({ onPress, loading = false, disabled = false, label = "Log in" }: Props) {
   return (
      <Pressable
         onPress={onPress}
         disabled={loading || disabled}
         accessibilityRole="button"
         accessibilityLabel={label}
         className={`h-[54px] flex-row items-center justify-center gap-2.5 rounded-2xl bg-[#C94358] active:opacity-80 ${
            loading || disabled ? "opacity-60" : ""
         }`}
      >
         {loading ? (
            <ActivityIndicator color="white" />
         ) : (
            <Text className="text-xl font-semibold text-white">{label}</Text>
         )}
      </Pressable>
   );
}
