import React, { useState, useEffect } from 'react'
import { FlatList, Image, StyleSheet, View } from 'react-native'
import { Text, DataTable, ActivityIndicator, Searchbar, Appbar } from 'react-native-paper'
import { capitalize } from '../../helpers'
import { CommonActions } from '@react-navigation/native'


  interface FriendsProps {
    id: number
    title: string
    image: string
  }

  const Friends = ({ navigation, route }): JSX.Element => {
    const [search, setSearch] = useState('')
    const [loading, setLoading] = useState(true)
    const [masterDataSource, setMasterDataSource] = useState<FriendsProps[] | null>(null)

    const [filteredDataSource, setFilteredDataSource] = useState<FriendsProps[]>([])

    const jsonLink =
        'https://my-json-server.typicode.com/bcengioglu/json-example/users'

    useEffect(() => {
      fetch(jsonLink)
          .then((response) => response.json())
          .then((responseJson) => {
            setLoading(false)
            setFilteredDataSource(responseJson)
            setMasterDataSource(responseJson)
          })
          .catch((error) => {
            console.error(error)
          })
    }, [])

    const handleSearchFilter = (text: string) => {
      return setFilteredDataSource(
          masterDataSource
              ? masterDataSource.filter((e) => e.title.includes(text))
              : [],
      )
    }

    useEffect(() => {
      handleSearchFilter(search)
    }, [search])

    const ItemView = ({item}) => {
      return (
            <DataTable>
              <DataTable.Row style={styles.row} onPress={() => getItem(item)}>
                <DataTable.Cell>
                  <Image source={{uri: item.image}} style={{width: 30, height: 30}}/>
                </DataTable.Cell>
                <DataTable.Cell>
                  <Text>
                    {capitalize(item.title)}
                  </Text>
                </DataTable.Cell>
                <DataTable.Cell style={{justifyContent: 'flex-end'}}>
                  {/* TODO: implement action functionality for each item. */}
                  {/* <Button
                style={styles.icon}
                mode="text"
                labelStyle={{ fontSize: 32, color: 'white' }}
                icon="delete"
            ></Button> */}
                </DataTable.Cell>
              </DataTable.Row>
            </DataTable>
      )
    }

    const getItem = (item: { id: string; title: string }) => {
      const {id, title} = item
      // Function for click on an item
      alert(`Id : ${id} Title : ${title}`)
    }

    let content: React.ReactElement;

    if (loading) {
      content = <ActivityIndicator animating={true} style={{marginTop: 20}} size='large'/>
    } else {
      content = (<>
        <Text style={styles.count}>
          {Object.keys(filteredDataSource).length}: Results
        </Text>
        <FlatList
            style={styles.container}
            data={filteredDataSource}
            keyExtractor={(item, index) => index.toString()}
            renderItem={ItemView}
        />
      </>)
    }


    return (
        <View style={styles.container}>
          <>
            <Appbar.Header>
              <Appbar.BackAction
                  onPress={() => {
                    navigation.dispatch(CommonActions.goBack())
                  }}
              />
              <Appbar.Content title={route.name}/>
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

export default Friends
