import { useState } from "react";
import { View, Pressable } from "react-native";
import { SignUp } from "./SignUp";
import { SignIn } from "./SignIn";
import { ThemedText } from "./ThemedText";

export function Authentication() {
    const [signingUp, setSigningUp] = useState(true)

    const onPress = () => {
        setSigningUp(e => !e)
    }

    return (<View>
        {signingUp ? (
            <SignUp />
        ) : (
            <SignIn />
        )}
        <Pressable onPress={onPress} style={{ alignItems: 'center', marginTop: 10 }}>
            <ThemedText style={{ fontSize: 12 }}>{signingUp ? "Already have an account?" : "Don't have an account?"}</ThemedText>
        </Pressable>
    </View>);
}
