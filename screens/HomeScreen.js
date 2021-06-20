import { Keyboard, StyleSheet, Text, TouchableOpacity, TouchableWithoutFeedback, View } from 'react-native'

import React from 'react';

const HomeScreen = ({ navigation }) => {

    return (
        <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
            <View style={styles.container}>
                <Text style={styles.titleText}> PACED </Text>
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
    },
    buttonText: {
        fontWeight: '400',
        fontSize: 26,
        padding: 5,
        textAlign: 'center',
        // alignSelf: 'center',
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