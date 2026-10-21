import { ActivityIndicator, Pressable, Text } from "react-native";

type Props = {
   onPress: () => void;
   loading?: boolean;
   label?: string;
};

export function SignUpButton({ onPress, loading = false, label = "Sign up" }: Props) {
   return (
      <Pressable
         onPress={onPress}
         disabled={loading}
         accessibilityRole="button"
         accessibilityLabel={label}
         className={`h-[54px] flex-row items-center justify-center gap-2.5 rounded-2xl bg-[#C94358] active:opacity-80 ${
            loading ? "opacity-60" : ""
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