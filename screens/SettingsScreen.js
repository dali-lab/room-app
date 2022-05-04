import React, { useState } from 'react';
import {
  StyleSheet, SafeAreaView, Text, View, TextInput, TouchableOpacity,
} from 'react-native';
import { connect } from 'react-redux';
import { fonts, colors, dimensions } from '../constants/GlobalStyles';
import { updateUser } from '../store/actions';
import UserIcon from '../components/UserIcon';

const SettingsScreen = (props) => {
  const {
    user, users, roomCode, updateNewUser,
  } = props;
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
          <TouchableOpacity style={styles.buttonDarkPurple} onPress={() => setnewIconColor(colors.indigo700)} />
          <TouchableOpacity style={styles.buttonYellow} onPress={() => setnewIconColor('yellow')} />
          <TouchableOpacity style={styles.buttonLightPurple} onPress={() => setnewIconColor(colors.indigo300)} />
        </View>

      </View>
      <View style={styles.subContainer}>
        <TouchableOpacity style={styles.modalButton}>
          <Text style={{ color: '#FFFFFF', fontSize: fonts.largeText }}>Leave Room</Text>
        </TouchableOpacity>
      </View>
      <View style={styles.subContainer}>
        <TouchableOpacity style={styles.modalButton}>
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
    backgroundColor: 'yellow',
  },
});

const mapStateToProps = (state) => {
  return {
    users: state.user.allUsers,
    user: state.user.user,
    roomCode: state.user.roomCode,
  };
};
const mapDispatchToProps = (dispatch) => {
  return {
    updateNewUser: (id, user, roomcode) => {
      dispatch(updateUser(id, user, roomcode));
    },
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(SettingsScreen);
