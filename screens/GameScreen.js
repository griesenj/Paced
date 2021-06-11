import { FlatList, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React, { useEffect, useState } from 'react';

import { TouchableHighlight } from 'react-native-gesture-handler';

const GameScreen = ({ route, navigation }) => {

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
                onPress={() => {navigation.navigate('GameSettings')}}
                >
                <Text style={styles.headerButtons}> Edit </Text>
                </TouchableOpacity> 
            ),
        }, []);
    }, []);

    return (
        <TouchableOpacity onPress={() => {navigation.navigate("Category")}}>
            <Text style={styles.gameText}>TO CATEGORY SCREEN </Text>
        </TouchableOpacity>
    );
}

const styles = StyleSheet.create({
    gameText: {
        fontSize: 32,
    },
    headerButtons: {
        color: 'white',
        fontWeight: 'bold',
        fontSize: 14,
        padding: 10,
    },
});

export default GameScreen;
