import type { ColorValue } from "react-native";
import Svg, { Circle, Path, Rect } from "react-native-svg";

type IconProps = { color: ColorValue; size: number };

const strokeProps = (color: ColorValue) => ({
  fill: "none",
  stroke: color,
  strokeWidth: 2,
  strokeLinecap: "round" as const,
  strokeLinejoin: "round" as const,
});

export function HomeIcon({ color, size }: IconProps) {
  return (
    <Svg width={size} height={size} viewBox="0 0 24 24" {...strokeProps(color)}>
      <Path d="M15 21v-8a1 1 0 0 0-1-1h-4a1 1 0 0 0-1 1v8" />
      <Path d="M3 10a2 2 0 0 1 .709-1.528l7-6a2 2 0 0 1 2.582 0l7 6A2 2 0 0 1 21 10v9a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z" />
    </Svg>
  );
}

export function CalendarIcon({ color, size }: IconProps) {
  return (
    <Svg width={size} height={size} viewBox="0 0 24 24" {...strokeProps(color)}>
      <Path d="M8 2v3" />
      <Path d="M16 2v3" />
      <Rect x="3" y="3" width="18" height="18" rx="2" />
      <Path d="M3 9h18" />
      <Path d="M8 13h.01" />
      <Path d="M12 13h.01" />
      <Path d="M16 13h.01" />
      <Path d="M8 17h.01" />
      <Path d="M12 17h.01" />
      <Path d="M16 17h.01" />
    </Svg>
  );
}

export function CrewIcon({ color, size }: IconProps) {
  return (
    <Svg width={size} height={size} viewBox="0 0 24 24" {...strokeProps(color)}>
      <Path d="M17 21v-1a2 2 0 00-2-2H9a2 2 0 00-2 2v1" />
      <Path d="M19 10h1a2 2 0 012 2v1" />
      <Path d="M5 10H4a2 2 0 00-2 2v1" />
      <Circle cx="12" cy="11" r="3" />
      <Circle cx="18" cy="4" r="2" />
      <Circle cx="6" cy="4" r="2" />
    </Svg>
  );
}

export function ProfileIcon({ color, size }: IconProps) {
  return (
    <Svg width={size} height={size} viewBox="0 0 24 24" {...strokeProps(color)}>
      <Path d="M17.925 20.056a6 6 0 0 0-11.851.001" />
      <Circle cx="12" cy="11" r="4" />
      <Circle cx="12" cy="12" r="10" />
    </Svg>
  );
}
