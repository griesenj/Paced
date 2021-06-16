import React, { useEffect, useState } from 'react';
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native'

import { Input } from 'react-native-elements';

const GameSettings = ({ navigation }) => {

    const [title, setTitle] = useState();
    const [imageUrl, setImageUrl] = useState();

    // FIXME: Need to make sure settings screen inputs do not already exist (will overwrite/duplicate otherwise)
    // TODO: Error checking for bad inputs

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
                    onPress={() => {
                        navigation.navigate('Games', {
                            title,
                            imageUrl
                        });
                    }}
                >
                    <Text style={styles.headerButtons}> Save </Text>
                </TouchableOpacity> 
            ),
        });
    });

    return (
        <View>
            <Text style={styles.gameSettingsText}>Add New Game</Text>
            <Input
                placeholder="Game Title"
                // ref={initialField}
                value={title}
                onChangeText={(val) => setTitle(val)}
            />
            <Input
                placeholder="Game Art URL"
                // ref={initialField}
                value={imageUrl}
                onChangeText={(val) => setImageUrl(val)}
            />
            <TouchableOpacity style={styles.gameSettingsText}
                onPress={() => {
                    console.log(title, imageUrl);
                }}
            >
                <Text>CLICK ME FOR TEST OUTPUT</Text>
            </TouchableOpacity>
            <Text>To edit or remove an existing game, long press the game icon in the menu.</Text>
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
