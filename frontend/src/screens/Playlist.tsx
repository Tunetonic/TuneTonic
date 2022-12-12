import { CommonActions } from '@react-navigation/native';
import React from 'react';
import { View } from 'react-native';
import { Appbar } from 'react-native-paper';

const Playlist = ({route, navigation}): JSX.Element => {

    const {playlistId} = route.params;

    return (
        <View>
        <Appbar.Header>
            <Appbar.BackAction onPress={() => {navigation.dispatch(CommonActions.goBack());}} />
            <Appbar.Content title={playlistId} />
        </Appbar.Header>
    </View>
    );

}

export default Playlist;