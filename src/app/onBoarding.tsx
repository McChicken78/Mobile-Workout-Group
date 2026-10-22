import { useState } from "react";
import { Pressable, Text, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { GradientBackground } from "@/components/ui/gradientBackground";

const TOTAL_PAGES = 3;
const GOAL_OPTIONS = [1, 2, 3, 4, 5, 6, 7];

export default function OnBoarding() {
  const [page, setPage] = useState(0);
  const [goal, setGoal] = useState(3);
  const [weight, setWeight] = useState<number | null>(null);

  return (
    <GradientBackground>
      <SafeAreaView className="flex-1 px-6 pb-6">
        {/* Progress dots */}
        <View className="mt-4 flex-row justify-center gap-2">
          {Array.from({ length: TOTAL_PAGES }, (_, i) => (
            <View
              key={i}
              className={`h-2 rounded-full ${i === page ? "w-6 bg-white" : "w-2 bg-white/40"}`}
            />
          ))}
        </View>

        {/* Page 1: weekly goal */}
        {page === 0 && (
          <View className="flex-1 justify-center">
            <Text className="text-4xl font-bold tracking-tight text-white">
              How often do you want to work out?
            </Text>
            <Text className="mt-2 text-lg text-white/80">
              Pick a weekly goal. You can change it later.
            </Text>

            <View className="mt-10 flex-row justify-between">
              {GOAL_OPTIONS.map((days) => {
                const selected = days === goal;
                return (
                  <Pressable
                    key={days}
                    onPress={() => setGoal(days)}
                    accessibilityRole="button"
                    accessibilityState={{ selected }}
                    accessibilityLabel={`${days} days a week`}
                    className={`h-11 w-11 items-center justify-center rounded-full ${
                      selected ? "bg-white" : "bg-white/20"
                    }`}
                  >
                    <Text className={`text-lg font-bold ${selected ? "text-[#C94358]" : "text-white"}`}>
                      {days}
                    </Text>
                  </Pressable>
                );
              })}
            </View>

            <Text className="mt-4 text-center text-base text-white/80">
              {goal} {goal === 1 ? "day" : "days"} a week
            </Text>
          </View>
        )}

        <Pressable
          onPress={() => setPage(page + 1)}
          accessibilityRole="button"
          className="h-[54px] items-center justify-center rounded-2xl bg-white active:opacity-80"
        >
          <Text className="text-xl font-semibold text-[#C94358]">Next</Text>
        </Pressable>
      </SafeAreaView>
    </GradientBackground>
  );
}