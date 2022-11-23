import React, {useEffect, useState} from "react";
import {useCookies} from "react-cookie";
import {Image, StyleSheet, TouchableHighlight, ScrollView, View, FlatList} from "react-native";
import { Appbar, Text, Card, Button } from 'react-native-paper';
import { capitalize } from '../helpers';

const Library = ({navigation, route}): JSX.Element => {

    const [cookies, removeCookie] = useCookies(['loginCookie']);
    const [data, setData] = useState([] as any);

    useEffect(() => {
        handleGetPlaylists();
    },[])

    let playlistSearchApi = 'https://api.spotify.com/v1/me/playlists';

    const handleGetPlaylists = () => {
        fetch(playlistSearchApi, {
            method: 'GET',
            headers: { 'Authorization': 'Bearer ' + cookies.loginCookie }
          })
          .then(res => res.json())
          .then(data => {
            let result: any[] = [];
            data.items.map((obj: { name: any; tracks: { total: any; }; images: { url: any; }[]; }) => result.push({title: obj.name, tracks: obj.tracks.total, image: obj.images[0].url}));
            setData(result);
        });
    }

    return (
        <>
            <Appbar.Header style={styles.header}>
                <TouchableHighlight onPress={() => navigation.navigate("library-stack-navigation", {screen: "profile"})}>
                    <Image
                        source={{ uri: 'https://reactnative.dev/img/tiny_logo.png' }}
                        style={{ height: 50, width: 50 }}
                    />
                </TouchableHighlight>
                <Appbar.Content title={capitalize(route.name)} titleStyle={styles.title}/>
                <Appbar.Action icon="cog-outline" onPress={() => navigation.navigate("library-stack-navigation", {screen: "settings"})} />
            </Appbar.Header>
            <ScrollView>
                {data.length > 0 && data.map((playlist: object, i: number) => {
                    return (
                        <Card key={i}>
                            <Card.Title 
                                title={playlist.title}
                                titleStyle={styles.cardTitle} 
                                subtitle={playlist.tracks + ' tracks'}
                                subtitleStyle={styles.subtitle} 
                                left={() => <Image source={{uri: playlist.image}} style={styles.playlistImage}/>}
                                // TODO: inflate playlist screen with spotify tracks.
                                // right={() => <Button mode="text" labelStyle={{ fontSize: 32 }} icon="arrow-right-drop-circle"onPress={() => navigation.navigate("playlist", {playlistId: playlist.title}) }></Button>}
                            />
                        </Card>
                );})}
            </ScrollView>
        </>

    );
};

export default Library;

const styles = StyleSheet.create({
    title: {
        textAlign: 'center',
    },
    playlistImage: {
        width: 50,
        height: 50,
        borderRadius: 0
    },
    cardTitle: {
        marginLeft: 5
    },
    subtitle: {
        marginLeft: 5
    },
    header: {
        marginTop: 10,
        marginVertical: 10,
        marginHorizontal: 10
    }
});