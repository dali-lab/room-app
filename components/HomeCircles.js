import React from 'react';
import {
  StyleSheet, View, TouchableOpacity, Text,
} from 'react-native';
import { fonts, colors } from '../constants/GlobalStyles';
import UserIcon from './UserIcon';

const HomeCircles = (props) => {
  const { users, updateUsers } = props;

  // const moveUserCircle = () => {
  //   updateUsers()
  // }

  const testUsers = [
    {
      firstName: 'Jorie',
      lastName: 'MacDonald',
      isHome: true,
    },
    {
      firstName: 'Claire',
      lastName: 'Green',
      isHome: false,
    },
    {
      firstName: 'Chelsea',
      lastName: 'Joe',
      isHome: true,
    },
    {
      firstName: 'Kaylie',
      lastName: 'Sampson',
      isHome: false,
    },
  ];
  return (
    <View style={styles.container}>
      <TouchableOpacity
        style={styles.homeCircle}
        onPress={() => console.log('pressed home')}
      >
        <Text style={styles.homeText}>home</Text>
        {testUsers?.map((user) => {
          if (user.isHome) {
            return <UserIcon users={user}> </UserIcon>;
          } else return null;
        })}
      </TouchableOpacity>
      <TouchableOpacity
        style={styles.awayCircle}
        onPress={() => updateUser()}
      >
        <Text style={styles.awayText}>away</Text>
        {testUsers?.map((user) => {
          if (!user.isHome) {
            return <UserIcon users={user}> </UserIcon>;
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
