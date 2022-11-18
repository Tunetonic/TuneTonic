import {StatusBar} from "expo-status-bar";
import React, {useContext, useEffect, useState} from "react";
import {Image, KeyboardAvoidingView, StyleSheet, Text, View} from "react-native";
import axios from "axios";
import {Button} from "react-native-paper";
import {Cookies, useCookies} from 'react-cookie';

// @ts-ignore
import {Prompt, ResponseType, useAuthRequest} from "expo-auth-session";
import {CLIENT_ID} from '@env';
import {LoginContext} from "../Context";

const discovery = {
    authorizationEndpoint:
        "https://accounts.spotify.com/authorize",
    tokenEndpoint:
        "https://accounts.spotify.com/api/token",
};

// @ts-ignore
const LoginScreen = ({navigation}) => {
    const [cookies, setCookie, removeCookie] = useCookies(['loginCookie']);
    const [token, setToken] = useState("");

    // @ts-ignore
    const {setIsSignedIn} = useContext(LoginContext);


    const [request, response, promptAsync] = useAuthRequest(
        {
            responseType: ResponseType.Token,
            clientId: CLIENT_ID,
            scopes: [
                "user-read-currently-playing",
                "user-read-recently-played",
                "user-read-playback-state",
                "user-top-read",
                "user-modify-playback-state",
                "streaming",
                "user-read-email",
                "user-read-private",
            ],
            prompt: Prompt.SelectAccount,
            usePKCE: true,
            redirectUri: "exp://192.168.2.8:19000",
        },

        discovery
    );


    useEffect(() => {
        if (response?.type === "success") {
            const {access_token} = response.params;
            setToken(access_token);
        }
    },);

    useEffect(() => {
        if (token !== "") {
            setCookie('loginCookie', token);
            setIsSignedIn(true);
            setTimeout(
                () =>
                    navigation.navigate("Home"),
                500
            );
        }
    });

    return (
        <KeyboardAvoidingView behavior="padding" style={styles.container}>
            <Image style={styles.image} source={require('../assets/tonic.png')}></Image>
            <StatusBar style="light"/>
            <Text style={styles.text}>Discover new music with TuneTonic</Text>
            <Button
                style={styles.button}
                color='black'
                onPress={() => {
                promptAsync().then(r => r);
            }}>Login with Spotify</Button>
            <View style={{height: 100}}/>
        </KeyboardAvoidingView>
    );
};


export default LoginScreen;

const styles = StyleSheet.create({
    text: {
        width: 327,
        height: 88,
        fontWeight: 'bold',
        fontSize: 34,
        textAlign: 'center',
        color: '#B3B3B3'
    },
    container: {
        flex: 1,
        alignItems: "center",
        justifyContent: "center"
    },
    button: {
        backgroundColor: '#1ED760',
        top:200,
        width: 250,
    },
    image: {
        width: 321,
        height: 83,
    }
});
