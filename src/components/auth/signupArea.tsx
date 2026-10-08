import { useState } from "react";
import { Text, TextInput, View } from "react-native";
import { PasswordField } from "../ui/passwordField";
import { SignUpButton } from "../auth/signupButton";


export function SignUpArea(){
    const [displayName, setDisplayName] = useState("");
    const [focusDisplayName, setFocusDisplayName] = useState(false);
    const [email, setEmail] = useState("");
    const [focusEmail, setFocusEmail] = useState(false);
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
                onFocus={() => setFocusDisplayName(true)}
                onBlur={() => setFocusDisplayName(false)}
                placeholder="Lebron James"
                placeholderTextColor="#8C8287"
                className={`mt-2 h-[64px] mb-6 rounded-2xl border-[1.5px] bg-white px-4 text-base text-neutral-900 ${
                    focusDisplayName ? "border-[#DC5863]" : "border-neutral-400"
                }`}/>


            <Text className="text-lg font-semibold text-black">
                Email
            </Text>
            <TextInput
                value={email}
                onChangeText={setEmail}
                onFocus={() => setFocusEmail(true)}
                onBlur={() => setFocusEmail(false)}
                placeholder="default@example.com"
                placeholderTextColor="#8C8287"
                className={`mt-2 h-[64px] mb-6 rounded-2xl border-[1.5px] bg-white px-4 text-base text-neutral-900 ${
                    focusEmail ? "border-[#DC5863]" : "border-neutral-400"
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

            <SignUpButton/>

        </View>
    )
}