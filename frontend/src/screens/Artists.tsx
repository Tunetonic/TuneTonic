import React, { useState, useEffect } from 'react'
import { FlatList, StyleSheet, View, Alert, RefreshControl } from 'react-native'
import {
  Text,
  DataTable,
  Searchbar,
  Avatar,
  Appbar,
  Button
} from 'react-native-paper'
import { capitalize } from '../../helpers'
import { CommonActions } from '@react-navigation/native'
import { getFollowedArtists } from '../services/user.service'
import { unfollowArtist } from '../services/spotify.service'

interface FriendsProps {
  id: number
  name: string
  image: string
}

const Artists = ({ navigation }): JSX.Element => {
  const [search, setSearch] = useState('')
  const [masterDataSource, setMasterDataSource] = useState <FriendsProps[] | null>(null)
  const [filteredDataSource, setFilteredDataSource] = useState<FriendsProps[]>([])
  const [refreshing, setRefreshing] = useState<boolean>(false)

  const onRefresh = React.useCallback(() => {
    setRefreshing(true);
    getFollowedArtists().then((data) => {
      const artists = data['artists']['items']
      setRefreshing(false);
      setFilteredDataSource(artists)
      setMasterDataSource(artists)
    },
    (err) => {
      console.error(err)
    });
  }, []);

  useEffect(() => {
    onRefresh()
  }, []);

    const handleSearchFilter = (text: string) => {
    return setFilteredDataSource(
      masterDataSource
        ? masterDataSource.filter((e) => e.name.includes(text))
        : [],
    )
  }

  useEffect(() => {
    handleSearchFilter(search)
  }, [search])

    const ItemView = ({ item }) => {
    return (
      <DataTable>
        <DataTable.Row style={styles.row} onPress={() => getItem(item)}>
          <DataTable.Cell>
            <Avatar.Image
              source={{ uri: item.images[0].url }}
              style={{ width: 65, height: 65, borderRadius: 50}}
            />
          </DataTable.Cell>
          <DataTable.Cell>
            <Text>{capitalize(item.name)}</Text>
          </DataTable.Cell>
          <DataTable.Cell style={{ justifyContent: 'flex-end' }}>
            <Button
                mode="text"
                labelStyle={{ fontSize: 25, color: 'white' }}
                icon="account-multiple-minus"
                onPress={() => unfollow(item)}>
            </Button>
          </DataTable.Cell>
        </DataTable.Row>
      </DataTable>
    )
  }

    const getItem = (item: { id: string }) => {
      const artistId = item['id']
      navigation.navigate('artist', { artist: artistId })
    }

  const unfollow = (item: {id: string, name: string}) => {
    const artistId = item['id'];
    const name = item['name']
    Alert.alert(
        'Unfollow',
        'Do you wish to unfollow ' + name + '?',
        [
          {
            text: 'Cancel',
            onPress: () => console.log('Cancel Pressed'),
            style: 'cancel',
          },
          {text: 'OK', onPress: () =>
                unfollowArtist(artistId).then((response) => {
                  // The artist was successfully unfollowed, so update the master data source
                  getFollowedArtists().then((data) => {
                    const artists = data['artists']['items']
                    setFilteredDataSource(artists)
                    setMasterDataSource(artists)
                  })
                })
          },
        ],
        {cancelable: false},
    );
  }


  let content: React.ReactElement

    content = (
      <>
        <Text style={styles.count}>
          {Object.keys(filteredDataSource).length} Artists
        </Text>
        <FlatList
          style={styles.container}
          data={filteredDataSource}
          keyExtractor={(item, index) => index.toString()}
          renderItem={ItemView}
          refreshControl={
            <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
          }
        />
      </>
    )

  return (
    <View style={styles.container}>
      <>
        <Appbar.Header>
          <Appbar.BackAction
            onPress={() => {
              navigation.dispatch(CommonActions.goBack())
            }}
          />
          <Appbar.Content title="My Followed Artists" />
        </Appbar.Header>
      </>
      <Searchbar
        placeholder="Search Here"
        onChangeText={(text) => setSearch(text)}
        value={search}
      />
      {content}
    </View>
  )
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  row: {
    height: 70,
    marginBottom: 10,
  },
  count: {
    color: '#efefef',
    padding: 10,
    textAlign: 'right',
    fontSize: 18,
  },
  text: {
    color: '#FFFFFF',
  }
})

export default Artists
