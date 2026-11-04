import { Ionicons } from "@expo/vector-icons";
import { useEffect, useState } from "react";
import { Keyboard, Pressable, Text, TextInput, useWindowDimensions, View } from "react-native";
import Animated, { useAnimatedStyle, useSharedValue, withTiming } from "react-native-reanimated";
import { SafeAreaView } from "react-native-safe-area-context";

import { GradientBackground } from "@/components/ui/gradientBackground";
import { GoalIllustration } from "@/components/onBoarding.tsx/setGoal";
import { WeightIllustration } from "@/components/onBoarding.tsx/setWeight";
import { AllSetIllustration } from "@/components/onBoarding.tsx/allSet";

const TOTAL_PAGES = 3;
const GOAL_OPTIONS = [1, 2, 3, 4, 5, 6, 7];

export default function OnBoarding() {
   const [page, setPage] = useState(0);
   const [goal, setGoal] = useState(4);
   const [weight, setWeight] = useState("");
   const [unit, setUnit] = useState<"lb" | "kg">("lb");
   const [weightFocus, setWeightFocus] = useState(false);
   const { width: screenWidth } = useWindowDimensions();

   // All pages sit side by side in one row; sliding the row shows the current page
   const offsetX = useSharedValue(0);
   useEffect(() => {
      offsetX.value = withTiming(-page * screenWidth, { duration: 300 });
   }, [page, screenWidth, offsetX]);
   const rowStyle = useAnimatedStyle(() => ({
      transform: [{ translateX: offsetX.value }],
   }));

   function goToPage(next: number) {
      Keyboard.dismiss();
      setPage(next);
   }

   // Only allow digits and one decimal point, max 5 characters (e.g. "182.4")
   function handleWeightChange(text: string) {
      const cleaned = text.replace(/[^0-9.]/g, "").replace(/(\..*)\./g, "$1");
      if(Number(cleaned.slice(0, 5)) < 1500){
         setWeight(cleaned.slice(0,5))
      }
   }

   return (
      <GradientBackground>
         <SafeAreaView className="flex-1 px-6 pb-6">
            {/* Top bar: back button on the left, progress dots centered */}
            <View className="mt-2 h-14 flex-row items-center justify-center gap-2">
               {page > 0 && (
                  <Pressable
                     onPress={() => goToPage(page - 1)}
                     accessibilityRole="button"
                     accessibilityLabel="Back"
                     hitSlop={8}
                     className="absolute left-0 h-12 w-12 items-center justify-center rounded-full bg-white/20 active:opacity-70"
                  >
                     <Ionicons name="chevron-back" size={20} color="white" />
                  </Pressable>
               )}

               {Array.from({ length: TOTAL_PAGES }, (_, i) => (
                  <View
                     key={i}
                     className={`h-2 rounded-full ${i === page ? "w-6 bg-white" : "w-2 bg-white/40"}`}
                  />
               ))}
            </View>

            {/* Spans the full screen width (cancels the px-6) so pages slide in from the screen edge */}
            <View className="-mx-6 flex-1 overflow-hidden">
               <Animated.View className="flex-1 flex-row" style={rowStyle}>
                  {/* ---------- Page 1: weekly goal ---------- */}
                  <View
                     style={{ width: screenWidth }}
                     className="px-6 pt-4"
                     aria-hidden={page !== 0}
                  >
                     {/* Fixed spacing (not justify-evenly) keeps the image at the same height on every page */}
                     <View className="-mx-6 items-center">
                        <GoalIllustration width={screenWidth * 0.8} />
                     </View>

                     <View className="mt-8 items-center">
                        <Text className="text-[26px] font-bold tracking-tight text-white">
                           Set your goal
                        </Text>
                        <Text className="mt-2 max-w-[290px] text-center text-[15px] leading-[22px] text-white/90">
                           How many days a week do you want to work out?
                        </Text>

                        {/* 1–7 circles */}
                        <View className="mt-7 w-full flex-row justify-between">
                           {GOAL_OPTIONS.map((days) => {
                              const selected = days === goal;
                              return (
                                 <Pressable
                                    key={days}
                                    onPress={() => setGoal(days)}
                                    accessibilityRole="button"
                                    accessibilityState={{ selected }}
                                    accessibilityLabel={`${days} days a week`}
                                    className={`h-12 w-12 items-center justify-center rounded-xl active:opacity-80 ${
                                       selected ? "bg-white" : "border-2 border-white/60"
                                    }`}
                                    style={
                                       selected
                                          ? {
                                               shadowColor: "#78203A",
                                               shadowOpacity: 0.25,
                                               shadowRadius: 8,
                                               shadowOffset: { width: 0, height: 6 },
                                               elevation: 6,
                                            }
                                          : undefined
                                    }
                                 >
                                    <Text
                                       className={`text-[17px] font-bold ${selected ? "text-[#CF4673]" : "text-white"}`}
                                    >
                                       {days}
                                    </Text>
                                 </Pressable>
                              );
                           })}
                        </View>

                        {/* "3 days a week" pill */}
                        <View className="mt-4 rounded-full bg-white/15 px-4 py-2">
                           <Text className="text-sm font-semibold text-white">
                              {goal} {goal === 1 ? "day" : "days"} a week
                           </Text>
                        </View>
                        <Text className="mt-2 text-[13px] text-white/75">
                           You can change this anytime.
                        </Text>
                     </View>
                  </View>

                  {/* ---------- Page 2: starting weight ---------- */}
                  <View style={{ width: screenWidth }} aria-hidden={page !== 1}>
                     <Pressable
                        onPress={Keyboard.dismiss}
                        accessible={false}
                        className="flex-1 px-6 pt-4"
                     >
                        <View className="-mx-6 items-center">
                           <WeightIllustration width={screenWidth * 0.8} />
                        </View>

                        <View className="mt-8 items-center">
                           <Text className="text-[26px] font-bold tracking-tight text-white">
                              Starting weight
                           </Text>

                           <View className="mt-2 flex-row items-center gap-2">
                              <View className="rounded-full bg-white/20 px-2.5 py-0.5">
                                 <Text className="text-xs font-bold text-white">OPTIONAL</Text>
                              </View>
                              <Text className="text-sm text-white/90">Only you can see this.</Text>
                           </View>

                           {/* Big number field + lb/kg toggle */}
                           <View className="mt-7 w-full flex-row gap-2.5">
                              <View
                                 className={`h-[68px] flex-1 flex-row items-center rounded-[18px] border-2 bg-white/15 px-[18px] ${
                                    weightFocus ? "border-white" : "border-white/60"
                                 }`}
                              >
                                 <TextInput
                                    value={weight}
                                    onChangeText={handleWeightChange}
                                    onFocus={() => setWeightFocus(true)}
                                    onBlur={() => setWeightFocus(false)}
                                    placeholder="0"
                                    maxLength={5}
                                    placeholderTextColor="rgba(255,255,255,0.55)"
                                    keyboardType="decimal-pad"
                                    accessibilityLabel={`Starting weight in ${unit}`}
                                    className="flex-1 text-[32px] font-bold text-white"
                                 />
                                 <Text className="text-[17px] font-semibold text-white/85">{unit}</Text>
                              </View>

                              <View className="h-[68px] w-[60px] gap-1 rounded-[18px] bg-white/15 p-1">
                                 {(["lb", "kg"] as const).map((u) => {
                                    const selected = unit === u;
                                    return (
                                       <Pressable
                                          key={u}
                                          onPress={() => setUnit(u)}
                                          accessibilityRole="button"
                                          accessibilityState={{ selected }}
                                          className={`flex-1 items-center justify-center rounded-[14px] ${
                                             selected ? "bg-white" : ""
                                          }`}
                                       >
                                          <Text
                                             className={`text-sm font-bold ${selected ? "text-[#CF4673]" : "text-white"}`}
                                          >
                                             {u}
                                          </Text>
                                       </Pressable>
                                    );
                                 })}
                              </View>
                           </View>
                        </View>
                     </Pressable>
                  </View>

                  {/* ---------- Page 3: all set ---------- */}
                  <View
                     style={{ width: screenWidth }}
                     className="px-6 pt-4"
                     aria-hidden={page !== 2}
                  >
                     <View className="-mx-6 items-center">
                        <AllSetIllustration width={screenWidth * 0.8} />
                     </View>

                     <View className="mt-8 items-center">
                        <Text className="text-[26px] font-bold tracking-tight text-white">
                           You&apos;re all set!
                        </Text>
                        <Text className="mt-2 max-w-[290px] text-center text-[15px] leading-[22px] text-white/90">
                           Your goal is {goal} {goal === 1 ? "day" : "days"} a week. Let&apos;s get started.
                        </Text>
                     </View>
                  </View>
               </Animated.View>
            </View>

            {page < TOTAL_PAGES - 1 && (
               <Pressable
                  onPress={() => goToPage(page + 1)}
                  accessibilityRole="button"
                  className={`h-[54px] items-center justify-center rounded-full active:opacity-80 ${page == 1 && weight === "" ? "border border-white bg-white/10" : "bg-white"}`}
               >
                  <Text className={`text-base font-bold ${page == 1 && weight === "" ? "text-white" : "text-[#CF4673]"}`}>{page == 1 && weight === "" ? "Skip" : "Next"}</Text>
               </Pressable>
            )}
         </SafeAreaView>
      </GradientBackground>
   );
}