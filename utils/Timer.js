import React, { useEffect, useState } from 'react';
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native'

const Timer = () => {
   
    const [clock, setClock] = useState(0);
    const [active, setActive] = useState(false);
    const [paused, setPaused] = useState(false);

    // TODO: Iterative counting via setInterval is not accurate - need to figure out how to use Date.now();
    useEffect(() => {
        const timerId = setInterval(() => {
            if (active && !paused) {
                setClock((count) => count + 1);
            }
        }, 10);

        return () => {
            clearInterval(timerId);
        };
    }, [active, paused]);

    const toggleTimer = () => {
        if (active) {
            (paused) ? setPaused(false) : setPaused(true);
        } else {
            setActive(true);
        };
    }

    const resetTimer = () => {
        setClock(0);
        setActive(false);
        setPaused(false);
    }

    const getStartTime = () => {
        return Date.now();
    }

    // TODO: Apply formatting to Date object (elapsed milliseconds) for timer display
    const outputTime = () => {
        const hours = 0;
        const minutes = 0;
        const seconds = 0;
        const centiseconds = 0;

        return `${hours}:${minutes}:${seconds}.${centiseconds}`;
    }

    return (
        <View style={styles.container}>
            <View style={styles.timerRow}>
                <Text style={styles.timerText}> {clock} </Text>
                <Text style={styles.timerText}>{outputTime()}</Text>
                <Text style={styles.timerText}>{getStartTime()}</Text>
            </View>
            
            <TouchableOpacity style={styles.button} 
                onPress={() => {toggleTimer()}}
            >
                <Text style={styles.buttonText}> Toggle Timer </Text>
            </TouchableOpacity>
            
            <TouchableOpacity style={styles.button}
                onPress={() => {
                    resetTimer();
                }}
                >
                    <Text style={styles.buttonText}> Reset Timer </Text>
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
        borderWidth: 2,
    },
    timerRow: {
        alignContent: 'center',
        backgroundColor: 'black',
        flex: 1,
    },
    timerText: {
        fontSize: 40,
        fontWeight: 'bold',
        color: 'green',
    },
    buttonText: {
        fontSize: 40,
        justifyContent: 'center',        
    }
});

export default Timer;
