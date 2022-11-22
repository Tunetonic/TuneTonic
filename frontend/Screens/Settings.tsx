import { CommonActions } from "@react-navigation/native";
import React from "react";
import { View } from "react-native";
import { Appbar } from "react-native-paper";

const Settings = ({navigation, route}): JSX.Element => {
    return (
        <View>
            <Appbar.Header>
                <Appbar.BackAction onPress={() => {navigation.dispatch(CommonActions.goBack());}} />
                <Appbar.Content title={route.name}/>
            </Appbar.Header>
        </View>
    );
}
export default Settings;
