import { Keyboard, StyleSheet, Text, TouchableOpacity, TouchableWithoutFeedback, View } from 'react-native'

import { Image } from 'react-native-elements';
import React from 'react';

const HomeScreen = ({ navigation }) => {

    const logo = require("../../assets/paced-logo.png");

    return (
        <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
            <View style={styles.container}>
                <Image
                    style={{ width: 282, height: 96, marginBottom: 20}}
                    source={logo}
                />
                <TouchableOpacity style={styles.button}
                    onPress={() => {navigation.navigate("Sign In")}}
                >
                    <Text style={styles.buttonText}>Sign In</Text>
                </TouchableOpacity>
                <TouchableOpacity style={styles.button}
                    onPress={() => {navigation.navigate("Sign Up")}}
                >
                    <Text style={styles.buttonText}>Sign Up</Text>
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
    titleText: {
        fontSize: 76,
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
});

export default HomeScreen;
