import React from 'react';
import {
  StyleSheet, View, Text,
} from 'react-native';
import { fonts, dimensions, colors } from '../constants/GlobalStyles';

const CalendarItem = (props) => {
  const {
    title, start, end, author,
  } = props;

  return (
    <View style={styles.container}>
      <Text style={styles.icon}>{`${author} icon`}</Text>
      <View style={styles.description}>
        <Text style={styles.title}>{title}</Text>
        <Text style={styles.text}>{`${start} - ${end}`}</Text>
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
