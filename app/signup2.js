import React, { useState } from 'react';
import {
  Pressable,
  StyleSheet,
  Text,
  TextInput,
  ToastAndroid,
  View,
  ActivityIndicator
} from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { Link } from 'expo-router';
import { auth, firestore } from '../android/app/src/firebase'; // Ajustez le chemin selon votre structure de projet
import { createUserWithEmailAndPassword } from 'firebase/auth';
import { doc, setDoc } from 'firebase/firestore';

export default function LoginForm() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSignUp = () => {
    setLoading(true);
    AccountCreator(email, password, setLoading);
  };

  return (
    <LinearGradient
      style={styles.mainContainer}
      colors={['rgba(110,48,143,1)', 'rgba(0,0,0,1)']}
      start={{ x: 0, y: 0 }}
      end={{ x: 1, y: 0 }}>
      <View style={styles.container}>
        <Text style={styles.title}>Sign up</Text>
        <View style={styles.inputView}>
          <TextInput
            style={styles.input}
            placeholder='EMAIL'
            value={email}
            onChangeText={setEmail}
            autoCorrect={false}
            autoCapitalize='none'
          />
          <TextInput
            style={styles.input}
            placeholder='PASSWORD'
            value={password}
            onChangeText={setPassword}
            secureTextEntry
            autoCorrect={false}
            autoCapitalize='none'
          />
        </View>
        <View style={styles.buttonView}>
          <Pressable
            style={styles.button}
            onPress={handleSignUp}
            disabled={loading}>
            {loading ? (
              <ActivityIndicator color="white" />
            ) : (
              <Text style={styles.buttonText}>SIGN UP</Text>
            )}
          </Pressable>
        </View>
        <Link href="/signin2" style={styles.footerText}>
          Already Have An Account?
          <Text style={styles.signin}>  Sign In</Text>
        </Link>
      </View>
    </LinearGradient>
  );
}

function AccountCreator(email, password, setLoading) {
  createUserWithEmailAndPassword(auth, email, password)
    .then((userCredential) => {
      const userId = userCredential.user.uid;
      setDoc(doc(firestore, 'users', userId), {
        total_amount: 0.00,
        spot_amount: 0.00,
        earn_amount: 0.00
      }).then(() => {
        ToastAndroid.show('Account created successfully', ToastAndroid.LONG);
      });
    })
    .catch((error) => {
      ToastAndroid.show(error.message, ToastAndroid.LONG);
    })
    .finally(() => {
      setLoading(false);
    });
}

const styles = StyleSheet.create({
  mainContainer: {
    height: "100%",
    justifyContent: "center",
    alignItems: "center",
  },
  container: {
    width: "75%",
    marginBottom: "10%",
    backgroundColor: "rgba(180,180,180,0.2)",
    borderRadius: 30,
    paddingBottom: 30
  },
  title: {
    fontSize: 30,
    fontWeight: "bold",
    textTransform: "uppercase",
    textAlign: "center",
    paddingVertical: 40,
    color: "#FF5900"
  },
  inputView: {
    gap: 15,
    width: "100%",
    paddingHorizontal: 40,
    marginBottom: 5
  },
  input: {
    height: 50,
    paddingHorizontal: 20,
    borderBottomWidth: 1,
    borderBottomColor: "white"
  },
  buttonView: {
    width: "100%",
    paddingHorizontal: 50,
    marginVertical: 20
  },
  button: {
    backgroundColor: "#FF5900",
    height: 45,
    borderColor: "white",
    borderWidth: 1,
    borderRadius: 5,
    alignItems: "center",
    justifyContent: "center"
  },
  buttonText: {
    color: "white",
    fontSize: 18,
    fontWeight: "bold"
  },
  footerText: {
    textAlign: "center",
    color: "white",
  },
  signin: {
    color: "#FF5900",
    fontSize: 13
  }
});