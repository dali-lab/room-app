/* eslint-disable react/no-unescaped-entities */
import React from 'react';
import {
  StyleSheet, View, Text, TouchableOpacity,
} from 'react-native';
// import Swipeable from 'react-native-gesture-handler/Swipeable';
import moment from 'moment';
import { fonts, dimensions, colors } from '../constants/GlobalStyles';

// const LeftActions = () => {
//   return (
//     <View style={styles.swipeContainer}>
//       <TouchableOpacity style={styles.swipeItem}>
//         <Text style={styles.swipeItemText}>Edit</Text>
//       </TouchableOpacity>
//       <TouchableOpacity style={styles.swipeItem}>
//         <Text style={styles.swipeItemText}>Delete</Text>
//       </TouchableOpacity>
//     </View>
//   );
// };

const CalendarItem = (props) => {
  const {
    title, start, end, author,
  } = props;

  return (
    <View style={styles.container}>
      <View style={styles.eventContainer}>
        <Text style={styles.icon}>{`${author} icon`}</Text>
        <View style={styles.description}>
          <Text style={styles.title}>{title}</Text>
          <Text style={styles.text}>{`${moment(start).format('h:mm a')} - ${moment(end).format('h:mm a')}`}</Text>
        </View>
        <Text style={styles.text}># of Likes</Text>
      </View>
      <View style={styles.approveContainer}>
        <View>
          <TouchableOpacity style={styles.approveButton} onPress={() => console.log('approve')}>
            <View>
              <Text>Approve</Text>
            </View>
          </TouchableOpacity>
        </View>
        <TouchableOpacity style={styles.letsTalkButton}>
          <Text>Let's Talk</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    width: dimensions.screenWidth * 0.9,
    height: 80,
    marginTop: 20,
    marginLeft: 20,
    justifyContent: 'center',
  },
  swipeContainer: {
    flexDirection: 'row',
    backgroundColor: colors.backgroundSageGreen,
  },
  eventContainer: {
    height: 80,
    width: dimensions.screenWidth * 0.9,
    backgroundColor: colors.backgroundSageGreen,
    alignItems: 'center',
    flexDirection: 'row',
    borderColor: colors.darkSageGreen,
    borderLeftWidth: 5,
  },
  approveContainer: {
    backgroundColor: colors.backgroundSageGreen,
    justifyContent: 'space-around',
    alignItems: 'center',
    flexDirection: 'row',
    paddingBottom: 10,
    borderColor: colors.darkSageGreen,
    borderLeftWidth: 5,
  },
  description: {
    flexDirection: 'column',
    justifyContent: 'space-evenly',
    alignItems: 'center',
    height: 60,
    width: dimensions.screenWidth * 0.5,
  },
  title: {
    fontSize: fonts.largeText,
    fontWeight: '600',
  },
  text: {
    fontSize: fonts.smallText,
    color: colors.darkSageGreen,
  },
  icon: {
    fontSize: 10,
    fontWeight: '300',
    marginLeft: 20,
    width: dimensions.screenWidth * 0.1,
  },
  approveButton: {
    backgroundColor: '#52BE64',
    width: dimensions.screenWidth * 0.3,
    alignItems: 'center',
  },
  letsTalkButton: {
    backgroundColor: '#3398FF',
    width: dimensions.screenWidth * 0.3,
    alignItems: 'center',
  },
});

export default CalendarItem;
