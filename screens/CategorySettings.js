import { Keyboard, StyleSheet, Text, TouchableOpacity, TouchableWithoutFeedback, View } from 'react-native'
import React, { useEffect, useState } from 'react';

import { Input } from 'react-native-elements';

const CategorySettings = ({ navigation }) => {
    
    const [runTitle, setRunTitle] = useState("");

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
                        if (runTitle != "") {
                            navigation.navigate('Categories', { runTitle });
                        }
                    }}
                >
                    <Text style={styles.headerButtons}> Save </Text>
                </TouchableOpacity> 
            ),
        });
    });

    return (
        <TouchableWithoutFeedback onPress ={Keyboard.dismiss}>
            <View style={styles.container}>
                <Text style={styles.categorySettingsHeaderText}>Add New Category</Text>
                <Input
                    placeholder="Run Title"
                    value={runTitle}
                    onChangeText={(val) => setRunTitle(val)}
                />
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
