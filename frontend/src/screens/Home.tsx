import React, { useContext, useEffect, useState } from 'react'
import { ScrollView, Image, StyleSheet, Dimensions, Platform, View } from 'react-native'
import { Card, IconButton, Text, Title } from 'react-native-paper'
import { getPlaylist } from '../services/user.service'
import { Track, trackItemMapper } from '../util/track'
import { Audio } from 'expo-av';
import { Sound } from 'expo-av/build/Audio'

const Home = ({ navigation }): JSX.Element => {

  const [tracks, setTracks] = useState<Track[]>([])
  const [sound, setSound] = useState<Sound>()
  // let tracks = [
  //   {
  //     id: '1',
  //   },
  //   {
  //     id: '2',
  //   },
  //   {
  //     id: '3',
  //   },
  //   {
  //     id: '4',
  //   },
  //   {
  //     id: '5',
  //   },
  //   {
  //     id: '6',
  //   },
  //   {
  //     id: '7',
  //   },
  //   {
  //     id: '8',
  //   },
  //   {
  //     id: '9',
  //   },
  //   {
  //     id: '11',
  //   },
  //   {
  //     id: '12',
  //   },
  //   {
  //     id: '13',
  //   },
  //   {
  //     id: '14',
  //   },
  //   {
  //     id: '15',
  //   },
  //   {
  //     id: '16',
  //   },
  //   {
  //     id: '17',
  //   },
  //   {
  //     id: '18',
  //   },
  //   {
  //     id: '19',
  //   },
  // ]

  const playAudio = async (src: string | undefined) => {
    if(src) {
      console.log('Loading Sound: ', src)
      const { sound } = await Audio.Sound.createAsync({uri: src})
      setSound(sound)
  
      console.log('Playing Sound: ', src)
      await sound.playAsync()
    }
    else {
      console.log("too bad kid, no preview_url on this track.")
    }
  }

  useEffect(() => {
    getPlaylist("4Mu1GSMPiyxDphkPeGJDJT").then((data) => {
      setTracks(trackItemMapper(data.items))
    })
  }, [])

  useEffect(() => {
    return sound ? () => {
          console.log('Unloading Sound');
          sound.unloadAsync();
        }
      : console.log("hit?");
  }, [sound]);

  
  const CARD_WIDTH = Dimensions.get('window').width
  const CARD_HEIGHT = Dimensions.get('window').height - 90
  const SPACING_FOR_CARD_INSET = 5
  const styles = StyleSheet.create({
    cardContentStyle: {
      flex: 1,
      alignItems: 'center',
      justifyContent: 'center'
    },
    cardStyle: {
      width: CARD_WIDTH,
      height: CARD_HEIGHT,
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
      backgroundColor: 'navy',
      color: 'white',
      marginVertical: 5,
      borderRadius: 15
    },
    title: {
      textAlign: 'center',
    },
    image: {
      width: 256,
      height: 256,
      alignItems: 'center',
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

  return (
    <ScrollView
      decelerationRate={0.3}
      snapToInterval={CARD_HEIGHT + 12}
      contentInset={{
        top: SPACING_FOR_CARD_INSET,
        left: 0,
        bottom: SPACING_FOR_CARD_INSET,
        right: 0
      }}
      snapToAlignment="center"
      contentContainerStyle={{
        paddingVertical: Platform.OS === 'android' ? SPACING_FOR_CARD_INSET : 0
      }}>
        {tracks.length > 0 &&
          tracks.map((track) => {
            return (
              <Card key={track.id} style={styles.cardStyle}>
                <Card.Content style={styles.cardContentStyle}>
                  <Image
                    source={{ uri: track.image }}
                    style={styles.image}
                    />
                  <Title>{track.name}</Title>
                  <IconButton
                    icon='play-circle'
                    color='#1ED760'
                    size={50}
                    onPress={ async () => await playAudio(track.preview_url)}
                  />
                </Card.Content>
              </Card>
            )
          })}
    </ScrollView>
  )
}
export default Home
