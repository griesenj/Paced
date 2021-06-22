import { FlatList, StatusBar, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React, { useEffect, useState } from 'react';
import { addGame, editGame, removeGame } from '../../helpers/modifiers';

import { Image } from 'react-native-elements';
import { gameComparator } from '../../helpers/comparators';
import { initLocalData } from '../../helpers/fb-paced';

const GameScreen = ({ route, navigation }) => {

    const [gamePacedData, setGamePacedData] = useState([]);
    const { user } = route.params;

    useEffect(() => {
        initLocalData(user, setGamePacedData);
    }, []);

    useEffect(() => {
        if (route.params?.editOrDelete == false) {
            (route.params.imageUrl != "") ? addGame(user, route.params.title, route.params.imageUrl, gamePacedData) :
            addGame(user, route.params.title, ".", gamePacedData);
        }
        if (route.params?.editOrDelete == true) {
            if (route.params?.title != "" && route.params?.imageUrl != "") {
                editGame(user, route.params.receivedItemToUpdate.title, route.params.title, route.params.imageUrl, gamePacedData);
            } else {
                removeGame(user, route.params.receivedItemToUpdate.title, gamePacedData);
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

    const renderGames = ({item}) => {     
        if (item != 'empty')   {
            return (
                <TouchableOpacity
                    onPress={() => {
                        navigation.navigate('Categories', { 
                            receivedPacedData: gamePacedData, receivedCurrentGame: item.title, user: user,
                        });
                    }}
                    onLongPress={() => {
                        navigation.navigate('Game Settings', {
                            item,
                        });
                    }}
                >
                    <View style={styles.gameRow}>
                        <Image 
                            style={styles.gameImage}
                            source={{uri: item.imageUrl}}
                            resizeMode={'contain'}
                            />
                        <Text style={styles.gameText}>{item.title}</Text>
                    </View>
                </TouchableOpacity>
            )
        }
        return (
            <View style={{alignItems: 'center', marginTop: 20}}>
                <Text style={{fontSize: 20, fontWeight: 'bold'}}>No existing games!</Text>
                <Text style={{fontSize: 16}}>Fix via the "Add / Edit" menu option.</Text>
            </View>
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
            <StatusBar  barStyle="light-content" translucent={true} />
            <View style={styles.gamesListContainer}>
                <FlatList
                    ItemSeparatorComponent={renderSeparator}
                    keyExtractor={(item) => item.title}
                    data={gamePacedData.sort(gameComparator)}
                    extraData={gamePacedData.sort(gameComparator)}
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
    gameImage: {
        height: 75,
        width: 100,
    },
});

export default GameScreen;
