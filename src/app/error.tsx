import { Text, View } from "react-native";
import { useRouter } from "expo-router";
import { SafeAreaView } from "react-native-safe-area-context";
import { ErrorIllustration } from "@/components/gifs/error";
import { LoginButton } from "@/components/auth/loginButton";

export default function ErrorPage() {
   const router = useRouter();

   function handleTryAgain() {
      if (router.canGoBack()){
         router.back();
      }
      else {
         router.replace("/auth/welcome");
      }
   }

   return (
      <SafeAreaView className="flex-1 bg-white px-6 pb-6">
         <View className="flex-1 items-center justify-center">
            <ErrorIllustration />
            <Text className="mt-6 text-3xl font-bold tracking-tight text-[#1A0B10]">
               Something went wrong
            </Text>
            <Text className="mt-2 text-center text-lg text-[#6E6468]">
               Check your connection and try again
            </Text>
         </View>

         <LoginButton onPress={handleTryAgain} label="Try again" />
      </SafeAreaView>
   );
}
