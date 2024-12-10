import { StyleSheet, View } from "react-native";
import { ThemedText } from "./ThemedText";
import { ThemedView } from "./ThemedView";
import { FontAwesome } from '@expo/vector-icons'; // Assuming you're using Expo for the bookmark icon
import {primaryColor} from "../constants/Colors"
import { formatDate } from "../functions/formatDate";

export function CardComponent({ title, description, bookmark, date }) {
    return (
        <ThemedView style={styles.card}>
            <ThemedText style={styles.title}>{title}</ThemedText>
            <ThemedText style={styles.description}>{description}</ThemedText>
            {bookmark && (
                <FontAwesome name="bookmark" style={styles.bookmarkIcon} />
            )}
            <View style={styles.footer}>
                <ThemedText style={styles.date}>{formatDate(date)}</ThemedText>
            </View>
        </ThemedView>
    );
}

const styles = StyleSheet.create({
    card: {
        padding: 15,
        borderRadius: 8,
        shadowColor: '#555',
        shadowOpacity: 0.5,
        shadowRadius: 5,
        elevation: 3,
        margin: 10,
    },
    title: {
        fontSize: 18,
        fontWeight: 'bold',
        marginBottom: 10,
    },
    description: {
        fontSize: 16,
    },
    bookmarkIcon: {
        position: 'absolute',
        top: 15,
        right: 15,
        fontSize: 20,
        color: primaryColor, // Adjust color as needed
    },
    footer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginTop: 15,
    },
    date: {
        fontSize: 14,
        color: '#666',
    },
});