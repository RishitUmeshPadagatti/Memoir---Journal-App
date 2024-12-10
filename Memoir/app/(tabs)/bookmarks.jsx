// import { View, Text, ScrollView, StyleSheet, TouchableOpacity, Modal } from "react-native";
// import { SafeAreaView } from "react-native-safe-area-context";
// import { useRecoilState, useRecoilValue } from "recoil";
// import { getToken } from "@/functions/SecureStore";
// import { allJournalsAtom, isAuthenticatedAtom } from "../../atoms/atoms"
// import { useEffect, useState } from "react";
// import axios from "axios";
// import { serverLocation } from "@/constants/utils";
import { View, Text, ScrollView, StyleSheet, TouchableOpacity, Modal } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { ThemedView } from "@/components/ThemedView";
import { Authentication } from "@/components/Authentication"
import { CardComponent } from "@/components/CardComponent"
import { useEffect, useState } from "react";
import { getToken } from "@/functions/SecureStore";
import { ThemedText } from "@/components/ThemedText";
import { primaryColor } from "@/constants/Colors";
import { Ionicons } from "@expo/vector-icons";
import { useRecoilState } from "recoil";
import { allJournalsAtom, isAuthenticatedAtom } from "../../atoms/atoms"
import { EditModalContent } from "@/components/EditModalContent"
import axios from "axios";
import { serverLocation } from "@/constants/utils";

export default function HomeScreen() {
    const [allJournals, setAllJournals] = useRecoilState(allJournalsAtom)
    let finalComponent
    
    const [isAuthenticated, setIsAuthenticated] = useRecoilState(isAuthenticatedAtom)

    const bookmarkedJournals = allJournals.filter(journal => journal.bookmark);
    useEffect(() => {
        const get = async () => {
            const token = await getToken()
            if (token.length > 150) {
                // console.log(token)
                setIsAuthenticated(true)
            }
            // deleteToken()
        }
        get()
    }, [])

    useEffect(() => {
        const get = async () => {
            try {
                const token = await getToken()
                const headers = { authorization: `Bearer ${token}` };
                const response = await axios.get(`${serverLocation}/api/journal`, { headers })
                const data = response.data.journals;
                setAllJournals(data);
            } catch (error) {
                console.error("Error", error)
            }
        }

        get()
    }, [])

    if (!isAuthenticated) {
        finalComponent = <Authentication />
    } else {
        finalComponent = <>
            <ScrollView>
            <View style={{ display: 'flex', flexDirection: 'row', justifyContent: 'space-between' }}>
                    <ThemedText style={styles.Title}>Bookmarked</ThemedText>

                </View>
                {bookmarkedJournals.map((e) => {
                    return <CardComponent
                        key={e.id}
                        title={e.title}
                        description={e.description}
                        bookmark={true}
                        date={e.created}
                    />
                })}
            </ScrollView>
        </>
    }

    return <ThemedView style={{ flex: 1 }}>
        <SafeAreaView edges={['top']}>
            {finalComponent}
        </SafeAreaView>
    </ThemedView>
}

const styles = StyleSheet.create({
    Title: {
        fontSize: 35,
        padding: 10,
        fontWeight: 500,
        marginLeft: 10,
        marginTop: 5,
        color: primaryColor,
    },
})