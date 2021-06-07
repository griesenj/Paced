import React, { useEffect, useState } from 'react';
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native'

import Component from 'react';

const Timer = () => {

    const [state, setState] = useState({
        min: 0, 
        sec: 0,
        csec: 0,
    });

    const [active, setActive] = useState(false);
    const [timerInterval, setTimerInterval] = useState(null);

    const updateStateObject = (vals) => {
        setState({
          ...state,
          ...vals,
        });
    };

    // THIS APPROACH WORKS - https://stackoverflow.com/questions/53981593/react-hooks-and-setinterval
    const [counter, setCounter] = useState(0);

    useEffect(() => {
        const timerId = setInterval(() => {
            
            setCounter((count) => count + 1);

            // PLACE INCREMENT TIMER FUNCTION HERE --> Needs to use functional setState
            updateStateObject((csec) => csec + 1);

        }, 1000);

        return () => {
            clearInterval(timerId);
        };
    }, []);

    const incrementTimer = () => {
        if (!active) {
            console.log('TIMER START');
            setTimerInterval(setInterval(() => {
                if (state.csec <= 99) {
                    console.log('<99');
                    updateStateObject({csec: state.csec + 1});
                }
                 else {
                    console.log('else');
                    updateStateObject({csec: 0});
                }    
            }, 100));
            setActive(true);         
        } else {
            console.log('TIMER STOP');
            clearInterval(timerInterval);
            setActive(false);
        }
    }

    const toggleTimer = () => {
        (active) ? setActive(false) : setActive(true);
    }

    function padZeros(number) {
        return (number < 10) ? "0" + number.toString() : number.toString();
    }

    return (
        <View style={styles.container}>
            <View style={styles.timerRow}>
                <Text style={styles.timerText}>
                    {padZeros(state.min)}:{padZeros(state.sec)}.{padZeros(counter)}
                </Text>
            </View>
            <TouchableOpacity style={styles.button}
                onPress={() => {
                    toggleTimer();
                    console.log(active);
                }}
                >
                    <Text style={styles.buttonText}> Start </Text>
                </TouchableOpacity>
        </View>
    )
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: 'black',
        // alignSelf: 'center',
        // justifyContent: 'center',
        // width: "100%",
    },
    button: {
        backgroundColor: 'silver',
        flex: 1,
    },
    timerRow: {
        alignContent: 'center',
        backgroundColor: 'black',
        flex: 1,
    },
    timerText: {
        fontSize: 50,
        fontWeight: 'bold',
        color: 'green',
    },
    buttonText: {
        fontSize: 40,
        justifyContent: 'center',        
    }
});

export default Timer;
