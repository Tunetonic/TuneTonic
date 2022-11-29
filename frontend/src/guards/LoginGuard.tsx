import React, { useContext } from 'react'
import { LoginContext } from '../../Context'
import Home from '../screens/Home'

const LoginGuard = ({ navigation }) => {
  const { isSignedIn } = useContext(LoginContext)

  if (isSignedIn === false) {
    navigation.navigate('Login')
  }

  return <Home navigation={navigation} />
}

export default LoginGuard
