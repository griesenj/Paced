import { Keyboard, StyleSheet, Text, TouchableOpacity, TouchableWithoutFeedback, View } from 'react-native'
import React, { useEffect, useState } from 'react';

import { Input } from 'react-native-elements';
import { getExistingUserId } from '../helpers/fb-paced';

const SignInScreen = ({ route, navigation }) => {

    const [email, setEmail] = useState();
    const [password, setPassword] = useState();
    const [userId, setUserId] = useState();

    useEffect(() => {
        if (userId) {
            navigation.navigate("Games", { user: userId });
        }
    }, [userId]);
    
    return (
        <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
            <View style={styles.container}>
                <Text style={styles.titleText}> Sign In </Text>
                <View style={styles.inputContainer}>
                    <Input
                        placeholder="Email"
                        value={email}
                        onChangeText={(val) => setEmail(val)}
                        autoCapitalize="none"
                    />
                    <Input
                        placeholder="Password"
                        value={password}
                        onChangeText={(val) => setPassword(val)}
                        autoCapitalize="none"
                        secureTextEntry={true}
                    />
                </View>
                <TouchableOpacity style={styles.button}
                    onPress={() => {
                        getExistingUserId(email, setUserId);
                    }}
                >
                    <Text style={styles.buttonText}> SUBMIT </Text>
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
    headerButtons: {
        color: 'white',
        fontWeight: 'bold',
        fontSize: 14,
        padding: 10,
    },
    titleText: {
        fontSize: 32,
        fontWeight: '600',
        marginBottom: 10,
    },
    buttonText: {
        fontWeight: '400',
        fontSize: 18,
        padding: 10,
        textAlign: 'center',
        color: 'white'
    },
    button: {
        backgroundColor: '#242424',
        width: 200,
        margin: 10,
        borderRadius: 10,
    },
});

export default SignInScreen;
