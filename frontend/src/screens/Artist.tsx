import { View, ScrollView, Image, StyleSheet, RefreshControl } from 'react-native'
import { CommonActions } from '@react-navigation/native'
import { Appbar, Text } from 'react-native-paper'
import React, { useEffect, useState} from "react";
import { getArtist, getArtistPlaylists} from '../services/spotify.service'
import { LinearGradient } from 'expo-linear-gradient'
import { albumItemMapper, PlaylistProps } from '../util/playlist.util'

function Artist({ navigation, route }) {
    const artistId = route.params['artist'];
    const [artist, setArtist] = useState(null);
    const [playlistItems, setPlaylistItems] = useState<PlaylistProps[]>([])

    useEffect(() => {
        getArtist(artistId).then((data) => {
            setArtist(data)
        });
        getArtistPlaylists(artistId).then((playlist) => {
            setPlaylistItems(albumItemMapper(playlist.items))
        })
    }, [])

    const compactNumber = (number) => {
        if (number >= 1000000) {
            return (number / 1000000).toFixed(1) + 'm';
        } else if (number >= 1000) {
            return (number / 1000).toFixed(1) + 'k';
        }
        return number;
    }


    return (
        <>
            <Appbar.Header>
                <Appbar.BackAction
                    onPress={() => {
                        navigation.dispatch(CommonActions.goBack())
                    }}
                />
                <Appbar.Content title={artist?.name + '\'s Profile'} />
            </Appbar.Header>
            <View style={styles.parentContainer}>
                <LinearGradient
                    colors={[
                        'rgba(255,255,255,1)',
                        'rgba(173,173,230,0.5861695019804797)',
                    ]}
                    style={styles.firstChild}
                />

                <View style={styles.container}>
                    <View style={styles.header}>
                        <View style={styles.imageContainer}>
                            <Image
                                style={styles.tinyLogo}
                                source={{ uri: artist?.images[0].url }}
                            />
                        </View>
                        <View>
                            <Text style={styles.headerText}>{artist?.name}</Text>
                            <Text style={styles.text}>{compactNumber(artist?.followers.total)} followers</Text>
                        </View>
                    </View>
                    <Text style={styles.headerText}>Playlist</Text>
                    <ScrollView horizontal={true} style={styles.playlistView}>
                        {playlistItems.map(
                            (data) =>
                                !!data.image && (
                                    <View key={data.id} style={styles.playlist}>
                                        <Image
                                            style={styles.playlistLogo}
                                            source={{ uri: data.image }}
                                        />
                                        <Text style={styles.text}>{data.name}</Text>
                                        <Text style={styles.text}>{data.totalTracks} songs</Text>
                                    </View>
                                ),
                        )}
                    </ScrollView>
                </View>
            </View>
        </>
    )
}

export default Artist

const styles = StyleSheet.create({
    tinyLogo: {
        borderRadius: 50,
        width: 120,
        height: 120,
        position: 'absolute',
        top: -65,
        left: 30,
    },
    playlist: {
        margin: 10,
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
    },
    parentContainer: {
        height: 1000,
    },
    firstChild: {
        height: 140,
    },
    text: { color: 'white' },
    headerText: {
        color: 'white',
        fontSize: 25,
    },
    header: {
        flexDirection: 'row',
    },
    playlistView: {
        flexDirection: 'row',
    },
})