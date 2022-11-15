import {StatusBar} from 'expo-status-bar';
import React from 'react';
import {StyleSheet, View} from 'react-native';
import {Provider as PaperProvider} from "react-native-paper";
import {Login} from "./login";
import {NavigationContainer} from "@react-navigation/native";
import LoginV2 from "./LoginV2";
import {createNativeStackNavigator} from "@react-navigation/native-stack";
import LandingPage from "./LandingPage";

const Stack = createNativeStackNavigator();


const App = (): JSX.Element => {
    return (
        <PaperProvider>
            <NavigationContainer>
                <Stack.Navigator>
                    <Stack.Screen
                        name="Login"
                        component={LoginV2}
                    />
                    <Stack.Screen
                        name="LandingPage"
                        component={LandingPage}
                    />
                    </Stack.Navigator>
            </NavigationContainer>
        </PaperProvider>
    )
}

export default App
