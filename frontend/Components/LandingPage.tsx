import React, {useEffect} from "react";
import {Button, Card, TextInput} from "react-native-paper";
import {useCookies} from "react-cookie";
import {Text, View} from "react-native";


// @ts-ignore
export const LandingPage = ({navigation}) => {
    const [cookies, setCookie, removeCookie] = useCookies(['loginCookie']);

    useEffect(() => {
        // removeCookie('loginCookie');
    })

    return (
        <View>
            <Button onPress={() => navigation.replace('Home')}>btn</Button>
        </View>
    )
}
