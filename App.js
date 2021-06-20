import React, { useEffect, useState } from 'react';

import CategoryScreen from './screens/CategoryScreen';
import CategorySettings from './screens/CategorySettings';
import GameScreen from './screens/GameScreen';
import GameSettings from './screens/GameSettings';
import HelpScreen from './screens/HelpScreen';
import HomeScreen from './screens/HomeScreen';
import { LogBox } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import ScannerScreen from './screens/ScannerScreen';
import SignUpScreen from './screens/SignUpScreen';
import TimerScreen from './screens/TimerScreen';
import TimerSettings from './screens/TimerSettings';
import { createStackNavigator } from '@react-navigation/stack';
import { initPacedDB } from './helpers/fb-paced';

export default function App() {

  const [init, setInit] = useState(false);
  const Stack = createStackNavigator();
  
  useEffect(() => {
    if (!init) {
      try {
        initPacedDB();
      } catch (err) {
        console.log(err);
      }
      console.log('Initialized Firebase DB');
      setInit(true);
    }
  }, [init]);

  // FIXME: Temporarily disabling unmounted component warnings for presentation purposes.
  // LogBox.ignoreAllLogs();
 
  return (
    <NavigationContainer>
      <Stack.Navigator screenOptions={navigatorOptions}>     
        <Stack.Screen options={{headerShown: false}} name="Home" component={HomeScreen}/>
        <Stack.Screen options={{headerShown: false}} name="Sign Up" component={SignUpScreen}/>
        
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
