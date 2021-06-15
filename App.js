import { StyleSheet, Text, View } from 'react-native';

import CategoryScreen from './screens/CategoryScreen';
import CategorySettings from './screens/CategorySettings';
import GameScreen from './screens/GameScreen';
import GameSettings from './screens/GameSettings';
import { NavigationContainer } from '@react-navigation/native';
import Preferences from './screens/Preferences';
import React from 'react';
import TimerScreen from './screens/TimerScreen';
import { createStackNavigator } from '@react-navigation/stack';

export default function App() {

  const Stack = createStackNavigator();

  return (
    <NavigationContainer>
      <Stack.Navigator screenOptions={navigatorOptions}>
        {/* GAME SCREEN (instructions / preferences [left] - gameSettings [right])
                PREFERENCES
        GAMESETTINGSSCREEN
        CATEGORY SCREEN (back [left] - categorySettings [right])
        CATEGORYSETTINGSSCREEN
        TIMER SCREEN (back [left] - timerSettings [right]) */}

        <Stack.Screen name="Games" component={GameScreen}/>
        <Stack.Screen name="Game Settings" component={GameSettings}/>
        <Stack.Screen name="Preferences" component={Preferences}/>
        <Stack.Screen name="Categories" component={CategoryScreen}/>
        <Stack.Screen name="Category Settings" component={CategorySettings}/>
        <Stack.Screen name="Timer" component={TimerScreen}/>

        {/* TIMERSETTINGSSCREEN */}
      </Stack.Navigator>
    </NavigationContainer>
  );
}

const navigatorOptions = {
  headerTitleAlign: 'center',
  headerStyle: {backgroundColor: '#242424'},
  headerTitleStyle: {color: 'white', fontWeight: 'bold'},
};
