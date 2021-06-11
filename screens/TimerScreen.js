import { FlatList, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React, { useEffect, useLayoutEffect, useState } from 'react';

import { TouchableHighlight } from 'react-native-gesture-handler';

const TimerScreen = ({ route, navigation }) => {
   
    const [timer, setTimer] = useState(0);
    const [active, setActive] = useState(false);
    const [paused, setPaused] = useState(false);
    const [completed, setCompleted] = useState(false);
    const [splitPosition, setSplitPosition] = useState(0);
    const [compareAgainst, setCompareAgainst] = useState('PB');

    const [differentials, setDifferentials] = useState([]);

    // TODO: Route params from settings screen?
    // TODO: When timer is active, should NOT be able to go back to category screen (hide back button)

    // TODO: Data accessor planning
    // 1. Category screen pulls game data from game screen
    // 2. Timer screen pulls game and category data from category screen
    // 3. Timer screen uses this info to determine what split data to pull from firebase

    // TODO: Timer logic planning
    // Can run against PB or SUM OF BEST depending on selected option in TIMERSETTINGS menu
    // runTotal and runSeg will always initialize with values of zero (updated throughout run)
    // pbTotal and pbSeg will reconcile with eachother (pbSeg BASED OFF OF pbTotal)

    // at end of speedrun, pbTotal of final split is compared to runTotal of final split
    // --> If runTotal < pbTotal : NEW PB; SAVE? If so, update any gold splits as well
    // --> If runSeg < goldSeg for ANY split : YOU HAVE BEATEN SOME PRIOR BEST SPLITS; SAVE?

    //FIXME: Attributes to consider adding (imageId, goldTotal)
    const [data, setData] = useState([
        { name: 'Sword', goldSeg: 50, pbSeg: 50, pbTotal: 50, runSeg: 0, runTotal: 0},
        { name: 'Escape', goldSeg: 100, pbSeg: 100, pbTotal: 150, runSeg: 0, runTotal: 0},
        { name: 'Bottle', goldSeg: 150, pbSeg: 150, pbTotal: 300, runSeg: 0, runTotal: 0},
        { name: 'Bugs', goldSeg: 200, pbSeg: 200, pbTotal: 500, runSeg: 0, runTotal: 0},
        { name: 'Deku', goldSeg: 250, pbSeg: 250, pbTotal: 750, runSeg: 0, runTotal: 0},
        { name: 'Collapse', goldSeg: 250, pbSeg: 250, pbTotal: 1000, runSeg: 0, runTotal: 0},
        { name: 'Ganon', goldSeg: 300, pbSeg: 300, pbTotal: 1300, runSeg: 0, runTotal: 0 },
    ]);

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

    // TODO: Add method that accounts for logic of updating split data on PB at end of run.
    // --> Iterate through entire dataset & update any gold segments / pbSeg & pbTotal
    const updateDataOnSave = () => {
    };

    const updateDifferentialsOnSplit = (differential) => {
        updatedDifferentials = differentials.map((item) => (item));
        updatedDifferentials.push(differential);
        setDifferentials(updatedDifferentials)
    }

    const updateDifferentialsOnUnsplit = () => {
        updatedDifferentials = differentials.map((item) => (item));
        updatedDifferentials.pop();
        setDifferentials(updatedDifferentials);
    }

    const clearDifferentials = () => {
        setDifferentials([]);
    }

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
    };

    const processSplit = () => {
        if (active && !paused) {
            updateDataOnSplit(splitPosition, {runTotal: timer, runSeg: getSegmentTime()})
            updateDifferentialsOnSplit(getDifferential());
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

    // FIXME: How to handle "goldTotal"? Doesn't currently exist, would be a pain to iterate each time.
    const getDifferential = () => {
        if (compareAgainst == 'PB') {
            if (splitPosition < data.length) {
                return timer - data[splitPosition].pbTotal;
            }
            return 0;
        } else {
            if (splitPosition < data.length) {
                return timer - data[splitPosition].goldTotal;
            }
            return 0;
        }
    };

    // TODO: Add logic here for for gold splits (compare goldSeg to runSeg)
    function ViewDifferential(props) {
        const currentIndex = props.currentIndex;
        if (currentIndex < splitPosition) {
            if (differentials[currentIndex] < 0) {
                return (
                    <Text style={[styles.differentialText, {color: 'green'}]}>{
                        outputTime(differentials[currentIndex])
                    }</Text>
                );
            } else {
                return (
                    <Text style={[styles.differentialText, {color: 'red'}]}>+{
                        outputTime(differentials[currentIndex])
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

    const renderSplit = ({item}) => {
        return (
            <TouchableHighlight
                activeOpacity={1.0}
                underlayColor={"#ffefd5"}
            >
                <View style={styles.splitRow}>
                    <View style={styles.splitLeft}>
                        <Text style={styles.splitNameText}>{item.name}</Text>
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
    };

    const renderSeparator = () => {
        return (
            <View style={{
                height: 2,
                backgroundColor: "#a9a9a9",
            }}/>
        );
    };


    // TODO: NAVIGATION SETUP HERE
    useEffect(() => {
        navigation.setOptions({
            headerLeft: () => (
                <TouchableOpacity
                    onPress={() => {navigation.navigate('Category')}}
                >
                    <Text style={styles.navHeaderButtons}> Back </Text>
                </TouchableOpacity>
            ),
            headerRight: () => (
                <TouchableOpacity
                onPress={() => {navigation.navigate('TimerSettings')}}
                >
                <Text style={styles.navHeaderButtons}> Edit </Text>
                </TouchableOpacity> 
            ),
        });
    }, []);

    return (
        <View style={styles.container}>

            <View style={styles.splitsContainer}>
                <FlatList
                    ItemSeparatorComponent={renderSeparator}
                    keyExtractor={(item) => item.name}
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

                <TouchableOpacity style={styles.splitButton}
                    onPress={() => {                       
                        processSplit();
                    }}
                    onLongPress={() => {
                        processUnSplit();
                    }}
                >
                    <Text style={styles.splitButtonText}>SPLIT</Text>
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
    splitButtonText: {
        fontSize: 40,
        fontWeight: 'bold',
        color: 'black',
        flexDirection: 'row',
        marginBottom: 10,
    },
    differentialText: {
        color: 'white',
        fontSize: 26,
        fontWeight: 'bold',
    }, 
    navHeaderButtons: {
        color: 'white',
        fontWeight: 'bold',
        fontSize: 14,
        padding: 10,
    },
});

export default TimerScreen;
