import Svg, { Circle, Ellipse, G, Path, Rect, Text as SvgText } from "react-native-svg";

const SKIN = "#F6C7A8";
const DARK = "#3A1D2E";
const PINK = "#CF4673";

type Props = {
   offline?: boolean;
   width?: number;
};

export function ErrorIllustration({ offline = false, width = 322 }: Props) {
   return (
      <Svg width={width} height={width * (220 / 300)} viewBox="0 0 300 220">
         {/* Cloud */}
         <G fill="#F3D5DA">
            <Ellipse cx={60} cy={40} rx={24} ry={9} />
            <Circle cx={52} cy={34} r={9} />
            <Circle cx={66} cy={31} r={11} />
         </G>

         {/* Island */}
         <Path
            d="M20 192 Q 56 172 150 174 Q 252 176 282 192 Q 252 210 150 210 Q 46 210 20 192 Z"
            fill="#FBE1E5"
         />

         {/* Plant */}
         <G fill="#FFD9D2">
            <Path d="M262 190 C 256 172 260 158 268 146 C 274 160 274 176 266 190 Z" />
            <Path d="M266 190 C 272 178 280 172 288 172 C 284 182 276 188 268 191 Z" />
         </G>

         {/* Dropped dumbbell */}
         <G rotation={-8} origin="190, 186">
            <Rect x={172} y={183} width={36} height={5} rx={2.5} fill={DARK} />
            <Rect x={166} y={175} width={9} height={21} rx={3} fill={DARK} />
            <Rect x={205} y={175} width={9} height={21} rx={3} fill={DARK} />
         </G>

         {/* Question marks */}
         <SvgText x={84} y={66} textAnchor="middle" fontSize={18} fontWeight="800" fill="#DC5863">?</SvgText>
         <SvgText x={146} y={58} textAnchor="middle" fontSize={14} fontWeight="800" fill="#DC5863">?</SvgText>

         {/* Legs + shoes */}
         <Rect x={102} y={148} width={10} height={46} rx={5} fill={DARK} />
         <Rect x={115} y={148} width={10} height={46} rx={5} fill={DARK} />
         <Ellipse cx={105} cy={196} rx={8} ry={3.5} fill={DARK} />
         <Ellipse cx={122} cy={196} rx={8} ry={3.5} fill={DARK} />

         {/* Shrugging arms */}
         <Path d="M101 121 L 90 139 L 79 127" stroke={SKIN} strokeWidth={7} strokeLinecap="round" strokeLinejoin="round" fill="none" />
         <Path d="M126 121 L 137 139 L 148 127" stroke={SKIN} strokeWidth={7} strokeLinecap="round" strokeLinejoin="round" fill="none" />

         {/* Body, neck, head, hair */}
         <Rect x={100} y={110} width={27} height={42} rx={9} fill="#F2A541" />
         <Rect x={109} y={102} width={9} height={10} rx={3} fill={SKIN} />
         <Circle cx={113} cy={92} r={13} fill={SKIN} />
         <Path d="M100 90 C 100 76 126 74 127 90 C 120 84 108 84 100 90 Z" fill={DARK} />

         {/* Speech bubble */}
         <Path d="M200 100 L 190 116 L 210 104 Z" fill="#FFFFFF" stroke="#F3D5DA" strokeWidth={2} strokeLinejoin="round" />
         <Circle cx={218} cy={78} r={30} fill="#FFFFFF" stroke="#F3D5DA" strokeWidth={2} />

         {offline ? (
            // Wi-Fi with a slash
            <G>
               <G fill="none" stroke={PINK} strokeWidth={4} strokeLinecap="round">
                  <Path d="M201 76 a 24 24 0 0 1 34 0" />
                  <Path d="M207 83 a 15 15 0 0 1 22 0" />
                  <Path d="M203 62 L 233 94" />
               </G>
               <Circle cx={218} cy={92} r={3.5} fill={PINK} />
            </G>
         ) : (
            // Exclamation mark
            <G>
               <Rect x={214} y={60} width={8} height={24} rx={4} fill={PINK} />
               <Circle cx={218} cy={93} r={4.5} fill={PINK} />
            </G>
         )}
      </Svg>
   );
}