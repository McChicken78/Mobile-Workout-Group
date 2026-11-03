import Svg, { Circle, Ellipse, G, Path, Rect } from "react-native-svg";

const SKIN = "#F6C7A8";
const DARK = "#3A1D2E";
const SHIRT = "#7DD3FC";

export function GoalIllustration({ width = 300 }: { width?: number }) {
  return (
    <Svg width={width} height={width * (220 / 300)} viewBox="0 0 300 220">
      {/* Clouds */}
      <G fill="#FFFFFF" opacity={0.9}>
        <Ellipse cx={220} cy={34} rx={30} ry={11} />
        <Circle cx={208} cy={27} r={11} />
        <Circle cx={226} cy={23} r={14} />
        <Ellipse cx={62} cy={52} rx={20} ry={8} />
        <Circle cx={66} cy={45} r={9} />
      </G>

      {/* Island */}
      <Path
        d="M26 192 Q 58 172 150 174 Q 252 176 276 192 Q 252 210 150 210 Q 46 210 26 192 Z"
        fill="#FFFFFF"
      />

      {/* Right plant */}
      <G fill="#FFB9AE">
        <Path d="M232 186 C 222 160 226 140 238 122 C 246 142 246 164 236 186 Z" />
        <Path d="M240 186 C 246 166 258 154 272 150 C 270 166 260 180 244 187 Z" />
        <Path d="M230 186 C 220 172 208 166 196 166 C 202 178 214 186 230 188 Z" />
      </G>

      {/* Left plant */}
      <G fill="#FFD9D2">
        <Path d="M48 188 C 44 172 48 160 56 150 C 62 162 60 176 54 188 Z" />
        <Path d="M54 188 C 60 176 70 170 80 170 C 76 180 68 186 58 189 Z" />
      </G>

      {/* Person + flag (moved up 10 to sit on the island) */}
      <G y={-10}>
        {/* Flag pole + flag */}
        <Path d="M150 64 V 198" stroke={DARK} strokeWidth={4} strokeLinecap="round" />
        <Path d="M152 66 L 194 78 L 152 92 Z" fill={SHIRT} />

        {/* Arms */}
        <Path d="M124 120 L 146 104" stroke={SKIN} strokeWidth={7} strokeLinecap="round" />
        <Path d="M101 120 L 93 148" stroke={SKIN} strokeWidth={7} strokeLinecap="round" />

        {/* Back leg + shoes */}
        <Rect x={115} y={148} width={10} height={46} rx={5} fill={DARK} />
        <Ellipse cx={105} cy={196} rx={8} ry={3.5} fill={DARK} />
        <Ellipse cx={122} cy={196} rx={8} ry={3.5} fill={DARK} />

        {/* Neck, head, hair */}
        <Rect x={109} y={102} width={9} height={10} rx={3} fill={SKIN} />
        <Circle cx={113} cy={92} r={13} fill={SKIN} />
        <Path d="M100 90 C 100 76 126 74 127 90 C 120 84 108 84 100 90 Z" fill={DARK} />

        {/* Front leg + shirt (drawn last so they sit on top) */}
        <Rect x={102} y={148} width={10} height={46} rx={5} fill={DARK} />
        <Rect x={100} y={110} width={27} height={42} rx={9} fill={SHIRT} />
      </G>
    </Svg>
  );
}