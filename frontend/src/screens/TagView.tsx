import React, { useEffect, useState } from 'react'
import { ScrollView, StyleSheet, Text, View } from 'react-native'
import { Button } from 'react-native-paper'
import { getGenreSeeds } from '../services/genre.service'

interface Tag {
  tagName: string
  isActive: boolean
}

const TagView = () => {
  const [genres, setGenres] = useState<Tag[]>([])

  const fetchGenres = (): void => {
    getGenreSeeds().then((res) =>
      setGenres(
        res.genres.map((genre) => ({ tagName: genre, isActive: false })),
      ),
    )
  }

  const todoClicked = (e: Tag) => {
    setGenres(
      genres.map((todo) =>
        todo.tagName === e.tagName
          ? { ...todo, isActive: !todo.isActive }
          : todo,
      ),
    )
  }

  useEffect(() => {
    fetchGenres()
  }, [])

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
              key={data.tagName}
              color={data.isActive ? 'white' : 'white'}
              onPress={() => todoClicked(data)}
              style={[
                styles.tag,
                {
                  backgroundColor: data.isActive ? '#222023' : '#1ed760',
                  borderColor: data.isActive ? '#1ed760' : '#1ed760',
                },
              ]}
            >
              {data.tagName}
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