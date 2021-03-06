import React, { useState } from 'react';
import {
  StyleSheet, SafeAreaView, Text, TouchableOpacity, TextInput,
} from 'react-native';
import { connect } from 'react-redux';
import { fonts, colors } from '../constants/GlobalStyles';
import {
  resetPassword,
} from '../store/actions/user';

const ForgotPasswordScreen = (props) => {
  const [email, setEmail] = useState('');
  const { forgotPassword } = props;

  return (
    <SafeAreaView>
      <Text style={styles.title}>Set a new password</Text>
      <Text style={styles.text}>Email</Text>
      <TextInput
        style={styles.input}
        onChangeText={(text) => setEmail(text)}
        value={email}
        placeholder="Type your email"
      />
      <TouchableOpacity
        style={styles.loginButton}
        onPress={() => forgotPassword(email)}
      >
        <Text style={styles.buttonText}>Send!</Text>
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
});

const mapDispatchToProps = (dispatch) => {
  return {
    forgotPassword: (email) => {
      dispatch(resetPassword(email));
    },
  };
};

export default connect(null, mapDispatchToProps)(ForgotPasswordScreen);
