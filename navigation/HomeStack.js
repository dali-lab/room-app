/* eslint-disable react/no-unstable-nested-components */
/* eslint-disable global-require */
/* eslint-disable react/destructuring-assignment */
import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import { TouchableOpacity, Image } from 'react-native';

import HomeScreen from '../screens/HomeScreen';
import SettingsScreen from '../screens/SettingsScreen';

const LogoTitle = () => {
  return (
    <Image
      source={require('../assets/logo.png')}
    />
  );
};

const Stack = createStackNavigator();

// Stack navigator from the peer's home screen, to view their goals and availability
const HomeStack = () => {
  return (
    <Stack.Navigator
      initialRouteName="Home"
    >
      <Stack.Screen
        name="Home"
        options={({ navigation }) => ({
          headerTitle: (props) => <LogoTitle />,
          headerRight: () => (
            <TouchableOpacity
              style={{ marginRight: 20 }}
              onPress={() => navigation.navigate('Settings')}
            >
              <Image
                source={require('../assets/settings.png')}
              />
            </TouchableOpacity>
          ),
          headerStyle: { backgroundColor: 'white' },
          // headerTintColor: 'white',
        })}
        component={HomeScreen}
      />

      <Stack.Screen name="Settings" component={SettingsScreen} options={{ headerBackTitleVisible: false }} />
    </Stack.Navigator>
  );
};

export default HomeStack;
