/* eslint-disable global-require */
import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import LoginScreen from '../screens/LoginScreen';
import SignupScreen from '../screens/SignupScreen';
// import EmailScreen from '../screens/EmailScreen';
// import PasswordScreen from '../screens/PasswordScreen';
import GenerateRoomKeyScreen from '../screens/GenerateRoomKeyScreen';
// import RoomKeyScreen from '../screens/RoomKeyScreen';
// import ForgotPasswordScreen from '../screens/ForgotPasswordScreen';

const Stack = createStackNavigator();

const AuthStack = () => {
  return (
    <Stack.Navigator
      initialRouteName="Login"
    >

      <Stack.Screen name="Login" component={LoginScreen} />
      <Stack.Screen name="Signup" component={SignupScreen} />
      {/* <Stack.Screen name="Email" component={EmailScreen} />
      <Stack.Screen name="Password" component={PasswordScreen} />
      <Stack.Screen name="RoomKey" component={RoomKeyScreen} />
      <Stack.Screen name="ForgotPassword" component={ForgotPasswordScreen} /> */}
      <Stack.Screen name="GenerateRoomKey" component={GenerateRoomKeyScreen} />

    </Stack.Navigator>
  );
};

export default AuthStack;
