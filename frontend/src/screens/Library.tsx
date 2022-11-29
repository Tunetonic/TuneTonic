import React, { useContext, useEffect, useState } from 'react'
import { Image, TouchableHighlight, StyleSheet, ScrollView } from 'react-native'
import { Appbar, Card } from 'react-native-paper'

import { capitalize } from '../../helpers'
import { authContext } from '../providers/auth.provider'
import { authFetch } from '../services/fetch.service'

interface PlaylistProps {
  title: string
  tracks: number
  image: string
}

const Library = ({ navigation, route }): JSX.Element => {
  const [playlistItems, setPlaylistItems] = useState<PlaylistProps[]>([])
  const { user } = useContext(authContext)

  let playlistSearchApi = 'https://api.spotify.com/v1/me/playlists'

  const handleGetPlaylists = () => {
    if (!user?.id) return

    authFetch(playlistSearchApi)
      .then((res) => res.json())
      .then((data) => {
        setPlaylistItems(
          data.items.map((item) => ({
            title: item.name,
            image: item.images[0].url,
            tracks: item.tracks.total,
          })),
        )
      })
      .catch(console.error)
  }

  useEffect(() => {
    handleGetPlaylists()
  }, [user])

  return (
    <>
      <Appbar.Header style={styles.header}>
        <TouchableHighlight
          onPress={() =>
            navigation.navigate('library-stack-navigation', {
              screen: 'profile',
            })
          }
        >
          <Image
            style={{ height: 50, width: 50 }}
            source={{ uri: user?.images[0].url }}
          />
        </TouchableHighlight>
        <Appbar.Content
          title={capitalize(route.name)}
          titleStyle={styles.title}
        />
        <Appbar.Action
          icon="cog-outline"
          onPress={() =>
            navigation.navigate('library-stack-navigation', {
              screen: 'settings',
            })
          }
        />
      </Appbar.Header>
      <ScrollView>
        {playlistItems.length > 0 &&
          playlistItems.map((playlist, i: number) => {
            return (
              <Card key={i}>
                <Card.Title
                  title={playlist.title}
                  titleStyle={styles.cardTitle}
                  subtitle={playlist.tracks + ' tracks'}
                  subtitleStyle={styles.subtitle}
                  left={() => (
                    <Image
                      source={{ uri: playlist.image }}
                      style={styles.playlistImage}
                    />
                  )}
                  // TODO: inflate playlist screen with spotify tracks.
                  // right={() => <Button mode="text" labelStyle={{ fontSize: 32 }} icon="arrow-right-drop-circle"onPress={() => navigation.navigate("playlist", {playlistId: playlist.title}) }></Button>}
                />
              </Card>
            )
          })}
      </ScrollView>
    </>
  )
}

export default Library

const styles = StyleSheet.create({
  title: {
    textAlign: 'center',
  },
  playlistImage: {
    width: 50,
    height: 50,
    borderRadius: 0,
  },
  cardTitle: {
    marginLeft: 5,
  },
  subtitle: {
    marginLeft: 5,
  },
  header: {
    marginTop: 10,
    marginVertical: 10,
    marginHorizontal: 10,
  },
})
