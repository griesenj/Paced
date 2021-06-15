import { FlatList, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React, { useEffect, useState } from 'react';
import { locateEntry, locateIndex } from '../helpers/finders';

import { Image } from 'react-native-elements';
import { TouchableHighlight } from 'react-native-gesture-handler';
import { initLocalData } from '../helpers/fb-paced';

const CategoryScreen = ({ route, navigation }) => {

    const { receivedPacedData, receivedCurrentGame } = route.params;
    const [categoryPacedData, setCategoryPacedData] = useState(receivedPacedData);
    const [currentGame] = useState(receivedCurrentGame);

    useEffect(() => {
        try {
            console.log('SETTING CATEGORY PACED DATA');
            initLocalData(setCategoryPacedData);
        } catch (err) {
          console.log(err);
        }
    }, [route.params.timerPacedData]);

    useEffect(() => {
        if (route.params?.receivedPacedData) {
            // console.log('Setting data from GAMESCREEN: ', route.params.receivedPacedData)
            // setCategoryPacedData(route.params.receivedPacedData);
        }
        if (route.params?.timerPacedData) {
            // console.log('Setting data from TIMERSCREEN: ', route.params.timerPacedData)
            // setCategoryPacedData(route.params.timerPacedData);
        }
    }, [route.params?.receivedPacedData, route.params?.timerPacedData]);

    useEffect(() => {
        navigation.setOptions({
            headerLeft: () => (
                <TouchableOpacity
                    onPress={() => {navigation.navigate('Games', { categoryPacedData })}}
                >
                    <Text style={styles.headerButtons}> Back </Text>
                </TouchableOpacity>
            ),
            headerRight: () => (
                <TouchableOpacity
                onPress={() => {
                    console.log('categoryPacedData: ', categoryPacedData);
                    // navigation.navigate('CategorySettings')
                }}
                >
                <Text style={styles.headerButtons}> Add / Edit </Text>
                </TouchableOpacity> 
            ),
        });
    }, []);

    const renderCategories = ({item}) => {
        return (           
            <TouchableOpacity
                onPress={() => {{

                    // TODO: REMOVE
                    // console.log(route.params);

                    navigation.navigate('Timer', { receivedPacedData: categoryPacedData, receivedCurrentGame: currentGame, 
                        receivedCurrentCategory: item.run })
                };
                }}
            >
                <View style={styles.categoryRow}>
                    <Image 
                        style={styles.imagePlaceholder}
                        source={{uri: categoryPacedData[locateIndex(categoryPacedData, 'title', currentGame)].imageUrl}}
                        resizeMode={'contain'}
                        />
                    <Text style={styles.categoryText}>{item.run}</Text>
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
                <View style={styles.categoryListContainer}>
                    <FlatList
                        ItemSeparatorComponent={renderSeparator}
                        keyExtractor={(item) => item.run}
                        data={categoryPacedData[locateIndex(categoryPacedData, 'title', currentGame)].category}
                        extraData={categoryPacedData[locateIndex(categoryPacedData, 'title', currentGame)].category}
                        renderItem={renderCategories}
                    />
                </View>
            </View>
    )
}

const styles = StyleSheet.create({
    container: {
        justifyContent: 'flex-start',
        flexDirection: 'column',
        alignItems: 'stretch',
        flex: 1,
    },
    categoryListContainer: {
        height: 100,
        flex: 12, // TODO: Fix this once temporary button is removed
    },
    categoryRow: {
        flexDirection: 'row',
        flex: 1,
        alignItems: 'center',
        padding: 5,
    },
    categoryText: {
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
        // backgroundColor: 'black',
    },
});

export default CategoryScreen;
