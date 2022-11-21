import React, {useContext, useEffect, useState} from "react";
import {useCookies} from "react-cookie";
import axios, {AxiosResponse} from "axios";
import {LoginContext} from "../Context";
import {Text} from "react-native";
import { View, Image, StyleSheet } from 'react-native';


export type User = {
    country: string,
    display_name: string,
    email: string,
    explicit_content: { filter_enabled: boolean, filter_locked: boolean },
    external_urls: { spotify: string },
    followers: { href: string, total: number },
    href: string,
    id: number,
    images: [{ height: number, url: string, width: number }],
    product: string,
    type: string,
    uri: string
}

const UserProfile = () => {
    const [cookies, setCookie, removeCookie] = useCookies(['loginCookie']);
    const [user, setUser] = useState<User>();

    // @ts-ignore
    const {setIsSignedIn} = useContext(LoginContext);

    useEffect(() => {
        if (cookies.loginCookie !== '') {
            axios.get(
                "https://api.spotify.com/v1/me", {
                    headers: {
                        Accept: "application/json",
                        "Content-Type": "application/json",
                        Authorization: "Bearer " + cookies.loginCookie,
                    },
                }).then((response: AxiosResponse<User>) => {
                setUser(response.data);
            })
                .catch((error: { message: any; }) => {
                    console.log("error", error.message);
                    removeCookie('loginCookie');
                    setIsSignedIn(false);
                });
        }
    }, [])

    return <>
        <Text>{user?.email}</Text>
        <Text>{user?.country}</Text>
        <Text>{user?.display_name}</Text>
        <Text>{user?.id}</Text>
        <Text>{user?.product}</Text>
        <Text>{user?.uri}</Text>
        <Image style={styles.tinyLogo} source={{uri: user?.images[0].url}}/>
    </>
}

export default UserProfile;


const styles = StyleSheet.create({
    container: {
        paddingTop: 50,
    },
    tinyLogo: {
        width: 50,
        height: 50,
    },
    logo: {
        width: 66,
        height: 58,
    },
});
