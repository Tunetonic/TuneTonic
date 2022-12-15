import {AuthSessionResult} from 'expo-auth-session'
import React, {createContext, PropsWithChildren, useState} from 'react'
import {User} from '../interfaces/spotify-user'
import {getDatabaseUser, getSpotifyUser, saveUser} from '../services/user.service'
import {
    removeAsyncItem,
    setAsyncItem,
} from '../services/async-storage.service'
import {DatabaseUser} from "../interfaces/db-user";

interface AuthContextInterface {
    user: User | null
    dbUser: DatabaseUser | null

    login: (response: AuthSessionResult) => Promise<any>
    logout: () => Promise<void>
}

const defaultValues: AuthContextInterface = {
    user: null,
    dbUser: null,
    login: () => Promise.resolve(),
    logout: () => Promise.resolve(),
}

const authContext = createContext<AuthContextInterface>(defaultValues)

const AuthProvider = (props: PropsWithChildren) => {
    const [user, setUser] = useState<User | null>(null);
    const [dbUser, setDbUser] = useState<DatabaseUser | null>(null);

    const login = async (response: AuthSessionResult): Promise<void> => {
        const success = response?.type === 'success'

        if (!success) return

        const {access_token} = response.params

        if (!access_token) return

        await setAsyncItem('access_token', access_token)

        let auxiliaryUser: User = await getSpotifyUser();

        getSpotifyUser().then(setUser).catch(console.error)

        if (auxiliaryUser.id) {
            await saveUser({id: auxiliaryUser.id, isOnboarded: false})
        }
        const dbUser =  await getDatabaseUser(auxiliaryUser.id);
        setDbUser(dbUser);

        return dbUser;
    }

    const logout = async (): Promise<void> => {
        removeAsyncItem('access_token')
        setUser(null)
    }

    return (
        <authContext.Provider
            value={{
                user,
                dbUser,
                login,
                logout,
            }}
        >
            {props.children}
        </authContext.Provider>
    )
}

export {AuthProvider, authContext}
