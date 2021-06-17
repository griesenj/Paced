import React, { useEffect, useState } from 'react';
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native'

import { Input } from 'react-native-elements';

const GameSettings = ({ route, navigation }) => {

    const [title, setTitle] = useState("");
    const [imageUrl, setImageUrl] = useState("");

    // const { receivedTitle, receivedImageUrl } = route.params;

    // FIXME: Need to make sure settings screen inputs do not already exist (will overwrite/duplicate otherwise)

    // useEffect(() => {

    //     setTitle(route.params.receivedTitle);
    //     setImageUrl(route.params)

    // }, [route.params?.receivedTitle, route.params?.receivedImageUrl])

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
                        if (title != "") {
                            navigation.navigate('Games', {
                                title,
                                imageUrl
                            });
                        }
                    }}
                >
                    <Text style={styles.headerButtons}> Save </Text>
                </TouchableOpacity> 
            ),
        });
    });

    return (
        <View style={styles.container}>
            <Text style={styles.gameSettingsHeaderText}>Add New Game</Text>
            <Input
                placeholder="Game Title"
                value={title}
                onChangeText={(val) => setTitle(val)}
            />
            <Input
                placeholder="Game Art URL"
                value={imageUrl}
                onChangeText={(val) => setImageUrl(val)}
            />
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        margin: 5,
        flex:1,
    },
    gameSettingsHeaderText: {
        fontSize: 32,
    },
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
