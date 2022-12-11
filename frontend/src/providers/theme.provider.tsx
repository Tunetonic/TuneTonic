import React, { createContext, PropsWithChildren, useEffect, useState } from 'react'
import merge from 'deepmerge'
import { DarkTheme as PaperDarkTheme, DefaultTheme as PaperLightTheme } from 'react-native-paper'
import { DarkTheme as NavigationDarkTheme, DefaultTheme as NavigationLightTheme } from '@react-navigation/native'

interface ThemeContextInterface {
  theme: any | undefined
  switchTheme: () => void
}

const combinedDarkTheme = merge(PaperDarkTheme, NavigationDarkTheme)
const combinedLightTheme = merge(PaperLightTheme, NavigationLightTheme)

const lightTheme = {
  ...combinedLightTheme,
  colors: {
    ...combinedLightTheme.colors,
    primary: '#1DB954',
    accent: '#1DB954'
  }
}

const darkTheme = {
  ...combinedDarkTheme,
  colors: {
    ...combinedDarkTheme.colors,
    background: '#222023',
    accent: '#BDBCBD',
    primary: '#008080',
  },
}

const defaultValues: ThemeContextInterface = {
  theme: lightTheme,

  switchTheme: () => undefined
}

const themeContext = createContext<ThemeContextInterface>(defaultValues)

const ThemeProvider = (props: PropsWithChildren) => {
  const [theme, setTheme] = useState(defaultValues.theme)
  const [isDarkTheme, setIsDarkTheme] = useState(defaultValues.theme.dark)

  const isEqualToDark = (prevState) => prevState.colors.primary === darkTheme.colors.primary

  const switchTheme = () => {
    console.log(theme.dark, ' theme before change')
    setTheme(prev => prev.dark ? lightTheme : darkTheme)
    setIsDarkTheme(prev => !prev)
    console.log(theme.dark, ' theme after change')

  }

  useEffect(() => {
    setIsDarkTheme(isEqualToDark(theme))
  }, [theme])

  return (
    <themeContext.Provider value={{ theme, switchTheme }}>
      {props.children}
    </themeContext.Provider>
  )
}

export { ThemeProvider, themeContext }
