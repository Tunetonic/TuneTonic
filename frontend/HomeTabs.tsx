import { createMaterialBottomTabNavigator } from '@react-navigation/material-bottom-tabs';
import React from 'react';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import Friends from './Screens/Friends';
import Home from './Screens/Home';
import LibraryStackNavigation from './LibraryStackNavigation';

const Tab = createMaterialBottomTabNavigator();

//@ts-ignore
const HomeTabs = ({navigation}): JSX.Element => {
    return (
        <Tab.Navigator
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
                        <MaterialCommunityIcons name="account-multiple" color={color} size={26} />
                    ),
                }}
            />
            <Tab.Group>
                <Tab.Screen
                    name="Library"
                    component={LibraryStackNavigation}
                    options={{
                        tabBarIcon: ({ color }) => (
                            <MaterialCommunityIcons name="folder-music" color={color} size={26} />
                        ),
                    }}
                />
            </Tab.Group>
        </Tab.Navigator>
    );
}

export default HomeTabs