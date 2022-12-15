import React, { useCallback, useContext, useEffect, useRef, useState } from 'react'
import { Image, StyleSheet, Dimensions, Platform, View, FlatList, TouchableHighlight } from 'react-native'
import { Card, IconButton, Text } from 'react-native-paper'
import { getPlaylist } from '../services/user.service'
import { Track, trackItemMapper } from '../util/track'
import { Audio, AVPlaybackStatus } from 'expo-av';
import { SoundObject } from 'expo-av/build/Audio'
import Slider from '@react-native-community/slider'
import { themeContext } from '../providers/theme.provider'
import { millisToHHMMSS } from '../../helpers'

const Home = ({ navigation }): JSX.Element => {
  const { theme } = useContext(themeContext) 
  const [selectedTrack, setSelectedTrack] = useState<Track>();
  const [tracks, setTracks] = useState<Track[]>([])
  const audioSoundRef = React.useRef(new Audio.Sound());
  const [soundStatus, setSoundStatus] = useState<AVPlaybackStatus>()
  

  // const onPlaybackStatusUpdate = async (playbackStatus) => {
  //   await setSound(playbackStatus);
  //   if (playbackStatus.isPlaying) {
  //   }
  // }
  // const playAudio = async (src: string | undefined) => {
  //   if(src) {
  //     const { sound } = await Audio.Sound.createAsync({uri: src})
  //     setSound(sound)
  
  //     console.log('Playing Sound: ', src)
  //     await sound.playAsync()
  //   }
  //   else {
  //     console.log("too bad kid, no preview_url on this track.")
  //   }
  // }

  useEffect(() => {
    getPlaylist("1LwKg8pkx71G83WgOfvlLZ").then((data) => {
      setTracks(trackItemMapper(data.items))
    })
  }, [])

  // useEffect(() => {
  //   return sound ? () => {
  //         console.log('Unloading Sound');
  //         sound.unloadAsync();
  //       }
  //     : console.log("hit?");
  // }, [sound]);

  const BOTTOM_TAB_HEIGHT = 77.71
  const PLAYBACK_HEIGHT = 40
  const CARD_WIDTH = Dimensions.get('window').width
  const CARD_HEIGHT = Dimensions.get('window').height - BOTTOM_TAB_HEIGHT - PLAYBACK_HEIGHT
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
      // backgroundColor: 'teal',
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
  const onViewableItemsChanged = useCallback( ({ viewableItems }) => { 

    if (viewableItems.length > 0) {
      setSelectedTrack(viewableItems[0]['item'])

      if(viewableItems[0]['item']['preview_url']) {
        Audio.Sound.createAsync({uri: viewableItems[0]['item']['preview_url']},
          {
          shouldPlay: false,
          isLooping: false,
          }
        ).then(({ sound }) => {
          console.log("soundObj: ", sound)
          audioSoundRef.current = sound

          audioSoundRef.current.getStatusAsync()
          .then((status) => {
            console.log("status: ", status)
            setSoundStatus(status)
          })
        })
        console.log("hit!?")
      } else {
        console.log("too bad kid, theres no preview for this track.")
      }
      
    }
  }, [])

  useEffect(() => {
    if(selectedTrack?.preview_url) {
      audioSoundRef.current.getStatusAsync()
      .then(status => setSoundStatus(status))
    }    
  }, [selectedTrack])

  const _viewabilityConfig = useRef({
    minimumViewTime: 200, 
    itemVisiblePercentThreshold: 50
  })

  return (<>
    <FlatList
      decelerationRate={0.7}
      snapToInterval={CARD_HEIGHT}
      keyExtractor={item => item.id}
      showsVerticalScrollIndicator={false}
      viewabilityConfig={_viewabilityConfig.current}
      onViewableItemsChanged={onViewableItemsChanged}
      contentInset={{
        top: 0,
        left: 0,
        bottom: 0,
        right: 0
      }}
      snapToAlignment="start"
      contentContainerStyle={{
        paddingVertical: Platform.OS === 'android' ? 0 : 0
      }}
      data={tracks}
      // extraData={[soundStatus]}
      renderItem={({ item, index }) => (
        <TouchableHighlight
          key={item.id}
          >
            <Card key={item.id} style={styles.cardStyle}>
              <Card.Content style={styles.cardContentStyle}>
                <Image
                  source={{ uri: item.image }}
                  style={styles.image}
                />
                {/* <Text style={styles.title}>{item.id} | {CARD_HEIGHT} | {index}</Text> */}
              </Card.Content>
            </Card>
          </TouchableHighlight>
        )}
      />
    <View style={{ 'margin': 10 }}>
      <View style={{display:'flex', 'justifyContent': 'space-between', 'flexDirection': 'row'}}>
        <View style={{'flexDirection': 'column'}}>
          <Text>{selectedTrack ? selectedTrack.name : ''}</Text>
          <Text style={{ color: 'rgba(255,255,255, 0.6)'}}>{selectedTrack ? 'by '  + selectedTrack.artist_name: ''}</Text>
        </View>
        <IconButton icon={'play-circle-outline'}></IconButton>

        {/* <View>
          {/* <IconButton icon={'pause-circle-outline'}></IconButton>
        </View> */}
      </View>


      <Slider
        style={{width: CARD_WIDTH - 20, height: 40}}
        minimumValue={ soundStatus && soundStatus.isLoaded ? soundStatus?.positionMillis : 0}
        maximumValue={ soundStatus && soundStatus.isLoaded ? soundStatus?.durationMillis : 1}
        minimumTrackTintColor="#FFFFFF"
        maximumTrackTintColor="#DBDBDB"
        thumbTintColor={theme.colors.primary}
      />
      <View style={{ 'display': 'flex', 'justifyContent': 'space-between', 'flexDirection': 'row'}}>
        <Text style={{'fontSize': 11}}>{soundStatus && soundStatus.isLoaded && selectedTrack?.preview_url ? millisToHHMMSS(soundStatus?.positionMillis) : '--:--'}</Text>
        <Text style={{'fontSize': 11}}>{soundStatus && soundStatus.isLoaded && soundStatus.durationMillis && selectedTrack?.preview_url ? millisToHHMMSS(soundStatus?.durationMillis): '--:--'}</Text>
      </View>
     </View>
  </>)
}
export default Home