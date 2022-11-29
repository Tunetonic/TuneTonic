import React, { useContext, useMemo } from 'react'
import { Provider as PaperProvider } from 'react-native-paper'
import { NavigationContainer } from '@react-navigation/native'
import { createNativeStackNavigator } from '@react-navigation/native-stack'
import * as NavigationBar from 'expo-navigation-bar'

import LoginScreen from './src/screens/Login'
import OnboardingScreen from './src/screens/Onboarding'
import HomeTabs from './HomeTabs'
import { StatusBar } from 'react-native'
import { deviceContext, DeviceProvider } from './src/providers/device.provider'
import { themeContext, ThemeProvider } from './src/providers/theme.provider'
import { AuthProvider } from './src/providers/auth.provider'
import { CookiesProvider } from 'react-cookie'

const Stack = createNativeStackNavigator()

const App = (): JSX.Element => {
  const { deviceType } = useContext(deviceContext)
  const { theme } = useContext(themeContext)

  if (deviceType === 'ANDROID') {
    NavigationBar.setBackgroundColorAsync('black')
  }

  return (
    <DeviceProvider>
      <ThemeProvider>
        <PaperProvider theme={theme}>
          <StatusBar animated={true} hidden={false} />
          <CookiesProvider>
            <AuthProvider>
              <NavigationContainer theme={theme}>
                <Stack.Navigator
                  id="root-stack-navigator"
                  screenOptions={{
                    headerShown: false,
                  }}
                >
                  <Stack.Screen name="login" component={LoginScreen} />
                  <Stack.Screen
                    name="onboarding"
                    component={OnboardingScreen}
                  />
                  <Stack.Screen
                    name="home-tab-navigation"
                    component={HomeTabs}
                  />
                </Stack.Navigator>
              </NavigationContainer>
            </AuthProvider>
          </CookiesProvider>
        </PaperProvider>
      </ThemeProvider>
    </DeviceProvider>
  )
}

export default App
