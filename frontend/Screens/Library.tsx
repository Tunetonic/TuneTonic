import React from "react";
import { View, Image, TouchableHighlight, StyleSheet } from "react-native";
import { Appbar, Text } from 'react-native-paper';


const Library = ({navigation, route}): JSX.Element => {
    return (
        <Appbar.Header>
            <TouchableHighlight onPress={() => navigation.navigate("library-stack-navigation", {screen: "profile"})}>
                <Image
                    source={{ uri: 'https://reactnative.dev/img/tiny_logo.png' }}
                    style={{ height: 50, width: 50 }}
                />
            </TouchableHighlight>
            <Appbar.Content title={route.name} titleStyle={styles.title}/>
            <Appbar.Action icon="cog-outline" onPress={() => navigation.navigate("library-stack-navigation", {screen: "settings"})} />
        </Appbar.Header>
    );
}

const styles = StyleSheet.create({
    title: {
        textAlign: 'center',
    },
});

export default Library;
