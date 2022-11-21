import React, {useEffect, useMemo} from 'react';
import {Provider as PaperProvider} from "react-native-paper";
import {NavigationContainer} from "@react-navigation/native";
import {createNativeStackNavigator} from "@react-navigation/native-stack";
import {LoginContext} from './Context';
import {useCookies} from "react-cookie";
import {LandingPage} from "./Screens/LandingPage";
import Home from "./Screens/Home";
import LoginScreen from "./Screens/Login";

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
                    <Stack.Navigator initialRouteName="Home">
                        <Stack.Screen name="Landingpage" component={LandingPage}/>
                        {!isSignedIn ? (
                            <Stack.Screen name="Login" component={LoginScreen}/>
                        ) :
                            (<Stack.Screen name="Home" component={Home}/>)
                        }
                    </Stack.Navigator>
                </NavigationContainer>

            </LoginContext.Provider>
        </PaperProvider>
    )
}

export default App
