import { createMaterialBottomTabNavigator } from '@react-navigation/material-bottom-tabs';
import React from 'react';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import Friends from './Screens/Friends';
import Home from './Screens/Home';
import Library from './Screens/Library';

const Tab = createMaterialBottomTabNavigator();

// FIXME: Home is shown in header all the time, either hide or dynamically change it.
const HomeTabs = (): JSX.Element => {
    return (
        <Tab.Navigator
            initialRouteName="home"
            activeColor="#fff"
            barStyle={{ backgroundColor: 'black' }}
        >
            <Tab.Screen
                name="home"
                component={Home}
                options={{
                    tabBarLabel: 'Home',
                    tabBarIcon: ({ color }) => (
                        <MaterialCommunityIcons name="home" color={color} size={26} />
                    ),
                }}
            />
            <Tab.Screen
                name="friends"
                component={Friends}
                options={{
                    tabBarLabel: 'Friends',
                    tabBarIcon: ({ color }) => (
                        <MaterialCommunityIcons name="account-multiple" color={color} size={26} />
                    ),
                }}
            />
            <Tab.Screen
                name="your-libary"
                component={Library}
                options={{
                    title: 'Awesome app',
                    tabBarLabel: 'Your Library',
                    tabBarIcon: ({ color }) => (
                        <MaterialCommunityIcons name="folder-music" color={color} size={26} />
                    ),
                }}
            />
      </Tab.Navigator>
    );
  }

export default HomeTabs