import React from 'react';
import Onboarding from 'react-native-onboarding-swiper';
import {Image, StyleSheet, Text} from 'react-native';
import TagView from "./TagView";


const OnboardingScreen = () => {

    return <>
        <Onboarding
            pages={[
                {
                    backgroundColor: '#222023',
                    title: ' ',
                    subtitle: ' ',
                    image:
                        <><Text style={styles.title}>Welcome to Tune Tonic</Text>
                            <Text style={styles.text}>The music
                                app to discover new music and share them with your friends!</Text>
                            <Image source={require('../Images/Headphone.png')} style={styles.image}/></>,
                },
                {
                    backgroundColor: '#222023',
                    title: ' ',
                    subtitle: ' ',
                    image:
                        <><Text style={styles.title}>Discover new music</Text>
                            <Text style={styles.text}>Do you love
                                music? Do you want to expand your horizon? Than this is the app for you.</Text>
                            <Image source={require('../Images/MusicNotes.png')} style={styles.image}/>

                        </>,
                }, {
                    backgroundColor: '#222023',
                    title: ' ',
                    subtitle: ' ',
                    image:
                        <TagView></TagView>
                },
            ]}
        />

    </>
}

const styles = StyleSheet.create({
    image:{
        width: 302,
        height: 346
    },
    text: {
        fontSize: 14,
        color: '#BDBCBD',
        textAlign: 'center',
        margin: 20
    },
    title: {
        fontSize: 26,
        fontWeight: 'bold',
        color: '#FFFFFF'
    }

})

export default OnboardingScreen
