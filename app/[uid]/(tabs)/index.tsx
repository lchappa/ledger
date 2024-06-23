import React, { useState, useEffect } from 'react';
import {View, Text, ToastAndroid, StyleSheet} from 'react-native';
import {router, useLocalSearchParams} from "expo-router";
import auth from "@react-native-firebase/auth";

const Index = () => {
    const [balance, setBalance] = useState(0); // Utilisation de useState pour gérer l'état de Balance

    /*useEffect(() => {
      const usersCollection = firestore().collection('Users');
      const userDoc = usersCollection.doc('Balance');

      const unsubscribe = userDoc.onSnapshot((doc) => {
        if (doc.exists) {
          const userBalance = doc.data().balance;
          setBalance(userBalance);
        }
      });

      return () => unsubscribe();
    }, []);*/
    const { uid } = useLocalSearchParams();
    if(!auth().currentUser){
        router.push('/');
        ToastAndroid.show("Unauthorized", ToastAndroid.SHORT);
    }
    return (
        <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
            <Text>Welcome user {uid}</Text>
            <Text>User Page Content Here</Text>
            <Text style={{ fontSize: 24, fontWeight: 'bold', marginTop: 20 }}>
                Balance: {balance}
            </Text>
        </View>
    );
}

export default Index;