import { FlatList, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React, { useEffect, useState } from 'react';
import { findEntry, findIndex } from '../helpers/finders';
import { initPacedDB, storeDataItem } from '../helpers/fb-paced';

import { Image } from 'react-native-elements';
import { TouchableHighlight } from 'react-native-gesture-handler';

//TODO: Create comparator method that dispays flatlist content alphabetically

const GameScreen = ({ route, navigation }) => {

    const [data, setData] = useState([
        {title: "The Legend of Zelda: Majora's Mask",
        category: [
            {run: 'Any% - MM', splits: [
                // splits go here
            ]},
            {run: "100% - MM", splits: [
                // splits go here
            ]},
            {run: "All Masks - MM", splits: [
                // splits go here
            ]},
        ],
        imageUrl: "https://upload.wikimedia.org/wikipedia/en/6/60/The_Legend_of_Zelda_-_Majora%27s_Mask_Box_Art.jpg"},
        {title: "The Legend of Zelda: Ocarina of Time",
        category: [
            {run: 'Any% - OOT', splits: [
                // splits go here
            ]},
            {run: "100% - OOT", splits: [
                // splits go here
            ]},
            {run: "All Cows - OOT", splits: [
                // splits go here
            ]},
        ],
        imageUrl: "https://upload.wikimedia.org/wikipedia/en/8/8e/The_Legend_of_Zelda_Ocarina_of_Time_box_art.png"},
        {title: "The Legend of Zelda: The Wind Waker",
        category: [
            {run: 'Any% - OOT', splits: [
                // splits go here
            ]},
            {run: "100% - OOT", splits: [
                // splits go here
            ]},
            {run: "All Cows - OOT", splits: [
                // splits go here
            ]},
        ],
        imageUrl: "https://upload.wikimedia.org/wikipedia/en/thumb/7/79/The_Legend_of_Zelda_The_Wind_Waker.jpg/220px-The_Legend_of_Zelda_The_Wind_Waker.jpg"},
    ]);

    // const[currentTitle, setCurrentTitle] = useState();
     
    // const [games, setGames] = useState([
    //     {title: "The Legend of Zelda: Majora's Mask", imageUrl: "https://upload.wikimedia.org/wikipedia/en/6/60/The_Legend_of_Zelda_-_Majora%27s_Mask_Box_Art.jpg"},
    //     {title: "The Legend of Zelda: Ocarina of Time", imageUrl: "https://upload.wikimedia.org/wikipedia/en/8/8e/The_Legend_of_Zelda_Ocarina_of_Time_box_art.png"},
    //     {title: "The Legend of Zelda: The Wind Waker", imageUrl: "https://upload.wikimedia.org/wikipedia/en/thumb/7/79/The_Legend_of_Zelda_The_Wind_Waker.jpg/220px-The_Legend_of_Zelda_The_Wind_Waker.jpg"},
    //     {title: "Banjo Kazooie", imageUrl: 'https://upload.wikimedia.org/wikipedia/en/1/12/Banjo_Kazooie_Cover.png'},
    //     {title: "Banjo Tooie", imageUrl: 'https://upload.wikimedia.org/wikipedia/en/4/41/Banjo-Tooie_Coverart.png' },
    //     {title: "Super Mario 64", imageUrl: 'https://upload.wikimedia.org/wikipedia/en/6/6a/Super_Mario_64_box_cover.jpg'},
    //     {title: "Super Mario Sunshine", imageUrl: 'https://upload.wikimedia.org/wikipedia/en/7/78/Super_mario_sunshine.jpg'},
    //     {title: "Super Metroid", imageUrl: 'https://upload.wikimedia.org/wikipedia/en/e/e4/Smetroidbox.jpg'},
    //     {title: "Celeste", imageUrl: 'https://upload.wikimedia.org/wikipedia/commons/thumb/1/1c/Celeste_box_art_final.png/800px-Celeste_box_art_final.png'}
    // ]);

    //TODO: Initialize firebase app here once (pass between screens as parameter along with accessors)
    useEffect(() => {
        try {
          initPacedDB();
        } catch (err) {
          console.log(err);
        }
      }, []);

    useEffect(() => {
        navigation.setOptions({
            headerLeft: () => (
                <TouchableOpacity
                    onPress={() => {navigation.navigate('Preferences')}}
                >
                    <Text style={styles.headerButtons}> Preferences </Text>
                </TouchableOpacity>
            ),
            headerRight: () => (
                <TouchableOpacity
                onPress={() => {navigation.navigate('Game Settings')}}
                >
                <Text style={styles.headerButtons}> Add / Edit </Text>
                </TouchableOpacity> 
            ),
        }, []);
    }, []);

    const renderGames = ({item}) => {
        return (
            <TouchableOpacity
                onPress={() => {
                    {navigation.navigate('Categories', { currentGame: item.title })};
                    // FIXME: TESTING ONLY - ACCESSING PROPERTIES OF OBJECTS
                    // console.log(findEntry(data, "title", "The Legend of Zelda: Majora's Mask"));
                    // console.log(findEntry(data, "title", "The Legend of Zelda: Ocarina of Time"));
                    // console.log(findIndex(data, "title", "The Legend of Zelda: Majora's Mask"));
                    // console.log(findIndex(data, "title", "The Legend of Zelda: Ocarina of Time"));

                    // storeDataItem(testEntryArray);
                    // storeDataItem(testEntryObjects);
                }}
            >
                <View style={styles.gameRow}>
                    <Image 
                        style={styles.imagePlaceholder}
                        source={{uri: item.imageUrl}}
                        resizeMode={'contain'}
                        />
                    <Text style={styles.gameText}>{item.title}</Text>
                </View>
            </TouchableOpacity>
        )
    };
    const renderSeparator = () => {
        return (
            <View style={{
                height: 2,
                backgroundColor: "black",
            }}/>
        );
    };

    return (
        <View style={styles.container}>
            <View style={styles.gamesListContainer}>
                <FlatList
                    ItemSeparatorComponent={renderSeparator}
                    keyExtractor={(item) => item.title}
                    data={data}
                    extraData={data}
                    renderItem={renderGames}
                />
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        justifyContent: 'flex-start',
        flexDirection: 'column',
        alignItems: 'stretch',
        flex: 1,
    },
    gamesListContainer: {
        height: 100,
        flex: 12, // TODO: Fix this once temporary button is removed
    },
    gameRow: {
        flexDirection: 'row',
        flex: 1,
        alignItems: 'center',
        padding: 5,
    },
    gameText: {
        fontSize: 20,
        fontWeight: 'bold',
        marginLeft: 5,
        flex: 1,
    },
    headerButtons: {
        color: 'white',
        fontWeight: 'bold',
        fontSize: 14,
        padding: 10,
    },
    gamesContainer: {
        fontSize: 24,
        flex: 1,
    },
    imagePlaceholder: {
        height: 75,
        width: 100,
    },
});

export default GameScreen;
