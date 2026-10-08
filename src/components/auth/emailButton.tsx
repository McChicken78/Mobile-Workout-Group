import { Pressable, Text } from "react-native";
import { Link } from "expo-router";
import Svg, { Path, Rect } from "react-native-svg";

// Same shape as Ionicons "mail-outline", drawn as SVG so the stroke can be thickened.
function MailIcon({ size = 18, color = "white", strokeWidth = 60 }: { size?: number; color?: string; strokeWidth?: number }) {
  return (
    <Svg width={size} height={size} viewBox="0 0 512 512" fill="none" stroke={color} strokeWidth={strokeWidth} strokeLinecap="round" strokeLinejoin="round">
      <Rect x={48} y={96} width={416} height={320} rx={40} ry={40} />
      <Path d="M112 160l144 112 144-112" />
    </Svg>
  );
}

export function EmailButton() {
  return (
    <Link href="/auth/login" asChild>
      <Pressable
        accessibilityRole="button"
        accessibilityLabel="Continue with email"
        className="h-[54px] flex-row items-center justify-center gap-2.5 rounded-2xl bg-[#C94358] active:opacity-80"
    >
        <MailIcon />
        <Text className="text-base font-semibold text-white">Continue with email</Text>
      </Pressable>
    </Link>
  );
}