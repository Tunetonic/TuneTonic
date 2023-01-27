import React, { Fragment, useContext, useEffect, useState } from 'react'
import { Appbar, IconButton, Text } from 'react-native-paper'
import { View, ScrollView, Image, StyleSheet, Linking, RefreshControl } from 'react-native'
import { LinearGradient } from 'expo-linear-gradient'
import { CommonActions } from '@react-navigation/native'
import { themeContext } from '../providers/theme.provider'
import { songMapper, SongProps } from '../util/song.util'
import { getPlaylistSongs } from '../services/user.service'
import { SongCard } from '../components/cards/SongCard'

const LibraryDetail = ({ navigation, route }): JSX.Element => {
  const { theme } = useContext(themeContext)
  const [songs, setSongs] = useState<SongProps[]>([])
  const [refreshing, setRefreshing] = useState<boolean>(false)

  const onRefresh = React.useCallback(() => {
    setRefreshing(true);
    handleGetSongs()

    setTimeout(() => {
      setRefreshing(false);
    }, 2000);
  }, []);

  useEffect(() => {
    if (route.params.playlistId) {
      onRefresh()
    }
  }, [route.params.playlistId])

  const handleGetSongs = () => {
    getPlaylistSongs(route.params.playlistId)
      .then((data) => {
        setSongs(songMapper(data.tracks.items))
      })
      .catch(console.error)
  }

  const redirectPlaylist = () => {
    Linking.openURL(
      `https://open.spotify.com/playlist/${route.params.playlistId}`,
    )
  }

  const shuffleSong = () => {}

  const styles = StyleSheet.create({
    firstChild: {
      height: 125,
    },
    header: {
      flexDirection: 'column',
    },
    imageContainer: {
      height: 125,
    },
    playlistImage: {
      position: 'absolute',
      width: 200,
      height: 200,
      alignSelf: 'center',
      top: -100,
    },
    icons: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      marginBottom: 25,
    },
    playlistName: {
      position: 'absolute',
      color: theme.colors.text,
      fontSize: 30,
      fontWeight: 'bold',
      bottom: 45,
      alignSelf: 'center',
    },
    songs: {
      flexDirection: 'column',
    },
    playIcon: {
      marginRight: 15,
    },
    shuffleIcon: {
      marginLeft: 15,
      color: 'green',
    },
  })

  return (
    <>
      <Appbar.Header>
        <Appbar.BackAction
          onPress={() => {
            navigation.dispatch(CommonActions.goBack())
          }}
        />
      </Appbar.Header>
      <ScrollView
        refreshControl={
          <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
        }>
        <LinearGradient
          colors={['rgba(255,255,255,1)', 'rgba(189,70,249,0.7)']}
          style={styles.firstChild}
        />

        <View>
          <View style={styles.header}>
            <View style={styles.imageContainer}>
              <Image
                style={styles.playlistImage}
                source={{
                  uri: route.params.playlistImage,
                }}
              />
            </View>
            <View style={styles.icons}>
              <IconButton
                icon="shuffle"
                size={36}
                color="green"
                style={styles.shuffleIcon}
                onPress={() => {
                  shuffleSong()
                }}
              />
              <IconButton
                icon="play"
                size={36}
                color="green"
                style={styles.playIcon}
                onPress={() => {
                  redirectPlaylist()
                }}
              />
            </View>
            <Text style={styles.playlistName}>{route.params.playlistName}</Text>
          </View>
        </View>

        {songs.length > 0 &&
          songs.map((song, i: number) => (
            <Fragment key={i}>
              <SongCard
                id={song.id}
                name={song.name}
                artist={song.artist}
                image={song.image}
                length={song.length}
              />
            </Fragment>
          ))}
      </ScrollView>
    </>
  )
}

export default LibraryDetail
