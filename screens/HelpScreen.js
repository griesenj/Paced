import { FlatList, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React, { useEffect, useState } from 'react';

import { Input } from 'react-native-elements';
import { TouchableHighlight } from 'react-native-gesture-handler';
import { createNewUser } from '../helpers/fb-paced';

const HelpScreen = ({ route, navigation }) => {

    const [email, setEmail] = useState();
    const [password, setPassword] = useState();

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
                onPress={() => {navigation.navigate('Games')}}
                >
                <Text style={styles.headerButtons}> Save </Text>
                </TouchableOpacity> 
            ),
        }, []);
    }, []);

    return (
        <View>
            {/* <Text style={styles.preferencesText}> Instructions here</Text> */}
            <Text style={styles.preferencesText}> Create Account</Text>
            <Input
                    placeholder="Email"
                    value={email}
                    onChangeText={(val) => setEmail(val)}
                />
                <Input
                    placeholder="Password"
                    value={password}
                    onChangeText={(val) => setPassword(val)}
                />

                <TouchableOpacity
                    onPress={() => {
                        createNewUser(email, password)
                    }}
                >
                    <Text style={styles.clearButtonText}> CREATE ACCOUNT </Text>
                </TouchableOpacity>

        </View>

    );
}

const styles = StyleSheet.create({
    preferencesText: {
        fontSize: 32,
    },
    headerButtons: {
        color: 'white',
        fontWeight: 'bold',
        fontSize: 14,
        padding: 10,
    }
});

export default HelpScreen;
