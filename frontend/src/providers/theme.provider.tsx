import React, { createContext, PropsWithChildren, useState } from 'react'
import merge from 'deepmerge'

import { Provider as PaperProvider } from 'react-native-paper'
import { NavigationContainer } from '@react-navigation/native'
import { StatusBar } from 'react-native'
import { fontDefaults, ThemeType } from '../interfaces/theme.types'

import {
  DarkTheme as PaperDarkTheme,
  DefaultTheme as PaperLightTheme,
} from 'react-native-paper'
import {
  DarkTheme as NavigationDarkTheme,
  DefaultTheme as NavigationLightTheme,
} from '@react-navigation/native'

interface ThemeContextInterface {
  theme: ThemeType
  switchTheme: () => void
}

const combinedDarkTheme = merge(PaperDarkTheme, NavigationDarkTheme)
const combinedLightTheme = merge(PaperLightTheme, NavigationLightTheme)

const lightTheme: ThemeType = {
  ...combinedLightTheme,
  fonts: fontDefaults,
  colors: {
    ...combinedLightTheme.colors,
    primary: '#1DB954',
    accent: '#1DB954',
  },
}

const darkTheme: ThemeType = {
  ...combinedDarkTheme,
  fonts: fontDefaults,
  colors: {
    ...combinedDarkTheme.colors,
    background: '#222023',
    accent: '#BDBCBD',
    primary: '#1DB954',
  },
}

const defaultValues: ThemeContextInterface = {
  theme: darkTheme,

  switchTheme: () => undefined,
}

const themeContext = createContext<ThemeContextInterface>(defaultValues)

const ThemeProvider = (props: PropsWithChildren) => {
  const [theme, setTheme] = useState<ThemeType>(defaultValues.theme)

  const switchTheme = () => {
    setTheme((prev) => (prev.dark ? lightTheme : darkTheme))
  }

  return (
    <themeContext.Provider
      value={{
        theme,
        switchTheme,
      }}
    >
      <PaperProvider theme={theme}>
        <StatusBar animated={true} hidden={false} />
        <NavigationContainer theme={theme}>
          {props.children}
        </NavigationContainer>
      </PaperProvider>
    </themeContext.Provider>
  )
}

export { ThemeProvider, themeContext }
