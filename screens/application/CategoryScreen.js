import { FlatList, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React, { useEffect, useState } from 'react';
import { addCategory, editCategory, removeCategory } from '../../helpers/modifiers';

import { Image } from 'react-native-elements';
import { categoryComparator } from '../../helpers/comparators';
import { initLocalData } from '../../helpers/fb-paced';
import { locateIndex } from '../../helpers/finders';

const CategoryScreen = ({ route, navigation }) => {

    const { receivedPacedData, receivedCurrentGame, user } = route.params;
    const [categoryPacedData, setCategoryPacedData] = useState(receivedPacedData);
    const [currentGame] = useState(receivedCurrentGame);

    useEffect(() => {
        console.log('Initialized user data on Category Screen');
        console.log('User ID from gameScreen:', user);
        initLocalData(user, setCategoryPacedData);
    }, []);

    useEffect(() => {
        if (route.params?.editOrDelete == false) {
            if (route.params.runTitle != "") {
                addCategory(user, route.params.runTitle, currentGame, categoryPacedData);
            }
        }
        if (route.params?.editOrDelete == true) {
            if (route.params?.runTitle != "") {
                editCategory(user, route.params.runTitle, route.params.receivedItemToUpdate, currentGame, categoryPacedData);
            } else {
                removeCategory(user, route.params.receivedItemToUpdate, currentGame, categoryPacedData);
            }
        }
    }, [route.params?.runTitle, route.params?.editOrDelete, route.params?.receivedItemToUpdate]);

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
                    onPress={() => {navigation.navigate('Category Settings')}}
                >
                <Text style={styles.headerButtons}> Add / Edit </Text>
                </TouchableOpacity> 
            ),
        });
    });

    const renderCategories = ({item}) => {
        if (item != 'empty') {
            return (    
                <TouchableOpacity
                    onPress={() => {    
                        navigation.navigate('Timer', { 
                            receivedPacedData: categoryPacedData, receivedCurrentGame: currentGame, 
                            receivedCurrentCategory: item.run, user: user,
                        });
                    }}
                    onLongPress={() => {

                        console.log('CurrentGame: ', currentGame);

                        navigation.navigate('Category Settings', {
                            item,
                        });
                    }}
                >
                    <View style={styles.categoryRow}>
                        <Image 
                            style={styles.imagePlaceholder}
                            source={{uri: categoryPacedData[locateIndex(categoryPacedData, 'title', currentGame)].imageUrl}}
                            resizeMode={'contain'}
                            />
                        <Text style={styles.categoryText}>{item.run}</Text>
                    </View>
                </TouchableOpacity>
            )
        }
        return (
            <View style={{alignItems: 'center', marginTop: 20}}>
                <Text style={{fontSize: 20, fontWeight: 'bold'}}>No existing categories!</Text>
                <Text style={{fontSize: 16}}>Fix via the "Add / Edit" menu option.</Text>
            </View>
        )
    };
    
    const renderSeparator = () => {
        return (
            <View style={{
                height: 2,
                backgroundColor: "black",
            }}/>
        );
    };

    return (
            <View style={styles.container}>
                <View style={styles.categoryListContainer}>
                    <FlatList
                        ItemSeparatorComponent={renderSeparator}
                        keyExtractor={(item) => item.run}
                        data={categoryPacedData[locateIndex(categoryPacedData, 'title', currentGame)].category.sort(categoryComparator)}
                        extraData={categoryPacedData[locateIndex(categoryPacedData, 'title', currentGame)].category.sort(categoryComparator)}
                        renderItem={renderCategories}
                    />
                </View>
            </View>
    )
}

const styles = StyleSheet.create({
    container: {
        justifyContent: 'flex-start',
        flexDirection: 'column',
        alignItems: 'stretch',
        flex: 1,
    },
    categoryListContainer: {
        height: 100,
        flex: 1,
    },
    categoryRow: {
        flexDirection: 'row',
        flex: 1,
        alignItems: 'center',
        padding: 5,
    },
    categoryText: {
        fontSize: 20,
        fontWeight: 'bold',
        marginLeft: 5,
        flex: 1,
    },
    headerButtons: {
        color: 'white',
        fontWeight: 'bold',
        fontSize: 14,
        padding: 10,
    },
    imagePlaceholder: {
        height: 75,
        width: 100,
    },
});

export default CategoryScreen;
