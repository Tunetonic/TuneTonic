import { createNativeStackNavigator } from '@react-navigation/native-stack'
import React from 'react'
import Artist from '../screens/Artist'
import Artists from '../screens/Artists'

const Stack = createNativeStackNavigator()

const ArtistStackNavigation = (): JSX.Element => {
    return (
    <Stack.Navigator
        id="artists-stack-navigator"
        screenOptions={{ headerShown: false }}
    >
        <Stack.Screen name="artists" component={Artists} />
        <Stack.Screen name="artist" component={Artist} />
    </Stack.Navigator>
    )
}

export default ArtistStackNavigation
