import { FlatList, Keyboard, StyleSheet, Text, TouchableOpacity, TouchableWithoutFeedback, View } from 'react-native'
import React, { useEffect, useState } from 'react';

import { Input } from 'react-native-elements';
import { createNewUser } from '../helpers/fb-paced';

const SignUpScreen = ({ route, navigation }) => {

    const [email, setEmail] = useState();
    const [password, setPassword] = useState();
    const [authenticated, setAuthenticated] = useState(false);
    const [userId, setUserId] = useState();

    useEffect(() => {
        if (authenticated) {
            navigation.navigate("Games", { id: userId });
        }
    }, [authenticated]);
    
    return (
        <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
            <View style={styles.container}>
                <Text style={styles.preferencesText}> Create Account</Text>
                <View style={styles.inputContainer}>
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
                </View>
                <TouchableOpacity
                    onPress={() => {
                        createNewUser(email, password, setAuthenticated, setUserId)
                    }}
                >
                    <Text style={styles.clearButtonText}> CREATE ACCOUNT </Text>
                </TouchableOpacity>
            </View>
        </TouchableWithoutFeedback>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    inputContainer: {
        width: 300,
    },
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

export default SignUpScreen;
