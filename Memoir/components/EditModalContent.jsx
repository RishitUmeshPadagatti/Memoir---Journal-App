import React, { useState } from "react";
import {
    StyleSheet,
    Text,
    TouchableOpacity,
    View,
    TextInput,
    Alert,
    useColorScheme,
} from "react-native";
import Ionicons from "react-native-vector-icons/Ionicons"; // Ensure you have this library installed
import { ThemedView } from "./ThemedView";
import { ThemedText } from "./ThemedText";
import { primaryColor } from "@/constants/Colors";
import axios from "axios";
import { serverLocation } from "@/constants/utils";
import { getToken } from "@/functions/SecureStore";
import { useSetRecoilState } from "recoil";
import { allJournalsAtom } from "@/atoms/atoms";

export function EditModalContent({ toggleModal, initialTitle = "", initialDescription = "" }) {
    const [title, setTitle] = useState(initialTitle);
    const [description, setDescription] = useState(initialDescription);
    const [isPosting, setIsPosting] = useState(false);
    const theme = useColorScheme();
    const setAllJournals = useSetRecoilState(allJournalsAtom)

    const handleSave = async () => {
        if (!title.trim() || !description.trim()) {
            Alert.alert("Validation Error", "Title and Description cannot be empty.");
            return;
        }

        setIsPosting(true);
        try {
            const token = await getToken()
            const response = await axios.post(`${serverLocation}/api/journal/`, {
                title: title,
                description: description
            }, {
                headers: {
                    "authorization": `Bearer ${token}`
                }
            });

            toggleModal(); // Close the modal after successful post
            newJournal = response.data.journal

            setAllJournals((prevJournals) => [newJournal, ...prevJournals]);
        } catch (error) {
            console.error(error);
            Alert.alert("Error", "There was an error posting your memoir. Please try again.");
        } finally {
            setIsPosting(false);
        }
    };

    const handleClose = async () => {
        toggleModal()
    }

    return (
        <ThemedView style={styles.modalBackground}>
            <ThemedView style={styles.modalContainer}>
                {/* Close Icon */}
                <TouchableOpacity onPress={handleClose} style={styles.closeIcon}>
                    <Ionicons name="close" size={24} color="#333" />
                </TouchableOpacity>

                <ThemedText style={styles.modalTitle}>New Journal</ThemedText>

                {/* Title Input */}
                <TextInput
                    style={[styles.input, theme === "dark" ? { color: "white" } : { color: "black" }]}
                    placeholder="Title"
                    value={title}
                    onChangeText={setTitle}
                />

                {/* Description Input */}
                <TextInput
                    style={[styles.input, styles.textArea, theme === "dark" ? { color: "white" } : { color: "black" }]}
                    placeholder="Description"
                    value={description}
                    onChangeText={setDescription}
                    multiline
                    numberOfLines={4}
                />

                {/* Submit Button */}
                <TouchableOpacity
                    onPress={handleSave}
                    style={[styles.submitButton, isPosting && styles.disabledButton]}
                    disabled={isPosting}
                >
                    <ThemedText style={styles.submitText}>{isPosting ? "Posting..." : "Submit"}</ThemedText>
                </TouchableOpacity>
            </ThemedView>
        </ThemedView>
    );
}

const styles = StyleSheet.create({
    modalBackground: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
    },
    modalContainer: {
        width: "100%",
        height: '90%',
        padding: 20,
        borderRadius: 10,
        alignItems: "stretch",
        shadowColor: "#000",
        shadowOpacity: 0.3,
        shadowRadius: 10,
        elevation: 10, // For Android shadow effect
    },
    closeIcon: {
        position: "absolute",
        top: 10,
        right: 10,
        padding: 5,
    },
    modalTitle: {
        fontSize: 20,
        marginBottom: 20,
        textAlign: "center",
        fontWeight: "bold",
        marginTop: 10, // To avoid overlap with the close icon
    },
    input: {
        borderWidth: 1,
        borderColor: "black",
        borderRadius: 5,
        padding: 10,
        marginBottom: 15,
        fontSize: 16,
    },
    textArea: {
        height: 500,
        textAlignVertical: "top",
    },
    submitButton: {
        backgroundColor: primaryColor,
        paddingVertical: 12,
        borderRadius: 5,
        justifyContent: "center",
        alignItems: "center",
    },
    disabledButton: {
        backgroundColor: "gray",
    },
    submitText: {
        fontSize: 16,
        fontWeight: "bold",
    },
});
