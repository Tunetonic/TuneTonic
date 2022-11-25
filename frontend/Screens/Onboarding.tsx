import React from 'react';
import Onboarding from 'react-native-onboarding-swiper';
import {Image} from 'react-native';
import {Text, useTheme} from 'react-native-paper';
import TagView from "./TagView";


const OnboardingScreen = ({navigation}) => {
    const theme = useTheme();

    return (
        <Onboarding
            pages={[
                {
                    backgroundColor: theme.colors.background,
                    title: '',
                    subtitle: '',
                    image: <>
                        <Text style={{fontSize: 26, fontWeight: 'bold'}}>Welcome to TuneTonic</Text>
                        <Text style={{fontSize: 14, color: theme.colors.accent, textAlign: 'center', margin: 20}}>
                            The music app to discover new music and share them with your friends!
                        </Text>
                        <Image source={require('../Images/Headphone.png')} style={{
                            width: 302, height: 346
                        }}/>
                    </>,
                },
                {
                    backgroundColor: theme.colors.background,
                    title: ' ',
                    subtitle: ' ',
                    image: <>
                        <Text style={{fontSize: 26, fontWeight: 'bold'}}>Discover new music</Text>
                        <Text style={{fontSize: 14, color: theme.colors.accent, textAlign: 'center', margin: 20}}>
                            Do you love music? Do you want to expand your horizon? Than this is the app for you.
                        </Text>
                        <Image source={require('../Images/MusicNotes.png')} style={{
                            width: 302, height: 346
                        }}/>
                    </>,
                }, {
                    backgroundColor: theme.colors.background,
                    title: ' ',
                    subtitle: ' ',
                    image: <TagView></TagView>,
                },
            ]}
            onSkip={() => { navigation.navigate("home-tab-navigation")}}
            onDone={() => { navigation.navigate("home-tab-navigation")}}
        />
    );
}

export default OnboardingScreen
