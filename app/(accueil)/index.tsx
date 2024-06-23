import React, { useState, useEffect } from 'react';
import { View, Text } from 'react-native';
import AsyncStorage from "@react-native-async-storage/async-storage";
import {router} from "expo-router";
import auth from "@react-native-firebase/auth";

export default function Index() {

    const [uid, setUid] = useState(null as string | null);

    useEffect(() => {
        const fetchUid = async () => {
            const storedUid = await AsyncStorage.getItem('uid');
            setUid(storedUid);
        };

        fetchUid();
    }, []);

    if (uid !== null) {
        router.push("/" + auth().currentUser?.uid as string + "/");
    } else {
        return (
            <View>
                <Text>Welcome user</Text>
            </View>
        );
    }

}
