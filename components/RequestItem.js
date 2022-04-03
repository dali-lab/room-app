import React from 'react';
import {
  StyleSheet, View, Text,
} from 'react-native';
import { fonts, dimensions, colors } from '../styles/GlobalStyles';

const RequestItem = ({
  description, user, completed,
}) => {
  return (
    <View style={styles.container}>
      <View style={styles.authorCircle}>
        <Text style={styles.authorText}>{user}</Text>
      </View>
      <Text style={styles.description}>{description}</Text>
      <View style={styles.completed}>
        <View style={styles.checkbox} />
        <Text style={styles.text}>Completed</Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
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
