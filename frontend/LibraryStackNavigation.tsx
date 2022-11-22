import { createNativeStackNavigator } from '@react-navigation/native-stack';
import React from 'react';
import Settings from './Screens/Settings';
import Library from './Screens/Library';
import Profile from './Screens/Profile';

const Stack = createNativeStackNavigator();

const LibraryStackNavigation = (): JSX.Element => {
    return (
        <Stack.Navigator screenOptions={{headerShown: false}}>
            <Stack.Screen
                name='library'
                component={Library}
            />
            <Stack.Screen
                name='profile'
                component={Profile}
            />
            <Stack.Screen
                name='settings'
                component={Settings}/>
        </Stack.Navigator>
    );
}

export default LibraryStackNavigation;
