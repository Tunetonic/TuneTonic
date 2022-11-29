import { AxiosResponse } from 'axios'
import { AuthSessionResult } from 'expo-auth-session'
import React, {
  createContext,
  Dispatch,
  PropsWithChildren,
  SetStateAction,
  useEffect,
  useState,
} from 'react'
import { useCookies } from 'react-cookie'
import { User } from '../interfaces/user'
import { getUserInformation } from '../services/UserProfileService'

interface AuthContextInterface {
  user: User | null
  isLoggedIn: boolean

  setIsLoggedIn: Dispatch<SetStateAction<boolean>>
  login: (response: AuthSessionResult) => Promise<void>
  logout: () => Promise<void>
}

const defaultValues: AuthContextInterface = {
  user: null,
  isLoggedIn: false,

  setIsLoggedIn: () => false,
  login: () => Promise.resolve(),
  logout: () => Promise.resolve(),
}

const authContext = createContext<AuthContextInterface>(defaultValues)

const AuthProvider = (props: PropsWithChildren) => {
  const [cookies, setCookie, removeCookie] = useCookies(['loginCookie'])
  const [isLoggedIn, setIsLoggedIn] = useState<boolean>(false)
  const [user, setUser] = useState<User | null>(null)

  const login = async (response: AuthSessionResult): Promise<void> => {
    const success = response?.type === 'success'

    if (success) {
      const { access_token } = response.params

      if (access_token) {
        await setCookie('loginCookie', access_token, { path: '/' })
        console.log('after set cookie', cookies)
        console.log('auth token exist: ', !!access_token)
      }
    }
  }

  // ik ga nu inloggen

  const logout = async (): Promise<void> => {
    removeCookie('loginCookie')
    setIsLoggedIn(false)
    setUser(null)
  }

  const fetchUserInformation = (loginCookie: string) => {
    if (!loginCookie) return

    getUserInformation(loginCookie)
      .then((response: AxiosResponse<User>) => {
        console.log('good api call')
        setUser(response.data)
      })
      .catch((error: { message: string }) => {
        console.log('error:getUserInformations', error.message)

        logout()
      })
  }

  useEffect(() => {
    const { loginCookie } = cookies

    setIsLoggedIn(cookies.loginCookie !== undefined)

    fetchUserInformation(loginCookie)

    user && console.log(user)
  }, [cookies.loginCookie])

  return (
    <authContext.Provider
      value={{ user, isLoggedIn, setIsLoggedIn, login, logout }}
    >
      {props.children}
    </authContext.Provider>
  )
}

export { AuthProvider, authContext }
