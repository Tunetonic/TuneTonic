import React, { useCallback, useContext, useEffect, useRef, useState } from 'react'
import { Image, StyleSheet, Dimensions, Platform, View, FlatList, TouchableHighlight, RefreshControl, Animated } from 'react-native'
import { Card, IconButton, Text } from 'react-native-paper'
import { getRandomTracks } from '../services/user.service'
import { Track, trackItemMapper } from '../util/track'
import { Audio, AVPlaybackStatusSuccess } from 'expo-av';
import Slider from '@react-native-community/slider'
import { GestureHandlerRootView, Swipeable } from 'react-native-gesture-handler'
import { themeContext } from '../providers/theme.provider'
import { millisToHHMMSS } from '../../helpers'
import { addLike, dislike } from '../services/like.service'
import { authContext } from '../providers/auth.provider'

const Home = ({ }): JSX.Element => {
  const { theme } = useContext(themeContext)
  const [selectedTrack, setSelectedTrack] = useState<Track>();
  const [tracks, setTracks] = useState<Track[]>([])
  const audioSoundRef = useRef(new Audio.Sound());
  const [soundStatus, setSoundStatus] = useState<AVPlaybackStatusSuccess>()
  const [isPlaying, setIsPlaying] = useState<boolean>(false)
  const [tracksMeta, setTracksMeta] = useState<any>()
  const [refreshing, setRefreshing] = React.useState(false);
  const { user } = useContext(authContext)

  const onEndReached = React.useCallback(() => {
    setRefreshing(true);

    getRandomTracks(tracksMeta.next).then((data) => {      
      setTracks([...tracks, ...trackItemMapper(data.tracks.items)])
      setTracksMeta({
        'limit': data.tracks.limit,
        'offset': data.tracks.offset,
        'previous': data.tracks.previous,
        'next': data.tracks.next,
        'total': data.tracks.total
      })
    },
    (err) => {
      console.error(err)
    })
    setTimeout(() => {
      setRefreshing(false);
    }, 2000);

  }, [tracksMeta])

  const onRefresh = React.useCallback(() => {
    setRefreshing(true);
    getRandomTracks().then((data) => {      
      setTracks(trackItemMapper(data.tracks.items))
      setTracksMeta({
        'limit': data.tracks.limit,
        'offset': data.tracks.offset,
        'previous': data.tracks.previous,
        'next': data.tracks.next,
        'total': data.tracks.total
      })
    },
    (err) => {
      console.log(err)
    })
    setTimeout(() => {
      setRefreshing(false);
    }, 2000);
  }, []);

  useEffect(() => {
    onRefresh()
  }, [])

  const BOTTOM_TAB_HEIGHT = 77.71
  const PLAYBACK_HEIGHT = 40
  const CARD_WIDTH = Dimensions.get('window').width
  const CARD_HEIGHT = Dimensions.get('window').height - BOTTOM_TAB_HEIGHT - PLAYBACK_HEIGHT
  const styles = StyleSheet.create({
    actionText: {
      fontSize: 100
    },
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


    const stop = async () => {
        setIsPlaying(false)
        await audioSoundRef.current.stopAsync()
    }
    const unload = async () => {
        setIsPlaying(false)
        await audioSoundRef.current.unloadAsync()
    }
    const pausePlay = async () => {
      if (soundStatus && !soundStatus.isPlaying && soundStatus.isLoaded) {
        setIsPlaying(true)
        await audioSoundRef.current.playFromPositionAsync(soundStatus.positionMillis)
      } else {
        setIsPlaying(false)
        await audioSoundRef.current.pauseAsync()
  
      }
    }
  const onViewableItemsChanged = useCallback(({viewableItems}) => {

    if (viewableItems.length > 0) {
      audioSoundRef.current.getStatusAsync().then((status) => {
        if (status.isLoaded) {
          stop()
        } 
      })
      
      setSelectedTrack(viewableItems[0]['item'])
      if (viewableItems[0]['item']['preview_url']) {
        Audio.Sound.createAsync(
          {uri: viewableItems[0]['item']['preview_url']},
          {shouldPlay: false, isLooping: false},
          (status) => {
            if (status.isLoaded) {
                setSoundStatus(status)
                if (status.didJustFinish) {
                    unload()
                }
            }
          },
        )
        .then(({sound}) => {
            audioSoundRef.current = sound
        })
        .catch((err) => {
            console.error(err)
        })
      }
    }
  }, [])

    const LeftActions = (progress, dragX) => {
        let scale = dragX.interpolate({
            inputRange: [0, 100],
            outputRange: [0, 1],
            extrapolate: 'clamp',
        });

        return (
            <View>
                <Animated.Text style={[styles.actionText, {transform: [{scale}]}]}>
                    👎
                </Animated.Text>
            </View>
        );
    };

    const RightActions = (progress, dragX) => {
      const scale = dragX.interpolate({
          inputRange: [-100, 0],
          outputRange: [1, 0],
          extrapolate: 'clamp',
      });
      return (
          <View>
              <Animated.Text style={[styles.actionText, {transform: [{scale}]}]}>
                  👍
              </Animated.Text>
          </View>
      );
  };

  useEffect(() => {
    if (selectedTrack?.preview_url) {
        audioSoundRef.current.getStatusAsync()
            .then(status => {
                if (status.isLoaded) setSoundStatus(status)
            })
            .catch((error) => {
                console.error(error)
            })
    }
  }, [selectedTrack])

  const _viewabilityConfig = useRef({
      minimumViewTime: 200,
      itemVisiblePercentThreshold: 80
  })
  return (<>
    <FlatList
      decelerationRate={0.7}
      snapToInterval={CARD_HEIGHT}
      keyExtractor={item => item.id}
      showsVerticalScrollIndicator={false}
      viewabilityConfig={_viewabilityConfig.current}
      onViewableItemsChanged={onViewableItemsChanged}
      refreshControl={
        <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
      }
      onEndReached={onEndReached}
      onEndReachedThreshold={0.05}
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
      renderItem={({ item }) => (
        <TouchableHighlight
          key={item.uri}
        >
          <Card key={item.uri} style={styles.cardStyle}>
            <Card.Content style={styles.cardContentStyle}>
              <GestureHandlerRootView>
                <Swipeable
                  renderLeftActions={LeftActions}
                  onSwipeableLeftOpen={() => {
                    alert('you have disliked this song 👎');
                    dislike(user?.id, item);
                  }}
                  renderRightActions={RightActions}
                  onSwipeableRightOpen={() => {
                    alert('you have liked this song 👍')
                    addLike(user?.id, item);
                  }}
                >
                  <Image
                      source={{uri: item.image}}
                      style={styles.image}
                  />
                </Swipeable>
              </GestureHandlerRootView>
            </Card.Content>
          </Card>
        </TouchableHighlight>
      )}
    />
    <View style={{'margin': 10}}>
      <View style={{display: 'flex', 'justifyContent': 'space-between', 'flexDirection': 'row'}}>
        <View style={{'flexDirection': 'column'}}>
          <Text
            style={{ width: 300 }}
            numberOfLines={1}
            ellipsizeMode="tail">{selectedTrack ? selectedTrack.name : ''}</Text>
          <Text
            style={{color: 'rgba(255,255,255, 0.6)'}}>{selectedTrack ? 'by ' + selectedTrack.artist_name : ''}</Text>
        </View>
        <IconButton 
          size={35} 
          icon={isPlaying ? 'pause-circle-outline' : 'play-circle-outline'}
          disabled={!selectedTrack?.preview_url} 
          onPress={pausePlay}></IconButton>
      </View>
    </View>
    <Slider
      style={{width: CARD_WIDTH - 20, height: 40}}
      minimumValue={0}
      maximumValue={soundStatus && soundStatus.isLoaded ? soundStatus?.durationMillis : 1}
      value={soundStatus && soundStatus.isLoaded ? soundStatus?.positionMillis : 0}
      minimumTrackTintColor="#FFFFFF"
      step={0.5}
      maximumTrackTintColor="#DBDBDB"
      thumbTintColor={theme.colors.primary}
    />
    <View style={{'display': 'flex', 'justifyContent': 'space-between', 'flexDirection': 'row'}}>
      <Text
        style={{'fontSize': 11}}>{soundStatus && selectedTrack?.preview_url ? millisToHHMMSS(soundStatus?.positionMillis) : '--:--'}</Text>
      <Text
        style={{'fontSize': 11}}>{soundStatus && soundStatus.durationMillis && selectedTrack?.preview_url ? millisToHHMMSS(soundStatus?.durationMillis) : '--:--'}</Text>
    </View>
  </>)
}
export default Home