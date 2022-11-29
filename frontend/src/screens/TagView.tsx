import React, { useEffect, useState } from 'react'
import { ScrollView, StyleSheet, Text, View } from 'react-native'
import axios from 'axios'
import { useCookies } from 'react-cookie'
import { Button } from 'react-native-paper'

const TagView = () => {
  const [cookies] = useCookies(['loginCookie'])
  const [genres, setGenres] = useState<any[]>([])

  useEffect(() => {
    axios
      .get('https://api.spotify.com/v1/recommendations/available-genre-seeds', {
        headers: {
          Accept: ' application/json',
          'Content-type': 'application/json',
          Authorization: 'Bearer ' + cookies.loginCookie,
        },
      })
      .then((data) => {
        setGenres(data.data.genres.map((obj) => ({ obj, Active: 'false' })))
      })
  }, [])

  const todoClicked = (e) => {
    setGenres(
      genres.map((todo) =>
        todo.obj === e.obj ? { ...todo, Active: !todo.Active } : todo,
      ),
    )
  }

  return (
    <>
      <ScrollView>
        <View style={styles.container}>
          <Text style={styles.title}>What genres do you like?</Text>
          <Text style={styles.text}>
            Click on the genres you listen or like the most.
          </Text>

          {genres.map((data) => (
            <Button
              key={data.obj}
              color={data.Active ? 'white' : 'white'}
              onPress={() => todoClicked(data)}
              style={[
                styles.tag,
                {
                  backgroundColor: data.Active ? '#222023' : '#1ed760',
                  borderColor: data.Active ? '#1ed760' : '#1ed760',
                },
              ]}
            >
              {data.obj}
            </Button>
          ))}
        </View>
      </ScrollView>
    </>
  )
}

const styles = StyleSheet.create({
  container: {
    margin: 20,
    marginBottom: 90,
    marginTop: 90,
    flexDirection: 'row',
    display: 'flex',
    flexWrap: 'wrap',
    backgroundColor: '#222023',
  },
  frame: {
    borderWidth: 1,
    width: 50,
    height: 50,
    backgroundColor: '#fff',
    borderRadius: 8,
    padding: 10,
  },

  tag: {
    borderColor: 'black',
    borderRadius: 25,
    borderWidth: 1,
    backgroundColor: '#47D7AC',
    borderStyle: 'solid',
    margin: 5,
  },
  text: {
    fontSize: 14,
    color: '#BDBCBD',
    textAlign: 'center',
    margin: 20,
    marginLeft: 30,
  },
  title: {
    fontSize: 26,
    fontWeight: 'bold',
    textAlign: 'center',
    color: '#FFFFFF',
    marginLeft: 30,
  },
})

export default TagView
