import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import HomeScreen from '../screens/HomeScreen';
import CalendarScreen from '../screens/CalendarScreen';
import RequestScreen from '../screens/RequestScreen';
import { colors } from '../styles/GlobalStyles';

const Tab = createBottomTabNavigator();

const BottomTabs = () => {
  return (
    <Tab.Navigator
      initialRouteName="Home"
      tabBarOptions={{
        tabBarActiveTintColor: colors.primarySageGreen,
        tabBarInactiveTintColor: 'black',
        labelStyle: { fontSize: 16, marginBottom: 5 },
      }}
    >
      <Tab.Screen name="Calendar" component={CalendarScreen} />
      <Tab.Screen name="Home" component={HomeScreen} />
      <Tab.Screen name="Request" component={RequestScreen} />
    </Tab.Navigator>
  );
};

export default BottomTabs;
