import React, { useContext } from 'react'
import { authContext } from '../providers/auth.provider'
import Home from '../screens/Home'

const LoginGuard = ({ navigation }) => {
  const { authenticated } = useContext(authContext)

  if (authenticated === false) {
    navigation.navigate('Login')
  }

  return <Home navigation={navigation} />
}

export default LoginGuard
