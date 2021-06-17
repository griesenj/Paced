import CategoryScreen from './screens/CategoryScreen';
import CategorySettings from './screens/CategorySettings';
import GameScreen from './screens/GameScreen';
import GameSettings from './screens/GameSettings';
import HelpScreen from './screens/HelpScreen';
import { LogBox } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import React from 'react';
import ScannerScreen from './screens/ScannerScreen';
import TimerScreen from './screens/TimerScreen';
import TimerSettings from './screens/TimerSettings';
import { createStackNavigator } from '@react-navigation/stack';

export default function App() {

  const Stack = createStackNavigator();

  // FIXME: Temporarily disabling unmounted component warnings for presentation purposes.
  // LogBox.ignoreAllLogs();

  return (
    <NavigationContainer>
      <Stack.Navigator screenOptions={navigatorOptions}>        
        <Stack.Screen name="Games" component={GameScreen}/>
        <Stack.Screen name="Help" component={HelpScreen}/>
        <Stack.Screen name="Game Settings" component={GameSettings}/>
        <Stack.Screen name="Categories" component={CategoryScreen}/>
        <Stack.Screen name="Category Settings" component={CategorySettings}/>
        <Stack.Screen name="Timer" component={TimerScreen}/>
        <Stack.Screen name="Timer Settings" component={TimerSettings}/>
        <Stack.Screen name="Scanner" component={ScannerScreen}/>
      </Stack.Navigator>
    </NavigationContainer>
  );
}

const navigatorOptions = {
  headerTitleAlign: 'center',
  headerStyle: {backgroundColor: '#242424'},
  headerTitleStyle: {color: 'white', fontWeight: 'bold'},
};
