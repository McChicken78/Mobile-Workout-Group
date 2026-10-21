import { View, Text, Pressable } from "react-native"
import { SafeAreaView } from "react-native-safe-area-context"


export default function ErrorPage(){

    return (
        <SafeAreaView className="flex-1 bg-[#FFF5F6]">
            <Text className="text-2xl font-bold text-center text-black">
                404 Error
            </Text>
        </SafeAreaView>
    )
}