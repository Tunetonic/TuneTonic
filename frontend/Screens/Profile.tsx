import React, {useContext, useEffect, useState} from "react";
import {useCookies} from "react-cookie";
// import axios, {AxiosResponse} from "axios";
import {Appbar, Text} from "react-native-paper";
import {LoginContext} from "../Context";
import {View, ScrollView, Image, StyleSheet} from 'react-native';
import {LinearGradient} from 'expo-linear-gradient';
import {getUserInformation, getUserPlaylist} from "../services/UserProfileService";
import { User } from "../types/user";
import { CommonActions } from "@react-navigation/native";



const UserProfile = ({navigation, route}): JSX.Element => {
    const [cookies, setCookie, removeCookie] = useCookies(['loginCookie']);
    const [user, setUser] = useState<User>();
    const [playlistItems, setPlaylistItems] = useState<any[]>([]);
    // @ts-ignore
    const {setIsSignedIn} = useContext(LoginContext);

    useEffect(() => {
        if (cookies.loginCookie !== '') {
            getUserInformation(cookies.loginCookie, setIsSignedIn, removeCookie, setUser)
            getUserPlaylist(cookies.loginCookie, setIsSignedIn, removeCookie, setPlaylistItems)

        }

    }, [])

    return (<>
        <Appbar.Header>
            <Appbar.BackAction onPress={() => {navigation.dispatch(CommonActions.goBack());}} />
            <Appbar.Content title={route.name} />
        </Appbar.Header>
        <View style={styles.parentContainer}>
            <LinearGradient
                colors={['rgba(255,255,255,1)', 'rgba(173,173,230,0.5861695019804797)']}
                style={styles.firstChild}
            />

            <View style={styles.container}>
                <View style={styles.header}>
                    <View style={styles.imageContainer}>
                        <Image style={styles.tinyLogo} source={{uri: user?.images[0].url}}/>
                    </View>
                    <View>
                        <Text style={styles.headerText}>{user?.display_name}</Text>
                        <Text style={styles.text}>{user?.followers.total} followers</Text>
                    </View>
                </View>

                <Text style={styles.headerText}>Playlist</Text>
                <ScrollView horizontal={true} style={styles.playlistView}>
                    {playlistItems.map(data => (
                        data.images.length > 0 &&
                        <View key={data.id} style={styles.playlist}>
                            <Image style={styles.playlistLogo} source={{uri: data.images[0].url}}/>
                            <Text style={styles.text}>{data.name}</Text>
                            <Text style={styles.text}>{data.tracks.total} songs</Text>
                        </View>
                    ))}
                </ScrollView>
            </View>
        </View>
    </>);
}

export default UserProfile;


const styles = StyleSheet.create({
    tinyLogo: {
        borderRadius: 50,
        width: 120,
        height: 120,
        position: 'absolute',
        top: -65,
        left: 30
    },
    playlist: {
        margin: 10

    },
    playlistLogo: {
        width: 120,
        height: 120,
    },

    imageContainer: {
        width: 200,
        height: 90,
    },
    container: {
        borderRadius: 10,
        backgroundColor: 'black',
        height: 1000,
        // flexDirection: 'row'

    },
    parentContainer: {
        height: 1000,
    },
    firstChild: {
        height: 140,
        // borderColor: 'white',
        // borderBottomWidth: 1,
        // borderTopWidth: 1
    },
    text: {color: 'white'},
    headerText: {
        color: 'white',
        fontSize: 25
    },
    header: {
        flexDirection: 'row'
    },
    playlistView: {
        flexDirection: 'row'
    }
});