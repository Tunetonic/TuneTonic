import React, {useState, useEffect} from "react";
import {FlatList, Image, StyleSheet, View, } from "react-native";
import {TextInput, Text} from 'react-native-paper';


const Friends = () => {
    const [search, setSearch] = useState('');
    const [filteredDataSource, setFilteredDataSource] = useState([]);
    const [masterDataSource, setMasterDataSource] = useState([]);

    const jsonLink = 'https://my-json-server.typicode.com/bcengioglu/json-example/users';


    useEffect(() => {
        fetch(jsonLink)
            .then((response) => response.json())
            .then((responseJson) => {
                setFilteredDataSource(responseJson);
                setMasterDataSource(responseJson);
            })
            .catch((error) => {
                console.error(error);
            });
    }, []);

    const searchFilterFunction = (text: React.SetStateAction<string>) => {
        // Check if searched text is not blank
        if (text) {
            // Inserted text is not blank
            // Filter the masterDataSource
            // Update FilteredDataSource
            const newData = masterDataSource.filter(
                function (item) {
                    const itemData = item.title
                        ? item.title.toUpperCase()
                        : ''.toUpperCase();
                    const textData = text.toUpperCase();
                    return itemData.indexOf(textData) > -1;
                });
            setFilteredDataSource(newData);
            setSearch(text);
        } else {
            // Inserted text is blank
            // Update FilteredDataSource with masterDataSource
            setFilteredDataSource(masterDataSource);
            setSearch(text);
            console.log(text)
        }
    };

    const ItemView = ({item}) => {

        return (
            // Flat List Item
            <Text
                style={styles.itemStyle}
                onPress={() => getItem(item)}>
                {<Image source={{ uri: item.image }} style={styles.tinyLogo} />}
                {item.title.toUpperCase()}
            </Text>
        );
    };

    const ItemSeparatorView = () => {
        return (
            // Flat List Item Separator
            <View
                style={{
                    height: 0.5,
                    width: '100%',
                    backgroundColor: '#C8C8C8',
                }}
            />
        );
    };

    const getItem = (item: { id: string; title: string; }) => {
        // Function for click on an item
        alert('Id : ' + item.id + ' Title : ' + item.title);
    };

    return (
        <View style={styles.container}>
            <TextInput
                style={styles.textInputStyle}
                onChangeText={(text) => searchFilterFunction(text)}
                value={search}
                underlineColorAndroid="transparent"
                placeholder="Search Here"
            />
            <Text style={styles.count}>(Count) Results</Text>
            <FlatList
                data={filteredDataSource}
                style={styles.item}
                keyExtractor={(item, index) => index.toString()}
                ItemSeparatorComponent={ItemSeparatorView}
                renderItem={ItemView}/>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        paddingTop: 22
    },
    item: {
        padding: 10,
        fontSize: 18,
        fontWeight: 'bold',
        height: 44,
        color: '#efefef',
    },

    tinyLogo: {
        width: 50,
        height: 50,
        margin: 5,
        resizeMode: 'contain',
    },
    row: {
        flexDirection:'row',
        alignItems:'center'
    },
    count: {
        color: '#efefef',
        padding: 10,
        left:210,
        fontSize: 18,
    },
    textInputStyle: {
        top:10,
        height: 40,
        borderWidth: 1,
        paddingLeft: 20,
        margin: 5,
        borderColor: '#009688',
        backgroundColor: '#FFFFFF',
        color: '#070707FF'
    },
    itemStyle: {

    }
});


export default Friends;