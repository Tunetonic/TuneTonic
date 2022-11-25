import React from 'react';
import Onboarding from 'react-native-onboarding-swiper';
import {Image, StyleSheet} from 'react-native';
import {Text, useTheme} from 'react-native-paper';
import TagView from "./TagView";


const OnboardingScreen = ({navigation}) => {
    const theme = useTheme();

    const styles = StyleSheet.create({
        image:{
            width: 302,
            height: 346
        },
        text: {
            fontSize: 14,
            color: theme.colors.accent,
            textAlign: 'center',
            margin: 20
        },
        title: {
            fontSize: 26,
            fontWeight: 'bold',
        }
    
    })
    
    return (
        <Onboarding
            pages={[
                {
                    backgroundColor: theme.colors.background,
                    title: '',
                    subtitle: '',
                    image: <>
                        <Text style={styles.title}>Welcome to TuneTonic</Text>
                        <Text style={styles.text}>
                            The music app to discover new music and share them with your friends!
                        </Text>
                        <Image source={require('../Images/Headphone.png')} style={styles.image}/>
                    </>,
                },
                {
                    backgroundColor: theme.colors.background,
                    title: ' ',
                    subtitle: ' ',
                    image: <>
                        <Text style={styles.title}>Discover new music</Text>
                        <Text style={styles.text}>
                            Do you love music? Do you want to expand your horizon? Than this is the app for you.
                        </Text>
                        <Image source={require('../Images/MusicNotes.png')} style={styles.image}/>
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
