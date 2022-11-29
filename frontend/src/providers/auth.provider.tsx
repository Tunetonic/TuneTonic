import { AxiosResponse } from 'axios'
import { AuthSessionResult } from 'expo-auth-session'
import React, {
  createContext,
  PropsWithChildren,
  useEffect,
  useState,
} from 'react'
import { User } from '../interfaces/user'
import { getUserInformation } from '../services/UserProfileService'
import {
  removeAsyncItem,
  setAsyncItem,
} from '../services/async-storage.service'

interface AuthContextInterface {
  user: User | null
  authenticated: boolean

  login: (response: AuthSessionResult) => Promise<void>
  logout: () => Promise<void>
}

const defaultValues: AuthContextInterface = {
  user: null,
  authenticated: false,

  login: () => Promise.resolve(),
  logout: () => Promise.resolve(),
}

const authContext = createContext<AuthContextInterface>(defaultValues)

const AuthProvider = (props: PropsWithChildren) => {
  const [authenticated, setAuthenticated] = useState<boolean>(false)
  const [user, setUser] = useState<User | null>(null)

  const login = async (response: AuthSessionResult): Promise<void> => {
    const success = response?.type === 'success'

    if (success) {
      const { access_token } = response.params

      if (access_token) {
        setAsyncItem('access_token', access_token)

        fetchUserInformation(access_token)
      }
    }
  }

  const logout = async (): Promise<void> => {
    removeAsyncItem('access_token')
    setAuthenticated(false)
    setUser(null)
  }

  const fetchUserInformation = (accessToken: string) => {
    if (!accessToken) return

    getUserInformation(accessToken)
      .then((response: AxiosResponse<User>) => {
        setUser(response.data)
      })
      .catch((error: { message: string }) => {
        console.log('error:getUserInformations', error.message)

        logout()
      })
  }

  // dispose
  useEffect(() => {
    if (user && user?.id > 0) {
      setAuthenticated(true)
    } else {
      setAuthenticated(false)
    }
  }, [user?.id])

  return (
    <authContext.Provider
      value={{
        user,
        authenticated,
        login,
        logout,
      }}
    >
      {props.children}
    </authContext.Provider>
  )
}

export { AuthProvider, authContext }
