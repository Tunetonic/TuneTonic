import React, { useContext, useEffect, useState } from "react";
import { useCookies } from "react-cookie";
import { View, Image, TouchableHighlight, StyleSheet } from "react-native";
import { Appbar, Text } from 'react-native-paper';
import { LoginContext } from "../Context";
import { getUserInformation } from "../services/UserProfileService";
import { User } from "../types/user";


const Library = ({navigation, route}): JSX.Element => {

    // TODO: make user info global since its used library and user profile.
    // need to move user information logic to a global store such as asyncStorage
    // (https://reactnative.dev/docs/asyncstorage)

    const [cookies, setCookie, removeCookie] = useCookies(['loginCookie']);
    const [user, setUser] = useState<User>();
    const {setIsSignedIn} = useContext(LoginContext);

    
    useEffect(() => {
        if (cookies.loginCookie !== '') {
            getUserInformation(cookies.loginCookie, setIsSignedIn, removeCookie, setUser);
        }
    });

    return (
        <Appbar.Header>
            <TouchableHighlight onPress={() => navigation.navigate("library-stack-navigation", {screen: "profile", params: { currentUser: user}})}>
                <Image style={{height: 50, width: 50}} source={{uri: user?.images[0].url}}/>
            </TouchableHighlight>
            <Appbar.Content title={route.name} titleStyle={styles.title}/>
            <Appbar.Action icon="cog-outline" onPress={() => navigation.navigate("library-stack-navigation", {screen: "settings"})} />
        </Appbar.Header>
    );
}

const styles = StyleSheet.create({
    title: {
        textAlign: 'center',
    },
});

export default Library;
