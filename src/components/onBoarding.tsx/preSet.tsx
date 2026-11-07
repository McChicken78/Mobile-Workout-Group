import Svg, { Circle, Ellipse, G, Path, Rect, Text as SvgText } from "react-native-svg";

const SKIN = "#F6C7A8";
const DARK = "#3A1D2E";
const CAN = "#5B8DEF";

// The streak flame, drawn at full size and scaled into place.
// cx = center x, base = where the bottom of the flame sits, size = scale
function Flame({ cx, base, size }: { cx: number; base: number; size: number }) {
  return (
    <G transform={`translate(${cx - 150 * size}, ${base - 190 * size}) scale(${size})`}>
      <Path
        d="M150 74 C 172 104 190 122 190 150 A 40 40 0 0 1 110 150 C 110 130 122 118 132 108 C 132 126 140 134 150 134 C 144 114 138 98 150 74 Z"
        fill="#F2A541"
      />
      <Path
        d="M150 118 C 162 134 170 144 170 158 A 20 20 0 0 1 130 158 C 130 146 140 138 146 132 C 146 140 150 144 154 144 C 152 136 148 128 150 118 Z"
        fill="#FFD27A"
      />
    </G>
  );
}

// Small four-point sparkle centered at (x, y)
function Sparkle({ x, y, size = 1 }: { x: number; y: number; size?: number }) {
  return (
    <Path
      transform={`translate(${x}, ${y}) scale(${size})`}
      d="M0 -6 L 2 -2 L 6 0 L 2 2 L 0 6 L -2 2 L -6 0 L -2 -2 Z"
      fill="#FFFFFF"
    />
  );
}

export function PreSetIllustration({ width = 322, streak = 12 }: { width?: number; streak?: number }) {
  return (
    <Svg width={width} height={width * (220 / 300)} viewBox="0 0 300 220">
      {/* Cloud */}
      <G fill="#FFFFFF" opacity={0.9}>
        <Ellipse cx={58} cy={40} rx={24} ry={9} />
        <Circle cx={50} cy={34} r={9} />
        <Circle cx={64} cy={31} r={11} />
      </G>

      {/* Island */}
      <Path
        d="M16 192 Q 50 172 150 174 Q 256 176 286 192 Q 256 210 150 210 Q 40 210 16 192 Z"
        fill="#FFFFFF"
      />

      {/* Small pink plant on the left */}
      <G fill="#FFD9D2">
        <Path d="M44 190 C 40 174 44 162 52 152 C 58 164 56 178 50 190 Z" />
        <Path d="M50 190 C 56 178 66 172 76 172 C 72 182 64 188 54 191 Z" />
      </G>

      {/* Flame plant: stem, two leaves, flame on top */}
      <Path d="M212 146 C 212 128 208 114 212 96" stroke="#4CB782" strokeWidth={4} strokeLinecap="round" fill="none" />
      <Path d="M211 128 C 198 126 190 116 190 106 C 202 106 210 114 211 128 Z" fill="#4CB782" />
      <Path d="M212 118 C 224 116 232 106 232 96 C 220 96 212 104 212 118 Z" fill="#62CC95" />
      <Flame cx={212} base={100} size={0.42} />

      {/* Pot */}
      <Rect x={186} y={142} width={52} height={10} rx={4} fill="#C9653E" />
      <Path d="M190 151 L 234 151 L 228 190 L 196 190 Z" fill="#E07A4F" />

      {/* Water drops */}
      <G fill="#9CD3FF">
        <Circle cx={196} cy={114} r={2.2} />
        <Circle cx={200} cy={122} r={2.2} />
        <Circle cx={204} cy={130} r={2.2} />
      </G>

      {/* Person: legs, shoes, relaxed arm */}
      <Rect x={102} y={148} width={10} height={46} rx={5} fill={DARK} />
      <Rect x={115} y={148} width={10} height={46} rx={5} fill={DARK} />
      <Ellipse cx={105} cy={196} rx={8} ry={3.5} fill={DARK} />
      <Ellipse cx={122} cy={196} rx={8} ry={3.5} fill={DARK} />
      <Path d="M101 120 L 93 148" stroke={SKIN} strokeWidth={7} strokeLinecap="round" />

      {/* Watering can + the arm holding it */}
      <Path d="M150 104 C 158 92 168 92 172 104" stroke={CAN} strokeWidth={4} fill="none" strokeLinecap="round" />
      <Rect x={146} y={102} width={30} height={22} rx={6} fill={CAN} />
      <Path d="M174 110 L 192 100" stroke={CAN} strokeWidth={5} strokeLinecap="round" />
      <Circle cx={193} cy={100} r={3.5} fill={CAN} />
      <Path d="M126 120 L 148 116" stroke={SKIN} strokeWidth={7} strokeLinecap="round" />

      {/* Body, neck, head, hair */}
      <Rect x={100} y={110} width={27} height={42} rx={9} fill="#7DD3FC" />
      <Rect x={109} y={102} width={9} height={10} rx={3} fill={SKIN} />
      <Circle cx={113} cy={92} r={13} fill={SKIN} />
      <Path d="M100 90 C 100 76 126 74 127 90 C 120 84 108 84 100 90 Z" fill={DARK} />

      {/* Streak badge */}
      <Rect x={226} y={30} width={62} height={28} rx={14} fill="#FFFFFF" />
      <Flame cx={244} base={51} size={0.13} />
      <SvgText x={266} y={49} textAnchor="middle" fontSize={14} fontWeight="800" fill="#CF4673">
        {streak}
      </SvgText>

      {/* Sparkles */}
      <Sparkle x={178} y={76} size={1} />
      <Sparkle x={248} y={124} size={1.35} />
      <Sparkle x={200} y={69} size={0.75} />
    </Svg>
  );
}