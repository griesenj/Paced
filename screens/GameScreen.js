import { FlatList, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React, { useEffect, useState } from 'react';

import { Image } from 'react-native-elements';
import { TouchableHighlight } from 'react-native-gesture-handler';

const GameScreen = ({ route, navigation }) => {

    const [games, setGames] = useState([
        {name: "The Legend of Zelda: Majora's Mask", imageUrl: "https://upload.wikimedia.org/wikipedia/en/6/60/The_Legend_of_Zelda_-_Majora%27s_Mask_Box_Art.jpg"},
        {name: "The Legend of Zelda: Ocarina of Time", imageUrl: "https://upload.wikimedia.org/wikipedia/en/8/8e/The_Legend_of_Zelda_Ocarina_of_Time_box_art.png"},
        {name: "Banjo Kazooie", imageUrl: 'https://upload.wikimedia.org/wikipedia/en/1/12/Banjo_Kazooie_Cover.png'},
        {name: "Banjo Tooie", imageUrl: 'https://upload.wikimedia.org/wikipedia/en/4/41/Banjo-Tooie_Coverart.png' },
        {name: "Super Mario 64", imageUrl: 'https://upload.wikimedia.org/wikipedia/en/6/6a/Super_Mario_64_box_cover.jpg'},
        {name: "Super Mario Sunshine", imageUrl: 'https://upload.wikimedia.org/wikipedia/en/7/78/Super_mario_sunshine.jpg'},
        {name: "Celeste", imageUrl: 'https://upload.wikimedia.org/wikipedia/commons/thumb/1/1c/Celeste_box_art_final.png/800px-Celeste_box_art_final.png'}
    ]);
    
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
                <Text style={styles.headerButtons}> Edit </Text>
                </TouchableOpacity> 
            ),
        }, []);
    }, []);

    const renderGames = ({item}) => {
        return (
            <TouchableOpacity
                onPress={() => {
                    {navigation.navigate('Category')};
                }}
            >
                <View style={styles.gameRow}>
                    <Image 
                        style={styles.imagePlaceholder}
                        source={{uri: item.imageUrl}}
                        resizeMode={'contain'}
                        />
                    <Text style={styles.gameText}>{item.name}</Text>
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
                    keyExtractor={(item) => item.name}
                    data={games}
                    extraData={games}
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
