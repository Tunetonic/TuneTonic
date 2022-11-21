import React, {useContext, useEffect} from "react";
import {Alert, Button, Text, View} from "react-native";
import {CLIENT_ID} from '@env'
import {useCookies} from "react-cookie";
import axios from "axios";
import {LoginContext} from "../Context";
import {useNavigation} from "@react-navigation/native";

// @ts-ignore
const Home = ({navigation}) => {
    const [cookies, setCookie, removeCookie] = useCookies(['loginCookie']);
    // @ts-ignore
    const {setIsSignedIn} = useContext(LoginContext);

    const logOut = () => {
        Alert.alert(
            "Logout",
            "Are you sure? You want to logout?",
            [
                {
                    text: "Cancel",
                    onPress: () => {
                        return null;
                    },
                },
                {
                    text: "Confirm",
                    onPress: () => {
                        // @ts-ignore
                        removeCookie('loginCookie');
                        setIsSignedIn(false);
                        navigation.navigate('Home')
                    },
                },
            ],
            {cancelable: false}
        );
    }

    // useEffect(() => {
    //     if (cookies.loginCookie !== '') {
    //         axios.get(
    //             "https://api.spotify.com/v1/me/top/tracks?time_range=short_term", {
    //                 headers: {
    //                     Accept: "application/json",
    //                     "Content-Type": "application/json",
    //                     Authorization: "Bearer " + cookies.loginCookie,
    //                 },
    //             }).then((response: any) => {
    //             // console.log(response)
    //         })
    //             .catch((error: { message: any; }) => {
    //                 console.log("error", error.message);
    //                 removeCookie('loginCookie');
    //             });
    //     }
    // }, [])

    return <View>
        <Text>you're logged in</Text>
        <Button onPress={() => logOut()} title={'logOut'}/>
        <Button onPress={() => navigation.navigate('Landingpage')} title={'go back to landingPage'}/>
        <Button onPress={() => navigation.navigate('Library')} title={'go to Library'}/>

    </View>
}
export default Home;
