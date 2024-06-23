import {View, Text, Pressable, ToastAndroid} from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import {router} from "expo-router";

export default function Settings() {
    return (
        <View style={{
            flex: 1,
            justifyContent: 'center',
            alignItems: 'center'
        }}>
            <Pressable onPress={() => Logout()}><Text>Se déconnecter</Text></Pressable>
        </View>
    );
}

function Logout() {
    AsyncStorage.removeItem('uid').then(() => {
        router.push("/");
        ToastAndroid.show('Déconnexion réussie', ToastAndroid.SHORT);
    });
}