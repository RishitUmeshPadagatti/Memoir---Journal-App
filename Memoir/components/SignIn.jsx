import React, { useState } from "react";
import { TextInput, StyleSheet, useColorScheme, Text, Button, View, Pressable } from "react-native";
import { ThemedView } from "./ThemedView";
import { useSetRecoilState } from "recoil";
import { ThemedText } from "./ThemedText";
import { isAuthenticatedAtom } from "@/atoms/atoms";
import {serverLocation} from "../constants/utils"
import axios from 'axios'

export function SignIn() {
    const colorScheme = useColorScheme();
    const useSetIsAuthenticatedAtom = useSetRecoilState(isAuthenticatedAtom)

    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")

    const styles = getStyles(colorScheme);

    const handleSubmit = async () => {
        try {
            const result = await axios.post(`${serverLocation}/api/auth/signin`, {
                email: email,
                password: password
            })
            
            console.log(result.data.token);
            storeToken(result.data.token)
            useSetIsAuthenticatedAtom(true)
        } catch (error) {
            console.error(error)
            Alert.alert("Error", "Something went wrong");
        }
    };

    return (
        <ThemedView style={{ paddingHorizontal: 20}}>
            <ThemedText style={styles.title}>Sign In</ThemedText>
            <TextInput
                placeholder="Email"
                placeholderTextColor={styles.placeholderColor}
                style={styles.inputBox}
                keyboardType="email-address"
                autoCapitalize="none"
                onChangeText={setEmail}
                value={email}
            />
            <TextInput
                placeholder="Password"
                placeholderTextColor={styles.placeholderColor}
                style={styles.inputBox}
                secureTextEntry
                onChangeText={setPassword}
                value={password}
            />
            
            <Pressable style={styles.buttonContainer} onPress={handleSubmit}>
                <ThemedText style={{padding: 6}}>Sign In</ThemedText>
            </Pressable>
        </ThemedView>
    );
}

const getStyles = (colorScheme) => {
    const isDarkMode = colorScheme === 'dark';

    return StyleSheet.create({
        title: {
            fontSize: 25,
            alignSelf: 'center',
            paddingBottom: 10,
            fontWeight: '700'
        },
        inputBox: {
            borderWidth: 1,
            borderColor: isDarkMode ? "#555" : "#ddd", // Dark mode: darker border
            borderRadius: 10,
            padding: 15,
            marginBottom: 15,
            backgroundColor: isDarkMode ? "#333" : "#fff", // Dark mode: darker background
            color: isDarkMode ? "#fff" : "#000", // Dark mode: white text
            fontSize: 16,
        },
        placeholderColor: isDarkMode ? "#aaa" : "#888", // Dark mode: lighter placeholder color
        buttonContainer: {
            marginTop: 20,
            backgroundColor: isDarkMode ? "#444" : "#f0f0f0", // Darker for dark mode, soft gray for light mode
            borderRadius: 10, // Add rounded corners for the button container
            padding: 10, // Add padding to make the button area larger
            alignItems: "center",
        },
    });
};
