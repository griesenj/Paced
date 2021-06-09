import { StyleSheet, Text, View } from 'react-native';

import { NavigationContainer } from '@react-navigation/native';
import React from 'react';
import TimerScreen from './screens/TimerScreen';
import { createStackNavigator } from '@react-navigation/stack';

export default function App() {

  const Stack = createStackNavigator();

  return (
    <NavigationContainer>
      <Stack.Navigator screenOptions={navigatorOptions}>
        {/* GAME SCREEN (preferences [left] - gameSettings [right])
        PREFERENCES
        GAMESETTINGSSCREEN
        CATEGORY SCREEN (back [left] - categorySettings [right])
        CATEGORYSETTINGSSCREEN
        TIMER SCREEN (back [left] - timerSettings [right]) */}
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
