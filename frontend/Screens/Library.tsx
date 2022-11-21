
import {StatusBar} from "expo-status-bar";
import React, {useContext, useEffect, useState} from "react";
import {useCookies} from "react-cookie";
import {Image, ImageStore, KeyboardAvoidingView, StyleSheet, Text, ScrollView} from "react-native";
import {Card} from "react-native-paper";

// @ts-ignore
const Libary = () => {
    const [cookies, removeCookie] = useCookies(['loginCookie']);
    const [data, setData] = useState([] as any);

    useEffect(() => {
        handleGetPlaylists();
    },[])

    let playlistSearchApi = 'https://api.spotify.com/v1/me/playlists';
    const handleGetPlaylists = () => {
        fetch(playlistSearchApi, {
            method: 'GET',
            headers: { 'Authorization': 'Bearer BQAPr37VRQxpQogH61aPywSJsZNVtRhthI1FdkZFJOTSLDzbO4mS6GeByT-AHJ3wZsrJiWd1PhzQBCgl-q-h0ssVhpoI-ySqnhPL5lYzV9xx_B9gnI0Dzm-X_-f9FQ3Nu7pxkQeaKu0b3RV6OhQWJ-RkpGAmXNUjNy2HkcPLU61ajIqBkLze0KQGJg' }
          })
          .then(res => res.json())
          .then(data => {
            let result: any[] = [];
            data.items.map((obj: { name: any; tracks: { total: any; }; images: { url: any; }[]; }) => result.push({title: obj.name, tracks: obj.tracks.total, image: obj.images[0].url}));
            setData(result);
        });
    }

    return (
        <ScrollView style={styles.container}>
            <StatusBar style="light"/>
            {data.length > 0 && data.map((playlist: object, i: number) => {
                return (
                    <Card key={i}>
                        <Card.Title 
                            title={playlist.title}
                            titleStyle={styles.title} 
                            subtitle={playlist.tracks}
                            subtitleStyle={styles.subtitle} 
                            left={(props => <Image source={{uri: playlist.image}} style={styles.playlistImage}/>)}
                        />
                    </Card>
            );})}
        </ScrollView>
    );
};

export default Libary;

const styles = StyleSheet.create({
    container: {
    },
    playlistImage: {
        width: 50,
        height: 50,
        borderRadius: 0
    },
    title: {
        marginLeft: 5
    },
    subtitle: {
        marginLeft: 5
    },
});
