// src/app/index.tsx
import { ActivityIndicator, View } from "react-native";

// The root layout decides where to send the user; this just shows while it checks
export default function Index() {
   return (
      <View className="flex-1 justify-center items-center">
         <ActivityIndicator size="large" color="#DC5863" />
      </View>
   );
}
