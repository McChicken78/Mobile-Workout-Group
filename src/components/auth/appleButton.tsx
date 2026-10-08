import { Alert, Pressable, Text } from 'react-native';
import { Ionicons } from "@expo/vector-icons";

type Props = {
    onPress?: () => void;
}

export function AppleButton({ onPress }: Props) {
    function handlePress() {
        if(onPress){
            onPress();
        }
        else{
            Alert.alert("Coming Soon", "This feature is not yet available.")
        }
    }
    return(
    <Pressable onPress={handlePress} accessibilityRole="button" accessibilityLabel="Continue with Apple" className="h-[54px] mx-4 flex-row items-center justify-center gap-2.5 rounded-2xl bg-black active:opacity-80">
        <Ionicons name="logo-apple" size={20} color="white" />
        <Text className="text-base font-semibold text-white">
            Continue with Apple
        </Text>
    </Pressable>
    )
}