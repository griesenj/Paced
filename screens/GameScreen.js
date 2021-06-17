import { FlatList, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React, { useEffect, useState } from 'react';
import { addGame, editGame, removeGame } from '../helpers/modifiers';
import { initLocalData, initPacedDB } from '../helpers/fb-paced';

import { Image } from 'react-native-elements';

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
        console.log('INIT GAME DATA FROM FIREBASE');
        initLocalData(setGamePacedData);
    }, []);

    useEffect(() => {
        if (route.params?.editOrDelete == false) {
            (route.params.imageUrl != "") ? addGame(route.params.title, route.params.imageUrl, gamePacedData) :
            addGame(route.params.title, ".", gamePacedData);
        } else {
            if (route.params?.title != "" && route.params?.imageUrl != "") {
                // editGame(route.params.receivedItemToUpdate.title, route.params.title, route.params.imageUrl, gamePacedData);
            } else {
                console.log('RECEIVEDITEM - REMOVE: ', route.params.receivedItemToUpdate);
                removeGame(route.params.receivedItemToUpdate.title, gamePacedData);
            }
        }
    }, [route.params?.title, route.params?.imageUrl, route.params?.editOrDelete, route.params?.receivedItemToUpdate]);
    
    useEffect(() => {
        navigation.setOptions({
            headerLeft: () => (
                <TouchableOpacity
                    onPress={() => {navigation.navigate('Help')}}
                >
                    <Text style={styles.headerButtons}> Help </Text>
                </TouchableOpacity>
            ),
            headerRight: () => (
                <TouchableOpacity
                    onPress={() => {navigation.navigate('Game Settings')}}
                >
                <Text style={styles.headerButtons}> Add / Edit </Text>
                </TouchableOpacity> 
            ),
        });
    });

    const ViewNoGames = () => {
        if (gamePacedData != null) {
            return <View></View>
        }
        return (
            <View style={{alignItems: 'center', marginTop: 20}}>
                <Text style={{fontSize: 20}}>No existing games!</Text>
                <Text style={{fontSize: 16}}>Fix via the "Add / Edit" menu option.</Text>
            </View>
        )
    }

    const renderGames = ({item}) => {       
        return (
            <TouchableOpacity
                onPress={() => {
                    {navigation.navigate('Categories', { 
                        receivedPacedData: gamePacedData, receivedCurrentGame: item.title 
                    })};
                }}
                onLongPress={() => {
                    navigation.navigate('Game Settings', {
                        item,
                    });
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
            <ViewNoGames/>
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
        flex: 1,
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
