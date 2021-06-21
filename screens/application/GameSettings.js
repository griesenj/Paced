import { Keyboard, StyleSheet, Text, TouchableOpacity, TouchableWithoutFeedback, View } from 'react-native'
import React, { useEffect, useState } from 'react';

import { Input } from 'react-native-elements';

const GameSettings = ({ route, navigation }) => {

    const [title, setTitle] = useState("");
    const [imageUrl, setImageUrl] = useState("");

    const [receivedItemToUpdate, setReceivedItemToUpdate] = useState();
    const [editOrDelete, setEditOrDelete] = useState(false);

    useEffect(() => {
        if (route.params?.item) {
            setReceivedItemToUpdate(route.params.item);
            setTitle(route.params.item.title);
            setImageUrl(route.params.item.imageUrl);
            setEditOrDelete(true);
        };
    }, [route.params?.item]);

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
                        if (editOrDelete) {
                            navigation.navigate('Games', {
                                title,
                                imageUrl,
                                editOrDelete,
                                receivedItemToUpdate,
                            });
                        } else {
                            if (title != "") {
                                navigation.navigate('Games', {
                                    title,
                                    imageUrl,
                                    editOrDelete,
                                    receivedItemToUpdate,
                                });
                            }
                        }
                    }}
                >
                    <Text style={styles.headerButtons}> Save </Text>
                </TouchableOpacity> 
            ),
        });
    });

    const HeaderText = () => {
        if (editOrDelete) {
            return (
                <Text style={styles.gameSettingsHeaderText}>Edit Game</Text>
            );
        }
        return (
            <Text style={styles.gameSettingsHeaderText}>Add New Game</Text>
        )
    }

    const FooterText = () => {
        if (editOrDelete) {
            return (
                <View>
                    <Text style={styles.gameSettingsText}>To delete a game, tap the "Clear" button below 
                    and then tap "Save".</Text>
                    <Text style={styles.warningMessage}>{'\n'}WARNING: This will delete all categories and 
                    splits associated with this game!</Text>
                </View>
            );
        }
        return <View></View>
    }

    return (
        <TouchableWithoutFeedback onPress ={Keyboard.dismiss}>
            <View style={styles.container}>
                <HeaderText/>
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
                <FooterText/>
                <TouchableOpacity style={styles.clearButton}
                    onPress={() => {
                        setTitle("");
                        setImageUrl("");
                    }}
                >
                    <Text style={styles.clearButtonText}>CLEAR</Text>
                </TouchableOpacity>
            </View>
        </TouchableWithoutFeedback>
    );
}

const styles = StyleSheet.create({
    container: {
        margin: 5,
        flex:1,
    },
    gameSettingsHeaderText: {
        fontSize: 32,
        fontWeight: '600',
    },
    gameSettingsText: {
        fontSize: 18,
        fontWeight: '500',
    },
    headerButtons: {
        color: 'white',
        fontWeight: 'bold',
        fontSize: 14,
        padding: 10,
    },
    warningMessage: {
        color: 'red',
        fontWeight: 'bold'
    },
    clearButtonText: {
        fontWeight: 'bold',
        fontSize: 36,
        padding: 5,
        alignSelf: 'center',
        color: 'white'
    },
    clearButton: {
        backgroundColor: 'darkblue',
        margin: 20,
        borderRadius: 10,
    },
});

export default GameSettings;
