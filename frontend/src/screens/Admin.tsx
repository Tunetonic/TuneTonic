import React, { useContext, useEffect, useState } from "react";
import { View, Image, StyleSheet, ScrollView } from "react-native";
import { Text, TextInput, Card, IconButton } from 'react-native-paper';

interface UserProps {
    id: number
    name: string
    image: string
}

let dummy = [
    {
        id: 1,
        name: "Hoi",
        image: "https://picsum.photos/700"
    },
    {
        id: 1,
        name: "Hoi",
        image: "https://picsum.photos/700"
    },
    {
        id: 1,
        name: "Hoi",
        image: "https://picsum.photos/700"
    },
]

const Admin = (): JSX.Element => {
    const [search, setSearch] = useState('')
    const [loading, setLoading] = useState(true)
    const [filteredDataSource, setFilteredDataSource] = useState<UserProps[]>(dummy)
    const [masterDataSource, setMasterDataSource] = useState<UserProps[] | null>(dummy)

    useEffect(() => {
        handleSearchFilter(search)
      }, [search])

    const handleSearchFilter = (text: string) => {
        return setFilteredDataSource(
          masterDataSource
            ? masterDataSource.filter((e) => e.name.includes(text))
            : [],
        )
      }

    const deleteUser = (userId: number) => {}

    return (<>
        <View style={styles.container}>
        <TextInput
            style={styles.textInputStyle}
            onChangeText={(text) => setSearch(text)}
            value={search}
            placeholder="Search"
        />
        <Text style={styles.count}>
            {Object.keys(filteredDataSource).length} Results
        </Text>
            <ScrollView>
            {filteredDataSource.length > 0 && filteredDataSource.map((user: object, i: number) => {
            return (
                <Card key={i} style={styles.card}>
                    <Card.Title 
                        title={user.name}
                        titleStyle={styles.cardTitle} 
                        left={() => <Image source={{uri: user.image}} style={styles.userImage}/>}
                        right={() => <IconButton icon="delete" size={26} style={styles.deleteIcon} onPress={() => deleteUser(user.userId)}/>}
                        />
                    </Card>
                );})}
            </ScrollView>
        </View>
    </>);
};

export default Admin;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        paddingTop: 35
    },
    userImage: {
        width: 50,
        height: 50,
        borderRadius: 100,
    },
    card: {
        marginBottom: 5,
    },
    cardTitle: {
        marginLeft: 7
    },
    count: {
        color: '#efefef',
        padding: 10,
        fontSize: 18,
        alignSelf: "flex-end"
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
    deleteIcon: {
        marginRight: 8,
    }
});
