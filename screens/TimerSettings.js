import React, { useEffect, useState } from 'react';
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native'

import { Input } from 'react-native-elements';

const TimerSettings = ({ route, navigation }) => {

    const [splitName, setSplitName] = useState();

    // TODO: Need to add ability to add multiple splits from the settings screen at a time (also provide index position for ordering?)
    const [numSplits, setNumSplits] = useState(1);
    const [scannedData, setScannedData] = useState(null);

    useEffect(() => {
        if (route.params?.data) {
            // CODE TO CONVERT DATA TO SPLIT OBJECT FORMAT
            console.log('QR Data: ', route.params.data);
            setScannedData(route.params.data);
        }
    }, [route.params?.data])

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

    const DataView = () => {
        if (scannedData != undefined) {
            return <Text>{scannedData}</Text>
        }
        return <View></View>
    }

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
            <Text>Add existing splits (QR Code)</Text>
            <Text>Note: Be sure to reference the split formatting requirements prior to generating your QR code.</Text>
            <Text>Visit our Help menu for more information!</Text>
            <TouchableOpacity
                onPress={() => {
                    navigation.navigate('Scanner');
                }}
            >
                <Text style={styles.scannerButtonText}>SCAN CODE</Text>
            </TouchableOpacity>
            <Text>QR Data (Save to Import Splits)</Text>
            <DataView/>
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
