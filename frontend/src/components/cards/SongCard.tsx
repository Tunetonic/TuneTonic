import React, { FC } from 'react'
import { Image, StyleSheet } from 'react-native'
import { Card, Text } from 'react-native-paper'

interface SongCardProps {
  id: string
  name: string
  artist: string
  image: string
  onPress: () => void
  length: string
}

export const SongCard: FC<SongCardProps> = ({
  id,
  name,
  artist,
  image,
  onPress,
  length,
}) => {
  return (
    <Card style={styles.card} onPress={() => onPress} key={id}>
      <Card.Title
        title={name}
        subtitle={artist}
        titleStyle={styles.cardTitle}
        subtitleStyle={styles.cardSubtitle}
        left={() => <Image source={{ uri: image }} style={styles.songImage} />}
        right={() => <Text style={styles.songLength}>{length}</Text>}
      />
    </Card>
  )
}

const styles = StyleSheet.create({
  songImage: {
    width: 50,
    height: 50,
  },
  songLength: {
    marginRight: 12,
  },
  card: {
    marginBottom: 5,
  },
  cardTitle: {
    marginLeft: 7,
  },
  cardSubtitle: {
    marginLeft: 10,
  },
})
