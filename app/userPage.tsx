import React, { useState, useEffect } from 'react';
import { View, Text } from 'react-native';
import TransactionComponent from '../components/TransactionComponent';
//import firestore from '@react-native-firebase/firestore';

const UserPage = () => {
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

  return (
    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
      <Text>User Page Content Here</Text>
      <Text style={{ fontSize: 24, fontWeight: 'bold', marginTop: 20 }}>
        Balance: {balance}
      </Text>
     <TransactionComponent />

    </View>
  );
};

export default UserPage;
