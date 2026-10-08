import { useState } from "react";
import { Text, TextInput, View } from "react-native";
import { PasswordField } from "../ui/passwordField";
import { LoginButton } from "./loginButton";


export function LoginArea(){
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    return(
        <View>
            <Text className="text-lg font-semibold text-black">
                Email
            </Text>
            <TextInput
                value={email}
                onChangeText={setEmail}
                placeholder="default@example.com"
                placeholderTextColor="neutral-600"
                className="mt-2 h-[64px] mb-6 rounded-2xl border-[1.5px] border-neutral-400 bg-white px-4 text-base text-neutral-900 active:border-[2px] active:border-[#DC5863]"/>

            <PasswordField
                label="Password"
                value={password}
                onChangeText={setPassword}
                placeholder="Your password"
                textContentType="password"
            />

            <View className="my-6 flex-row items-center gap-3">
                <View className="h-px flex-1 bg-[#EFE7EA]" />
            </View>

            <LoginButton/>


        </View>
    )
}