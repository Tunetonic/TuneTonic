import React, {useContext} from "react";
import {Button} from "react-native-paper";
import {useCookies} from "react-cookie";
import {Text, View} from "react-native";
import {LoginContext} from "../Context";

// @ts-ignore
export const LandingPage = ({navigation}) => {
    const [cookies, setCookie, removeCookie] = useCookies(['loginCookie']);
    // @ts-ignore
    const {isSignedIn} = useContext(LoginContext);

    return (
        <View>
            <Text>Landing Screen</Text>
            {
                !isSignedIn ? (<Button onPress={() => navigation.navigate('Login')}>Login</Button>)
                    :
                    (<Button onPress={() => navigation.navigate('Home')}>Home</Button>)
            }
        </View>

    )
}
