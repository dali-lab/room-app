import React from 'react';
import {
  StyleSheet, Text, View,
} from 'react-native';
import { fonts, colors } from '../constants/GlobalStyles';

const UserIcon = (props) => {
  const { users } = props;
  return (
    <View style={styles.container}>
      <Text key={users.firstName}>{`${users.firstName[0]}${users.lastName[0]}`}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    width: 54,
    height: 54,
    borderRadius: 1000,
    backgroundColor: colors.indigo300,
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
