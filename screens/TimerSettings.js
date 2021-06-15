import React, { useEffect, useState } from 'react';
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native'

import { Input } from 'react-native-elements';

const TimerSettings = ({ route, navigation }) => {

    const { settingsCurrentGame } = route.params;
    const { settingsCurrentCategory } = route.params;
    const [currentGame, setCurrentGame] = useState(settingsCurrentGame);
    const [currentCategory, setCurrentCategory] = useState(settingsCurrentCategory);

    const [splitName, setSplitName] = useState();

    const [numSplits, setNumSplits] = useState(1);

    useEffect(() => {
        navigation.setOptions({
            headerLeft: () => (
                <TouchableOpacity
                    onPress={() => {navigation.navigate('Timer')}}
                >
                    <Text style={styles.headerButtons}> Back </Text>
                </TouchableOpacity>
            ),
            headerRight: () => (
                <TouchableOpacity
                    onPress={() => {
                        navigation.navigate('Timer', { splitName });
                    }}
                >
                    <Text style={styles.headerButtons}> Save </Text>
                </TouchableOpacity> 
            ),
        });
    });

    return (
        // TODO: Error checking for bad inputs
        <View>
            <Text style={styles.categorySettingsText}>Add New Category</Text>
            <Input
                placeholder="Split Name"
                // ref={initialField}
                value={splitName}
                onChangeText={(val) => setSplitName(val)}
            />
            <TouchableOpacity style={styles.timerSettingsText}
                onPress={() => {
                    console.log(splitName);
                }}
            >
                <Text>CLICK ME FOR TEST OUTPUT</Text>
            </TouchableOpacity>
        </View>
    );
}

const styles = StyleSheet.create({
    timerSettingsText: {
        fontSize: 32,
    },
    headerButtons: {
        color: 'white',
        fontWeight: 'bold',
        fontSize: 14,
        padding: 10,
    },
});

export default TimerSettings;
