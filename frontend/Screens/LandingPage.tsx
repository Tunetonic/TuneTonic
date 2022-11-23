import React, { useContext, useEffect } from "react";
import { Button, Card, TextInput, Text } from "react-native-paper";
import { useCookies } from "react-cookie";
import { View } from "react-native";
import { LoginContext } from "../Context";



export const LandingPage = ({ navigation }) => {
    const [cookies, setCookie, removeCookie] = useCookies(['loginCookie']);

    const isSignedIn = useContext(LoginContext);

    return (
        <View>
            <Text>Landing Screen</Text>
            {
                !isSignedIn ? (<Button onPress={() => navigation.navigate('login')}>Login</Button>)
                    :
                    (<Button onPress={() => navigation.navigate('home')}>Home</Button>)
            }
        </View>

    )
}
