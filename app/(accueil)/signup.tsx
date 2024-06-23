import React, { useState } from 'react'
import {
    Pressable,
    StyleSheet,
    Text,
    TextInput,
    ToastAndroid,
    View
} from 'react-native'
import {LinearGradient} from "expo-linear-gradient";
import {Link, router} from "expo-router";
import auth from "@react-native-firebase/auth";
import firestore from "@react-native-firebase/firestore";
import AsyncStorage from "@react-native-async-storage/async-storage";

export default function LoginForm() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState(false);
    const [errorMessage, setErrorMessage] = useState('');
    return (
        <LinearGradient
            style={styles.mainContainer}
            colors={['rgba(136,100,156,1)', 'rgba(0,0,0,1)']}
            start={{ x: 0, y: 0 }}
            end={{ x: 1, y: 0 }}>
            <View style={styles.container}>
                <Text style={styles.title}>Sign up</Text>
                <View style={styles.inputView}>
                    <TextInput style={styles.input} placeholder='Email' value={email} onChangeText={setEmail} autoCorrect={false}
                               autoCapitalize='none' />
                    <TextInput style={styles.input} placeholder='Mot de passe' onChangeText={setPassword} secureTextEntry autoCorrect={false}
                               autoCapitalize='none'/>
                </View>
                <View style={styles.buttonView}>
                    <Pressable style={styles.button} onPress={() => AccountCreator(email, password)}>
                        <Text style={styles.buttonText}>SIGN UP</Text>
                    </Pressable>
                </View>
                <Link href={"/signin"} style={styles.footerText}>Already Have An Account?<Text style={styles.signin}>  Sign In</Text></Link>
            </View>

        </LinearGradient>
    )
}

function AccountCreator(email: string, password: string) {
    auth().createUserWithEmailAndPassword(email, password)
        .then(() => {
            firestore().collection('users').doc(auth().currentUser?.uid as string).set({total_amount: 0.00, spot_amount: 0.00, earn_amount: 0.00}).then(() => ToastAndroid.show(auth().currentUser?.uid as string, ToastAndroid.LONG)).catch((error) => ToastAndroid.show(error.code, ToastAndroid.LONG));
            ToastAndroid.show("Compte créé. Veuillez vous connecter.", ToastAndroid.LONG);
            router.push("/signin");
        })
        .catch((error) => {
            ToastAndroid.show(error.code, ToastAndroid.LONG);
        });
}


const styles = StyleSheet.create({
    mainContainer: {
        height: "100%",
        justifyContent: "center",
        alignItems: "center",
    },
    container : {
        width : "75%",
        marginBottom: "10%",
        backgroundColor: "rgba(180,180,180,0.2)",
        borderRadius: 30,
        paddingBottom: 30
    },
    image : {
        height : 160,
        width : 170
    },
    title : {
        fontSize : 30,
        fontWeight : "bold",
        textTransform : "uppercase",
        textAlign: "center",
        paddingVertical : 40,
        color : "#FF5900"
    },
    inputView : {
        gap : 15,
        width : "100%",
        paddingHorizontal : 40,
        marginBottom : 5
    },
    input : {
        height : 50,
        paddingHorizontal : 20,
        borderBottomWidth : 1,
        borderBottomColor: "white"
    },
    rememberView : {
        width : "100%",
        paddingLeft: 20,
        justifyContent: "space-between",
        alignItems : "center",
        flexDirection : "row",
    },
    switch :{
        flexDirection : "row",
        color: "#FF5900",
        gap : 1,
        justifyContent : "center",
        alignItems : "center",
        marginTop: "1em",
        marginBottom: "0.8em"

    },
    rememberText : {
        fontSize: 12,
        color: "white",
        marginLeft: "0.3em",
    },
    forgetText : {
        fontSize : 14,
        color : "#FF5900",
        paddingRight: 15
    },
    button : {
        backgroundColor : "#FF5900",
        height : 45,
        borderColor : "white",
        borderWidth  : 1,
        borderRadius : 5,
        alignItems : "center",
        justifyContent : "center"
    },
    buttonText : {
        color : "white",
        fontSize: 18,
        fontWeight : "bold"
    },
    buttonView :{
        width :"100%",
        paddingHorizontal : 50,
        marginVertical: 20
    },
    optionsText : {
        textAlign : "center",
        paddingVertical : 10,
        color : "#2C2E3A",
        fontSize : 13,
        marginBottom : 6
    },
    mediaIcons : {
        flexDirection : "row",
        gap : 15,
        alignItems: "center",
        justifyContent : "center",
        marginBottom : 23
    },
    icons : {
        width : 40,
        height: 40,
    },
    footerText : {
        textAlign: "center",
        color : "white",
    },
    signin : {
        color : "#FF5900",
        fontSize : 13
    }
})