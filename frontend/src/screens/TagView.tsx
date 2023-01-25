
import React, { useContext, useEffect, useState } from 'react'
import { ScrollView, StyleSheet, View } from 'react-native'
import { Button, Text } from 'react-native-paper'
import { getGenreSeeds } from '../services/genre.service'

export interface Tag {
  tagName: string
  isActive: boolean
}
export interface GenreBody {
  userId: string
  genres: Tag[]
}
const TagView = ({ transferGenres }) => {
  const [genres, setGenres] = useState<Tag[]>([])



  const fetchGenres = (): void => {
    getGenreSeeds().then((res) =>
        setGenres(
            res.genres.map((genre) => ({ tagName: genre.replace(/-/g, '_'), isActive: false })),
        ),
    )
  }

  const todoClicked = (e: Tag) => {
    setGenres(
        genres.map((genre) =>
            genre.tagName === e.tagName
                ? { ...genre, isActive: !genre.isActive }
                : genre,
        ),
    )

    transferGenres(genres)
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
                        backgroundColor: data.isActive ? '#1DB954' : '#222023',
                        borderColor: data.isActive ?  '#1DB954' : '#1DB954',
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
