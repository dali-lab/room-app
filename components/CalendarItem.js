import React from 'react';
import {
  StyleSheet, View, Text,
} from 'react-native';
import Swipeable from 'react-native-gesture-handler/Swipeable';
import { fonts, dimensions, colors } from '../constants/GlobalStyles';

const LeftActions = (progress, dragX) => {
  const scale = dragX.interpolate({
    inputRange: [0, 100],
    outputRange: [0, 1],
    extrapolate: 'clamp',
  });
  return (
    <>
      <View style={styles.swipeItem}>
        <Text
          style={{
            color: 'white',
            paddingHorizontal: 10,
            fontWeight: '600',
            transform: [{ scale }],
          }}
        >
          Edit
        </Text>
      </View>
      <View style={styles.swipeItem}>
        <Text
          style={{
            color: 'white',
            paddingHorizontal: 5,
            fontWeight: '600',
            transform: [{ scale }],
          }}
        >
          Delete
        </Text>
      </View>
    </>
  );
};

const CalendarItem = (props) => {
  const {
    title, start, end, author,
  } = props;

  return (
    <Swipeable renderLeftActions={LeftActions}>
      <View style={styles.container}>
        <Text style={styles.icon}>{`${author} icon`}</Text>
        <View style={styles.description}>
          <Text style={styles.title}>{title}</Text>
          <Text style={styles.text}>{`${start} - ${end}`}</Text>
        </View>
        <Text style={styles.text}># of Likes</Text>
      </View>
    </Swipeable>
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
  swipeItem: {
    backgroundColor: colors.darkSageGreen,
    justifyContent: 'center',
  },
});

export default CalendarItem;
