import React, { useContext, useEffect, useState } from 'react'
import { Appbar, Text } from 'react-native-paper'
import { View, ScrollView, Image, StyleSheet } from 'react-native'
import { LinearGradient } from 'expo-linear-gradient'
import { getUserPlaylist } from '../services/user.service'
import { CommonActions } from '@react-navigation/native'
import { authContext } from '../providers/auth.provider'
import { playlistItemMapper, PlaylistProps } from '../util/playlist.util'
import { themeContext } from '../providers/theme.provider'

const UserProfile = ({ navigation, route }): JSX.Element => {
  const { theme } = useContext(themeContext)
  const [playlistItems, setPlaylistItems] = useState<PlaylistProps[]>([])
  const { user } = useContext(authContext)

  useEffect(() => {
    if (user) {
      getUserPlaylist().then((data) =>
        setPlaylistItems(playlistItemMapper(data.items)),
      )
    }
  }, [])

  const styles = StyleSheet.create({
    container: {
      height: 1000,
      borderTopLeftRadius: 25,
      borderTopRightRadius: 25,
    },
    parentContainer: {
      height: 1000,
    },
    firstChild: {
      height: 125,
    },
    header: {
      flexDirection: 'row',
    },
    imageContainer: {
      width: 200,
      height: 90,
    },
    tinyLogo: {
      borderRadius: 100,
      width: 120,
      height: 120,
      position: 'absolute',
      top: -65,
      left: 25,
    },
    userInformation: {
      marginTop: 12,
    },
    userName: {
      color: theme.colors.text,
      fontSize: 25,
      fontWeight: 'bold',
    },
    text: {
      color: theme.colors.text,
      marginTop: 10,
    },
    categoryText: {
      color: theme.colors.text,
      fontSize: 19,
      left: 25,
      fontWeight: 'bold',
    },
    playlistView: {
      flexDirection: 'row',
      left: 25,
      top: 5,
    },
    playlist: {
      marginTop: 10,
      marginRight: 10,
      marginBottom: 10,
    },
    playlistLogo: {
      width: 120,
      height: 120,
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
                source={{ uri: user?.images[0].url }}
              />
            </View>
            <View style={styles.userInformation}>
              <Text style={styles.userName}>{user?.display_name}</Text>
              <Text style={styles.text}>
                <Text style={{ fontWeight: 'bold' }}>
                  {user?.followers.total}{' '}
                </Text>
                followers
              </Text>
            </View>
          </View>

          <Text style={styles.categoryText}>Playlists</Text>
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

export default UserProfile
