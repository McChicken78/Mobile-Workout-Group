import { useState } from "react";
import { Text, TextInput, View } from "react-native";
import { PasswordField } from "../ui/passwordField";
import { LoginButton } from "./loginButton";


export function LoginArea(){
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [emailFocused, setEmailFocused] = useState(false);

    function handleLogin(): void {

    }

    return(
        <View>
            <Text className="text-lg font-semibold text-black">
                Email
            </Text>
            <TextInput
                value={email}
                onChangeText={setEmail}
                onFocus={() => setEmailFocused(true)}
                onBlur={() => setEmailFocused(false)}
                placeholder="default@example.com"
                placeholderTextColor="#8C8287"
                className={`mt-2 h-[64px] mb-6 rounded-2xl border-[1.5px] bg-white px-4 text-base text-neutral-900 ${
                    emailFocused ? "border-[#DC5863]" : "border-neutral-400"
                }`}/>

            <PasswordField
                label="Password"
                value={password}
                onChangeText={setPassword}
                placeholder="Your password"
                textContentType="password"
            />

            <Text className="self-end py-2 text-base font-semibold text-[#DC5863]">
                Forgot Password?
            </Text>

            <View className="my-4 flex-row items-center gap-3">
                <View className="h-px flex-1 bg-[#EFE7EA]" />
            </View>

            <LoginButton/>

        

        </View>
    )
}