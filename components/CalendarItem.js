import React from 'react';
import {
  StyleSheet, View, Text,
} from 'react-native';
import { fonts, dimensions, colors } from '../styles/GlobalStyles';

const CalendarItem = ({
  title, user, startTime, endTime,
}) => {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>{title}</Text>
      <Text style={styles.text}>{`${startTime} - ${endTime}`}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    width: dimensions.screenWidth * 0.9,
    height: 80,
    backgroundColor: colors.backgroundSageGreen,
    margin: 20,
    padding: 10,
  },
  title: {
    fontSize: fonts.largeText,
    fontWeight: '600',
    marginLeft: 20,
  },
  text: {
    fontSize: fonts.smallText,
    color: colors.darkSageGreen,
    marginLeft: 20,
  },
});

export default CalendarItem;
