// firebase.js
import { initializeApp } from 'firebase/app';
import { initializeAuth, getReactNativePersistence } from 'firebase/auth';
import { getFirestore } from 'firebase/firestore';
import AsyncStorage from '@react-native-async-storage/async-storage';

// Votre configuration Firebase
const firebaseConfig = {
  apiKey: "AIzaSyDwySfLuOMdzJF-4yzoXknSLftR49DD1S8",
  authDomain: "react-native-83857.firebaseapp.com",
  projectId: "react-native-83857",
  storageBucket: "react-native-83857.appspot.com",
  messagingSenderId: "123456789",
  appId: "com.anonymous.ledger",
  measurementId: "G-12345"
};

// Initialisez Firebase
const app = initializeApp(firebaseConfig);
const auth = initializeAuth(app, {
  persistence: getReactNativePersistence(AsyncStorage)
});
const firestore = getFirestore(app);

export { auth, firestore };