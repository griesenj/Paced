import { Button, Input } from 'react-native-elements';
import React, { useEffect, useState } from 'react';
import { ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native'

const TimerSettings = ({ route, navigation }) => {

    const [splitName, setSplitName] = useState("");

    // TODO: Need to add ability to add multiple splits from the settings screen at a time (also index ordering?)
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
                        if (splitName != "") {
                            navigation.navigate('Timer', { splitName });
                        }
                        if (scannedDataValid(scannedData)) {
                            navigation.navigate('Timer', { scannedData });
                        }
                    }}
                >
                    <Text style={styles.headerButtons}> Save </Text>
                </TouchableOpacity> 
            ),
        });
    });

    const scannedDataValid = (data) => {
        if (data != null) {
            var lines = data.split('\n');
            var line = "";
            for (var i = 0; i < lines.length; i++) {
                line = lines[i];
                fields = line.split(',');
                if (fields.length != 4) {
                    return false;
                }
            }
            return true;
        }
    }

    const DataHeader = () => {
        if (scannedDataValid(scannedData)) {
            return (
                <View>
                    <Text style={styles.timerSettingsHeaderText}>Imported QR Data</Text>
                    <Text>Please review and click save to import splits.</Text>
                </View>
            )
        } else if (scannedData != null) {
            return (
                <View>
                    <Text style={styles.timerSettingsHeaderText}>Imported QR Data</Text>
                    <Text style={styles.warningMessage}>WARNING: The data is not correctly formatted.</Text>
                </View>
            )
        } else {
            return <View></View>
        }
    }

    const DataView = () => {
        if (scannedData != null) {
            return <Text style={styles.scrollViewText}>{scannedData}</Text>
        }
        return <View></View>
    }

    return (
        // TODO: Error checking for bad inputs
        <View style={styles.container}>
            <Text style={styles.timerSettingsHeaderText}>Add New Split</Text>
            <Input
                placeholder="Split Name"
                // ref={initialField}
                value={splitName}
                onChangeText={(val) => setSplitName(val)}
            />
            {/* <Button
                onPress={() => {
                    console.log(splitName);
                    console.log(scannedDataValid(scannedData));
                }}
                title= "Test Output"
                color="#ff5c5c"
            /> */}
            <Text style={styles.timerSettingsHeaderText}>Add via QR Code</Text>
            <Text>Please reference the split formatting guidelines outlined in the help menu prior to generating your QR code.</Text>
            <Text style={styles.warningMessage}>{'\n'}WARNING: This will delete your existing splits!</Text>
            <TouchableOpacity style={styles.scannerButton}
                onPress={() => {
                    navigation.navigate('Scanner');
                }}
            >
                <Text style={styles.scannerButtonText}>SCAN</Text>
            </TouchableOpacity>
            <DataHeader/>
            <ScrollView style={styles.scrollViewContainer}>
                <DataView/>
            </ScrollView>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        margin: 5,
        flex:1,
    },
    scannerButtonText: {
        fontWeight: 'bold',
        fontSize: 36,
        padding: 5,
        alignSelf: 'center',
        color: 'white'
    },
    scannerButton: {
        backgroundColor: 'darkblue',
        margin: 20,
        borderRadius: 10,
    },
    timerSettingsHeaderText: {
        fontSize: 32,
    },
    headerButtons: {
        color: 'white',
        fontWeight: 'bold',
        fontSize: 14,
        padding: 10,
    },
    scrollViewContainer: {
    },
    scrollViewText: {
        fontSize: 20,
        color: 'darkgreen',
        margin: 5,
    },
    warningMessage: {
        color: 'red',
        fontWeight: 'bold'
    }
});

export default TimerSettings;
