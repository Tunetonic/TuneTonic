import React from "react";
import { View } from "react-native";
import { Appbar, Text } from "react-native-paper";
import { CommonActions } from '@react-navigation/native';

const Profile = ({navigation}): JSX.Element => {
    return (
        <View>
            <Appbar.Header>
                <Appbar.BackAction onPress={() => {navigation.dispatch(CommonActions.goBack());}} />
                <Appbar.Content title="Title" />
                <Appbar.Action icon="calendar" onPress={() => {}} />
                <Appbar.Action icon="magnify" onPress={() => {}} />
            </Appbar.Header>
        </View>
    );
}

export default Profile;