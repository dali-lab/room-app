import React from 'react';
import {
  StyleSheet, View, TouchableOpacity, Text,
} from 'react-native';
import { fonts, colors } from '../constants/GlobalStyles';

const testUsers = [
  {
    firstName: 'Jorie',
    lastName: 'MacDonald',
    home: true,
  },
  {
    firstName: 'Claire',
    lastName: 'Green',
    home: false,
  },
  {
    firstName: 'Chelsea',
    lastName: 'Joe',
    home: true,
  },
  {
    firstName: 'Kaylie',
    lastName: 'Sampson',
    home: false,
  },
];

const HomeCircles = () => {
  return (
    <View style={styles.container}>
      <TouchableOpacity
        style={styles.homeCircle}
        onPress={() => console.log('pressed home')}
      >
        <Text style={styles.homeText}>home</Text>
        {testUsers.map(({ firstName, lastName, home }) => {
          if (home) {
            return <Text key={firstName}>{`${firstName[0]}${lastName[0]}`}</Text>;
          } else return null;
        })}
      </TouchableOpacity>
      <TouchableOpacity
        style={styles.awayCircle}
        onPress={() => console.log('pressed away')}
      >
        <Text style={styles.awayText}>away</Text>
        {testUsers.map(({ firstName, lastName, home }) => {
          if (!home) {
            return <Text key={firstName}>{`${firstName[0]}${lastName[0]}`}</Text>;
          } else return null;
        })}
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    marginTop: 50,
  },
  homeCircle: {
    width: 216,
    height: 216,
    borderRadius: 216 / 2,
    backgroundColor: colors.darkSageGreen,
    alignItems: 'center',
  },
  awayCircle: {
    width: 133,
    height: 133,
    borderRadius: 133 / 2,
    backgroundColor: colors.mediumSageGreen,
    marginTop: 100,
    marginLeft: -50,
    alignItems: 'center',
  },
  homeText: {
    fontSize: fonts.large24,
    color: 'white',
    marginTop: 15,
  },
  awayText: {
    fontSize: fonts.large22,
    color: colors.darkSageGreen,
    marginTop: 12,
  },
});

export default HomeCircles;
