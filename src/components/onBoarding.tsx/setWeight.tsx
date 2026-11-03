import Svg, { Circle, Ellipse, G, Path, Rect } from "react-native-svg";

const SKIN = "#F6C7A8";
const DARK = "#3A1D2E";
const SHIRT = "#7DD3FC";

export function WeightIllustration({ width = 300 }: { width?: number }) {
  return (
    <Svg width={width} height={width * (220 / 300)} viewBox="0 0 300 220">
      {/* Clouds */}
      <G fill="#FFFFFF" opacity={0.9}>
        <Ellipse cx={58} cy={44} rx={24} ry={9} />
        <Circle cx={50} cy={38} r={9} />
        <Circle cx={64} cy={35} r={11} />
        <Ellipse cx={248} cy={24} rx={16} ry={6} />
        <Circle cx={252} cy={19} r={7} />
      </G>

      {/* Island */}
      <Path
        d="M20 192 Q 56 172 150 174 Q 252 176 282 192 Q 252 210 150 210 Q 46 210 20 192 Z"
        fill="#FFFFFF"
      />

      {/* Plants */}
      <G fill="#FFD9D2">
        <Path d="M42 190 C 38 172 42 160 50 150 C 56 162 54 176 48 190 Z" />
        <Path d="M48 190 C 54 178 64 172 74 172 C 70 182 62 188 52 191 Z" />
      </G>
      <G fill="#FFB9AE">
        <Path d="M252 190 C 246 170 250 156 260 144 C 266 158 266 176 258 190 Z" />
        <Path d="M258 190 C 266 176 278 170 288 170 C 284 182 274 188 262 191 Z" />
      </G>

      {/* Scale: shadow, side, top, corner dots */}
      <Ellipse cx={150} cy={205} rx={66} ry={5} fill="#F3C9C6" opacity={0.6} />
      <Path
        d="M104 166 L 196 166 Q 210 166 212 178 L 216 194 Q 218 204 206 204 L 94 204 Q 82 204 84 194 L 88 178 Q 90 166 104 166 Z"
        fill="#FFD3CC"
      />
      <Path
        d="M104 158 L 196 158 Q 210 158 212 170 L 216 186 Q 218 196 206 196 L 94 196 Q 82 196 84 186 L 88 170 Q 90 158 104 158 Z"
        fill="#FFFFFF"
        stroke="#FFD3CC"
        strokeWidth={2}
      />
      <Circle cx={100} cy={168} r={3} fill="#FFD3CC" />
      <Circle cx={200} cy={168} r={3} fill="#FFD3CC" />

      {/* Person, moved onto the scale */}
      <G x={37} y={-12}>
        <Rect x={102} y={148} width={10} height={46} rx={5} fill={DARK} />
        <Rect x={115} y={148} width={10} height={46} rx={5} fill={DARK} />
        <Ellipse cx={105} cy={195} rx={8} ry={3.5} fill="#1A0B10" />
        <Ellipse cx={122} cy={195} rx={8} ry={3.5} fill="#1A0B10" />
        <Path d="M101 120 L 90 146" stroke={SKIN} strokeWidth={7} strokeLinecap="round" />
        <Path d="M126 120 L 137 146" stroke={SKIN} strokeWidth={7} strokeLinecap="round" />
        <Rect x={100} y={110} width={27} height={42} rx={9} fill="#F2A541" />
        <Rect x={109} y={102} width={9} height={10} rx={3} fill={SKIN} />
        <Circle cx={113} cy={92} r={13} fill={SKIN} />
        <Path d="M100 90 C 100 76 126 74 127 90 C 120 84 108 84 100 90 Z" fill={DARK} />
      </G>

      {/* Sparkles */}
      <G fill="#FFFFFF">
        <Path d="M100 112 l2 6 l6 2 l-6 2 l-2 6 l-2 -6 l-6 -2 l6 -2 Z" />
        <Path d="M236 112 l1.6 4.4 l4.4 1.6 l-4.4 1.6 l-1.6 4.4 l-1.6 -4.4 l-4.4 -1.6 l4.4 -1.6 Z" />
        <Path d="M116 70 l1.2 3.3 l3.3 1.2 l-3.3 1.2 l-1.2 3.3 l-1.2 -3.3 l-3.3 -1.2 l3.3 -1.2 Z" />
      </G>
    </Svg>
  );
}