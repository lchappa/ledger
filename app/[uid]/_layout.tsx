import auth from "@react-native-firebase/auth";
import {Stack} from "expo-router";

export default function UserLayout() {
    return (
            <Stack>
                <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
            </Stack>
    )
}