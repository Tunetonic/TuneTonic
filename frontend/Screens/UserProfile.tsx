import React, {useContext, useEffect, useState} from "react";
import {useCookies} from "react-cookie";
import axios, {AxiosResponse} from "axios";
import {LoginContext} from "../Context";
import {ScrollView, Text} from "react-native";
import {View, Image, StyleSheet} from 'react-native';
import {LinearGradient} from 'expo-linear-gradient';
import {getUserInformations, getUserPlaylist} from "../services/UserProfileService";

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
    const [playlistItems, setPlaylistItems] = useState<any[]>([]);
    // @ts-ignore
    const {setIsSignedIn} = useContext(LoginContext);

    useEffect(() => {
        if (cookies.loginCookie !== '') {
            getUserInformations(cookies.loginCookie, setIsSignedIn, removeCookie, setUser)

            getUserPlaylist(cookies.loginCookie, setIsSignedIn, removeCookie, setPlaylistItems)

        }

    }, [])

    return <>
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
    </>
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
