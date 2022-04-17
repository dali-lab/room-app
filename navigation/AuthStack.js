/* eslint-disable global-require */
import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import LoginScreen from '../screens/LoginScreen';

const Stack = createStackNavigator();

const AuthStack = () => {
  return (
    <Stack.Navigator
      initialRouteName="Login"
    >

      <Stack.Screen name="Login" component={LoginScreen} />

    </Stack.Navigator>
  );
};

export default AuthStack;
