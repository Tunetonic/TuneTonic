import React, {useMemo} from 'react';
import {Provider as PaperProvider} from "react-native-paper";
import {NavigationContainer} from "@react-navigation/native";
import {createNativeStackNavigator} from "@react-navigation/native-stack";
import LoginV2 from "./Components/Login";
import LoginGuard from "./Guards/LoginGuard";
import {LoginContext} from './Context';
import {useCookies} from "react-cookie";
import {LandingPage} from "./Components/LandingPage";
import Home from "./Components/Home";

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

    return (
        <PaperProvider>
            <LoginContext.Provider value={appContextValue}>
                <NavigationContainer>
                    <Stack.Navigator>

                        <Stack.Screen
                            name="Landingpage"
                            component={LandingPage}
                        />
                        <Stack.Screen
                            name="Login"
                            component={LoginV2}/>

                        <Stack.Screen
                            name="Home"
                            component={LoginGuard}
                        />
                    </Stack.Navigator>
                </NavigationContainer>
            </LoginContext.Provider>
        </PaperProvider>
    )
}

export default App
