import React, { FC, useContext, useEffect, useState } from 'react'
import { ScrollView, StyleSheet, View } from 'react-native'
import { Button, Text } from 'react-native-paper'
import { themeContext } from '../providers/theme.provider'
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
  const { theme } = useContext(themeContext)

  const headerTextColor = theme.dark ? '#FFFFFF' : '#000000'



  const fetchGenres = (): void => {
    getGenreSeeds().then((res) =>
      setGenres(
        res.genres.map((genre) => ({ tagName: genre, isActive: false })),
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

  const styles = StyleSheet.create({
    container: {
      margin: 20,
      marginBottom: 90,
      marginTop: 90,
      flexDirection: 'row',
      display: 'flex',
      flexWrap: 'wrap',
    },
    frame: {
      borderWidth: 1,
      width: 50,
      height: 50,
      backgroundColor: headerTextColor,
      borderRadius: 8,
      padding: 10,
    },
  
    tag: {
      borderRadius: 25,
      borderWidth: 1,
      color: headerTextColor,
      borderStyle: 'solid',
      margin: 5,
    },
    text: {
      fontSize: 14,
      textAlign: 'center',
      color: theme.colors.text,
      margin: 20,
      marginLeft: 30,
    },
    title: {
      fontSize: 26,
      fontWeight: 'bold',
      textAlign: 'center',
      marginLeft: 30,
    },
  })

  return (
    <>
      <ScrollView>
        <View style={styles.container}>
          <Text
            style={{
              ...styles.title,
              color: headerTextColor,
            }}
          >
            What genres do you like?
          </Text>
          <Text style={styles.text}>
            Click on the genres you listen or like the most.
          </Text>

          {genres.map((data) => (
            <Button
              key={data.tagName}
              onPress={() => todoClicked(data)}
              style={[
                styles.tag,
                {
                  backgroundColor: data.isActive ? theme.colors.primary : theme.colors.background,
                  borderColor: data.isActive ? 'transparent' : theme.colors.primary,
                },
              ]}
            >
              <Text>{data.tagName}</Text>
            </Button>
          ))}
        </View>
      </ScrollView>
    </>

  )

}

export default TagView
