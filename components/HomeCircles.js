import React, { useState } from 'react';
import {
  StyleSheet, View, TouchableOpacity, Text, Modal,
} from 'react-native';
import { connect } from 'react-redux';
import RnIncrementDecrementBtn from 'react-native-increment-decrement-button';
import { getAllUsers, updateUser } from '../store/actions';
import { fonts, dimensions, colors } from '../constants/GlobalStyles';
import UserIcon from './UserIcon';

const HomeCircles = (props) => {
  const { users, user, updateUsers } = props;

  const awayCircleClick = () => {
    updateUsers(user.id, { isHome: 'false' }, user.roomCode);
  };

  const homeCircleClick = () => {
    updateUsers(user.id, { isHome: 'true' }, user.roomCode);
  };

  const [showHomeModal, setshowHomeModal] = useState(false);

  const handleSave = () => {
    setshowHomeModal(!showHomeModal);
    // add code to make it so that it changes how it appears on home screen/actually effects/impacts backend things
  };

  return (
    <View style={styles.container}>
      <TouchableOpacity
        style={styles.homeCircle}
        onPress={() => homeCircleClick()}
      >
        <Text style={styles.homeText}>home</Text>
        {users?.map((userCurr) => {
          if (userCurr.isHome) {
            return (
              userCurr.id === user.id
                ? (
                  <TouchableOpacity onPress={() => setshowHomeModal(!showHomeModal)}>
                    <UserIcon key={userCurr.id} user={userCurr} size={54}> </UserIcon>
                  </TouchableOpacity>
                )
                : (
                  <UserIcon key={userCurr.id} user={userCurr} size={54}> </UserIcon>
                ));
          } else return null;
        })}
      </TouchableOpacity>
      <TouchableOpacity
        style={styles.awayCircle}
        onPress={() => awayCircleClick()}
      >
        <Text style={styles.awayText}>away</Text>
        {users?.map((userCurr) => {
          if (!userCurr.isHome) {
            return (
              userCurr.id === user.id
                ? (
                  <TouchableOpacity onPress={() => setshowHomeModal(!showHomeModal)}>
                    <UserIcon key={userCurr.id} user={userCurr} size={54}> </UserIcon>
                  </TouchableOpacity>
                )
                : (
                  <UserIcon key={userCurr.id} user={userCurr} size={54}> </UserIcon>
                ));
          } else return null;
        })}
      </TouchableOpacity>
      <Modal
        animationType="fade"
        visible={showHomeModal}
        transparent
        onRequestClose={() => {
          console.log('Modal has been closed.');
        }}
      >
        <View style={styles.swipeModalContainer}>
          <TouchableOpacity style={styles.exitButton} onPress={() => setshowHomeModal(!showHomeModal)}>
            <Text style={styles.text}>X</Text>
          </TouchableOpacity>

          <RnIncrementDecrementBtn
            minVal={0}
            minreq={3}
            max={10}
            val={3}
            disableControl={false}
            disabledColor="#eeeeee"
            activeColor="#509e4b"
            handleClick={() => console.log('Pressed')}
            styleBtn={{ width: 100, height: 100 }}
            styleTextInput={{ width: 100, height: 100, backgroundColor: 'green' }}
            labelStyle={{ fontSize: 25, color: 'blue' }}
          />
          <View style={styles.incrementerContainer}>
            <TouchableOpacity>
              <Text style={styles.incrementText}>-</Text>
            </TouchableOpacity>
            <TouchableOpacity>
              <Text style={styles.incrementText}>+</Text>
            </TouchableOpacity>
          </View>
          <View style={{ flexDirection: 'row' }}>
            <Text style={styles.text}>Guest Type:</Text>
            <View style={styles.inputContainer} />
          </View>
          <View style={styles.guestTypeContainer}>
            <TouchableOpacity style={styles.guestTypeButton}><Text style={styles.guestTypeText}>Romantic</Text></TouchableOpacity>
            <TouchableOpacity style={styles.guestTypeButton}><Text style={styles.guestTypeText}>Study</Text></TouchableOpacity>
            <TouchableOpacity style={styles.guestTypeButton}><Text style={styles.guestTypeText}>Friend</Text></TouchableOpacity>
          </View>
          <View style={{ flexDirection: 'row' }}>
            <TouchableOpacity style={styles.modalButton} onPress={handleSave}>
              <Text style={{ color: '#FFFFFF' }}>Save</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>
    </View>
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
  homeCircle: {
    width: 216,
    height: 216,
    borderRadius: 216 / 2,
    backgroundColor: colors.darkSageGreen,
    alignItems: 'center',
  },
  awayCircle: {
    width: 133,
    height: 133,
    borderRadius: 133 / 2,
    backgroundColor: colors.mediumSageGreen,
    marginTop: 100,
    marginLeft: -50,
    alignItems: 'center',
  },
  icon: {
    fontSize: 10,
    fontWeight: '300',
    marginLeft: 20,
    width: dimensions.screenWidth * 0.1,
  },
  homeText: {
    fontSize: fonts.large24,
    color: 'white',
    marginTop: 15,
  },
  awayText: {
    fontSize: fonts.large22,
    color: colors.darkSageGreen,
    marginTop: 12,
  },
});

// testing
const mapStateToProps = (state) => {
  return {
    user: state.user.user,
    users: state.user.allUsers,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    getUsers: (roomcode) => {
      dispatch(getAllUsers(roomcode));
    },

    // added
    updateUsers: (id, user, roomcode) => {
      dispatch(updateUser(id, user, roomcode));
    },
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(HomeCircles);
