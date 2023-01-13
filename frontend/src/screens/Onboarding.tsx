import React, {useContext, useState} from 'react'
import Onboarding from 'react-native-onboarding-swiper'
import {Image, StyleSheet} from 'react-native'
import {Text, useTheme} from 'react-native-paper'
import TagView, {GenreBody, Tag} from './TagView'
import { postUserPreferenceGenres } from '../services/genre.service'
import { authContext } from '../providers/auth.provider'


const OnboardingScreen = ({navigation}): JSX.Element => {
    const theme = useTheme()
    const { user } = useContext(authContext)
    const [genres, setGenres] = useState<Tag[]>([])
    const [genreBody, setGenreBody] = useState<GenreBody>()

    const styles = StyleSheet.create({
        image: {
            width: 302,
            height: 346,
        },
        text: {
            fontSize: 14,
            color: theme.colors.accent,
            textAlign: 'center',
            margin: 20,
        },
        title: {
            fontSize: 26,
            fontWeight: 'bold',
        },
    })

    return (
        <Onboarding
            pages={[
                {
                    backgroundColor: theme.colors.background,
                    title: '',
                    subtitle: '',
                    image: (
                        <>
                            <Text style={styles.title}>Welcome to TuneTonic</Text>
                            <Text style={styles.text}>
                                The music app to discover new music and share them with your
                                friends!
                            </Text>
                            <Image
                                source={require('../images/headphone.png')}
                                style={styles.image}
                            />
                        </>
                    ),
                },
                {
                    backgroundColor: theme.colors.background,
                    title: ' ',
                    subtitle: ' ',
                    image: (
                        <>
                            <Text style={styles.title}>Discover new music</Text>
                            <Text style={styles.text}>
                                Do you love music? Do you want to expand your horizon? Than this
                                is the app for you.
                            </Text>
                            <Image
                                source={require('../images/music-notes.png')}
                                style={styles.image}
                            />
                        </>
                    ),
                }, {
                    backgroundColor: theme.colors.background,
                    title: ' ',
                    subtitle: ' ',
                    image: (
                        <>
                            <Text style={styles.title}>This is how you use the app</Text>
                            <Text style={styles.text}>
                                Do you love the song? swipe right!
                                Do you hate it? No worries then swipe left.
                            </Text>
                            <Image
                                source={require('../images/swipe.gif')}
                                style={styles.image}
                            />
                        </>
                    ),
                },
                {
                    backgroundColor: theme.colors.background,
                    title: ' ',
                    subtitle: ' ',
                    image: <TagView transferGenres={setGenres}></TagView>,
                },
            ]}
            onSkip={() => {
                navigation.navigate('home-tab-navigation')
            }}
            onDone={() => {

                console.log(genres.filter(data => data.isActive === true));
                if (user?.id) setGenreBody({userId: user.id, genres: genres})
                if (genreBody) postUserPreferenceGenres(genreBody)

                // postUserPreferenceGenres('jasmin hoi');

                // navigation.navigate('home-tab-navigation')
            }}
        />
    )
}

export default OnboardingScreen
