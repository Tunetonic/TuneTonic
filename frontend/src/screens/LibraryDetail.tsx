import React, { Fragment, useContext, useEffect, useState } from 'react'
import { Appbar, Button, Text } from 'react-native-paper'
import { View, ScrollView, Image, StyleSheet } from 'react-native'
import { LinearGradient } from 'expo-linear-gradient'
import { CommonActions } from '@react-navigation/native'
import { themeContext } from '../providers/theme.provider'
import { songMapper, SongProps } from '../util/song.util'
import { getPlaylistSongs } from '../services/user.service'
import { SongCard } from '../components/cards/SongCard'

const test: SongProps[] = [
  {
    name: 'Test',
    id: 'pokoe',
    href: 'http://hoi.nl',
    artist: 'Hessel',
    image: 'https://i.scdn.co/image/ab67616d0000b273bd5d6e268126a92a3a327afa',
    length: '3:26',
  },
  {
    name: 'Test',
    id: 'pokoe',
    href: 'http://hoi.nl',
    artist: 'Hessel',
    image: 'https://i.scdn.co/image/ab67616d0000b273bd5d6e268126a92a3a327afa',
    length: '3:26',
  },
  {
    name: 'Test',
    id: 'pokoe',
    href: 'http://hoi.nl',
    artist: 'Hessel',
    image: 'https://i.scdn.co/image/ab67616d0000b273bd5d6e268126a92a3a327afa',
    length: '3:26',
  },
  {
    name: 'Test',
    id: 'pokoe',
    href: 'http://hoi.nl',
    artist: 'Hessel',
    image: 'https://i.scdn.co/image/ab67616d0000b273bd5d6e268126a92a3a327afa',
    length: '3:26',
  },
  {
    name: 'Test',
    id: 'pokoe',
    href: 'http://hoi.nl',
    artist: 'Hessel',
    image: 'https://i.scdn.co/image/ab67616d0000b273bd5d6e268126a92a3a327afa',
    length: '3:26',
  },
  {
    name: 'Test',
    id: 'pokoe',
    href: 'http://hoi.nl',
    artist: 'Hessel',
    image: 'https://i.scdn.co/image/ab67616d0000b273bd5d6e268126a92a3a327afa',
    length: '3:26',
  },
  {
    name: 'Test',
    id: 'pokoe',
    href: 'http://hoi.nl',
    artist: 'Hessel',
    image: 'https://i.scdn.co/image/ab67616d0000b273bd5d6e268126a92a3a327afa',
    length: '3:26',
  },
]

const LibraryDetail = ({
  navigation,
  route,
  playlistName,
  playlistId,
}): JSX.Element => {
  const { theme } = useContext(themeContext)
  const [songs, setSongs] = useState<SongProps[]>(test)

  //   useEffect(() => {
  //     handleGetSongs()
  //   }, [])

  //   const handleGetSongs = () => {
  //     getPlaylistSongs()
  //       .then((data) => setSongs(songMapper(data.items)))
  //       .catch(console.error)
  //   }

  const playSong = () => {}

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
      fontSize: 26,
      fontWeight: 'bold',
      bottom: 30,
      alignSelf: 'center',
    },
    songs: {
      flexDirection: 'column',
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
        <Appbar.Content title={route.name} />
      </Appbar.Header>
      <ScrollView>
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
                  uri: 'https://i.scdn.co/image/ab67616d0000b273bd5d6e268126a92a3a327afa',
                }}
              />
            </View>
            <View style={styles.icons}>
              <Button>Shuffle</Button>
              <Button>Play</Button>
            </View>
            <Text style={styles.playlistName}>Playlist</Text>
          </View>
        </View>

        {songs.length > 0 &&
          songs.map((song, i: number) => (
            <Fragment key={i}>
              <SongCard
                id={song.id}
                name={song.name}
                artist={song.artist}
                onPress={() => playSong}
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
