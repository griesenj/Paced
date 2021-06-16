import React, { useEffect, useState } from 'react';
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native'

import { Input } from 'react-native-elements';

const TimerSettings = ({ navigation }) => {

    const [splitName, setSplitName] = useState();

    // TODO: Need to add ability to add multiple splits from the settings screen at a time (also provide index position for ordering?)
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
            <Text style={styles.timerSettingsText}>Add New Split</Text>
            <Input
                placeholder="Split Name"
                // ref={initialField}
                value={splitName}
                onChangeText={(val) => setSplitName(val)}
            />
            <TouchableOpacity
                onPress={() => {
                    console.log(splitName);
                }}
            >
                <Text style={styles.timerSettingsText}>CLICK ME FOR TEST OUTPUT</Text>
            </TouchableOpacity>
            <TouchableOpacity
                onPress={() => {
                    navigation.navigate('Scanner');
                }}
            >
                <Text style={styles.scannerButtonText}>SCAN QR CODE</Text>
            </TouchableOpacity>
        </View>
    );
}

const styles = StyleSheet.create({
    scannerButtonText: {
        fontWeight: 'bold',
        fontSize: 64,
    },
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
