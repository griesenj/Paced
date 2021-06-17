import { Keyboard, StyleSheet, Text, TouchableOpacity, TouchableWithoutFeedback, View } from 'react-native'
import React, { useEffect, useState } from 'react';

import { Input } from 'react-native-elements';

const CategorySettings = ({ route, navigation }) => {
    
    const [runTitle, setRunTitle] = useState("");

    const [receivedItemToUpdate, setReceivedItemToUpdate] = useState();
    const [editOrDelete, setEditOrDelete] = useState(false);

    useEffect(() => {
        if (route.params?.item) {
            setReceivedItemToUpdate(route.params.item);
            setRunTitle(route.params.item.run);
            setEditOrDelete(true);
        };
    }, [route.params?.item]);

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
                        if (editOrDelete) {
                            navigation.navigate('Categories', { 
                                runTitle,
                                editOrDelete,
                                receivedItemToUpdate,
                            });
                        } else {
                            if (runTitle != "") {
                                navigation.navigate('Categories', { 
                                    runTitle,
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
                <Text style={styles.categorySettingsHeaderText}>Edit Category</Text>
            );
        }
        return (
            <Text style={styles.categorySettingsHeaderText}>Add New Category</Text>
        )
    }

    const FooterText = () => {
        if (editOrDelete) {
            return (
                <View>
                    <Text style={styles.categorySettingsText}>To Delete a category, tap the "Clear" button below 
                    and then tap "Save".</Text>
                    <Text style={styles.warningMessage}>{'\n'}WARNING: This will delete all splits associated 
                    with this category!</Text>
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
                    placeholder="Run Title"
                    value={runTitle}
                    onChangeText={(val) => setRunTitle(val)}
                />
                <FooterText/>
                <TouchableOpacity style={styles.clearButton}
                    onPress={() => {
                        setRunTitle("");
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
    categorySettingsHeaderText: {
        fontSize: 32,
        fontWeight: '600',
    },
    categorySettingsText: {
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

export default CategorySettings;
