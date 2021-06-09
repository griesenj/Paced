import { FlatList, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React, { useEffect, useState } from 'react';

import { TouchableHighlight } from 'react-native-gesture-handler';

const TimerScreen = () => {
   
    const [timer, setTimer] = useState(0);
    const [active, setActive] = useState(false);
    const [paused, setPaused] = useState(false);
    const [completed, setCompleted] = useState(false);
    const [splitPosition, setSplitPosition] = useState(0);

    // TODO: Need to write setState function that only sets a single value
    const [data, setData] = useState([
        { name: 'Sword', goldSeg: 0, pbSeg: 50, pbTotal: 0, runSeg: 0, runTotal: 0},
        { name: 'Escape', goldSeg: 0, pbSeg: 100, pbTotal: 0, runSeg: 0, runTotal: 0},
        { name: 'Bottle', goldSeg: 0, pbSeg: 150, pbTotal :0, runSeg: 0, runTotal: 0},
        { name: 'Bugs', goldSeg: 0, pbSeg: 200, pbTotal: 0, runSeg: 0, runTotal: 0},
        { name: 'Deku', goldSeg: 0, pbSeg: 250, pbTotal: 0, runSeg: 0, runTotal: 0},
        { name: 'Collapse', goldSeg: 0, pbSeg: 250, pbTotal: 0, runSeg: 0, runTotal: 0},
        { name: 'Ganon', goldSeg: 0, pbSeg: 300, pbTotal: 0, runSeg: 0, runTotal: 0 },
    ]);

    // TODO: Temporary local data store for golds / PB? Push to firebase after user affirmation
    const [tempData, setTempData] = useState([]);

    // TODO: This is successfully updating the data, but now the flatlist won't rerender. How to deal
    // with this given the component is functional? (nothing to pass into Flatlist 'extradata' attribute)
    const updateDataObject = (splitName, targetAttribute) => {
        const updatedData = data.map(item => {
            if (item.name == splitName) {
                theKey = Object.keys(targetAttribute)[0];
                theValue = Object.values(targetAttribute)[0];
                return {...item, theKey: theValue};
            }
            return item;
        })
        setData(updatedData);
    }


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
            
            // TODO: - This needs to be swapped out with a "setState" approach - bad practice
            // data[splitPosition].runTotal = timer;

            // TESTING SETSTATE APPROACH
            targetSplit = data[splitPosition].name;
            updateDataObject(targetSplit, {runTotal: timer});









            
            setSplitPosition(splitPosition + 1);

            if (splitPosition == data.length - 1) {
                setActive(false);
            }
        } else {
            console.log("Cannot split - speedrun completed");
        }
    }

    // TODO: Ensure this accounts for negative numbers (not formatting correctly currently)
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

    useEffect(() => {

    }, [data]);
    const renderSplit = ({item}) => {
        return (
            <TouchableHighlight
                activeOpacity={1.0}
                underlayColor={"#ffefd5"}
            >
                <View style={{flexDirection: 'row'}}>
                    <Text style={styles.splitNameText}>{item.name}</Text>
                    <Text style={styles.splitTimeText}> 
                        Gold | Seg: {outputTime(item.goldSeg)}{'\n'}
                        PB | Seg: {outputTime(item.pbSeg)} : Total: {outputTime(item.pbTotal)}{'\n'}
                        Active | Seg: {outputTime(item.runSeg)} : Total: {outputTime(item.runTotal)}
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

    // CONDITIONAL RENDERING: https://reactjs.org/docs/conditional-rendering.html

    return (
        <View style={styles.container}>

            <View style={styles.splitsContainer}>
                <FlatList
                    ItemSeparatorComponent={renderSeparator}
                    keyExtractor={(item) => item.name}
                    data={data}
                    // extraData={data}
                    renderItem={renderSplit}
                />
            </View>

            <View style={styles.timerContainer}>
                <TouchableOpacity style={{backgroundColor: 'red'}}
                    onPress={() => {toggleTimer()}}
                    onLongPress={() => {resetTimer()}}
                >
                    <Text style={styles.timerText}>{outputTime(timer)}</Text>
                </TouchableOpacity>

                <TouchableOpacity style={{backgroundColor: '#a67c00', flex: 1, alignItems: 'center'}}
                    onPress={() => {
                        processSplit();
                        console.log(data);
                    }}
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
        fontSize: 20,
        fontWeight: 'bold',
        color: 'white',
        padding: 20,
    },
    splitTimeText: {
        fontSize: 14,
        fontWeight: 'bold',
        color: 'white',
        alignSelf: 'flex-end',
    },
    timerContainer: {
        flex: 1,
        backgroundColor: 'black',
        borderTopColor: 'white',
        borderTopWidth: 1,
    },
    timerText: {
        fontSize: 80,
        fontWeight: 'bold',
        color: '#149414',
        backgroundColor: '#242424',
    },
    splitButtonText: {
        fontSize: 40,
        fontWeight: 'bold',
        color: 'black',
        flexDirection: 'row',
    }
});

export default TimerScreen;
