/* eslint-disable global-require */
import React from 'react';
import {
  StyleSheet, Text, View, Image,
} from 'react-native';
import { fonts, colors } from '../constants/GlobalStyles';

const UserIcon = (props) => {
  const { user, size, isHomeScreen } = props;
  return (
    <View>
      <View style={[styles.container, { backgroundColor: user.iconColor, height: size, width: size }]}>
        <Text style={styles.userInitals} key={user.firstName}>{`${user.firstName[0]}${user.lastName[0]}`}</Text>
        {
      isHomeScreen && (
      <View style={styles.guestDisplay}>
        {/* hard code if statements grabbing each user's default colo so that each possible color is accounted for */ }
        {user.guestType === 'romantic' && <Image source={require('../assets/heart.png')} />}
        {user.guestType === 'study' && <Image source={require('../assets/book.png')} />}
        {user.guestType === 'friend' && <Image source={require('../assets/friend-circle.png')} />}
        {user.numGuests !== 0
          ? <Text style={styles.displayText}>{user.numGuests}</Text> : null}
      </View>
      )
    }
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    borderRadius: 1000,
    alignItems: 'center',
    justifyContent: 'center',
  },
  userInitals: {
    position: 'absolute',
  },
  userCircle: {
    fontWeight: '300',
    marginLeft: 20,
    fontSize: fonts.smallText,
    color: colors.darkSageGreen,
  },
  guestDisplay: {
    marginLeft: 50,
    marginBottom: 50,
    padding: 0,
    alignItems: 'center',
    justifyContent: 'center',
    textAlign: 'center',
  },
  displayText: {
    paddingLeft: 0,
    paddingBottom: 0,
    position: 'absolute',

  /* need to add functionality to change color of it according to color */
  },
});

export default UserIcon;
