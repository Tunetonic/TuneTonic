import React, { useContext } from 'react'
import { Button, Text } from 'react-native-paper'
import { View } from 'react-native'
import { authContext } from '../providers/auth.provider'

export const LandingPage = ({ navigation }) => {
  const { isLoggedIn } = useContext(authContext)

  return (
    <View>
      <Text>Landing Screen</Text>
      {!isLoggedIn ? (
        <Button onPress={() => navigation.navigate('login')}>Login</Button>
      ) : (
        <Button onPress={() => navigation.navigate('home')}>Home</Button>
      )}
    </View>
  )
}
