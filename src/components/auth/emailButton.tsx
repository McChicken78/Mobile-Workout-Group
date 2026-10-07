import { Alert, Pressable, Text } from "react-native"
import Svg, { Path, Rect } from "react-native-svg";

type Props = {
    onPress?: () => void;
}

// Same shape as Ionicons "mail-outline" (default stroke 32 on a 512 viewBox), drawn as SVG so the stroke can be thickened.
function MailIcon({ size = 18, color = "white", strokeWidth = 60 }: { size?: number; color?: string; strokeWidth?: number }) {
    return (
        <Svg width={size} height={size} viewBox="0 0 512 512" fill="none" stroke={color} strokeWidth={strokeWidth} strokeLinecap="round" strokeLinejoin="round">
            <Rect x={48} y={96} width={416} height={320} rx={40} ry={40} />
            <Path d="M112 160l144 112 144-112" />
        </Svg>
    )
}

export function EmailButton({ onPress }: Props) {
    function handlePress(){
        if(onPress){
            onPress();
        } else {
            Alert.alert("Coming soon", "Sign in with email isn't ready yet.");
        }
    }

    return(
        <Pressable onPress={handlePress} accessibilityRole="button" accessibilityLabel="Continue with Email" className="h-[54px] mx-4 flex-row items-center justify-center gap-2.5 rounded-2xl border-[1.5px] border-[#dc5863] bg-[#dc5863] active:opacity-80">
        <MailIcon />
        <Text className="text-base font-semibold text-white">
            Continue with Email
        </Text>
        </Pressable>
    )
}
