import React, {useEffect} from "react";
import {Button, Text, View} from "react-native";
import {CLIENT_ID} from '@env'

// @ts-ignore
const LandingPage = ({navigation}) => {
    return <View>
        <Text>we zijn er</Text>
    <Button title={'go back'} onPress={() => navigation.replace('Login')}/>
    </View>
}
export default LandingPage;
