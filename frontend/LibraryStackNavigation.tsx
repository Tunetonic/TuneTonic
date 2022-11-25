import { createNativeStackNavigator } from '@react-navigation/native-stack';
import React from 'react';
import Settings from './Screens/Settings';
import Library from './Screens/Library';
import Profile from './Screens/Profile';
import Playlist from './Screens/Playlist';

const Stack = createNativeStackNavigator();

const LibraryStackNavigation = (): JSX.Element => {
    return (
        <Stack.Navigator id="library-stack-navigator" screenOptions={{headerShown: false}}>
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
            <Stack.Screen
                name='playlist'
                component={Playlist}
                options={{
                    animation: 'fade_from_bottom',
                    animationDuration: 150
                }}
            />
        </Stack.Navigator>
    );
}

export default LibraryStackNavigation;
