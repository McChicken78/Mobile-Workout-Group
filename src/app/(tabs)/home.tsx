import { Alert, Pressable, Text, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { useAuth } from '@/context/AuthProvider'
import dayjs from "dayjs";

export default function Home() {

   return (
      <SafeAreaView className="flex-1 bg-[#FFF5F6]">
         <View className="flex-1 justify-between mt-4">
            <View className="flex flex-col">
               <Text className="text-lg font-semibold text-[#DC5863]">
                  {dayjs().format("dddd, MMMM D")}
               </Text>
            </View>

         </View>

      </SafeAreaView>
   );
}
