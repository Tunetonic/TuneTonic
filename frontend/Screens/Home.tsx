import React, {useContext, useEffect} from "react";
import {Alert, Button, Text, View} from "react-native";
import {useCookies} from "react-cookie";
import {LoginContext} from "../Context";

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

    return <View>
        <Text>you're logged in</Text>
        <Button onPress={() => logOut()} title={'logOut'}/>
        <Button onPress={() => navigation.navigate('Landingpage')} title={'go back to landingPage'}/>
        <Button onPress={() => navigation.navigate('User-profile')} title={'go to user-profile'}/>
    </View>
}
export default Home;
