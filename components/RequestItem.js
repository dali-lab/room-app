import React from 'react';
import {
  StyleSheet, View, Text, TouchableOpacity,
} from 'react-native';
import Swipeable from 'react-native-gesture-handler/Swipeable';
import { fonts, dimensions, colors } from '../constants/GlobalStyles';

const LeftActions = () => {
  return (
    <View style={styles.swipeContainer}>
      <TouchableOpacity style={styles.swipeItem} onPress={() => console.log('pressed edit button')}>
        <Text style={styles.swipeItemText}>Edit</Text>
      </TouchableOpacity>
    </View>
  );
};

const RightActions = () => {
  return (
    <View style={styles.swipeContainer}>
      <TouchableOpacity style={styles.swipeItem} onPress={() => console.log('pressed delete button')}>
        <Text style={styles.deleteIcon}>X</Text>
      </TouchableOpacity>
    </View>
  );
};

const RequestItem = ({
  description, user, completed,
}) => {
  return (
    <View style={styles.container}>
      <Swipeable renderLeftActions={LeftActions} renderRightActions={RightActions}>
        <View style={styles.authorCircle}>
          <Text style={styles.authorText}>{user}</Text>
        </View>
        <Text style={styles.description}>{description}</Text>
        <View style={styles.completed}>
          <View style={styles.checkbox} />
          <Text style={styles.text}>Completed</Text>
        </View>
      </Swipeable>
    </View>
  );
};

const styles = StyleSheet.create({
  deleteIcon: {
    fontSize: fonts.large24,
    fontWeight: '600',
    color: colors.lightGray,
  },
  swipeContainer: {
    height: 80,
    marginLeft: 0,
    marginTop: 0,
    justifyContent: 'center',
    alignItems: 'center',
    flexDirection: 'column',
    display: 'flex',
  },
  swipeItem: {
    backgroundColor: colors.indigo700,
    justifyContent: 'center',
    width: 60,
    height: 80,
    alignItems: 'center',
    flexDirection: 'row',
    display: 'flex',
  },
  swipeItemText: {
    fontSize: fonts.smallText,
    color: '#ffffff',
  },
  container: {
    width: dimensions.screenWidth * 0.9,
    height: 80,
    backgroundColor: colors.indigo300,
    margin: 20,
    padding: 10,
  },
  description: {
    fontSize: fonts.largeText,
    fontWeight: '600',
    marginLeft: 70,
  },
  completed: {
    flexDirection: 'row',
    alignItems: 'center',
    marginLeft: 70,
    marginTop: 5,
  },
  checkbox: {
    width: 20,
    height: 20,
    borderWidth: 2,
    borderColor: colors.indigo700,
  },
  text: {
    fontSize: fonts.smallText,
    color: colors.indigo700,
    marginLeft: 20,
  },
  authorCircle: {
    width: 50,
    height: 50,
    borderRadius: 50 / 2,
    backgroundColor: colors.primarySageGreen,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: -50,
  },
  authorText: {
    fontSize: fonts.large24,
    color: colors.indigo700,
  },
});

export default RequestItem;
