import React, { useState } from 'react'
import { Pressable, StyleSheet, Switch, Text, TextInput, View } from 'react-native'
import {LinearGradient} from "expo-linear-gradient";
import {Link, router} from "expo-router";
import auth from "@react-native-firebase/auth";
import AsyncStorage from "@react-native-async-storage/async-storage";

export default function LoginForm() {
    const [click,setClick] = useState(false);
    const [email,setEmail] =  useState("");
    const [password,setPassword] =  useState("");
    return (
        <LinearGradient
            style={styles.mainContainer}
            colors={['rgba(136,100,156,1)', 'rgba(0,0,0,1)']}
            start={{ x: 0, y: 0 }}
            end={{ x: 1, y: 0 }}>
        <View style={styles.container}>
            <Text style={styles.title}>Login</Text>
            <View style={styles.inputView}>
                <TextInput style={styles.input} placeholder='Email' value={email} onChangeText={setEmail} autoCorrect={false}
                           autoCapitalize='none' />
                <TextInput style={styles.input} placeholder='Mot de passe' secureTextEntry value={password} onChangeText={setPassword} autoCorrect={false}
                           autoCapitalize='none'/>
            </View>
            <View style={styles.rememberView}>
                <View style={styles.switch}>
                    <Switch  value={click} onValueChange={setClick} trackColor={{true : "#FF5900" , false : "gray"}} />
                    <Text style={styles.rememberText}>Remember Me</Text>
                </View>
                <View>
                    <Pressable onPress={() => console.log('todo')}>
                        <Text style={styles.forgetText}>Forgot Password?</Text>
                    </Pressable>
                </View>
            </View>

            <View style={styles.buttonView}>
                <Pressable style={styles.button} onPress={() => LoginController(email, password, click)}>
                    <Text style={styles.buttonText}>LOGIN</Text>
                </Pressable>
            </View>
            <Link href={"/signup"} style={styles.footerText}>Don't have an account ?<Text style={styles.signup}>  Sign Up</Text></Link>
        </View>
        </LinearGradient>
    )
}

function LoginController(email: string, password: string, click: boolean) {
    auth().signInWithEmailAndPassword(email, password).then(() => {
        if(click){
            AsyncStorage.setItem('uid', auth().currentUser?.uid as string).then();
        }
        router.push("/"+auth().currentUser?.uid as string+"/");
    })
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
        marginBottom  :5
    },
    input : {
        height : 50,
        paddingHorizontal : 20,
        borderBottomWidth : 1,
        borderBottomColor: "white",
        color: "white",
    },
    rememberView : {
        width : "100%",
        paddingLeft: 20,
        justifyContent: "space-between",
        alignItems : "center",
        flexDirection : "row",
        marginTop: "5%"
    },
    switch :{
        flexDirection : "row",
        color: "#FF5900",
        gap : 1,
        justifyContent : "center",
        alignItems : "center",

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
    footerText : {
        textAlign: "center",
        color : "white",
    },
    signup : {
        color : "#FF5900",
        fontSize : 13
    }
})