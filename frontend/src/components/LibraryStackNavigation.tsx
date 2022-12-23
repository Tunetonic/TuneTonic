import { createNativeStackNavigator } from '@react-navigation/native-stack'
import React from 'react'
import Library from '../screens/Library'
import LibraryDetail from '../screens/LibraryDetail'
import Playlist from '../screens/Playlist'
import Profile from '../screens/Profile'
import Settings from '../screens/Settings'

const Stack = createNativeStackNavigator()

const LibraryStackNavigation = (): JSX.Element => {
  return (
    <Stack.Navigator
      id="library-stack-navigator"
      screenOptions={{ headerShown: false }}
    >
      <Stack.Screen name="Library" component={Library} />
      <Stack.Screen name="LibraryDetail" component={LibraryDetail} />
      <Stack.Screen name="Profile" component={Profile} />
      <Stack.Screen name="Settings" component={Settings} />
      <Stack.Screen
        name="playlist"
        component={Playlist}
        options={{
          animation: 'fade_from_bottom',
          animationDuration: 150,
        }}
      />
    </Stack.Navigator>
  )
}

export default LibraryStackNavigation
