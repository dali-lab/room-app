import React, { useState } from 'react';
import {
  StyleSheet, View, TouchableOpacity, Text, Modal,
} from 'react-native';
import { connect } from 'react-redux';
import { updateUser } from '../store/actions';
// import { getAllUsers, updateUser } from '../store/actions';
import { fonts, dimensions, colors } from '../constants/GlobalStyles';

const GuestModal = (props) => {
  const {
    showHomeModal, setshowHomeModal, user, updateUserGuests,
  } = props;
  const [count, setCount] = useState(0);
  const [guestType, setGuestType] = useState('');
  const handleSave = () => {
    setshowHomeModal(!showHomeModal);
    const updatedUser = { ...user, guestType, numGuests: count };
    console.log(updatedUser);
    updateUserGuests(user.id, updatedUser, user.roomcode, true);
    // add code to make it so that it changes how it appears on home screen/actually effects/impacts backend things
  };

  const subtractGuest = () => {
    if (count > 0) {
      setCount(count - 1);
    }
  };

  return (
    <Modal
      animationType="fade"
      visible={showHomeModal}
      onRequestClose={() => {
        console.log('Modal has been closed.');
      }}
    >
      <View style={styles.swipeModalContainer}>
        <TouchableOpacity style={styles.exitButton} onPress={() => setshowHomeModal(!showHomeModal)}>
          <Text style={styles.text}>X</Text>
        </TouchableOpacity>

        <View style={styles.incrementerContainer}>
          <Text>
            Count:
            {count}
          </Text>
          <TouchableOpacity onPress={() => subtractGuest()}>
            <Text style={styles.incrementText}>-</Text>
          </TouchableOpacity>
          <TouchableOpacity onPress={() => setCount(count + 1)}>
            <Text style={styles.incrementText}>+</Text>
          </TouchableOpacity>

        </View>
        <View style={{ flexDirection: 'row' }}>
          <Text style={styles.text}>Guest Type:</Text>
          <View style={styles.inputContainer} />
        </View>
        <View style={styles.guestTypeContainer}>
          <TouchableOpacity style={guestType === 'romantic' ? [styles.guestTypeButton, { backgroundColor: colors.darkSageGreen }] : styles.guestTypeButton} onPress={() => setGuestType('romantic')}><Text style={styles.guestTypeText}>Romantic</Text></TouchableOpacity>
          <TouchableOpacity style={guestType === 'study' ? [styles.guestTypeButton, { backgroundColor: colors.darkSageGreen }] : styles.guestTypeButton} onPress={() => setGuestType('study')}><Text style={styles.guestTypeText}>Study</Text></TouchableOpacity>
          <TouchableOpacity style={guestType === 'friend' ? [styles.guestTypeButton, { backgroundColor: colors.darkSageGreen }] : styles.guestTypeButton} onPress={() => setGuestType('friend')}><Text style={styles.guestTypeText}>Friend</Text></TouchableOpacity>
        </View>
        <View style={{ flexDirection: 'row' }}>
          <TouchableOpacity style={styles.modalButton} onPress={handleSave}>
            <Text style={{ color: '#FFFFFF' }}>Save</Text>
          </TouchableOpacity>
        </View>
      </View>
    </Modal>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    marginTop: 50,
  },
  incrementerContainer: {
    height: 100,
    width: dimensions.screenWidth * 0.45,
    flexDirection: 'row',
    marginTop: 0,
    justifyContent: 'space-between',
  },
  incrementText: {
    color: colors.darkSageGreen,
    fontSize: 60,
  },
  text: {
    fontSize: fonts.largeText,
    textAlign: 'center',
  },
  guestTypeContainer: {
    height: 100,
    width: dimensions.screenWidth * 0.7,
    flexDirection: 'row',
    marginTop: 0,
    justifyContent: 'space-between',
  },
  guestTypeButton: {
    height: 100,
    width: 90,
    backgroundColor: colors.primarySageGreen,
    padding: 10,
  },
  guestTypeText: {
    textAlign: 'center',
    color: 'white',
  },
  modalButton: {
    backgroundColor: colors.darkSageGreen,
    width: dimensions.screenWidth * 0.3,
    alignItems: 'center',
    justifyContent: 'center',
    height: dimensions.screenHeight * 0.03,
    margin: 10,
  },
  swipeModalContainer: {
    backgroundColor: colors.backgroundSageGreen,
    width: dimensions.screenWidth * 0.8,
    height: dimensions.screenHeight * 0.5,
    marginTop: dimensions.screenHeight * 0.2,
    margin: dimensions.screenWidth * 0.1,
    alignItems: 'center',
    justifyContent: 'space-around',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 10,
    },
    shadowRadius: 60,
    shadowOpacity: 0.2,
  },
  exitButton: {
    borderWidth: 3,
    borderColor: colors.darkSageGreen,
    borderRadius: 20,

    width: dimensions.screenWidth * 0.1,
    alignItems: 'center',
    justifyContent: 'center',
    height: dimensions.screenHeight * 0.04,
    marginRight: dimensions.screenWidth * 0.6,
    marginTop: 10,
  },
  icon: {
    fontSize: 10,
    fontWeight: '300',
    marginLeft: 20,
    width: dimensions.screenWidth * 0.1,

  },
});

const mapStateToProps = (state) => {
  return {
    user: state.user.user,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    // added
    updateUserGuests: (id, user, roomcode, updateSelf) => {
      dispatch(updateUser(id, user, roomcode, updateSelf));
    },
  };
};
export default connect(mapStateToProps, mapDispatchToProps)(GuestModal);
