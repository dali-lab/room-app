import React, { useState } from 'react';
import {
  StyleSheet, SafeAreaView, Text, ScrollView, TouchableOpacity, TextInput,
} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { connect } from 'react-redux';
import { fonts, colors } from '../constants/GlobalStyles';
import { signUpUser } from '../store/actions';

const SignupScreen = (props) => {
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [roomCode, setRoomCode] = useState('');
  const navigation = useNavigation();
  const { signup } = props;
  const handleSignup = () => {
    if (firstName && lastName && email && password && roomCode) {
      signup(email.toLowerCase(), password, firstName, lastName, roomCode);
    }
  };

  return (
    <SafeAreaView>
      <ScrollView>
        <Text style={styles.title}>Enter your information</Text>
        <Text style={styles.text}>First Name</Text>
        <TextInput
          style={styles.input}
          onChangeText={(text) => setFirstName(text)}
          value={firstName}
          placeholder="Type your first name"
        />
        <Text style={styles.text}>Last Name</Text>
        <TextInput
          style={styles.input}
          onChangeText={(text) => setLastName(text)}
          value={lastName}
          placeholder="Type your last name"
        />
        <Text style={styles.text}>Email</Text>
        <TextInput
          style={styles.input}
          onChangeText={(text) => setEmail(text)}
          value={email}
          placeholder="Type your email"
        />
        <Text style={styles.text}>New Password</Text>
        <TextInput
          style={styles.input}
          onChangeText={(text) => setPassword(text)}
          value={password}
          placeholder="Enter a password"
        />
        <Text style={styles.text}>Room Key</Text>
        <TextInput
          style={styles.input}
          onChangeText={(text) => setRoomCode(text)}
          value={roomCode}
          placeholder="Enter a room key"
        />
        <TouchableOpacity
          style={styles.loginButton}
          onPress={handleSignup}
        >
          <Text style={styles.buttonText}>Sign Up!</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.signupButton}
          onPress={() => navigation.navigate('GenerateRoomKey', {
            firstName1: firstName,
          })}
        >
          <Text style={styles.bottomText}>
            Don&apos;t have a room key?
            {' '}
            <Text style={styles.bottomTextBold}>Click Here</Text>
          </Text>
        </TouchableOpacity>
      </ScrollView>
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

const mapDispatchToProps = (dispatch) => {
  return {
    signup: (firstName, lastName, email, password, roomCode) => {
      dispatch(signUpUser(firstName, lastName, email, password, roomCode));
    },
  };
};

export default connect(null, mapDispatchToProps)(SignupScreen);
