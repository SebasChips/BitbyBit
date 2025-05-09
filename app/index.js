import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import SignIn from './authenthication/SignIn';
import login from './authenthication/login';
import main from './profile/main';
import firstTimeRegister from './profile/firstTimeRegister';

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
      </Stack.Navigator>
      <Toast />
    </>
  );
}