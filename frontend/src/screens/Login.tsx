import React, {useContext, useEffect, useState} from 'react'
import {Image, KeyboardAvoidingView, StyleSheet} from 'react-native'
import {Button, Text} from 'react-native-paper'

import {Prompt, ResponseType, useAuthRequest} from 'expo-auth-session'
import {CLIENT_ID, NEST_URI, REDIRECT_URI} from '@env'
import {authContext} from '../providers/auth.provider'
import {getUserPlaylist} from '../services/user.service'

const discovery = {
    authorizationEndpoint: 'https://accounts.spotify.com/authorize',
    tokenEndpoint: 'https://accounts.spotify.com/api/token',
}

const LoginScreen = ({navigation}): JSX.Element => {
    const {login} = useContext(authContext)

    const [req, response, promptAsync] = useAuthRequest(
        {
            responseType: ResponseType.Token,
            clientId: CLIENT_ID,
            scopes: [
                'user-read-currently-playing',
                'user-read-recently-played',
                'user-read-playback-state',
                'user-top-read',
                'user-modify-playback-state',
                'streaming',
                'user-read-email',
                'user-read-private',
            ],
            prompt: Prompt.SelectAccount,
            usePKCE: true,
            redirectUri: REDIRECT_URI,
        },
        discovery,
    )

    useEffect(() => {
        if (response && response?.type === 'success') {
            login(response)
                .then(() => navigation.navigate('onboarding'))
                .catch(console.error)
        }
    }, [response])

    return (
        <KeyboardAvoidingView behavior="padding" style={styles.container}>
            <Image style={styles.image} source={require('../../assets/tuneTonicIcon.png')}/>
            {/*<Text style={styles.text}>Discover new music with TuneTonic</Text>*/}
            <Button
                style={styles.button}
                color="black"
                onPress={() => {
                    promptAsync().then((r) => r)
                }}
            >
                Login with Spotify
            </Button>
        </KeyboardAvoidingView>
    )
}
export default LoginScreen

const styles = StyleSheet.create({
    text: {
        marginTop: 20,
        width: 327,
        height: 88,
        fontWeight: 'bold',
        fontSize: 30,
        textAlign: 'center',
        color: '#B3B3B3',
    },
    container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
    },
    button: {
        backgroundColor: '#1DB954',
        top: 200,
        width: 250,
    },
    image: {

         // width: 321,
         // height: 83,
    },
})
