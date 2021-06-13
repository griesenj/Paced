import { FlatList, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React, { useEffect, useState } from 'react';

import { TouchableHighlight } from 'react-native-gesture-handler';

const GameSettings = ({ route, navigation }) => {

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
                onPress={() => {navigation.navigate('Games')}}
                >
                <Text style={styles.headerButtons}> Save </Text>
                </TouchableOpacity> 
            ),
        }, []);
    }, []);

    return (
        <View>
            <Text style={styles.gameSettingsText}>Game Settings</Text>

            <Text>Add a new game</Text>
            <Text>Edit an existing game</Text>
        </View>
    );
}

const styles = StyleSheet.create({
    gameSettingsText: {
        fontSize: 32,
    },
    headerButtons: {
        color: 'white',
        fontWeight: 'bold',
        fontSize: 14,
        padding: 10,
    },
});

export default GameSettings;
