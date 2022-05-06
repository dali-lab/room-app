// import React, { useState } from 'react';
import React from 'react';
import {
  StyleSheet, SafeAreaView, Text, TouchableOpacity, /* TextInput, */
} from 'react-native';
// import { connect } from 'react-redux';
// import { useNavigation } from '@react-navigation/native';
import { fonts, colors } from '../constants/GlobalStyles';

const GenerateRoomKeyScreen = (props) => {
  // const navigation = useNavigation();
  // const { login } = props;

  return (
    <SafeAreaView>
      <Text style={styles.title}>Generate a room key</Text>
      <TouchableOpacity
        style={styles.signupButton}
        onPress={() => console.log('room key generated')}
      >
        <Text style={styles.bottomTextBold}>Generate!</Text>
      </TouchableOpacity>
      <TouchableOpacity
        style={styles.loginButton}
        onPress={() => console.log('sign in')}
      >
        <Text style={styles.buttonText}>Sign Up!</Text>
      </TouchableOpacity>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
  },
  text: {
    fontSize: fonts.largeText,
    textAlign: 'left',
    marginLeft: 40,
    marginTop: 20,
    marginBottom: -30,
    color: colors.darkSageGreen,
  },
  title: {
    fontSize: fonts.large24,
    textAlign: 'center',
    margin: 20,
    color: colors.darkSageGreen,
    fontWeight: 'bold',
  },
  input: {
    height: 40,
    margin: 40,
    borderWidth: 1,
    padding: 10,
    color: colors.darkSageGreen,
  },
  forgotPw: {
    alignItems: 'flex-end',
    marginRight: 40,
    marginTop: -25,
  },
  forgotPwText: {
    fontSize: fonts.smallText,
    color: colors.loginGreen,
  },
  loginButton: {
    width: 310,
    height: 40,
    padding: 10,
    marginTop: 40,
    backgroundColor: colors.loginGreen,
    alignItems: 'center',
    justifyContent: 'center',
    alignSelf: 'center',
  },
  buttonText: {
    fontSize: fonts.smallText,
    color: colors.lightGray,
    fontWeight: 'bold',
  },
  bottomText: {
    fontSize: fonts.smallText,
    color: colors.darkSageGreen,
  },
  bottomTextBold: {
    fontSize: fonts.smallText,
    color: colors.loginGreen,
    fontWeight: 'bold',
  },
  signupButton: {
    alignItems: 'center',
    marginTop: 20,
  },
});

export default GenerateRoomKeyScreen;
