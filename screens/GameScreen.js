import { FlatList, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React, { useEffect, useState } from 'react';
import { initLocalData, initPacedDB } from '../helpers/fb-paced';

import { Image } from 'react-native-elements';
import { addGame } from '../helpers/modifiers';

//TODO: Create comparator method that dispays flatlist content alphabetically
//TODO: For editing existing game entry, LONG PRESS --> Prepopulate fields via route params

const GameScreen = ({ route, navigation }) => {
    
    const [gamePacedData, setGamePacedData] = useState([]);
    
    useEffect(() => {
        try {
          initPacedDB();
        } catch (err) {
          console.log(err);
        }
        initLocalData(setGamePacedData);
    }, []);

    // TODO: WATCH FOR RECEIVED PARAMS FROM SETTINGS SCREEN, UPDATE LOCAL DATA & REFRESH IF RECEIVED

    useEffect(() => {
        if (route.params?.title || route.params?.imageUrl) {

            console.log('ROUTE PARAMS: ', route.params.title, route.params.imageUrl);
            addGame(route.params.title, route.params.imageUrl, gamePacedData);
        }
    }, [route.params?.title, route.params?.imageUrl])
    
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
                    {navigation.navigate('Categories', { 
                        receivedPacedData: gamePacedData, receivedCurrentGame: item.title 
                    })};
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
                    data={gamePacedData}
                    extraData={gamePacedData}
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
    imagePlaceholder: {
        height: 75,
        width: 100,
    },
});

export default GameScreen;
