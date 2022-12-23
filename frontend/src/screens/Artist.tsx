import { View, ScrollView, Image, StyleSheet } from 'react-native'
import { CommonActions } from '@react-navigation/native'
import { Appbar, Text } from 'react-native-paper'
import React, {useContext, useEffect, useState} from "react";
import { getArtist} from '../services/spotify.service'
import { LinearGradient } from 'expo-linear-gradient'

function Artist({ navigation, route }) {
    const artistId = route.params['artist'];
    const [artist, setArtist] = useState(null);
    useEffect(() => {
        getArtist(artistId).then((data) => {
            setArtist(data)
        });
    }, []);

    return (
        <>
            <Appbar.Header>
                <Appbar.BackAction
                    onPress={() => {
                        navigation.dispatch(CommonActions.goBack())
                    }}
                />
                <Appbar.Content title={route.name} />
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
                            <Text style={styles.text}>{artist?.followers.total} followers</Text>
                        </View>
                    </View>
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