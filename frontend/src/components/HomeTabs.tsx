import { createMaterialBottomTabNavigator } from '@react-navigation/material-bottom-tabs'
import React from 'react'
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons'
import Friends from '../screens/Friends'
import Home from '../screens/Home'
import LibraryStackNavigation from './LibraryStackNavigation'

interface TabScreenProps {
  name: string
  component: (props?: any) => JSX.Element
  iconName: string
  title?: string
}

const Tab = createMaterialBottomTabNavigator()

const tabs: TabScreenProps[] = [
  { name: 'home', component: Home, iconName: 'home' },
  { name: 'friends', component: Friends, iconName: 'account-multiple' },
  {
    name: 'library-stack-navigation',
    component: LibraryStackNavigation,
    iconName: 'folder-music',
    title: 'your library',
  },
]

const HomeTabs = ({ navigation }): JSX.Element => {
  return (
    <Tab.Navigator
      id="bottom-tab-navigator"
      initialRouteName="home"
      barStyle={{ backgroundColor: 'black' }}
    >
      {tabs.map(({ name, component, iconName, title }) => (
        <Tab.Screen
          key={name}
          name={name}
          component={component}
          options={{
            title: title ?? undefined,
            tabBarIcon: ({ color }) => (
              <MaterialCommunityIcons name={iconName} color={color} size={26} />
            ),
          }}
        />
      ))}
    </Tab.Navigator>
  )
}

export default HomeTabs
