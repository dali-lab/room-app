import React from 'react';
import {
  StyleSheet, Text, View,
} from 'react-native';
import { fonts, colors } from '../constants/GlobalStyles';

const UserIcon = (props) => {
  const { user, size } = props;
  return (
    <View style={[styles.container, { backgroundColor: user.iconColor, height: size, width: size }]}>
      <Text key={user.firstName}>{`${user.firstName[0]}${user.lastName[0]}`}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    borderRadius: 1000,
    alignItems: 'center',
    justifyContent: 'center',
  },
  userCircle: {
    fontWeight: '300',
    marginLeft: 20,
    fontSize: fonts.smallText,
    color: colors.darkSageGreen,
  },
});

export default UserIcon;
