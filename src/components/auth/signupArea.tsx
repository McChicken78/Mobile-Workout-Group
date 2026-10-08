import { useState } from "react";
import { Text, TextInput, View } from "react-native";
import { PasswordField } from "../ui/passwordField";
import { SignUpButton } from "../auth/signupButton";


export function SignUpArea(){
    const [displayName, setDisplayName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("")
    const [firstName, setFirstName] = useState("")
    const [lastName, setLastName] = useState("")

    return(
        <View>
            <Text className="text-lg font-semibold text-black">
                Display Name
            </Text>
            <TextInput
                value={displayName}
                onChangeText={setDisplayName}
                placeholder="Lebron James"
                placeholderTextColor="#8C8287"
                className="mt-2 h-[64px] mb-6 rounded-2xl border-[1.5px] border-neutral-400 bg-white px-4 text-base text-neutral-900 active:border-[2px] active:border-[#DC5863]"/>


            <Text className="text-lg font-semibold text-black">
                Email
            </Text>
            <TextInput
                value={email}
                onChangeText={setEmail}
                placeholder="default@example.com"
                placeholderTextColor="#8C8287"
                className="mt-2 h-[64px] mb-6 rounded-2xl border-[1.5px] border-neutral-400 bg-white px-4 text-base text-neutral-900 active:border-[2px] active:border-[#DC5863]"/>

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

            <SignUpButton/>

        </View>
    )
}