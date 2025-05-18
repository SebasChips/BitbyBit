import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import SignIn from './views/authenthication/SignIn';
import login from './views/authenthication/login';
import firstgame from './views/lessons/lesson1/L1FirstGame';

import main from './views/profile/main';
import firstTimeRegister from './views/profile/firstTimeRegister';

import Toast from 'react-native-toast-message';


const Stack = createNativeStackNavigator();

export default function index() {
  return (
    <>
      <Stack.Navigator screenOptions={{ headerShown: false }} initialRouteName="login">
        <Stack.Screen name="login" component={login} />
        <Stack.Screen name="SignIn" component={SignIn} />
        <Stack.Screen name="main" component={main} />
        <Stack.Screen name="firstTimeRegister" component={firstTimeRegister} />
        <Stack.Screen name="firstgame" component={firstgame} />

      </Stack.Navigator>
      <Toast />
    </>
  );
}