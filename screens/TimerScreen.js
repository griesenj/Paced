import { FlatList, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React, { useEffect, useState } from 'react';

import { TouchableHighlight } from 'react-native-gesture-handler';
import { locateIndex } from '../helpers/finders';
import { storeDataItem } from '../helpers/fb-paced';

// TODO: If time allows, determine how to unsplit after ending the run?
// Would probably need to leave timer running and log finish time as a new state
// FIXME: Need way to prevent timer from starting if splits are empty **************
// FIXME: Determine how to handle "no prior run" data for displaying times (init w/ null value?)

const TimerScreen = ({ route, navigation }) => {
   
    const { receivedCurrentGame, receivedCurrentCategory, receivedPacedData } = route.params;
    const [currentGame] = useState(receivedCurrentGame);
    const [currentCategory] = useState(receivedCurrentCategory);
    const [timerPacedData, setTimerPacedData] = useState(receivedPacedData);

    const [timer, setTimer] = useState(0);
    const [active, setActive] = useState(false);
    const [paused, setPaused] = useState(false);
    const [completed, setCompleted] = useState(false);
    const [splitPosition, setSplitPosition] = useState(0);
    const [differentials, setDifferentials] = useState([]);
    const [goldChecks, setGoldChecks] = useState([]);

    const getSplitsFromPacedData = () => {
        var receivedDataCopy = JSON.parse(JSON.stringify(timerPacedData));
        var categoryArray = receivedDataCopy[locateIndex(receivedDataCopy, 'title', currentGame)].category;
        return categoryArray[locateIndex(categoryArray, 'run', currentCategory)].splits;
    };
    
    const [data, setData] = useState(getSplitsFromPacedData());

    const updateDataOnSplit = (index, currentRunAttributes) => {
        const updatedData = data.map(item => {
            if (index == data.indexOf(item)) {
                segKey = Object.keys(currentRunAttributes)[0];
                segValue = Object.values(currentRunAttributes)[0];
                totalKey = Object.keys(currentRunAttributes)[1];
                totalValue = Object.values(currentRunAttributes)[1];
                return {...item, [segKey]: segValue, [totalKey]: totalValue};
            }
            return item;
        });    
        setData(updatedData);
    };

    // FIXME: TESTING RESET OF RUN DATA TO ZERO UPON SAVE
    const updateDataOnSave = () => {
        const isPb = data[splitPosition - 1].runTotal < data[splitPosition - 1].pbTotal;
        const beatGolds = goldChecks.includes(true);
        var saveData = [];

        if (isPb) {
            saveData = data.map(item => {
                if (item.runSeg < item.goldSeg) {
                    return {...item, goldSeg: item.runSeg, pbSeg: item.runSeg, pbTotal: item.runTotal}
                }
                return {...item, pbSeg: item.runSeg, pbTotal: item.runTotal}
            })
        } else if (beatGolds) {
            saveData = data.map(item => {
                if (item.runSeg < item.goldSeg) {
                    return {...item, goldSeg: item.runSeg};
                }
                return {...item};
            })
        } else {
            saveData = data;
        }

        // TODO: TESTING ONLY
        updateTimerPacedData(saveData);
        setData(saveData);
        resetTimer();
    };

    // TODO: Make sure this works properly - adds saved splits to paced object passed between
    const updateTimerPacedData = (savedData) => {
        var pacedCopy = JSON.parse(JSON.stringify(timerPacedData));
        var gameIndex = locateIndex(pacedCopy, 'title', currentGame);
        var categoryIndex = locateIndex(pacedCopy[gameIndex].category, 'run', currentCategory);

        pacedCopy[gameIndex].category[categoryIndex].splits = savedData;
        setTimerPacedData(pacedCopy);
        storeDataItem(pacedCopy);
    };

    const updateDifferentialsOnSplit = (differential) => {
        updatedDifferentials = differentials.map((item) => (item));
        updatedDifferentials.push(differential);
        setDifferentials(updatedDifferentials)
    };

    const updateDifferentialsOnUnsplit = () => {
        updatedDifferentials = differentials.map((item) => (item));
        updatedDifferentials.pop();
        setDifferentials(updatedDifferentials);
    };

    const clearDifferentials = () => {
        setDifferentials([]);
    };

    const updateGoldChecksOnSplit = () => {
        updatedGoldChecks = goldChecks.map((item) => (item));
        updatedGoldChecks.push(isGoldSplit());
        setGoldChecks(updatedGoldChecks);
    };

    const updateGoldChecksOnUnsplit = () => {
        updatedGoldChecks = goldChecks.map((item) => (item));
        updatedGoldChecks.pop();
        setGoldChecks(updatedGoldChecks);
    }

    const clearGoldChecks = () => {
        setGoldChecks([]);
    };

    useEffect(() => {
        const interval = getTimerInterval(onIntervalTick, 100);
        return () => {
            clearTimeout(interval.id);
        };
    }, [paused, active]);

    const getTimerInterval = (executeFunction, time) => {
        var priorTime = Date.now();
        var priorDelay = time;
        var output = {};
    
        const tick = () => {
            executeFunction();
    
            var now = Date.now();
            var deltaTime = now - priorTime;
    
            priorTime = now;
            priorDelay = time + priorDelay - deltaTime;
            output.id = setTimeout(tick, priorDelay);
        }
        output.id = setTimeout(tick, time);      
        return output;
    };

    const onIntervalTick = () => {        
        if (active && !paused) {
            setTimer((count) => count + 1);
        }
    };

    const toggleTimer = () => {
        if (active) {
            (paused) ? setPaused(false) : setPaused(true);
        } else {
            if (!completed) {
                setActive(true);
            }
        };
    };

    // TODO: If reset pressed, reinitialize splits data object from firebase (current run zeroed out)
    const resetTimer = () => {
        setTimer(0);
        setActive(false);
        setPaused(false);
        setCompleted(false);
        setSplitPosition(0);
        clearDifferentials();
        clearGoldChecks();
    };

    const processSplit = () => {
        if (active && !paused) {
            updateDataOnSplit(splitPosition, {runTotal: timer, runSeg: getSegmentTime()})
            updateDifferentialsOnSplit(getDifferential());
            updateGoldChecksOnSplit();
            setSplitPosition(splitPosition + 1);

            if (splitPosition == data.length - 1) {
                setActive(false);
                setCompleted(true);
            }
        } else {
            console.log("Cannot split - speedrun completed (or timer paused)");
        }
    };

    const processUnSplit = () => {
        if (active && !paused && splitPosition > 0) {
            updateDataOnSplit(splitPosition - 1, {runTotal: 0, runSeg: 0});
            setSplitPosition(splitPosition - 1);
            updateDifferentialsOnUnsplit();
            updateGoldChecksOnUnsplit();
        } else {
            console.log("Cannot unsplit - no prior splits processed");
        }
    }

    const getSegmentTime = () => {
        // Subtract prior split runTotal value from timer (current time) to get segment time.
        if (splitPosition > 0) {
            return timer - data[splitPosition - 1].runTotal;
        }
        return timer;
    };

    const outputTime = (time) => {
        var hours, minutes, seconds, centiseconds = 0;

        if (time < 0) {
            hours = Math.abs(Math.ceil(time / 36000));
            minutes = Math.abs(Math.ceil(time / 600) % 60);
            seconds = Math.abs(Math.ceil(time / 10) % 60);
            centiseconds = parseInt(time.toString().slice(-1));
        } else {
            hours = Math.floor(time / 36000);
            minutes = Math.floor(time / 600) % 60;
            seconds = Math.floor(time / 10) % 60;
            centiseconds = parseInt(time.toString().slice(-1));
        }

        if (hours == 0 && minutes == 0) {
            return (time < 0) ? `-${seconds}.${centiseconds}` : 
            `${seconds}.${centiseconds}`;
        } else if (hours == 0) {
            return (time < 0) ? `-${minutes}:${padNumber(seconds)}.${centiseconds}` : 
            `${minutes}:${padNumber(seconds)}.${centiseconds}`;
        } else {
            return (time < 0) ? `${hours}:${padNumber(minutes)}:${padNumber(seconds)}.${centiseconds}` : 
            `${hours}:${padNumber(minutes)}:${padNumber(seconds)}.${centiseconds}`;
        }
    };

    const padNumber = (num) => {
        return (num < 10) ? `0${num}` : num;
    };

    const getDifferential = () => {
        if (splitPosition < data.length) {
            return timer - data[splitPosition].pbTotal;
        }
        return 0;
    };

    const isGoldSplit = () => {
        const goldDifferential = getSegmentTime() - data[splitPosition].goldSeg;
        return (goldDifferential < 0) ? true : false;
    }

    const isPersonalBest = () => {
        return timer < data[data.length - 1].pbTotal;
    }

    function ViewDifferential(props) {
        const currentIndex = props.currentIndex;
        if (currentIndex < splitPosition) {
            if (differentials[currentIndex] < 0) {
                return (
                    <Text style={[styles.differentialText, goldChecks[currentIndex] ? 
                        {color: 'gold'} : {color: 'green'}]}>{outputTime(differentials[currentIndex])
                    }</Text>
                );
            } else {
                return (
                    <Text style={[styles.differentialText, goldChecks[currentIndex] ? 
                        {color: 'gold'} : {color: 'red'}]}>+{outputTime(differentials[currentIndex])
                    }</Text>
                );
            }
        } else if (currentIndex == splitPosition) {
            if (getDifferential() < 0) {
                return (
                    <Text style={[styles.differentialText, {color: 'green'}]}>{
                        outputTime(getDifferential())
                    }</Text>
                );
            } else {
                return (
                    <Text style={[styles.differentialText, {color: 'red'}]}>+{
                        outputTime(getDifferential())
                    }</Text>
                );
            }
        } else {
            return (
                <Text style={styles.differentialText}> </Text>
            )
        }
    };

    function TextBottomButton() {
        if (completed) {
            if (isPersonalBest() || goldChecks.includes(true)) {
                return <Text style={styles.saveButtonText}>SAVE</Text>
            } else {
                return <Text style={styles.resetButtonText}>RESET</Text>
            }
        }
        return <Text style={styles.saveButtonText}>SPLIT</Text>
    }

    const pressBottomButton =() => {
        if (completed) {
            if (isPersonalBest() || goldChecks.includes(true)) {
                updateDataOnSave();
            }
            resetTimer();
        }
        processSplit();
    };

    const longPressBottomButton =() => {
        processUnSplit();
    };

    const renderSplit = ({item}) => {
        // FIXME: Testing display of empty array init value
        if (item != 'empty') {
            return (
                <TouchableHighlight
                    activeOpacity={1.0}
                    underlayColor={"#ffefd5"}
                    
                    //FIXME: TESTING REMOVE LATER
                    onPress={() => {
                        console.log("TIMERpacedData: ", timerPacedData);
                    }}
                >
                    <View style={styles.splitRow}>
                        <View style={styles.splitLeft}>
                            <Text style={styles.splitNameText}>{item.split}</Text>
                            <Text style={styles.splitTimeText}> 
                                PB | Seg: {outputTime(item.pbSeg)} : Total: {outputTime(item.pbTotal)}
                            </Text>
                            <Text style={styles.splitTimeText}> 
                                Run | Seg: {outputTime(item.runSeg)} : Total: {outputTime(item.runTotal)}
                            </Text>
                        </View>
                        <View style={styles.splitRight}>
                            <ViewDifferential currentIndex={data.indexOf(item)}/>
                        </View>
                    </View>
                </TouchableHighlight>
            )
        }
        return (
            <View style={{alignItems: 'center', marginTop: 20}}>
                <Text style={styles.splitNameText}>No existing splits!</Text>
                <Text style={styles.splitTimeText}>Fix via the "Add / Edit" menu option.</Text>
            </View>
        )
    };

    const renderSeparator = () => {
        return (
            <View style={{
                height: 2,
                backgroundColor: "#a9a9a9",
            }}/>
        );
    };

    // TODO: When timer is active, should NOT be able to exit screen (hide back/edit buttons)
    // Can watch active flag and update whenever that changes (add rending logic for touchableOpacity)

    // NOTE: Added dependency array here to ensure it only runs a single time (timer performance hit)
    useEffect(() => {
        navigation.setOptions({
            headerLeft: () => (
                <TouchableOpacity
                    onPress={() => {navigation.navigate('Categories', { timerPacedData })}}
                >
                    <Text style={styles.navHeaderButtons}> Back </Text>
                </TouchableOpacity>
            ),
            headerRight: () => (
                <TouchableOpacity
                onPress={() => {navigation.navigate('Timer Settings', { 
                    settingsCurrentGame: currentGame,
                    settingsCurrentCategory: currentCategory
                })}}
                >
                <Text style={styles.navHeaderButtons}> Add / Edit </Text>
                </TouchableOpacity> 
            ),
            headerTitle: () => (
                <View>
                    <Text style={styles.navHeaderTitle} numberOfLines={1}>{currentCategory}</Text>
                </View>
            ),
        });
    }, []);

    return (
        <View style={styles.container}>

            <View style={styles.splitsContainer}>
                <FlatList
                    ItemSeparatorComponent={renderSeparator}
                    keyExtractor={(item) => item.split}
                    data={data}
                    extraData={data}
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

                <TouchableOpacity style={[(!completed) ? styles.splitButton : 
                    (isPersonalBest() || goldChecks.includes(true)) ? 
                    styles.saveButton : styles.resetButton]}
                    onPress={() => {pressBottomButton()}}
                    onLongPress={() => {longPressBottomButton()}}
                >
                    <TextBottomButton/>
                </TouchableOpacity>
                
            </View>
            
        </View>
    );
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
        flexDirection: 'row',
        justifyContent: 'flex-start',
    },
    splitLeft: {
        flexDirection: 'column',
        flex: 5,
    },
    splitRight: {
        justifyContent: 'center',
        flex: 2,
    },
    splitNameText: {
        fontSize: 24,
        fontWeight: 'bold',
        color: 'white',
        padding: 2,
    },
    splitTimeText: {
        fontSize: 14,
        color: 'white',
        // marginLeft: 5,
        padding: 3,
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
        color: '#76b1e3',
        backgroundColor: '#242424',
    },
    splitButton: {
        backgroundColor: '#a67c00',
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
    },

    // TODO: Consolidate duplicative styles for reuse
    
    splitButtonText: {
        fontSize: 40,
        fontWeight: 'bold',
        color: 'black',
        flexDirection: 'row',
        marginBottom: 10,
    },
    saveButton: {
        backgroundColor: 'darkgreen',
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
    },
    saveButtonText: {
        fontSize: 40,
        fontWeight: 'bold',
        color: 'white',
        flexDirection: 'row',
        marginBottom: 10,
    },
    resetButton: {
        backgroundColor: 'darkred',
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
    },
    resetButtonText: {
        fontSize: 40,
        fontWeight: 'bold',
        color: 'white',
        flexDirection: 'row',
        marginBottom: 10,
    },
    differentialText: {
        color: 'white',
        fontSize: 26,
        fontWeight: 'bold',
    }, 
    navHeaderTitle: {
        color: 'white',
        fontWeight: 'bold',
        fontSize: 17,
    },
    navHeaderButtons: {
        color: 'white',
        fontWeight: 'bold',
        fontSize: 14,
        padding: 10,
    },
});

export default TimerScreen;
