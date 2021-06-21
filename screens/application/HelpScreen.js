import React, { useEffect } from 'react';
import { ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native'

const HelpScreen = ({ navigation }) => {

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
                    onPress={() => {navigation.navigate('Home')}}
                >
                    <Text style={styles.headerButtons}> Log Out </Text>
                </TouchableOpacity>
            ),
        }, []);
    }, []);

    return (
        <ScrollView style={styles.container}>
            <Text style={styles.helpHeaderText}>Welcome</Text>
            <View style={styles.textContainer}>
                <Text style={styles.helpText}>Thanks for trying Paced! This app is a useful tool to keep track of your best speedrun times in 
                one place. The user interface is relatively intitutive, but some details that will help you get the most out of the app are 
                 outlined below.</Text>              
            </View>
            <Text style={styles.subHeaderText}>Adding Games/Categories</Text>
            <View style={styles.textContainer}>
                <Text style={styles.helpText}>1. To add a new game or category, tap the "add/edit" button in the top right corner of the respective 
                screen.</Text>
                <Text style={styles.helpText}>2. To edit an existing game or cateogry, press and hold the game or category of your choosing. You will 
                then be able to modify the existing information and tap the "save" button in the top right corner.</Text>
                <Text style={styles.helpText}>3. To delete a game or category completely, press and hold the game or category you wish to delete, tap 
                the "clear" button, and then tap the "save" button in the top right corner.</Text>                
            </View>
            <Text style={styles.subHeaderText}>Adding Splits</Text>
            <View style={styles.textContainer}>
                <Text style={styles.helpText}>1. To add a new split, tap the "add/edit" button in the top right corner of the timer screen.</Text>
                <Text style={styles.helpText}>2. You can either add splits one at at a time via the provided text field, or import existing 
                splits through the use of a QR code.</Text>
                <Text style={styles.helpText}>3. If you wish to use the QR code import functionality, be sure to format your splits per the following 
                guidelines.</Text>
                <Text style={styles.splitInstructions}>Use commas and no spaces to separate the split details (SplitName,GoldSegment,PbSegment,PbTotal) 
                and use line breaks to separate the splits themselves.</Text>
                <Text style={[styles.splitInstructions, {fontWeight: '600'}]}>See the example below for reference:{'\n'}</Text>
                <Text style={styles.example}>
                    Kokiri Sword,40,45,45{'\n'}
                    Deku Shield,35,35,80{'\n'}
                    Escape Forest,25,30,110{'\n'}</Text>
            <Text style={styles.subHeaderText}>Operating the Timer</Text>
                <Text style={styles.helpText}>1. To start the timer, tap the timer text (which will read 0.0) at the bottom of the screen.</Text>
                <Text style={styles.helpText}>2. To reset the timer and clear the current run, press and hold the timer text at the bottom of the screen.</Text>
                <Text style={styles.helpText}>3. To split, tap the gold "SPLIT" button at the bottom of the screen.</Text>
                <Text style={styles.helpText}>4. To unsplit (go back to previous split), press and hold the gold "SPLIT" button.</Text>
                <Text style={styles.helpText}>5. Upon completion of a speedrun, the button at the bottom of the screen will change depending on the 
                outcome of the run.</Text>
                <Text style={styles.example}>If you have beaten your personal best time (or beaten any individual segment times), the button will turn 
                green and display "SAVE".{'\n'}</Text>
                <Text style={[styles.example, {color: 'red'}]}>If you have not beaten any of your current times, the button will turn red and display "RESET".</Text>
                <Text style={styles.helpText}>In either case, tapping the button will reset the timer and allow you to begin a fresh run.{'\n'}</Text>
            </View>
        </ScrollView>
    );
}

const styles = StyleSheet.create({
    container: {
        margin: 5,
        flex:1,
    },
    textContainer: {
        marginLeft: 2,
    },
    helpHeaderText: {
        fontSize: 32,
        fontWeight: '600',
    },
    subHeaderText: {
        fontSize: 24,
        fontWeight: '600',
    },
    helpText: {
        fontSize: 17,
        fontWeight: '300',
        margin: 6,
    },
    splitInstructions: {
        marginLeft: 10,
    },
    example: {
        color: 'darkgreen',
        fontSize: 16,
        marginLeft: 20,
        
    },
    headerButtons: {
        color: 'white',
        fontWeight: 'bold',
        fontSize: 14,
        padding: 10,
    },
});

export default HelpScreen;
