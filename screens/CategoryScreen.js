import { FlatList, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React, { useEffect, useState } from 'react';
import { locateEntry, locateIndex } from '../helpers/finders';

import { Image } from 'react-native-elements';
import { TouchableHighlight } from 'react-native-gesture-handler';

const CategoryScreen = ({ route, navigation }) => {

    const { currentGame } = route.params;
    const { data } = route.params;

    useEffect(() => {
        navigation.setOptions({
            headerLeft: () => (
                <TouchableOpacity
                    onPress={() => {navigation.navigate('Games')}}
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
                onPress={() => {
                    {navigation.navigate('Timer', { entireData: data, currentGame: currentGame, currentCategory: item.run })};
                }}
            >
                <View style={styles.categoryRow}>
                    <Image 
                        style={styles.imagePlaceholder}
                        source={{uri: data[locateIndex(data, 'title', currentGame)].imageUrl}}
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
                        data={data[locateIndex(data, 'title', currentGame)].category}
                        extraData={data[locateIndex(data, 'title', currentGame)].category}
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
