import {StatusBar} from "expo-status-bar";
import React, {useEffect, useState} from "react";
import {KeyboardAvoidingView, StyleSheet, Text, View} from "react-native";
import axios from "axios";
import {Button} from "react-native-paper";
// @ts-ignore
import {Prompt, ResponseType, useAuthRequest} from "expo-auth-session";
import {CLIENT_ID} from '@env'


const discovery = {
    authorizationEndpoint:
        "https://accounts.spotify.com/authorize",
    tokenEndpoint:
        "https://accounts.spotify.com/api/token",
};

// @ts-ignore
const LoginScreen = ({navigation}) => {
    const [token, setToken] = useState("");
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
    }, [response]);

    useEffect(() => {
        if (token !== "") {
            axios.get(
                "https://api.spotify.com/v1/me/top/tracks?time_range=short_term", {
                    headers: {
                        Accept: "application/json",
                        "Content-Type": "application/json",
                        Authorization: "Bearer " + token,
                    },
                }).then((response: any) => {
                console.log(response)
            })
                .catch((error: { message: any; }) => {
                    console.log("error", error.message);
                });
            setTimeout(
                () =>
                    navigation.replace("LandingPage", {
                        token: token,
                    }),
                500
            );
        }
    });

    return (
        <KeyboardAvoidingView behavior="padding"
                              style={styles.container}>
            <StatusBar style="light"/>
            <Text
                style={{
                    fontSize: 30,
                    fontWeight: "bold",
                    marginBottom: "20%",
                }}
            >
                TuneTonic
            </Text>
            <Button style={styles.button} onPress={() => {
                promptAsync().then(r => console.log(r));
            }}>Login with Spotify</Button>
            <View style={{height: 100}}/>
        </KeyboardAvoidingView>
    );
};


export default LoginScreen;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: "center",
        justifyContent: "center"
    },
    button: {
        width: 200,
        marginTop: 50,
    },
});
