import { FlatList, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React, { useEffect, useState } from 'react';

import { TouchableHighlight } from 'react-native-gesture-handler';
import { withTheme } from 'react-native-elements';

const TimerScreen = () => {
   
    const [timer, setTimer] = useState(0);
    const [startTime, setStartTime] = useState(0);
    const [active, setActive] = useState(false);
    const [paused, setPaused] = useState(false);

    const data = [
        { splitName: 'Sword', splitBest: 1075, activeSplit: null },
        { splitName: 'Escape', splitBest: 2376, activeSplit: null },
        { splitName: 'Bottle', splitBest: 3795, activeSplit: null },
        { splitName: 'Bugs', splitBest: 4580, activeSplit: null },
        { splitName: 'Wrong Warp', splitBest: 5987, activeSplit: null },
        { splitName: 'Ganon', splitBest: 6702, activeSplit: null },
    ];

    // TODO: Using custom interval improved accuracy (but rapid pausing might be an issue)
    useEffect(() => {
        const interval = getTimerInterval(onIntervalTick, 100);

        return () => {
            clearTimeout(interval.id);
        };
    }, [paused, active]);

    function getTimerInterval(executeFunction, time){
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

    const onIntervalTick = () => {        
        if (active && !paused) {
            setTimer((count) => count + 1);
        }
    }

    const toggleTimer = () => {
        if (active) {
            (paused) ? setPaused(false) : setPaused(true);
        } else {
            setActive(true);
        };
    }

    const resetTimer = () => {
        setTimer(0);
        setActive(false);
        setPaused(false);
    }

    const outputTime = (time) => {
        const hours = Math.floor(time / 36000);
        const minutes = Math.floor(time / 600) % 60;
        const seconds = Math.floor(time / 10) % 60;
        const centiseconds = parseInt(time.toString().slice(-1));

        if (hours == 0 && minutes == 0) {
            return `${seconds}.${centiseconds}`;
        } else if (hours == 0) {
            return `${minutes}:${padNumber(seconds)}.${centiseconds}`;
        }
        return `${hours}:${padNumber(minutes)}:${padNumber(seconds)}.${centiseconds}`;
    }

    const padNumber = (num) => {
        return (num < 10) ? `0${num}` : num;
    }

    const renderSplit = ({item}) => {
        return (

            <TouchableHighlight
            activeOpacity={1.0}
            underlayColor={"#ffefd5"}
            >
                <View>
                    <Text style={styles.splitText}> {item.splitName} : {outputTime(item.splitBest)} </Text>
                </View>


            </TouchableHighlight>


        )
    }

    const renderSeparator = () => {
        return (
            <View style={{
                height: 2,
                backgroundColor: "#a9a9a9",
                // width: "98%",
                // marginLeft: "1%",
            }}/>
        );
    }

    return (
        <View style={styles.container}>
            <View style={styles.splitsContainer}>


                <FlatList
                    ItemSeparatorComponent={renderSeparator}
                    keyExtractor={(item) => item.id}
                    data={data}
                    renderItem={renderSplit}
                />

            </View>

            <View style={styles.timerContainer}>
                <TouchableOpacity
                    onPress={() => {toggleTimer()}}
                    onLongPress={() => {resetTimer()}}
                >
                    <Text style={styles.timerText}>{outputTime(timer)}</Text>
                </TouchableOpacity>

            </View>

        </View>
    )
};

const styles = StyleSheet.create({
    container: {
        justifyContent: 'flex-start',
        flexDirection: 'column',
        alignItems: 'stretch',
        flex: 1,
        backgroundColor: 'pink',
    },
    splitsContainer: {
        flex: 3,
        backgroundColor: '#111112',
    },
    splitRow: {
    },
    splitText: {
        fontSize: 25,
        fontWeight: 'bold',
        color: 'white',
        padding: 10,
    },
    timerContainer: {
        flex: 1,
        backgroundColor: 'black',
        borderTopColor: '#a9a9a9',
        borderTopWidth: 2,
    },
    timerText: {
        fontSize: 80,
        fontWeight: 'bold',
        color: 'green',
    },
});

export default TimerScreen;
