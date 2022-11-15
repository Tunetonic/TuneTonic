import React from "react";
import {Linking, SafeAreaView} from "react-native";
import {Button, Card, TextInput} from "react-native-paper";

const CLIENT_ID = "00fa58c2bdea4728a5155c06ed7b0960";
const SPOTIFY_AUTHORIZE_ENDPOINT = "https://accounts.spotify.com/authorize";
const REDIRECT_URL_AFTER_LOGIN = "exp://192.168.2.8:19000";
const SPACE_DELIMETER = "%20";
const SCOPES = ["user-read-currently-playing", "user-read-playback-state"];
const SCOPES_URL_PARAM = SCOPES.join(SPACE_DELIMETER);

const spotifyParams = (hash: any) => {
    console.log('test');
    const unhashedString = hash.substring(1);
    const urlParams = unhashedString.split('&');
    const splitParams = urlParams.reduce((accumulator: any, currentValue: any) => {
        const [key, value] = currentValue.split('=');
        accumulator[key] = value;
        console.log(accumulator);
        return accumulator
    }, {});

    return splitParams;
};

export const Login = () => {

    const spotifyLogin = () => {
        const link = Linking.openURL(`${SPOTIFY_AUTHORIZE_ENDPOINT}?client_id=${CLIENT_ID}&redirect_uri=${REDIRECT_URL_AFTER_LOGIN}&scope=${SCOPES_URL_PARAM}&response_type=token&show_dialog=true`);

        console.log(link);
    };

    const useEffect = () => {
        console.log('test');
        // if (){
        //     const object = spotifyParams(window.location.hash);
        //     console.log({ object });
        // }
        //
        console.log(useEffect());
    };
    return (
        <SafeAreaView>
            <Card>
                <Card.Title title="TuneTonic"></Card.Title>
                <Card.Content>
                    {/*<TextInput id="clientId" label="ClientID"></TextInput>*/}
                    {/*<TextInput label="Secret Key"></TextInput>*/}
                    <Button onPress={spotifyLogin}>Login to Spotify</Button>
                </Card.Content>
            </Card>
        </SafeAreaView>
    )
}