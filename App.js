import "firebase/database";

import * as Analytics from 'expo-firebase-analytics';

import React, { useEffect, useState } from 'react';

import CategoryScreen from './screens/application/CategoryScreen';
import CategorySettings from './screens/application/CategorySettings';
import GameScreen from './screens/application/GameScreen';
import GameSettings from './screens/application/GameSettings';
import HelpScreen from './screens/application/HelpScreen';
import HomeScreen from './screens/authentication/HomeScreen';
import { LogBox } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import ScannerScreen from './screens/application/ScannerScreen';
import SignInScreen from './screens/authentication/SignInScreen';
import SignUpScreen from './screens/authentication/SignUpScreen';
import TimerScreen from './screens/application/TimerScreen';
import TimerSettings from './screens/application/TimerSettings';
import { createStackNavigator } from '@react-navigation/stack';
import { initPacedDB } from './helpers/fb-paced';

// Gets the current screen from navigation state
const getActiveRouteName = state => {
  const route = state.routes[state.index];
  if (route.state) {
    // Dive into nested navigators
    return getActiveRouteName(route.state);
  }
  return route.name;
};

export default function App() {

  const routeNameRef = React.useRef();
  const navigationRef = React.useRef();

  React.useEffect(() => {
    const state = navigationRef.current.getRootState();

    // Save the initial route name
    routeNameRef.current = getActiveRouteName(state);
  }, []);

  const [init, setInit] = useState(false);
  const Stack = createStackNavigator();
  
  useEffect(() => {
    if (!init) {
      try {
        initPacedDB();
      } catch (err) {
        console.log(err);
      }
      setInit(true);
    }
  }, [init]);

  // FIXME: Temporarily disabling unmounted component warnings for presentation purposes.
  LogBox.ignoreAllLogs();

  return (
    <NavigationContainer
      ref={navigationRef}
        onStateChange={(state) => {
          const previousRouteName = routeNameRef.current;
          const currentRouteName = getActiveRouteName(state);
          if (previousRouteName !== currentRouteName) {
            Analytics.setCurrentScreen(currentRouteName, currentRouteName);
          }
        }}
    >
      <Stack.Navigator screenOptions={navigatorOptions}>
        <Stack.Screen options={{headerShown: false}} name="Home" component={HomeScreen}/>
        <Stack.Screen options={{headerShown: false}} name="Sign Up" component={SignUpScreen}/>
        <Stack.Screen options={{headerShown: false}} name="Sign In" component={SignInScreen}/>    
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
  gestureEnabled: false,
};
