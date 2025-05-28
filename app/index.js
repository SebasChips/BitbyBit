import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

// Screens
import SignIn from './views/authenthication/SignIn';
import Login from './views/authenthication/Login';

import FirstTimeRegister from './screens/profile/FirstTimeRegister';
import Main from './screens/profile/Main';

import FirstGame from './views/lessons/lesson1/L1FirstGame';
import SecondGame from './views/lessons/lesson1/L1SecondGame';
import ThirdGame from './views/lessons/lesson1/L1ThirdGame';

import Toast from 'react-native-toast-message';

const Stack = createNativeStackNavigator();

export default function index() {
  return (
    <>
      <Stack.Navigator screenOptions={{ headerShown: false }} initialRouteName="Login">
        <Stack.Screen name="Login" component={Login} />
        <Stack.Screen name="SignIn" component={SignIn} />
        <Stack.Screen name="Main" component={Main} />
        <Stack.Screen name="FirstTimeRegister" component={FirstTimeRegister} />
        <Stack.Screen name="firstgame" component={FirstGame} />
        <Stack.Screen name="secondgame" component={SecondGame} />
        <Stack.Screen name="thirdgame" component={ThirdGame} />
      </Stack.Navigator>
      <Toast />
    </>
  );
}
