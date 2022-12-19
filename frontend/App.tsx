import React from 'react'

import { createNativeStackNavigator } from '@react-navigation/native-stack'
import * as NavigationBar from 'expo-navigation-bar'

import LoginScreen from './src/screens/Login'
import OnboardingScreen from './src/screens/Onboarding'
import HomeTabs from './src/components/HomeTabs'
import { Platform } from 'react-native'
import { ThemeProvider } from './src/providers/theme.provider'
import { AuthProvider } from './src/providers/auth.provider'

const Stack = createNativeStackNavigator()

const App = (): JSX.Element => {
  if (Platform.OS === 'android') {
    NavigationBar.setBackgroundColorAsync('black')
  }

  return (
    <ThemeProvider>
      <AuthProvider>
        <Stack.Navigator
          id="root-stack-navigator"
          screenOptions={{
            headerShown: false,
          }}
        >
          <Stack.Screen name="login" component={LoginScreen} />
          <Stack.Screen name="onboarding" component={OnboardingScreen} />
          <Stack.Screen name="home-tab-navigation" component={HomeTabs} />
        </Stack.Navigator>
      </AuthProvider>
    </ThemeProvider>
  )
}

export default App
