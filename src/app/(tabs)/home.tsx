import { Alert, Pressable, Text, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { useAuth } from '@/context/AuthProvider'
import { supabase } from '@/supabaseClient'

import dayjs from "dayjs";

export default function Home() {
   const { user } = useAuth();
   // const { error } = await supabase
   //    .from('profile')


   return (
      <SafeAreaView className="flex-1 bg-[#FFF5F6]">
         <View className="flex-1 justify-between mt-4">
            <View className="flex flex-col">
               <Text className="text-lg font-semibold text-neutral-600">
                  {dayjs().format("dddd, MMM D")}
               </Text>
               <Text className="text-xl font-semibold text-neutral-700">
                  
               </Text>
            </View>

         </View>

      </SafeAreaView>
   );
}
