import {Stack} from "expo-router";
import auth from '@react-native-firebase/auth';
import React from "react";

export default function RootLayout() {
    return (
        auth().currentUser ?
            <Stack>
                <Stack.Screen name="(accueil)" options={{ headerShown: false }} />
            </Stack>
                :
            <Stack>
                <Stack.Screen name={`/${auth().currentUser?.uid}`} options={{ headerShown: false }} />
            </Stack>
    );
}