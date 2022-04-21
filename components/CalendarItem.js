import React from 'react';
import {
  StyleSheet, View, Text, TouchableOpacity,
} from 'react-native';
import Swipeable from 'react-native-gesture-handler/Swipeable';
import moment from 'moment';
import { fonts, dimensions, colors } from '../constants/GlobalStyles';

const LeftActions = (progress, dragX, onPress) => {
  // eslint-disable-next-line react/destructuring-assignment
  // const scale = dragX.interpolate({
  //   inputRange: [0, 100],
  //   outputRange: [0, 1],
  //   extrapolate: 'clamp',
  // });
  return (
    <View style={styles.swipeContainer}>
      <TouchableOpacity style={styles.swipeItem}>
        <Text style={styles.swipeItemText}>Edit</Text>
      </TouchableOpacity>
      <TouchableOpacity style={styles.swipeItem}>
        <Text style={styles.swipeItemText}>Delete</Text>
      </TouchableOpacity>
    </View>
  // <Animated.View style={styles.swipeContainer}>
  //   <Animated.View style={styles.swipeItem}>
  //     <Animated.Text
  //       style={{
  //         color: 'white',
  //         paddingHorizontal: 10,
  //         fontWeight: '600',
  //         transform: [{ scale }],
  //       }}
  //     >
  //       Edit
  //     </Animated.Text>
  //   </Animated.View>
  //   <Animated.View style={styles.swipeItem}>
  //     <Animated.Text
  //       style={{
  //         color: 'white',
  //         paddingHorizontal: 5,
  //         fontWeight: '600',
  //         transform: [{ scale }],
  //       }}
  //     >
  //       Delete
  //     </Animated.Text>
  //   </Animated.View>
  // </Animated.View>
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
          <Text style={styles.text}>{`${moment(start).format('h:mm a')} - ${moment(end).format('h:mm a')}`}</Text>
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
  swipeContainer: {
    height: 80,
    marginLeft: 20,
    marginTop: 20,
    justifyContent: 'flex-start',
    flexDirection: 'row',
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
