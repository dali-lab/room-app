import React from 'react';
import {
  StyleSheet, View,
} from 'react-native';
import SafeAreaView from 'react-native-safe-area-view';
import CalendarItem from '../components/CalendarItem';
import { fonts } from '../styles/GlobalStyles';

const testEvents = [
  {
    title: 'Event 1',
    user: 'Kaylie',
    startTime: '10:00 am',
    endTime: '10:30 am',
  },
  {
    title: 'Event 2',
    user: 'Chelsea',
    startTime: '1:00 pm',
    endTime: '2:00 pm',
  },
  {
    title: 'Event 3',
    user: 'Jorie',
    startTime: '9:00 am',
    endTime: '10:30 am',
  },
  {
    title: 'Event 4',
    user: 'Claire',
    startTime: '4:00 pm',
    endTime: '5:00 pm',
  },
];

const CalendarScreen = () => {
  return (
    <SafeAreaView style={styles.container}>
      <View>
        {testEvents.map(({
          title, user, startTime, endTime,
        }) => <CalendarItem key={title} title={title} user={user} startTime={startTime} endTime={endTime} />)}
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
  },
  text: {
    fontSize: fonts.largeText,
    textAlign: 'center',
  },
});

export default CalendarScreen;
