import { FlatList, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React, { useEffect, useState } from 'react';

import { TouchableHighlight } from 'react-native-gesture-handler';

const Preferences = ({ route, navigation }) => {

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
            <Text style={styles.preferencesText}> PREFERENCES </Text>
            <Text style={styles.preferencesText}> Instructions here?
            </Text>
        </View>

    );
}

const styles = StyleSheet.create({
    preferencesText: {
        fontSize: 32,
    },
    headerButtons: {
        color: 'white',
        fontWeight: 'bold',
        fontSize: 14,
        padding: 10,
    }
});

export default Preferences;
