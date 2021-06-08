import { FlatList, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React, { useEffect, useState } from 'react';

import { TouchableHighlight } from 'react-native-gesture-handler';
import { withTheme } from 'react-native-elements';

const TimerScreen = () => {
   
    const [timer, setTimer] = useState(0);
    const [startTime, setStartTime] = useState(0);
    const [active, setActive] = useState(false);
    const [paused, setPaused] = useState(false);

    // TESTING SPLIT MECHANIC
    const [currentSplitValue, setCurrentSplitValue] = useState(0);

    // Need to write setState function that only sets a single value?
    const [data, setData] = useState([
        { splitName: 'Sword', splitBest: 1075, splitActive: 937 },
        { splitName: 'Escape', splitBest: 2376, splitActive: 2000 },
        { splitName: 'Bottle', splitBest: 3795, splitActive: 3175 },
        { splitName: 'Bugs', splitBest: 4580, splitActive: 4270 },
        { splitName: 'Wrong Warp', splitBest: 5987, splitActive: 5980 },
        { splitName: 'Ganon', splitBest: 6702, splitActive: 6570 },
        { splitName: 'Sword2', splitBest: 1075, splitActive: 937 },
        { splitName: 'Escape2', splitBest: 2376, splitActive: 2000 },
        { splitName: 'Bottle2', splitBest: 3795, splitActive: 3175 },
        { splitName: 'Bugs2', splitBest: 4580, splitActive: 4270 },
        { splitName: 'Wrong Warp2', splitBest: 5987, splitActive: 5980 },
        { splitName: 'Ganon2', splitBest: 6702, splitActive: 6570 },
        { splitName: 'Sword3', splitBest: 1075, splitActive: 937 },
        { splitName: 'Escape3', splitBest: 2376, splitActive: 2000 },
        { splitName: 'Bottle3', splitBest: 3795, splitActive: 3175 },
        { splitName: 'Bugs3', splitBest: 4580, splitActive: 4270 },
        { splitName: 'Wrong Warp3', splitBest: 5987, splitActive: 5980 },
        { splitName: 'Ganon3', splitBest: 6702, splitActive: 6570 },
    ]);

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

    const processSplit = () => {
        if (active && !paused) {
            
            var currentTime = timer;
            data[currentSplitValue].splitActive = currentTime;

            console.log(data[currentSplitValue].splitActive);
            
            console.log(currentTime);
            setCurrentSplitValue(currentSplitValue + 1);
        }
    }

    // TODO: Esnure this accounts for negative numbers (not formatting correctly currently)
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
                <View style={{flexDirection: 'row'}}>
                    <Text style={styles.splitNameText}>{item.splitName}</Text>
                    <Text style={styles.splitTimeText}> 
                        {outputTime(item.splitBest)} : {outputTime(item.splitBest - item.splitActive)}
                          :  {currentSplitValue} | {item.splitActive}
                    </Text>
                </View>
            </TouchableHighlight>
        )
    }

    const renderSeparator = () => {
        return (
            <View style={{
                height: 2,
                backgroundColor: "#a9a9a9",
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

                <TouchableOpacity style={{backgroundColor: 'gray', flex: 1, alignItems: 'center'}}
                    onPress={() => {processSplit()}}
                >
                    <Text style={styles.splitButtonText}>Split</Text>
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
    splitNameText: {
        fontSize: 25,
        fontWeight: 'bold',
        color: 'white',
        padding: 10,
    },
    splitTimeText: {
        fontSize: 16,
        fontWeight: 'bold',
        color: 'white',
        alignSelf: 'flex-end',
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
        backgroundColor: 'white',
    },
    splitButtonText: {
        fontSize: 30,
        color: 'white',

        flexDirection: 'row',
    }
});

export default TimerScreen;
