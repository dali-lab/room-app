import React from 'react';
import {
  StyleSheet, SafeAreaView, Text, TouchableOpacity, TextInput,
} from 'react-native';
import { fonts, colors } from '../constants/GlobalStyles';

const LoginScreen = () => {
  const [email, onChangeEmail] = React.useState(null);
  const [pw, onChangePw] = React.useState(null);
  return (
    <SafeAreaView>
      <Text style={styles.title}>Login</Text>
      <Text style={styles.text}>Email</Text>
      <TextInput
        style={styles.input}
        onChangeText={onChangeEmail}
        value={email}
        placeholder="Type your email"
      />
      <Text style={styles.text}>Password</Text>
      <TextInput
        style={styles.input}
        onChangeText={onChangePw}
        value={pw}
        placeholder="Type your password"
      />
      <TouchableOpacity
        style={styles.forgotPw}
        onPress={() => console.log('Forgot password')}
      >
        <Text style={styles.forgotPwText}>Forgot password?</Text>
      </TouchableOpacity>
      <TouchableOpacity
        style={styles.loginButton}
        onPress={() => console.log('login')}
      >
        <Text style={styles.buttonText}>Log in</Text>
      </TouchableOpacity>
      <TouchableOpacity
        style={styles.signupButton}
        onPress={() => console.log('Sign up')}
      >
        <Text style={styles.bottomText}>
          Don&apos;t have an account?
          {' '}
          <Text style={styles.bottomTextBold}>Sign up</Text>
        </Text>
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
    marginTop: 200,
  },
});

export default LoginScreen;
