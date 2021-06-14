import { FlatList, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React, { useEffect, useState } from 'react';
import { locateEntry, locateIndex } from '../helpers/finders';

import { Image } from 'react-native-elements';
import { TouchableHighlight } from 'react-native-gesture-handler';

const CategoryScreen = ({ route, navigation }) => {

    const { receivedPacedData, receivedCurrentGame } = route.params;
    const [pacedData, setPacedData] = useState(receivedPacedData);
    const [currentGame, setCurrentGame] = useState(receivedCurrentGame); // TODO: Remove setter? Probably not needed

    useEffect(() => {
        if (route.params?.pacedData) {
            console.log('Setting new value (pacedData): ', route.params.pacedData)
            setPacedData(route.params.pacedData);
        }
    }, [route.params?.pacedData])

    useEffect(() => {
        navigation.setOptions({
            headerLeft: () => (
                <TouchableOpacity
                    onPress={() => {navigation.navigate('Games', { pacedData })}}
                >
                    <Text style={styles.headerButtons}> Back </Text>
                </TouchableOpacity>
            ),
            headerRight: () => (
                <TouchableOpacity
                onPress={() => {navigation.navigate('CategorySettings')}}
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

                    navigation.navigate('Timer', { receivedPacedData: pacedData, receivedCurrentGame: currentGame, 
                        receivedCurrentCategory: item.run })
                };
                }}
            >
                <View style={styles.categoryRow}>
                    <Image 
                        style={styles.imagePlaceholder}
                        source={{uri: pacedData[locateIndex(pacedData, 'title', currentGame)].imageUrl}}
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
                        data={pacedData[locateIndex(pacedData, 'title', currentGame)].category}
                        extraData={pacedData[locateIndex(pacedData, 'title', currentGame)].category}
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
