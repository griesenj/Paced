import React, { useEffect, useState } from 'react';
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native'

import { Input } from 'react-native-elements';

const CategorySettings = ({ route, navigation }) => {

    const { settingsCurrentGame } = route.params;
    const [currentGame, setCurrentGame] = useState(settingsCurrentGame);
    const [runTitle, setRunTitle] = useState();

    useEffect(() => {
        navigation.setOptions({
            headerLeft: () => (
                <TouchableOpacity
                    onPress={() => {navigation.navigate('Categories')}}
                >
                    <Text style={styles.headerButtons}> Back </Text>
                </TouchableOpacity>
            ),
            headerRight: () => (
                <TouchableOpacity
                    onPress={() => {
                        navigation.navigate('Categories', { runTitle });
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
                placeholder="Run Title"
                // ref={initialField}
                value={runTitle}
                onChangeText={(val) => setRunTitle(val)}
            />
            <TouchableOpacity style={styles.categorySettingsText}
                onPress={() => {
                    console.log(runTitle);
                }}
            >
                <Text>CLICK ME FOR TEST OUTPUT</Text>
            </TouchableOpacity>
        </View>
    );
}

const styles = StyleSheet.create({
    categorySettingsText: {
        fontSize: 32,
    },
    headerButtons: {
        color: 'white',
        fontWeight: 'bold',
        fontSize: 14,
        padding: 10,
    },
});

export default CategorySettings;
