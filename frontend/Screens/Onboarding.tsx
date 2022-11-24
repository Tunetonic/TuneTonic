import React from 'react';
import Onboarding from 'react-native-onboarding-swiper';
import {Image, Text, View} from 'react-native';
import MyTagInput from "./TagView";
import TagView from "./TagView";


const OnboardingScreen = () => {

    const selected = ['Swift', 'Kotlin']
    const tags = ['Swift', 'Kotlin', 'C#', 'Haskell', 'Java']


    return <>
        <Onboarding
            pages={[
                {
                    backgroundColor: '#222023',
                    title: ' ',
                    subtitle: ' ',
                    image:
                        <><Text style={{fontSize: 26, fontWeight: 'bold', color: '#FFFFFF'}}>Welcome to Tune
                            Tonic</Text>
                            <Text style={{fontSize: 14, color: '#BDBCBD', textAlign: 'center', margin: 20}}>The music
                                app to discover new music and share them with your friends!</Text>
                            <Image source={require('../Images/Headphone.png')} style={{
                                width: 302, height: 346
                            }}/></>,
                },
                {
                    backgroundColor: '#222023',
                    title: ' ',
                    subtitle: ' ',
                    image:
                        <><Text style={{fontSize: 26, fontWeight: 'bold', color: '#FFFFFF'}}>Discover new music</Text>
                            <Text style={{fontSize: 14, color: '#BDBCBD', textAlign: 'center', margin: 20}}>Do you love
                                music? Do you want to expand your horizon? Than this is the app for you.</Text>
                            <Image source={require('../Images/MusicNotes.png')} style={{
                                width: 302, height: 346
                            }}/>

                        </>,
                }, {
                    backgroundColor: '#222023',
                    title: ' ',
                    subtitle: ' ',
                    image:
                        <><TagView/>


                        </>,
                },
            ]}
        />


        <TagView/>
    </>
}

export default OnboardingScreen
