import React, { useContext, useEffect, useState } from 'react'
import { Image, TouchableHighlight, StyleSheet, ScrollView, RefreshControl } from 'react-native'
import { Appbar, Card } from 'react-native-paper'
import { capitalize } from '../../helpers'
import { authContext } from '../providers/auth.provider'
import { getUserPlaylist } from '../services/user.service'
import { playlistItemMapper, PlaylistProps } from '../util/playlist.util'

const Library = ({ navigation, route }): JSX.Element => {
  const [playlistItems, setPlaylistItems] = useState<PlaylistProps[]>([])
  const { user } = useContext(authContext)
  const [refreshing, setRefreshing] = useState<boolean>(false)

  const onRefresh = React.useCallback(() => {
    setRefreshing(true);
    handleGetPlaylists()

    setTimeout(() => {
      setRefreshing(false);
    }, 2000);
  }, []);

  const handleGetPlaylists = () => {
    if (!user?.id) return

    getUserPlaylist()
      .then((data) => setPlaylistItems(playlistItemMapper(data.items)))
      .catch(console.error)
  }

  useEffect(() => {
    onRefresh()
  }, [])

  return (
    <>
      <Appbar.Header style={styles.header}>
        <TouchableHighlight
          onPress={() =>
            navigation.navigate('library-stack-navigation', {
              screen: 'Profile',
            })
          }
        >
          <Image
            style={{ height: 50, width: 50, borderRadius: 100 }}
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
              screen: 'Settings',
            })
          }
        />
      </Appbar.Header>
      <ScrollView
        refreshControl={
          <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
        }>
        {playlistItems.length > 0 &&
          playlistItems.map((playlist, i: number) => {
            return (
              <Card
                key={i}
                onPress={() =>
                  navigation.navigate('LibraryDetail', {
                    playlistId: playlist.id,
                    playlistName: playlist.name,
                    playlistImage: playlist.image,
                  })
                }
              >
                <Card.Title
                  title={playlist.name}
                  titleStyle={styles.cardTitle}
                  subtitle={playlist.totalTracks + ' tracks'}
                  subtitleStyle={styles.subtitle}
                  left={() => (
                    <Image
                      source={{ uri: playlist.image }}
                      style={styles.playlistImage}
                    />
                  )}
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
