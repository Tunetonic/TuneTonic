import React, { useContext, useEffect } from "react";
import { Alert, Button, View } from "react-native";
import { Text } from "react-native-paper";
import { useCookies } from "react-cookie";
import { LoginContext } from "../Context";


const Home = ({ navigation }): JSX.Element => {

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

    return (
        <View>
            <Text>you're logged in!</Text>
            {/* <Button onPress={() => logOut()} title={'logOut'}/>
            <Button onPress={() => navigation.navigate('Landingpage')} title={'go back to landingPage'}/> */}
        </View>
    );
}
export default Home;
