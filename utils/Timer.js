import React, { useEffect, useState } from 'react';
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native'

const Timer = () => {
   
    const [clock, setClock] = useState(0);
    const [startTime, setStartTime] = useState(0);
    const [active, setActive] = useState(false);
    const [paused, setPaused] = useState(false);

    // TODO: Using custom interval improved accuracy (but rapid pausing might be an issue)
    useEffect(() => {
        const interval = setTimerInterval(intervalTick, 100)

        return () => {
            clearTimeout(interval.id);
        };
    }, [paused, active]);

    const intervalTick = () => {        
        if (active && !paused) {
            setClock((count) => count + 1);
        }
    }

    function setTimerInterval(executeFunction, time){
        var priorTime = Date.now();
        var priorDelay = time;
        var output = {};
    
        function tick(){
            executeFunction();
    
            var now = Date.now(),
                deltaTime = now - priorTime;
    
            priorTime = now;
            priorDelay = time + priorDelay - deltaTime;
            output.id = setTimeout(tick, priorDelay);
        }
        output.id = setTimeout(tick, time);
        
        return output;
    }

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

    // TODO: Apply formatting to Date object (elapsed centiseconds) for timer display
    const outputTime = () => {
        const hours = Math.floor(clock / 36000);
        const minutes = padNumber((Math.floor(clock / 600) % 60));
        const seconds = padNumber((Math.floor(clock / 10) % 60).toString());
        const centiseconds = clock.toString().slice(-1);

        return `${hours}:${minutes}:${seconds}.${centiseconds}`;
    }

    const padNumber = (num) => {
        return (num < 10) ? `0${num}` : num;
    }

    return (
        <View style={styles.container}>
            <View style={styles.timerRow}>
                <Text style={styles.timerText}>{clock}</Text>
                <Text style={styles.timerText}>{outputTime()}</Text>
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
        flexDirection: 'column',
        backgroundColor: 'black',
        // alignSelf: 'center',
        // justifyContent: 'center',
        // width: "100%",
    },
    button: {
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: 'silver',
        flex: 1,
        borderWidth: 2,
        borderColor: 'black',
    },
    timerRow: {
        backgroundColor: 'black',
        flex: 3,
    },
    timerText: {
        fontSize: 60,
        fontWeight: 'bold',
        color: 'green',
    },
    buttonText: {
        fontSize: 40,
        textAlign: 'center',
        width: '100%',
    }
});

export default Timer;
