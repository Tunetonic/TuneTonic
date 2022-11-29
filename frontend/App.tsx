import React, { useContext, useMemo } from 'react'
import { Provider as PaperProvider } from 'react-native-paper'
import { NavigationContainer } from '@react-navigation/native'
import { createNativeStackNavigator } from '@react-navigation/native-stack'
import * as NavigationBar from 'expo-navigation-bar'

import LoginScreen from './src/screens/Login'
import OnboardingScreen from './src/screens/Onboarding'
import HomeTabs from './src/components/HomeTabs'
import { Platform, StatusBar } from 'react-native'
import { themeContext, ThemeProvider } from './src/providers/theme.provider'
import { AuthProvider } from './src/providers/auth.provider'

const Stack = createNativeStackNavigator()

const App = (): JSX.Element => {
  const { theme } = useContext(themeContext)

  if (Platform.OS === 'android') {
    NavigationBar.setBackgroundColorAsync('black')
  }

  return (
    <ThemeProvider>
      <PaperProvider theme={theme}>
        <StatusBar animated={true} hidden={false} />
        <AuthProvider>
          <NavigationContainer theme={theme}>
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
          </NavigationContainer>
        </AuthProvider>
      </PaperProvider>
    </ThemeProvider>
  )
}

export default App
