import { Keyboard, StyleSheet, Text, TouchableOpacity, TouchableWithoutFeedback, View } from 'react-native'
import React, { useEffect, useState } from 'react';

import { Input } from 'react-native-elements';
import { signIn } from '../../helpers/fb-paced';

const SignInScreen = ({ navigation }) => {

    const [email, setEmail] = useState();
    const [password, setPassword] = useState();
    const [userId, setUserId] = useState();
    const [error, setError] = useState();

    useEffect(() => {
        if (userId) {
            navigation.navigate("Games", { user: userId });
        }
    }, [userId]);

    const validate = () => {
        if (error) {
            if (error == 'INVALID') {
                return 'All fields are required';
            } else {
                return error.message;
            }
        }
    }
    
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
                        errorStyle={styles.errorText}
                        errorMessage={validate()}
                    />
                </View>
                <TouchableOpacity style={styles.button}
                    onPress={() => {
                        signIn(email, password, setUserId, setError);
                    }}
                >
                    <Text style={styles.buttonText}> Submit </Text>
                </TouchableOpacity>
                <TouchableOpacity style={[styles.button, {backgroundColor: '#242424'}]}
                    onPress={() => {
                        navigation.navigate("Home");
                    }}
                >
                    <Text style={styles.buttonText}> Back </Text>
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
        backgroundColor: 'darkblue',
        width: 200,
        margin: 10,
        borderRadius: 10,
    },
    errorText: {
        color: 'red',
        fontSize: 16,
        textAlign: 'center',
        paddingTop: 10,
    }
});

export default SignInScreen;
