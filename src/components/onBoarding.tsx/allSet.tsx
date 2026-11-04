import Svg, { Circle, G, Path, Rect } from "react-native-svg";

const DARK = "#3A1D2E";

// Hair shapes for each friend
const LONG_HAIR =
  "M99 92 C 98 74 128 74 127 92 C 128 102 132 110 126 116 C 126 104 124 92 113 86 C 104 90 101 98 101 106 C 96 102 98 96 99 92 Z";
const SHORT_HAIR = "M100 90 C 100 76 126 74 127 90 C 120 84 108 84 100 90 Z";
const BUZZ_HAIR = "M100 88 C 98 72 128 72 126 88 C 118 82 108 82 100 88 Z";

type FriendProps = {
  x: number;
  y: number;
  skin: string;
  shirt: string;
  pants: string;
  hair: string;
  hairColor: string;
};

// One cheering person with both arms up
function Friend({ x, y, skin, shirt, pants, hair, hairColor }: FriendProps) {
  return (
    <G x={x} y={y}>
      <Rect x={102} y={148} width={10} height={46} rx={5} fill={pants} />
      <Rect x={115} y={148} width={10} height={46} rx={5} fill={pants} />
      <Path d="M101 120 L 91 96" stroke={skin} strokeWidth={7} strokeLinecap="round" />
      <Path d="M126 120 L 136 96" stroke={skin} strokeWidth={7} strokeLinecap="round" />
      <Rect x={100} y={110} width={27} height={42} rx={9} fill={shirt} />
      <Rect x={109} y={102} width={9} height={10} rx={3} fill={skin} />
      <Circle cx={113} cy={92} r={13} fill={skin} />
      <Path d={hair} fill={hairColor} />
    </G>
  );
}

export function AllSetIllustration({ width = 322 }: { width?: number }) {
  return (
    <Svg width={width} height={width * (220 / 300)} viewBox="0 0 300 220">
      {/* Confetti */}
      <Rect x={40} y={40} width={10} height={5} rx={2} fill="#FFFFFF" rotation={-25} origin="45, 42" />
      <Rect x={196} y={22} width={12} height={5} rx={2} fill="#F2A541" rotation={30} origin="202, 24" />
      <Circle cx={98} cy={26} r={3.5} fill="#FFFFFF" />
      <Rect x={150} y={44} width={10} height={5} rx={2} fill="#FFFFFF" rotation={-40} origin="155, 46" />
      <Circle cx={272} cy={96} r={3} fill="#FFFFFF" />
      <Circle cx={24} cy={110} r={3} fill="#F2A541" />

      {/* Island */}
      <Path
        d="M14 192 Q 50 172 150 174 Q 256 176 288 192 Q 256 210 150 210 Q 40 210 14 192 Z"
        fill="#FFFFFF"
      />

      {/* Flag */}
      <Path d="M242 50 V 190" stroke={DARK} strokeWidth={4} strokeLinecap="round" />
      <Path d="M244 52 L 282 63 L 244 76 Z" fill="#F2A541" />

      {/* Left: long hair, blue shirt */}
      <Friend x={-60} y={-12} skin="#E8B08E" shirt="#5B8DEF" pants={DARK} hair={LONG_HAIR} hairColor={DARK} />

      {/* Middle: the same character as the other onboarding pages */}
      <Friend x={0} y={-18} skin="#F6C7A8" shirt="#F2A541" pants={DARK} hair={SHORT_HAIR} hairColor={DARK} />

      {/* Right: dark shirt, yellow pants */}
      <Friend x={60} y={-12} skin="#9C6B4E" shirt={DARK} pants="#F2A541" hair={BUZZ_HAIR} hairColor="#1A0B10" />
    </Svg>
  );
}