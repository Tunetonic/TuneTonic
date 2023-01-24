import { createNativeStackNavigator } from '@react-navigation/native-stack'
import React from 'react'
import Settings from '../screens/Settings'
import Library from '../screens/Library'
import LibraryDetail from '../screens/LibraryDetail'
import Profile from '../screens/Profile'
import Admin from '../screens/Admin'

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
      <Stack.Screen name="Admin" component={Admin} />
    </Stack.Navigator>
  )
}

export default LibraryStackNavigation
