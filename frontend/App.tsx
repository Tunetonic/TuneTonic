import React, { useMemo } from 'react';
import {DarkTheme as PaperDarkTheme, DefaultTheme as PaperLightTheme, Provider as PaperProvider} from "react-native-paper";
import {NavigationContainer, DarkTheme as NavigationDarkTheme, DefaultTheme as NavigationLightTheme} from "@react-navigation/native";
import {createNativeStackNavigator} from "@react-navigation/native-stack";
import * as NavigationBar from 'expo-navigation-bar';

import merge from 'deepmerge';

import {LoginContext} from './Context';
import {useCookies} from "react-cookie";


import LoginScreen from "./Screens/Login";
import HomeTabs from './HomeTabs';
import { StatusBar } from 'react-native';

const Stack = createNativeStackNavigator();

const App = (): JSX.Element => {
    const [cookies, removeCookie] = useCookies(['loginCookie']);
    const [isSignedIn, setIsSignedIn] = React.useState(cookies.loginCookie !== undefined)

    const appContextValue = useMemo(
        () => ({
            isSignedIn,
            setIsSignedIn,
        }),
        [isSignedIn]
    )
    const CombinedDarkTheme = merge(PaperDarkTheme, NavigationDarkTheme);

    const theme = {
        ...CombinedDarkTheme,
        "colors": {
            ...CombinedDarkTheme.colors,
            "primary": "#008080"
        }
    }
    NavigationBar.setBackgroundColorAsync("black");

    return (
        <PaperProvider theme={theme}>
            <StatusBar animated={true} hidden={false} />
            <LoginContext.Provider value={appContextValue}>
                <NavigationContainer theme={theme}>
                    <Stack.Navigator initialRouteName="Home"
                        screenOptions={{
                            headerShown: false
                        }}>
                        {!isSignedIn ? (
                            <Stack.Screen name="Login" component={LoginScreen}/>
                        ) : (
                            <Stack.Screen name="Home" component={HomeTabs}/>
                        )}
                    </Stack.Navigator>
                </NavigationContainer>
            </LoginContext.Provider>
        </PaperProvider>
    )
}

export default App
