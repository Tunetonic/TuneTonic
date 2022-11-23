import React, { useContext, useEffect, useState } from "react";
import { Image, KeyboardAvoidingView, StyleSheet } from "react-native";
import { Button, Text } from "react-native-paper";
import { Cookies, useCookies } from 'react-cookie';


import { Prompt, ResponseType, useAuthRequest } from "expo-auth-session";
import { CLIENT_ID, REDIRECT_URI } from '@env';
import { LoginContext } from "../Context";

const discovery = {
    authorizationEndpoint:
        "https://accounts.spotify.com/authorize",
    tokenEndpoint:
        "https://accounts.spotify.com/api/token",
};

const LoginScreen = ({ navigation }): JSX.Element => {
    const [cookies, setCookie, removeCookie] = useCookies(['loginCookie']);
    const [token, setToken] = useState("");


    const { setIsSignedIn } = useContext(LoginContext);


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
            redirectUri: REDIRECT_URI,
        },

        discovery
    );


    useEffect(() => {
        if (response?.type === "success") {
            const { access_token } = response.params;
            setToken(access_token);
        }
    },);

    useEffect(() => {
        if (token !== "") {
            setCookie('loginCookie', token);
            const promise = new Promise((resolve, reject) => {
                resolve(setIsSignedIn(true));
            })
            promise.then(() => navigation.navigate("home-tab-navigation"))


        }
    });

    return (
        <KeyboardAvoidingView behavior="padding" style={styles.container}>
            <Image style={styles.image} source={require('../assets/tonic.png')}></Image>
            <Text style={styles.text}>Discover new music with TuneTonic</Text>
            <Button
                style={styles.button}
                color='black'
                onPress={() => {
                    promptAsync().then(r => r);
                }}>Login with Spotify</Button>
            <Text>{REDIRECT_URI}</Text>
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
        top: 200,
        width: 250,
    },
    image: {
        width: 321,
        height: 83,
    }
});
