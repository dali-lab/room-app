/* eslint-disable global-require */
import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import LoginScreen from '../screens/LoginScreen';
import SignupScreen from '../screens/SignupScreen';
import GenerateRoomKeyScreen from '../screens/GenerateRoomKeyScreen';
import ForgotPasswordScreen from '../screens/ForgotPasswordScreen';

const Stack = createStackNavigator();

const AuthStack = () => {
  return (
    <Stack.Navigator
      initialRouteName="Login"
    >
      <Stack.Screen name="ForgotPassword" component={ForgotPasswordScreen} />

      <Stack.Screen name="Login" component={LoginScreen} />
      <Stack.Screen name="Signup" component={SignupScreen} />
      <Stack.Screen name="GenerateRoomKey" component={GenerateRoomKeyScreen} />

    </Stack.Navigator>
  );
};

export default AuthStack;
