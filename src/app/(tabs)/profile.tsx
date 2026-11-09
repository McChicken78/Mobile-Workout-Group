import { Alert, Pressable, Text, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { useAuth } from '@/context/AuthProvider'

export default function Profile() {

   const { user, signOut } = useAuth()

   async function handleLogout(){
      try{
         await signOut()
      }
      catch(error: any){
            Alert.alert(error)
      }
   }

   return (
      <SafeAreaView className="flex-1" edges={["top", "left", "right"]}>
         <View className="flex-1 justify-between">
            <Text>Profile page logged in</Text>
            <Text>User: {user?.email}</Text>

            <Pressable onPress={handleLogout} className="items-end p-4 bg-white text-[#DC5863] m-4 rounded-md ">
               <Text>Sign out</Text>
            </Pressable>
         </View>
  

      </SafeAreaView>
   );
}
