import { useState } from "react";
import { Pressable, Text, useWindowDimensions, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

import { GradientBackground } from "@/components/ui/gradientBackground";
import { GoalIllustration } from "@/components/onBoarding.tsx/setGoal";

const TOTAL_PAGES = 3;
const GOAL_OPTIONS = [1, 2, 3, 4, 5, 6, 7];

export default function OnBoarding() {
   const [page, setPage] = useState(0);
   const [goal, setGoal] = useState(4);
   const [weight, setWeight] = useState<number | null>(null);
   const { width: screenWidth } = useWindowDimensions();

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
               <View className="flex-1 justify-evenly">
                  <View className="-mx-6 items-center">
                     <GoalIllustration width={screenWidth * 0.85} />
                  </View>

                  <View>
                     <Text className="-mt-6 text-3xl text-center font-bold tracking-tight text-white">
                        Set your goal!
                     </Text>
                     <Text className="mt-2 text-center text-md text-white/80">
                        Pick how many days a week you plan to work out.
                     </Text>

                     <View className="mt-8 flex-row justify-between ">
                        {GOAL_OPTIONS.map((days) => {
                           const selected = days === goal;
                           return (
                              <Pressable
                                 key={days}
                                 onPress={() => setGoal(days)}
                                 accessibilityRole="button"
                                 accessibilityState={{ selected }}
                                 accessibilityLabel={`${days} days a week`}
                                 className={`h-12 w-12 items-center justify-center rounded-lg ${
                                    // Unselected needs scale-100 too: NativeWind can't add scale's CSS variables after the first render
                                    selected
                                       ? "bg-white border-white scale-125"
                                       : "bg-white/30 border-white scale-100"
                                 }`}
                              >
                                 <Text
                                    className={`text-lg font-bold ${selected ? "text-[#C94358] scale-110" : "text-white scale-100"}`}
                                 >
                                    {days}
                                 </Text>
                              </Pressable>
                           );
                        })}
                     </View>

                     <View className="mt-6">
                        <View className="self-center rounded-full bg-white/15 px-4 py-2 border border-white/30">
                           <Text className="text-base font-semibold text-white">
                              {goal} {goal === 1 ? "day" : "days"} a week
                           </Text>
                        </View>
                        <Text className="mt-2 text-center text-base text-white/80">
                           You can change your goal later
                        </Text>
                     </View>
                  </View>
               </View>
            )}

            {page >= 0 && page < TOTAL_PAGES - 1 && (
               <Pressable
                  onPress={() => setPage(page + 1)}
                  accessibilityRole="button"
                  className="h-[54px] items-center justify-center rounded-2xl bg-white active:opacity-80"
               >
                  <Text className="text-xl font-semibold text-[#C94358]">
                     Next
                  </Text>
               </Pressable>
            )}
         </SafeAreaView>
      </GradientBackground>
   );
}
