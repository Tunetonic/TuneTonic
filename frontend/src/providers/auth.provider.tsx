import { AuthSessionResult } from 'expo-auth-session'
import React, {
  createContext,
  PropsWithChildren,
  useEffect,
  useState,
} from 'react'
import { User } from '../interfaces/spotify-user'
import { getSpotifyUser, saveUser } from '../services/user.service'
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

    if (!success) return

    const { access_token } = response.params

    if (!access_token) return

    await setAsyncItem('access_token', access_token)

    getSpotifyUser().then(setUser).catch(console.error)

    if (user?.id) {
      await saveUser({ id: user?.id, isOnboarded: false })
    }
  }

  const logout = async (): Promise<void> => {
    removeAsyncItem('access_token')
    setAuthenticated(false)
    setUser(null)
  }

  useEffect(() => {
    if (user) {
      setAuthenticated(true)
    } else {
      setAuthenticated(false)
    }
  }, [user])

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
