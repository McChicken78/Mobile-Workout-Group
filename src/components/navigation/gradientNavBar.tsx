import type { BottomTabBarProps } from "expo-router/tabs";
import { LinearGradient } from "expo-linear-gradient";
import { Pressable, Text } from "react-native";

export function GradientNavBar({ state, descriptors, navigateToTab }: BottomTabBarProps) {
  return (
    <LinearGradient
      colors={["#DC5863", "#C94358"]}
      style={{
        position: "absolute",
        left: 18,
        right: 18,
        bottom: 34,
        height: 68,
        borderRadius: 34,
        flexDirection: "row",
        alignItems: "center",
      }}
    >
      {state.routes.map((route, index) => {
        const { options } = descriptors[route.key];
        const focused = state.index === index;
        const color = focused ? "white" : "rgba(255,255,255,0.6)";

        return (
          <Pressable
            key={route.key}
            onPress={() => navigateToTab(route.key)}
            className="flex-1 items-center gap-[3px]"
          >
            {options.tabBarIcon?.({ focused, color, size: 22 })}
            <Text style={{ color, fontSize: 11, fontWeight: focused ? "800" : "600" }}>
              {options.title}
            </Text>
          </Pressable>
        );
      })}
    </LinearGradient>
  );
}