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
      <Text style={styles.icon}>{`${user} icon`}</Text>
      <View style={styles.description}>
        <Text style={styles.title}>{title}</Text>
        <Text style={styles.text}>{`${startTime} - ${endTime}`}</Text>
      </View>
      <Text style={styles.text}># of Likes</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    width: dimensions.screenWidth * 0.9,
    height: 80,
    backgroundColor: colors.backgroundSageGreen,
    margin: 20,
    padding: 5,
    borderColor: colors.darkSageGreen,
    borderLeftWidth: 5,
    justifyContent: 'flex-start',
    alignItems: 'center',
    flexDirection: 'row',
  },
  description: {
    flexDirection: 'column',
    justifyContent: 'space-evenly',
    height: 60,
    width: 200,
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
  icon: {
    fontSize: 10,
    fontWeight: '300',
    marginLeft: 20,
    width: 35,
  },
});

export default CalendarItem;
