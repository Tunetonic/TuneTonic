import React, { useContext, useEffect } from 'react'
import { Image, KeyboardAvoidingView, StyleSheet } from 'react-native'
import { Button, Text } from 'react-native-paper'

import { Prompt, ResponseType, useAuthRequest } from 'expo-auth-session'
import { CLIENT_ID, REDIRECT_URI } from '@env'
import { authContext } from '../providers/auth.provider'

const discovery = {
  authorizationEndpoint: 'https://accounts.spotify.com/authorize',
  tokenEndpoint: 'https://accounts.spotify.com/api/token',
}

const LoginScreen = ({ navigation }): JSX.Element => {
  const { login } = useContext(authContext)

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
        .then((data) =>
          data.isBoarded
            ? navigation.navigate('home-tab-navigation')
            : navigation.navigate('onboarding'),
        )
        // .then(() => navigation.navigate('onboarding'))
        .catch(console.error)
    }
  }, [response])

  return (
    <KeyboardAvoidingView behavior="padding" style={styles.container}>
      <Image style={styles.image} source={require('../../assets/tonic.png')} />
      <Text style={styles.text}>Discover new music with TuneTonic</Text>
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
    width: 327,
    height: 88,
    fontWeight: 'bold',
    fontSize: 34,
    textAlign: 'center',
    color: '#B3B3B3',
  },
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  button: {
    backgroundColor: '#1ED760',
    top: 200,
    width: 250,
  },
  image: {
    width: 321,
    height: 83,
  },
})
