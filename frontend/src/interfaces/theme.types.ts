interface ThemeColor {
  accent: string
  backdrop: string
  background: string
  border: string
  card: string
  disabled: string
  error: string
  notification: string
  onSurface: string
  placeholder: string
  primary: string
  surface: string
  text: string
}

type FontWeight =
  | 'normal'
  | 'bold'
  | '100'
  | '200'
  | '300'
  | '400'
  | '500'
  | '600'
  | '700'
  | '800'
  | '900'

type Mode = 'adaptive' | 'exact'

interface Font {
  fontFamily: string
  fontWeight: FontWeight
}

interface FontBaseTypes {
  light: Font
  medium: Font
  regular: Font
  thin: Font
}

export interface ThemeType {
  animation: {
    scale: number
  }
  colors: ThemeColor
  dark: boolean
  fonts: FontBaseTypes
  mode?: Mode
  roundness: number
}

export const fontDefaults: FontBaseTypes = {
  light: {
    fontFamily: 'System',
    fontWeight: '300',
  },
  medium: {
    fontFamily: 'System',
    fontWeight: '500',
  },
  regular: {
    fontFamily: 'System',
    fontWeight: '400',
  },
  thin: {
    fontFamily: 'System',
    fontWeight: '100',
  },
}
