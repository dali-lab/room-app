import React from 'react';
import {
  StyleSheet, View, Text, TouchableOpacity,
} from 'react-native';
import Swipeable from 'react-native-gesture-handler/Swipeable';
import moment from 'moment';
import { fonts, dimensions, colors } from '../constants/GlobalStyles';

const LeftActions = (progress, dragX, onPress) => {
  return (
    <View style={styles.swipeContainer}>
      <TouchableOpacity style={styles.swipeItem}>
        <Text style={styles.swipeItemText}>Edit</Text>
      </TouchableOpacity>
      <TouchableOpacity style={styles.swipeItem}>
        <Text style={styles.swipeItemText}>Delete</Text>
      </TouchableOpacity>
    </View>
  );
};

const CalendarItem = (props) => {
  const {
    title, start, end, author,
  } = props;

  return (
    <View style={styles.container}>
      <Swipeable renderLeftActions={LeftActions}>
        <View style={styles.eventContainer}>
          <Text style={styles.icon}>{`${author} icon`}</Text>
          <View style={styles.description}>
            <Text style={styles.title}>{title}</Text>
            <Text style={styles.text}>{`${moment(start).format('h:mm a')} - ${moment(end).format('h:mm a')}`}</Text>
          </View>
          <Text style={styles.text}># of Likes</Text>
        </View>
      </Swipeable>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    height: 80,
    marginTop: 20,
    marginLeft: 20,
    justifyContent: 'flex-start',
    flexDirection: 'row',
  },
  swipeContainer: {
    height: 80,
    flexDirection: 'row',
    backgroundColor: colors.backgroundSageGreen,
  },
  eventContainer: {
    width: dimensions.screenWidth * 0.9,
    height: 80,
    backgroundColor: colors.backgroundSageGreen,
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
  swipeItem: {
    backgroundColor: colors.darkSageGreen,
    justifyContent: 'center',
    padding: 10,
    width: 60,
  },
  swipeItemText: {
    fontSize: fonts.smallText,
    color: '#ffffff',
  },
});

export default CalendarItem;
