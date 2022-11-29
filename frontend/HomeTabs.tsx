import { createMaterialBottomTabNavigator } from '@react-navigation/material-bottom-tabs'
import React from 'react'
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons'
import Friends from './screens/Friends'
import Home from './screens/Home'
import LibraryStackNavigation from './LibraryStackNavigation'

const Tab = createMaterialBottomTabNavigator()

const HomeTabs = ({ navigation }): JSX.Element => {
  return (
    <Tab.Navigator
      id="bottom-tab-navigator"
      initialRouteName="home"
      barStyle={{ backgroundColor: 'black' }}
    >
      <Tab.Screen
        name="home"
        component={Home}
        options={{
          tabBarIcon: ({ color }) => (
            <MaterialCommunityIcons name="home" color={color} size={26} />
          ),
        }}
      />
      <Tab.Screen
        name="friends"
        component={Friends}
        options={{
          tabBarIcon: ({ color }) => (
            <MaterialCommunityIcons
              name="account-multiple"
              color={color}
              size={26}
            />
          ),
        }}
      />
      <Tab.Screen
        name="library-stack-navigation"
        component={LibraryStackNavigation}
        options={{
          title: 'your library',
          tabBarIcon: ({ color }) => (
            <MaterialCommunityIcons
              name="folder-music"
              color={color}
              size={26}
            />
          ),
        }}
      />
    </Tab.Navigator>
  )
}

export default HomeTabs
