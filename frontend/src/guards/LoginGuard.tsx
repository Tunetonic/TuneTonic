import React, { useContext } from 'react'
import { authContext } from '../providers/auth.provider'
import Home from '../screens/Home'

const LoginGuard = ({ navigation }) => {
  const { user } = useContext(authContext)

  if (!user) {
    navigation.navigate('Login')
  }

  return <Home navigation={navigation} />
}

export default LoginGuard
