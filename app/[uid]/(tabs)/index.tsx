import React from 'react';
import {View, Text, ToastAndroid, StyleSheet} from 'react-native';
import {router, useLocalSearchParams} from "expo-router";
import auth from "@react-native-firebase/auth";

export default function Index() {
    const { uid } = useLocalSearchParams();
    if(!auth().currentUser){
        router.push('/');
        ToastAndroid.show("Unauthorized", ToastAndroid.SHORT);
    }
    return (
        <View style={styles.container}>
            <Text>Welcome user {uid}</Text>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center'
    }
})
