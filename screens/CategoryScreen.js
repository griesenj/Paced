import { FlatList, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React, { useEffect, useState } from 'react';

import { TouchableHighlight } from 'react-native-gesture-handler';

const CategoryScreen = ({ route, navigation }) => {

    const { currentGame } = route.params;

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

    return (
        <TouchableOpacity onPress={() => {navigation.navigate("Timer")}}>
            <Text style={styles.categoryText}> TO TIMER SCREEN </Text>

            <Text> Current Game: {'\n' + currentGame} </Text>
        </TouchableOpacity>
    )
}

const styles = StyleSheet.create({
    categoryText: {
        fontSize: 32,
    },
    headerButtons: {
        color: 'white',
        fontWeight: 'bold',
        fontSize: 14,
        padding: 10,
    },
});

export default CategoryScreen;
