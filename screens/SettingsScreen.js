import React, { useState, useEffect } from 'react';
import {
  StyleSheet, SafeAreaView, Text, View, TextInput, TouchableOpacity,
} from 'react-native';
import { connect } from 'react-redux';
import { fonts, colors, dimensions } from '../constants/GlobalStyles';
import { updateUser, getAllUsers } from '../store/actions';
import UserIcon from '../components/UserIcon';
// import { getUser } from '../services/user';

const SettingsScreen = (props) => {
  const {
    user, roomCode, updateNewUser, getUsers,
  } = props;

  useEffect(() => {
    getUsers(user?.roomCode);
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [user]);
  const [newFirstName, setnewFirstName] = useState(user.firstName);
  const [newLastName, setnewLastName] = useState(user.lastName);
  const [newIconColor, setnewIconColor] = useState(user.iconColor);

  const handleSave = () => {
    const newUser = {
      email: user.email,
      password: user.password,
      firstName: newFirstName,
      lastName: newLastName,
      isHome: user.isHome,
      roomCode: user.roomCode,
      guestType: user.guestType,
      iconColor: newIconColor,
      numGuests: user.numGuests,
      roommates: user.roommates,
    };
    updateNewUser(user.id, newUser, roomCode);
  };
  const handleLeaveRoom = () => {
    const newUser = {
      email: user.email,
      password: user.password,
      firstName: newFirstName,
      lastName: newLastName,
      isHome: user.isHome,
      roomCode: '',
      guestType: user.guestType,
      iconColor: newIconColor,
      numGuests: user.numGuests,
      roommates: [],
    };
    updateNewUser(user.id, newUser, roomCode);
    user.roommates.forEach((userCurr) => {
      const newUser = {
        email: userCurr.email,
        password: userCurr.password,
        firstName: userCurr.firstName,
        lastName: userCurr.lastName,
        isHome: userCurr.isHome,
        roomCode: userCurr.roomCode,
        guestType: userCurr.guestType,
        iconColor: userCurr.iconColor,
        numGuests: userCurr.numGuests,
        roommates: userCurr.roommates.filter((roommate) => (roommate !== user)),
      };
      updateNewUser(userCurr.id, newUser, roomCode);
    });
  };
  const handleDeleteRoom = () => {
    // dont allow if user still has roommates or others have same roomcode
    if (user.roommates.length === 0) {
      const newUser = {
        email: user.email,
        password: user.password,
        firstName: newFirstName,
        lastName: newLastName,
        isHome: user.isHome,
        roomCode: '',
        guestType: user.guestType,
        iconColor: newIconColor,
        numGuests: user.numGuests,
        roommates: user.roommates,
      };
      updateNewUser(user.id, newUser, roomCode);
    } else {
      console.log('action not allowed since other roommates use this code');
    }
  };
  return (
    <SafeAreaView>
      <View style={styles.subContainer}>
        <UserIcon key={user.id} user={user} size={90}> </UserIcon>
      </View>
      <View style={styles.subContainer}>
        <Text style={styles.text}>First Name</Text>
        <TextInput
          style={styles.input}
          onChangeText={(text) => setnewFirstName(text)}
          defaultValue={newFirstName}
        />
      </View>
      <View style={styles.subContainer}>
        <Text style={styles.text}>Last Name</Text>
        <TextInput
          style={styles.input}
          onChangeText={(text) => setnewLastName(text)}
          defaultValue={newLastName}
        />
      </View>
      <View style={styles.subContainer}>
        <Text style={styles.text}>Icon Color</Text>
        <View style={styles.colorPicker}>
          {user.iconColor === colors.indigo700
            ? (
              <TouchableOpacity style={styles.buttonDarkPurple} onPress={() => setnewIconColor(colors.indigo700)}>
                <Text style={{ textAlign: 'center', fontSize: 30 }}>X</Text>
              </TouchableOpacity>
            )
            : (
              <TouchableOpacity style={styles.buttonDarkPurple} onPress={() => setnewIconColor(colors.indigo700)} />
            )}
          {user.iconColor === '#FFFF00'
            ? (
              <TouchableOpacity style={styles.buttonYellow} onPress={() => setnewIconColor('#FFFF00')}>
                <Text style={{ textAlign: 'center', fontSize: 30 }}>X</Text>
              </TouchableOpacity>
            )
            : (
              <TouchableOpacity style={styles.buttonYellow} onPress={() => setnewIconColor('#FFFF00')} />
            )}
          {user.iconColor === colors.indigo300
            ? (
              <TouchableOpacity style={styles.buttonLightPurple} onPress={() => setnewIconColor(colors.indigo300)}>
                <Text style={{ textAlign: 'center', fontSize: 30 }}>X</Text>
              </TouchableOpacity>
            )
            : (
              <TouchableOpacity style={styles.buttonLightPurple} onPress={() => setnewIconColor(colors.indigo300)} />
            )}
        </View>

      </View>
      <View style={styles.subContainer}>
        <TouchableOpacity style={styles.modalButton} onPress={handleLeaveRoom}>
          <Text style={{ color: '#FFFFFF', fontSize: fonts.largeText }}>Leave Room</Text>
        </TouchableOpacity>
      </View>
      <View style={styles.subContainer}>
        <TouchableOpacity style={styles.modalButton} onPress={handleDeleteRoom}>
          <Text style={{ color: '#FFFFFF', fontSize: fonts.largeText }}>Delete Room</Text>
        </TouchableOpacity>
      </View>
      <View style={styles.subContainer}>
        <TouchableOpacity style={styles.modalButton} onPress={handleSave}>
          <Text style={{ color: '#FFFFFF', fontSize: fonts.largeText }}>Save</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  subContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    marginTop: 20,
  },
  modalButton: {
    backgroundColor: colors.darkSageGreen,
    width: dimensions.screenWidth * 0.3,
    alignItems: 'center',
    justifyContent: 'center',
    height: dimensions.screenHeight * 0.03,
    margin: 10,
  },
  text: {
    fontSize: fonts.largeText,
    textAlign: 'center',
    color: colors.darkSageGreen,
  },
  input: {
    backgroundColor: '#FFFFFF',
    fontSize: fonts.largeText,
    width: dimensions.screenWidth * 0.4,
    marginLeft: 20,
    height: dimensions.screenHeight * 0.03,
  },
  colorPicker: {
    width: dimensions.screenWidth * 0.4,
    marginLeft: 20,
    flexDirection: 'row',
  },
  buttonDarkPurple: {
    height: 30,
    width: 30,
    marginHorizontal: 10,
    backgroundColor: colors.indigo700,
    justifyContent: 'center',
  },
  buttonLightPurple: {
    height: 30,
    width: 30,
    marginHorizontal: 10,
    backgroundColor: colors.indigo300,
  },
  buttonYellow: {
    height: 30,
    width: 30,
    marginHorizontal: 10,
    backgroundColor: '#FFFF00',
    justifyContent: 'center',
  },
});

const mapStateToProps = (state) => {
  return {
    user: state.user.user, 
    roomCode: state.user.roomCode,
  };
};
const mapDispatchToProps = (dispatch) => {
  return {
    updateNewUser: (id, user, roomcode) => {
      dispatch(updateUser(id, user, roomcode));
    },
    getUsers: (roomcode) => {
      dispatch(getAllUsers(roomcode));
    },
    getUser: (id) => {
      dispatch(getAllUsers(id));
    },
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(SettingsScreen);
