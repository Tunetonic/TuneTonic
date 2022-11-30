import React, { useState, useEffect } from 'react'
import { FlatList, Image, StyleSheet, View } from 'react-native'
import { TextInput, Text, DataTable, Button } from 'react-native-paper'

interface FriendsProps {
  id: number
  title: string
  image: string
}

const Friends = () => {
  const [search, setSearch] = useState('')

  const [masterDataSource, setMasterDataSource] = useState<
    FriendsProps[] | null
  >(null)

  const [filteredDataSource, setFilteredDataSource] = useState<FriendsProps[]>(
    [],
  )

  const jsonLink =
    'https://my-json-server.typicode.com/bcengioglu/json-example/users'

  useEffect(() => {
    fetch(jsonLink)
      .then((response) => response.json())
      .then((responseJson) => {
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

  const ItemView = ({ item }) => {
    return (
        <DataTable>
          <DataTable.Row style={styles.row} onPress={() => getItem(item)}>
            <DataTable.Cell>
              {<Image source={{ uri: item.image }} style={{width: 50, height: 50}} />}
            </DataTable.Cell>
            <DataTable.Cell>
              <Text style={styles.text}>
                {item.title.toUpperCase()}
              </Text>
            </DataTable.Cell>
              <Button
                  style={styles.icon}
                  children={undefined}
                  mode="text"
                  labelStyle={{ fontSize: 32, color: 'white' }}
                  icon="delete"
              ></Button>
            <DataTable.Cell>

            </DataTable.Cell>
          </DataTable.Row>
        </DataTable>
    )
  }

  const ItemSeparatorView = () => {
    return (
      // Flat List Item Separator
      <View
        style={{
          height: 0.5,
          width: '100%',
          backgroundColor: '#C8C8C8',
        }}
      />
    )
  }

  const getItem = (item: { id: string; title: string }) => {
    const { id, title } = item
    // Function for click on an item
    alert(`Id : ${id} Title : ${title}`)
  }

  return (
    <View style={styles.container}>
      <TextInput
        style={styles.textInputStyle}
        onChangeText={(text) => setSearch(text)}
        value={search}
        underlineColorAndroid="transparent"
        placeholder="Search Here"
      />
      <Text style={styles.count}>
        {Object.keys(filteredDataSource).length}: Results
      </Text>
      <FlatList
        data={filteredDataSource}
        keyExtractor={(item, index) => index.toString()}
        ItemSeparatorComponent={ItemSeparatorView}
        renderItem={ItemView}
      />
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 22,
  },
  row: {
    height: 70,
  },
  count: {
    color: '#efefef',
    padding: 10,
    left: 210,
    fontSize: 18,
  },
  textInputStyle: {
    top: 10,
    height: 40,
    borderWidth: 1,
    paddingLeft: 20,
    margin: 5,
    borderColor: '#009688',
    backgroundColor: '#FFFFFF',
    color: '#070707FF',
  },
  icon: {
    top: 18,
    left: 75
  },
  text: {
    color: '#FFFFFF',
  }
})

export default Friends
