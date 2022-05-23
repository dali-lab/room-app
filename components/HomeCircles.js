import React, { useState } from 'react';
import {
  StyleSheet, View, TouchableOpacity, Text,
} from 'react-native';
import { connect } from 'react-redux';
import { getAllUsers, updateUser } from '../store/actions';
import { fonts, dimensions, colors } from '../constants/GlobalStyles';
import UserIcon from './UserIcon';
import GuestModal from './GuestModal';

const HomeCircles = (props) => {
  const { users, user, updateUsers } = props;

  const awayCircleClick = () => {
    updateUsers(user.id, { isHome: 'false' }, user.roomCode, true);
  };

  const homeCircleClick = () => {
    updateUsers(user.id, { isHome: 'true' }, user.roomCode, true);
  };

  const [showHomeModal, setshowHomeModal] = useState(false);

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
                    <GuestModal showHomeModal={showHomeModal} setshowHomeModal={setshowHomeModal} />
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
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    marginTop: 50,
  },
  text: {
    fontSize: fonts.largeText,
    textAlign: 'center',
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
    updateUsers: (id, user, roomcode, updateSelf) => {
      dispatch(updateUser(id, user, roomcode, updateSelf));
    },
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(HomeCircles);
