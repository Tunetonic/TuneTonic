import { createMaterialBottomTabNavigator } from '@react-navigation/material-bottom-tabs'
import React, { useContext, useEffect, useState } from 'react'
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons'
import Artists from '../screens/Artists'
import Admin from '../screens/Admin'
import Friends from '../screens/Friends'
import Home from '../screens/Home'
import { getAsyncItem } from '../services/async-storage.service'
import LibraryStackNavigation from './LibraryStackNavigation'
import ArtistsStackNavigation from './ArtistStackNavigation'

interface TabScreenProps {
  name: string
  component: (props?: any) => JSX.Element
  iconName: string
  title?: string
}

const Tab = createMaterialBottomTabNavigator()

const tabs: TabScreenProps[] = [
  { name: 'home', component: Home, iconName: 'home' },
  { name: 'artists', component: ArtistsStackNavigation, iconName: 'account-multiple' },

const defaultTabs: TabScreenProps[] = [
  { name: 'Home', component: Home, iconName: 'home' },
  { name: 'Friends', component: Friends, iconName: 'account-multiple' },
  {
    name: 'library-stack-navigation',
    component: LibraryStackNavigation,
    iconName: 'folder-music',
    title: 'Your library',
  },
]
const adminTab: TabScreenProps = {
  name: 'Admin',
  component: Admin,
  iconName: 'account-tie-hat',
}

const HomeTabs = ({ navigation }): JSX.Element => {
  const [tabs, setTabs] = useState<TabScreenProps[]>(defaultTabs)

  useEffect(() => {
    verifyAdmin()
  }, [])

  const verifyAdmin = async () => {
    const userRole = await getAsyncItem('role')
    if (userRole === 'admin') {
      setTabs([...tabs, adminTab])
    }
  }

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
