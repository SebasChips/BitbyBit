import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import SignIn from './authenthication/SignIn';
import login from './authenthication/login';

const Stack = createNativeStackNavigator();

export default function index() {
  return (
    <Stack.Navigator screenOptions={{ headerShown: false }} initialRouteName="login">
      <Stack.Screen 
        name="login" 
        component={login}   
        options={{ headerShown: false }}
      />
      <Stack.Screen 
          name="SignIn" 
          component={SignIn} 
          options={{ headerShown: false }}
        />
    </Stack.Navigator>
  );
}