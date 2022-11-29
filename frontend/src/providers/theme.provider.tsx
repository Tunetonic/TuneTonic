import React, { createContext, PropsWithChildren } from 'react'
import merge from 'deepmerge'
import { DarkTheme as PaperDarkTheme } from 'react-native-paper'
import { DarkTheme as NavigationDarkTheme } from '@react-navigation/native'

interface ThemeContextInterface {
  theme: any | undefined
}

const CombinedDarkTheme = merge(PaperDarkTheme, NavigationDarkTheme)

const defaultValues: ThemeContextInterface = {
  theme: {
    ...CombinedDarkTheme,
    colors: {
      ...CombinedDarkTheme.colors,
      background: '#222023',
      accent: '#BDBCBD',
      primary: '#008080',
    },
  },
}

const themeContext = createContext<ThemeContextInterface>(defaultValues)

const ThemeProvider = (props: PropsWithChildren) => {
  const theme = defaultValues.theme

  return (
    <themeContext.Provider value={{ theme }}>
      {props.children}
    </themeContext.Provider>
  )
}

export { ThemeProvider, themeContext }
