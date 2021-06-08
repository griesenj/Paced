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
        <Stack.Screen name="Timer" component={TimerScreen}/>
      </Stack.Navigator>
    </NavigationContainer>
  );
}

const navigatorOptions = {
  headerTitleAlign: 'center',
  headerStyle: {backgroundColor: '#085480'},
  headerTitleStyle: {color: 'white'}
};
