import React, {useContext, useEffect} from "react";
import {Button, Text, View} from "react-native";
import {CLIENT_ID} from '@env'
import {useCookies} from "react-cookie";
import axios from "axios";
import {LoginContext} from "../Context";

// @ts-ignore
const Home = ({navigation}) => {
    const [cookies, setCookie, removeCookie] = useCookies(['loginCookie']);

    useEffect(() => {
        if (cookies.loginCookie !== '') {
            axios.get(
                "https://api.spotify.com/v1/me/top/tracks?time_range=short_term", {
                    headers: {
                        Accept: "application/json",
                        "Content-Type": "application/json",
                        Authorization: "Bearer " + cookies.loginCookie,
                    },
                }).then((response: any) => {
                // console.log(response)
            })
                .catch((error: { message: any; }) => {
                    console.log("error", error.message);
                    removeCookie('loginCookie');
                });
        }
    }, [])

    return <View>
        <Text>we zijn er</Text>
        <Button title={'go back'} onPress={() => navigation.replace('Landingpage')}/>
    </View>
}
export default Home;
