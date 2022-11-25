import React, {useEffect, useState} from "react";
import {Image, ScrollView, StyleSheet, Text, TouchableOpacity, View} from "react-native";
import axios from "axios";
import {useCookies} from "react-cookie";
import {Button} from "react-native-paper";

const TagView = () => {
    const [cookies, setCookie, removeCookie] = useCookies(['loginCookie']);
    const [genres, setGenres] = useState<string[]>([]);

    const [selected, setSelected] = useState<string[]>([]);
const [selectedItem, setSelectedItem] = useState<string>('')


    useEffect(() => {
        axios.get('https://api.spotify.com/v1/recommendations/available-genre-seeds', {
            headers: {
                Accept: " application/json",
                "Content-type": "application/json",
                Authorization: "Bearer " + cookies.loginCookie
            }
        }).then(data => {
            setGenres(data.data.genres);
        })
    }, [])


    const veranderKleur = (event: any) => {
        selected.push(event);
        setSelected(selected);

        // setSelectedItem(event);
    }

  // @ts-ignore
    const chooseColor = (data: string): string => {
    console.log(data)


return selected.includes(data) ? 'green' : 'red'
    }

    return <>
        <ScrollView>
            <View  style={styles.constainer}>
                <Text style={{fontSize: 26, fontWeight: 'bold', textAlign: 'center', color: '#FFFFFF', marginLeft: 30}}>What genres do you like?</Text>
                <Text style={{fontSize: 14, color: '#BDBCBD', textAlign: 'center', margin: 20, marginLeft: 30}}>Click on the genres you listen or like the most.</Text>

                {genres.map(data => (
                    <Button color={'white'} onPress={() => veranderKleur(data)} style={[styles.tag, {borderColor: chooseColor(data)}]}>
                        {/*<Text style={styles.text}>{data}</Text>*/}
                        {data}
                    </Button>
                ))}

            </View>
        </ScrollView>
    </>
}


const styles = StyleSheet.create({
    constainer: {
        margin: 20,
        marginBottom: 90,
        marginTop: 90,
        flexDirection: "row",
        display: 'flex',
        flexWrap: 'wrap',
        backgroundColor: '#222023'
    },
    frame: {
        borderWidth: 1,
        width: 50,
        height: 50,
        backgroundColor: '#fff',
        borderRadius: 8,
        // margin: 5,
        padding: 10,
    },


    tag: {
        borderColor: "black",
        borderRadius: 25,
        borderWidth: 1,
        backgroundColor: '#47D7AC',
        borderStyle: "solid",
        margin: 5,

    },
    text: {
        margin: 5,
        textAlign: "center",
        color: 'white'

    }


})

export default TagView;
