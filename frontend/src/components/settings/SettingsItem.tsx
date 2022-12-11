import React, { FC, ReactNode } from 'react'
import { StyleSheet } from 'react-native'
import { Button, Card } from 'react-native-paper'

interface SettingItemProps {
    title: string
    onPress: () => void
    cardMode?: "outlined" | "elevated"
    right?: any
}

export const SettingsItem: FC<SettingItemProps> = ({title, onPress, cardMode, right}) => {

    return <Card
    style={styles.card}
    onPress={onPress}
    mode={cardMode}
  >
    <Card.Title
      title={title}
      right={right}
    />
  </Card>
}

const styles = StyleSheet.create({
    card: {
    },
  })