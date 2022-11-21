import React, {useEffect, useMemo} from 'react';
import {DarkTheme as PaperDarkTheme, Provider as PaperProvider} from "react-native-paper";
import {NavigationContainer, DarkTheme as NavigationDarkTheme} from "@react-navigation/native";
import {createNativeStackNavigator} from "@react-navigation/native-stack";
import merge from 'deepmerge';

import {LoginContext} from './Context';
import {useCookies} from "react-cookie";


import LoginScreen from "./Screens/Login";
import HomeTabs from './HomeTabs';

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
            ...CombinedDarkTheme.colors
        }
    }

    return (
        <PaperProvider theme={theme}>
            <LoginContext.Provider value={appContextValue}>
                <NavigationContainer theme={theme}>
                    <Stack.Navigator initialRouteName="Home">
                        {!isSignedIn ? (
                            <Stack.Screen name="Login" component={LoginScreen}/>
                        ) :
                            (<Stack.Screen name="Home" component={HomeTabs}/>)
                        }
                    </Stack.Navigator>
                </NavigationContainer>
            </LoginContext.Provider>
        </PaperProvider>
    )
}

export default App
